import asyncHandler from "express-async-handler";
import crypto from "crypto";
import axios from "axios";
import Order from "../models/orderModel.js";

// @desc    Creates an invoice
// @api     POST /api/payment/create-invoice
// @access  Private
const createInvoice = asyncHandler(async (req, res) => {
  const { totalAmount, orderId } = req.body;

  const invoiceData = {
    amount: totalAmount,
    currency: "USD",
    order_id: orderId,
    url_success: `https://frontend-mern-ecommerce-oihi.onrender.com/order/${orderId}`,
    url_callback:
      "https://backend-mern-ecommerce-86ui.onrender.com/api/payment/status-callback",
    lifetime: 300,
  };

  const authData = {
    merchant: process.env.CRYPTOMUS_MERCHANT_UUID,
    sign: crypto
      .createHash("md5")
      .update(
        Buffer.from(JSON.stringify(invoiceData)).toString("base64") +
          process.env.CRYPTOMUS_PAYMENT_API_KEY
      )
      .digest("hex"),
  };

  const { data } = await axios.post(
    "https://api.cryptomus.com/v1/payment",
    invoiceData,
    {
      headers: {
        ...authData,
      },
    }
  );

  const order = await Order.findById(orderId);
  order.paymentResult = {
    id: data.result.uuid,
    status: data.result.payment_status,
  };
  order.save();

  res.json(data);
});

const statusCallback = asyncHandler(async (req, res) => {
  const paymentStatus = req.body;

  // webhook verification logic
  if (!paymentStatus.sign) {
    res.status(400);
    throw new Error("Payload is not valid!");
  }

  const { sign, ...data } = paymentStatus;

  const paymentStatusHash = crypto
    .createHash("md5")
    .update(
      Buffer.from(JSON.stringify(data)).toString("base64") +
        process.env.CRYPTOMUS_PAYMENT_API_KEY
    )
    .digest("hex");

  if (paymentStatusHash !== sign) {
    res.status(400);
    throw new Error("Signature is not valid!");
  }

  // process the payment
  let order = await Order.findOne({ "paymentResult.id": data.uuid });
  order.paymentResult.status = data.status;

  if (data.status === "paid" || data.status === "paid_over") {
    order.isPaid = true;
    order.paidAt = new Date().toISOString();
  }

  order.save();

  res.sendStatus(200);
});

export { createInvoice, statusCallback };
