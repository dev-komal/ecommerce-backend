import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import adminAuthMiddleware from "../middleware/adminAuth.middleware";
import Contactus_smmiController from "../controllers/contactus_smmi.controller";

const router = express.Router();

router.get(
  "/",
  [adminAuthMiddleware],
  Contactus_smmiController.listContactus_smmi
);

router.post(
  "/",
  [adminAuthMiddleware],
  Contactus_smmiController.createContactus_smmi
);

router.get(
  "/search/:q",
  [adminAuthMiddleware],
  Contactus_smmiController.searchContactus_smmi
);

export default router;
