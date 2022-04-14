import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import adminAuthMiddleware from "../middleware/adminAuth.middleware";
import ProductController from "../controllers/product.controller";
const router = express.Router();
const ProductValidator = require("../validators/product.validator");

router.get("/", ProductController.listProducts);
router.get("/all", [adminAuthMiddleware], ProductController.listAllProducts);
router.get("/:id", [adminAuthMiddleware], ProductController.getProductDetail);
router.post(
  "/",
  [adminAuthMiddleware, ProductValidator.create()],
  ProductController.createProduct
);
router.patch(
  "/:id",
  [authMiddleware, ProductValidator.update()],
  ProductController.updateProduct
);
router.delete("/:id", [adminAuthMiddleware], ProductController.deleteProduct);
router.get(
  "/search/:q",
  [adminAuthMiddleware],
  ProductController.searchProduct
);

export default router;
