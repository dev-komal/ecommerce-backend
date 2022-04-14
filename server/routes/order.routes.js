import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import adminAuthMiddleware from "../middleware/adminAuth.middleware";
import OrderController from "../controllers/order.controller";
const router = express.Router();
const OrderValidator = require("../validators/order.validator");

router.get("/", [adminAuthMiddleware], OrderController.listOrders);
router.get("/all", [adminAuthMiddleware], OrderController.listAllOrders);
router.get("/orderid", OrderController.getOrderID);
router.get("/:id", [authMiddleware], OrderController.getOrderDetail);
router.post("/", OrderController.createOrder);
router.patch("/:id", [authMiddleware], OrderController.updateOrder);
router.delete("/:id", [adminAuthMiddleware], OrderController.deleteOrder);
router.get("/search/:q", [adminAuthMiddleware], OrderController.searchOrder);

export default router;
