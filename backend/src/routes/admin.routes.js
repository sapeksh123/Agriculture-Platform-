// import express from "express";
// import {
//   createOwner,
//   createShopkeeper,
//   getAllOwners,
//   getAllShopkeepers,
//   getShopkeeperById,
//   getOwnerById,
//   toggleOwnerStatus,
//   toggleShopkeeperStatus
// } from "../controllers/adminController.js";
// import { protect } from "../middlewares/auth.middleware.js";
// import { isAdmin } from "../middlewares/role.middleware.js";

// const router = express.Router();

// // Owner routes
// router.post("/owner", protect, isAdmin, createOwner);
// router.get("/owner", protect, isAdmin, getAllOwners);
// router.get("/owner/:id", protect, isAdmin, getOwnerById);
// router.patch("/owner/:id/toggle-status", protect, isAdmin, toggleOwnerStatus);

// // Shopkeeper routes
// router.post("/shopkeeper", protect, isAdmin, createShopkeeper);
// router.get("/shopkeeper", protect, isAdmin, getAllShopkeepers);
// router.get("/shopkeeper/:id", protect, isAdmin, getShopkeeperById);
// router.patch("/shopkeeper/:id/toggle-status", protect, isAdmin, toggleShopkeeperStatus);

// export default router;

import express from "express";
import {
  createOwner,
  createShopkeeper,
  getAllOwners,
  getAllShopkeepers,
  getShopkeeperById,
  getOwnerById,
  toggleOwnerStatus,
  toggleShopkeeperStatus,
  updateOwner,
  updateShopkeeper
} from "../controllers/adminController.js";

import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// OWNER ROUTES

router.post(
  "/owner",
  protect,
  isAdmin,
  upload.fields([
    { name: "ownerImage", maxCount: 1 },
    { name: "shopImage", maxCount: 1 },
  ]),
  createOwner
);

router.get("/owner", protect, isAdmin, getAllOwners);
router.get("/owner/:id", protect, isAdmin, getOwnerById);
router.patch("/owner/:id/toggle-status", protect, isAdmin, toggleOwnerStatus);
router.put(
  "/owner/:id",
  protect,
  isAdmin,
  upload.fields([
    { name: "ownerImage", maxCount: 1 },
    { name: "shopImage", maxCount: 1 },
  ]),
  updateOwner
);

// SHOPKEEPER ROUTES

router.post(
  "/shopkeeper",
  protect,
  isAdmin,
  upload.fields([
    { name: "ownerImage", maxCount: 1 },
    { name: "shopImage", maxCount: 1 },
  ]),
  createShopkeeper
);

router.get("/shopkeeper", protect, isAdmin, getAllShopkeepers);
router.get("/shopkeeper/:id", protect, isAdmin, getShopkeeperById);
router.patch(
  "/shopkeeper/:id/toggle-status",
  protect,
  isAdmin,
  toggleShopkeeperStatus
);

router.put(
  "/shopkeeper/:id",
  protect,
  isAdmin,
  upload.fields([
    { name: "ownerImage", maxCount: 1 },
    { name: "shopImage", maxCount: 1 },
  ]),
  updateShopkeeper
);

export default router;
