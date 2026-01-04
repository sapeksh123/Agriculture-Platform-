import express from "express";
import {
  CreateProductCategory,
  GetAllProductCategories,
  GetProductCategoryById,
  UpdateProductCategory,
  ToggleProductCategoryStatus,
} from "../controllers/productCategoryController.js";

import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", protect, isAdmin, CreateProductCategory);
router.get("/", protect, isAdmin, GetAllProductCategories);
router.get("/:id", protect, isAdmin, GetProductCategoryById);
router.put("/:id", protect, isAdmin, UpdateProductCategory);
router.patch("/:id/toggle", protect, isAdmin, ToggleProductCategoryStatus);

export default router;
