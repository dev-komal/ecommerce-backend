import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import adminAuthMiddleware from "../middleware/adminAuth.middleware";
import AddToCartController from "../controllers/addToCart.controller";
const router = express.Router();
const AddToCartValidator = require("../validators/add-to-cart.validator");

router.get("/Get", [adminAuthMiddleware], AddToCartController.listAddToCart);
router.get("/", AddToCartController.getAddToCartByUserID);
router.get("/all", [adminAuthMiddleware], AddToCartController.listAllAddToCart);
router.get("/:id", AddToCartController.getAddToCartDetail);

router.post(
  "/",
  [AddToCartValidator.create()],
  AddToCartController.createAddToCart
);
router.patch(
  "/:id",
  [AddToCartValidator.update()],
  AddToCartController.updateAddToCart
);
router.delete("/:id", AddToCartController.deleteAddToCart);

export default router;
