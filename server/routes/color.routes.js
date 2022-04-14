import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import adminAuthMiddleware from "../middleware/adminAuth.middleware";
import ColorController from "../controllers/color.controller";
const router = express.Router();
const ColorValidator = require("../validators/color.validator");

router.get("/", [adminAuthMiddleware], ColorController.listColors);
router.get("/all", [adminAuthMiddleware], ColorController.listAllColors);
router.get("/:id", [authMiddleware], ColorController.getColorDetail);
router.post(
  "/",
  [adminAuthMiddleware, ColorValidator.create()],
  ColorController.createColor
);
router.patch(
  "/:id",
  [authMiddleware, ColorValidator.update()],
  ColorController.updateColor
);
router.delete("/:id", [adminAuthMiddleware], ColorController.deleteColor);
router.get("/search/:q", [adminAuthMiddleware], ColorController.searchColor);

export default router;
