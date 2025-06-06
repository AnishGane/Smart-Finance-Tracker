import express from "express";
import { validateToken } from "../Middleware/auth.js";
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction
} from "../controllers/transactionController.js";

const router = express.Router();

// All routes are protected with authentication
router.use(validateToken);

// Transaction routes
router.get("/all", getTransactions);
router.post("/add", addTransaction);
router.put("/update/:id", updateTransaction);
router.delete("/delete/:id", deleteTransaction);

export default router; 