import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import adminAuthMiddleware from "../middleware/adminAuth.middleware";
import ContactUsController from "../controllers/contactUs.controller";
import ContactUsValidator from "../validators/contactus.validator";

const router = express.Router();

router.get("/", [adminAuthMiddleware], ContactUsController.listContactUs);

router.post(
  "/",
  [adminAuthMiddleware, ContactUsValidator.create()],
  ContactUsController.createContactUS
);

router.get(
  "/search/:q",
  [adminAuthMiddleware],
  ContactUsController.searchContactUs
);

export default router;
