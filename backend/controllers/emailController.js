import crypto from 'crypto';
import { transporter } from '../config/emailConfig.js';

// Store reset tokens (in production, use a database)
const resetTokens = new Map();

// Email service functions
const emailService = {
  async sendEmail(mailOptions) {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },

  generateResetToken() {
    return crypto.randomBytes(32).toString('hex');
  },

  storeResetToken(token, email) {
    resetTokens.set(token, {
      email,
      expires: Date.now() + 3600000 // Token expires in 1 hour
    });
  },

  validateResetToken(token) {
    const tokenData = resetTokens.get(token);
    if (!tokenData || tokenData.expires < Date.now()) {
      return null;
    }
    return tokenData;
  },

  removeResetToken(token) {
    resetTokens.delete(token);
  }
};

// Contact form email handler
export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `Contact Form: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    await emailService.sendEmail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error in sendContactEmail:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
};

// Forgot password email handler
export const sendForgotPasswordEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const token = emailService.generateResetToken();
    emailService.storeResetToken(token, email);

    const resetLink = `http://localhost:5173/reset-password/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h3>Password Reset Request</h3>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <p><a href="${resetLink}">Reset Password</a></p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    await emailService.sendEmail(mailOptions);
    res.status(200).json({ message: 'Password reset instructions sent to your email' });
  } catch (error) {
    console.error('Error in sendForgotPasswordEmail:', error);
    res.status(500).json({ 
      error: 'Failed to send reset instructions',
      details: error.message 
    });
  }
};

// Reset password handler
export const handlePasswordReset = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const tokenData = emailService.validateResetToken(token);

    if (!tokenData) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // TODO: Update password in your database
    emailService.removeResetToken(token);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: tokenData.email,
      subject: 'Password Reset Successful',
      html: `
        <h3>Password Reset Successful</h3>
        <p>Your password has been successfully reset.</p>
        <p>If you didn't make this change, please contact support immediately.</p>
      `
    };

    await emailService.sendEmail(mailOptions);
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error in handlePasswordReset:', error);
    res.status(500).json({ 
      error: 'Failed to reset password',
      details: error.message 
    });
  }
}; 