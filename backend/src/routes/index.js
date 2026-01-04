import express from "express";
import authRoutes from "./auth.routes.js";
import adminRoutes from "./admin.routes.js";
import productCategoryRoutes from "./productCategoryRoute.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/product-category", productCategoryRoutes);

export default router;