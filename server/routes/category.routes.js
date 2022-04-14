import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import adminAuthMiddleware from "../middleware/adminAuth.middleware";
import CategoryController from "../controllers/category.controller";
const router = express.Router();
const CategoryValidator = require("../validators/category.validator");

router.get("/", [adminAuthMiddleware], CategoryController.listCategorys);
router.get("/all", [adminAuthMiddleware], CategoryController.listAllCategorys);
router.get("/:id", [authMiddleware], CategoryController.getCategoryDetail);
router.post(
  "/",
  [adminAuthMiddleware, CategoryValidator.create()],
  CategoryController.createCategory
);
router.patch(
  "/:id",
  [authMiddleware, CategoryValidator.update()],
  CategoryController.updateCategory
);
router.delete("/:id", [adminAuthMiddleware], CategoryController.deleteCategory);
router.get(
  "/search/:q",
  [adminAuthMiddleware],
  CategoryController.searchCategory
);

export default router;
