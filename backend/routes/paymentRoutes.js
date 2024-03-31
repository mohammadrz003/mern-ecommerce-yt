import express from "express";
const router = express.Router();
import { createInvoice } from "../controllers/paymentControllers.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/create-invoice", protect, createInvoice);

export default router;
