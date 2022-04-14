import express from "express";
import Lt_userController from "../controllers/ltuser.controller";

const router = express.Router();

router.get("/banners", Lt_userController.getAllBanners);
// consol.log("banner api :", Lt_userController.getAllBanners);
router.get("/products", Lt_userController.getAllProducts);

router.get("/categories", Lt_userController.getAllCategories);

router.post("/contactUs", Lt_userController.postContactUs);

router.post("/user", Lt_userController.postUser);

router.get("/products/:id", Lt_userController.getProductByID);

router.get("/smmiproduct", Lt_userController.getAllSmmis);

router.post("/contactsmmi", Lt_userController.createContactus_smmi);

export default router;
