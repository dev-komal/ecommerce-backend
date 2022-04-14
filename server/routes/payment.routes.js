import express from "express";

import PaymentController from "../controllers/payment.controller";

const router = express.Router();

router.post("/verificationPayment", PaymentController.paymentVerification);
router.post("/razorpay", PaymentController.createRazorPayment);

export default router;
