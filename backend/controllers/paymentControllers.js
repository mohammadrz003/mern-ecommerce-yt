import asyncHandler from "express-async-handler";
import crypto from "crypto";
import axios from "axios";
import Order from "../models/orderModel.js";

// @desc    Creates an invoice
// @api     POST /api/payment/create-invoice
// @access  Private
const createInvoice = asyncHandler(async (req, res) => {
  const { totalAmount, orderId } = req.body;

  if (!totalAmount || !orderId) {
    res.status(400);
    throw new Error("Missing required fields: totalAmount or orderId");
  }

  const invoiceData = {
    amount: totalAmount,
    currency: "USD",
    order_id: orderId,
    url_success: `https://frontend-mern-ecommerce-oihi.onrender.com/order/${orderId}`,
    url_callback:
      "https://backend-mern-ecommerce-86ui.onrender.com/api/payment/status-callback",
    lifetime: 300,
  };

  try {
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

    console.log("Auth Data:", authData); // Log auth data for debugging

    const { data } = await axios.post(
      "https://api.cryptomus.com/v1/payment",
      invoiceData,
      {
        headers: {
          ...authData,
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response contains the invoice UUID
    if (!data?.result?.uuid) {
      res.status(500);
      throw new Error("Failed to create invoice, Cryptomus API response invalid");
    }

    // Find the order in the database
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    // Update the order's payment result with the invoice UUID and payment status
    order.paymentResult = {
      id: data.result.uuid,
      status: data.result.payment_status,
    };
    await order.save();

    // Return the created invoice data
    res.json(data);
  } catch (error) {
    console.error("Error creating invoice:", error?.response?.data || error.message);
    res.status(500).json({
      message: "Failed to create invoice",
      error: error?.response?.data || error.message,
    });
  }
});

// @desc    Handles status callback from Cryptomus
// @api     POST /api/payment/status-callback
// @access  Public
const statusCallback = asyncHandler(async (req, res) => {
  const paymentStatus = req.body;

  // Log the callback data
  console.log("Status Callback Data:", paymentStatus);

  // Check if signature is present
  if (!paymentStatus.sign) {
    res.status(400);
    throw new Error("Payload is not valid: missing signature");
  }

  // Separate signature from the data
  const { sign, ...data } = paymentStatus;

  // Generate hash to verify the signature
  const paymentStatusHash = crypto
    .createHash("md5")
    .update(
      Buffer.from(JSON.stringify(data)).toString("base64") +
        process.env.CRYPTOMUS_PAYMENT_API_KEY
    )
    .digest("hex");

  // Log the generated hash and the received signature for comparison
  console.log("Generated Hash:", paymentStatusHash);
  console.log("Received Signature:", sign);

  // Verify signature
  if (paymentStatusHash !== sign) {
    res.status(400);
    throw new Error("Signature is not valid!");
  }

  // Process the payment based on the status
  try {
    // Find the order using the payment UUID
    let order = await Order.findOne({ "paymentResult.id": data.uuid });
    if (!order) {
      res.status(404);
      throw new Error("Order not found for this payment ID");
    }

    // Update the payment status in the order
    order.paymentResult.status = data.status;

    // If payment is completed, mark the order as paid
    if (data.status === "paid" || data.status === "paid_over") {
      order.isPaid = true;
      order.paidAt = new Date().toISOString();
    }

    // Save the updated order
    await order.save();

    // Send success response to Cryptomus
    res.sendStatus(200);
  } catch (error) {
    console.error("Error processing status callback:", error.message);
    res.status(500).json({
      message: "Error processing status callback",
      error: error.message,
    });
  }
});

export { createInvoice, statusCallback };
