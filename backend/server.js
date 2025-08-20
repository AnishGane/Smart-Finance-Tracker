import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import emailRoutes from "./routes/emailRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import userRouter from "./routes/userRoute.js";
import transactionRouter from "./routes/transactionRoute.js";
import chartRouter from "./routes/chartRoutes.js";
import connectDB from "./config/connectDB.js";
import { verifyTransporter } from "./config/emailConfig.js";

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Error handling middleware
app.use(errorHandler);

// Verify email configuration once at startup
verifyTransporter().catch(console.error);

// API Routes
app.use("/api/user", userRouter);
app.use("/api", emailRoutes);
app.use("/api/transactions", transactionRouter);
app.use("/api/chart", chartRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    emailConfigured: !!process.env.EMAIL_USER && !!process.env.EMAIL_PASS,
    timestamp: new Date().toISOString(),
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("=================================");
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📧 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Frontend URL: http://localhost:5173`);
  console.log("=================================");
});
