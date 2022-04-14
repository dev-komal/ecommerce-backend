import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import adminAuthMiddleware from "../middleware/adminAuth.middleware";
import BannerController from "../controllers/banner.controller";
const router = express.Router();
// const BannerValidator = require("../validators/banner.validator");

router.get("/", [adminAuthMiddleware], BannerController.listBanners);
router.get("/all", [adminAuthMiddleware], BannerController.listAllBanners);
router.get("/:id", [authMiddleware], BannerController.getBannerDetail);
router.post("/", [adminAuthMiddleware], BannerController.createBanner);
router.patch("/:id", [authMiddleware], BannerController.updateBanner);
router.delete("/:id", [adminAuthMiddleware], BannerController.deleteBanner);
router.get("/search/:q", [adminAuthMiddleware], BannerController.searchBanner);

export default router;
