import express from "express";
import adminAuthMiddleware from "../middleware/adminAuth.middleware";
import DashboardController from "../controllers/dashboard.controller";
const router = express.Router();

router.get(
  "/productCount",
  [adminAuthMiddleware],
  DashboardController.countProducts
);

router.get("/userCount", [adminAuthMiddleware], DashboardController.countUsers);

export default router;
