import express from "express";
import { signupFarmer, loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

// Signup (Farmer only)
router.post("/signup", signupFarmer);

// Login (All roles)
router.post("/login", loginUser);

export default router;
