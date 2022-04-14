import express from "express";
const router = express.Router();

// Routes files
import AuthRoutes from "./auth.routes";
import UserRoutes from "./user.routes";
import DashboardRoutes from "./dashboard.routes";
import ProductRoutes from "./product.routes";
import CategoryRoutes from "./category.routes";
import OrderRoutes from "./order.routes";
import OrderDetailsRoutes from "./orderdetails.routes";
import ColorRoutes from "./color.routes";
import BannerRoutes from "./banner.routes";
import ContactUsRoutes from "./contactUs.routes";
import LtUserRoutes from "./lt_user.routes";
import PaymentRoutes from "./payment.routes";
import AddToCart from "./add-to-cart.routes";
import SmmiRoutes from "./SMMI.routes";
import Contactus_smmiRoutes from "./contactus_smmi.routes";
// Auth routes
router.use("/auth", AuthRoutes);

// User routes
router.use("/user", UserRoutes);

// Product routes
router.use("/products", ProductRoutes);

// Dashboard routes
router.use("/dashboard", DashboardRoutes);

// Category routes
router.use("/category", CategoryRoutes);

// Color routes
router.use("/color", ColorRoutes);

// Order routes
router.use("/laxmitara/order", OrderRoutes);

// Order routes
router.use("/laxmitara/orderDetails", OrderDetailsRoutes);

// Banner routes
router.use("/banner", BannerRoutes);

// Banner routes
router.use("/contactUs", ContactUsRoutes);

// Banner routes
router.use("/laxmitara/addtocart", AddToCart);

//Payment razor Pay
router.use("/payment", PaymentRoutes);

// LT USER Panel routes
router.use("/laxmitara", LtUserRoutes);

router.use("/smmi", SmmiRoutes);

router.use("/contact_smmi", Contactus_smmiRoutes);

router.use("/*", (req, res, next) => {
  next({
    status: 404,
    message: "The page you're trying to access is not found!",
  });
});

export default router;
