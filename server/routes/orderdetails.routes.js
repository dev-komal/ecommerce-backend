import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import adminAuthMiddleware from "../middleware/adminAuth.middleware";
import OrderDetailsController from "../controllers/orderdetails.controller";
const router = express.Router();

const OrderDetailsValidator = require("../validators/orderdetails.validator");

router.get(
  "/",
  [adminAuthMiddleware],
  OrderDetailsController.listOrdersDetails
);
router.get(
  "/all",
  [adminAuthMiddleware],
  OrderDetailsController.listAllOrdersDetails
);
router.get(
  "/AllOrder/:order_id",
  [adminAuthMiddleware],
  OrderDetailsController.listAllOrdersIDDetails
);
router.get("/:id", [authMiddleware], OrderDetailsController.getOrderDetail);
router.post(
  "/",
  // [OrderDetailsValidator.create()],
  OrderDetailsController.createOrderDetails
);
router.patch(
  "/:id",
  [authMiddleware, OrderDetailsValidator.update()],
  OrderDetailsController.updateOrderDetails
);
router.delete(
  "/:id",
  [adminAuthMiddleware],
  OrderDetailsController.deleteOrderDetails
);
router.get(
  "/search/:q",
  [adminAuthMiddleware],
  OrderDetailsController.searchOrderDetails
);

export default router;
