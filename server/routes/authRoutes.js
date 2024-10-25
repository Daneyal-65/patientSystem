import express from "express";

import {
  createUserProfile,
  getUserProfile,
  loginUser,
  registerUser,
} from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get user profile (protected route)
router.get("/profile", protect, getUserProfile);
router.post("/profile", protect, createUserProfile);

export default router;
