import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import adminAuthMiddleware from "../middleware/adminAuth.middleware";
import SmmiController from "../controllers/smmi.controller";
const router = express.Router();
// const BannerValidator = require("../validators/banner.validator");

router.get("/", [adminAuthMiddleware], SmmiController.listSmmis);
router.get("/all", [adminAuthMiddleware], SmmiController.listAllSmmis);
router.get("/:id", [authMiddleware], SmmiController.getSmmiDetail);
router.post("/", [adminAuthMiddleware], SmmiController.createSmmi);
router.patch("/:id", [authMiddleware], SmmiController.updateSmmi);
router.delete("/:id", [adminAuthMiddleware], SmmiController.deleteSmmi);

export default router;
