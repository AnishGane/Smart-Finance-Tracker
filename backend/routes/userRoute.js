import express from "express";
import { validateToken } from "../Middleware/auth.js";
import {
  userRegister,
  loginUser,
  verifyToken
} from "../controllers/userController.js";

const router = express.Router();

// Public routes
router.post("/register", userRegister);
router.post("/login", loginUser);

// Protected routes
router.get("/verify-token", validateToken, verifyToken);

export default router;