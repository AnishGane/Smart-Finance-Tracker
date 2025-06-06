import express from 'express';
import { getChartData } from '../controllers/chartController.js';
import {validateToken} from "../Middleware/auth.js"
const router = express.Router();

// Get chart data for authenticated user
router.get('/data', validateToken, getChartData);

export default router; 