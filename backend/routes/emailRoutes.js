import express from 'express';
import { 
  sendContactEmail, 
  sendForgotPasswordEmail, 
  handlePasswordReset 
} from '../controllers/emailController.js';
import { validateContactForm, validatePasswordReset } from '../middleware/validation.js';

const router = express.Router();

// Contact form route with validation
router.post('/contact', validateContactForm, sendContactEmail);

// Forgot password route
router.post('/forgot-password', sendForgotPasswordEmail);

// Reset password route with validation
router.post('/reset-password', validatePasswordReset, handlePasswordReset);

export default router; 