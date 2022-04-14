import express from "express";
const router = express.Router();

import AuthValidator from "../validators/auth.validator";
import AuthController from "../controllers/auth.controller";
import adminAuthMiddleware from "../middleware/adminAuth.middleware";

router.post("/login", [AuthValidator.login()], AuthController.login);
router.post("/verify", [AuthValidator.verify()], AuthController.verifyCode);
router.post(
  "/resend-code",
  [AuthValidator.resend()],
  AuthController.resendCode
);
router.post(
  "/change-password",
  [adminAuthMiddleware, AuthValidator.changePassword()],
  AuthController.changePassword
);

export default router;
