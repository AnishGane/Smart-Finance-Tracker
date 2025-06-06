import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Validate environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
  console.error('Missing required environment variables:');
  console.error('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Missing');
  console.error('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Missing');
  console.error('EMAIL_TO:', process.env.EMAIL_TO ? 'Set' : 'Missing');
  process.exit(1);
}

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify transporter connection only once
let isVerified = false;
const verifyTransporter = async () => {
  if (isVerified) return;
  
  try {
    await transporter.verify();
    console.log('Server is ready to send emails');
    console.log('Email configuration:', {
      user: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO
    });
    isVerified = true;
  } catch (error) {
    console.error('Transporter error:', error);
    console.error('Please check your Gmail credentials and make sure:');
    console.error('1. Your Gmail account has "Less secure app access" enabled');
    console.error('2. Your EMAIL_USER and EMAIL_PASS in .env are correct');
    console.error('3. You are using your regular Gmail password');
    process.exit(1);
  }
};

// Export both the transporter and verification function
export { transporter, verifyTransporter }; 