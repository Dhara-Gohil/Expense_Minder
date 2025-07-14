import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // ✅ Loads .env variables

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your mail provider
  auth: {
    user: process.env.EMAIL_USER,       // ✅ fetched from .env
    pass: process.env.EMAIL_PASS,       // ✅ fetched from .env
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Nodemailer config error:', error);
  } else {
    console.log('✅ Nodemailer is ready to send emails!');
  }
});

export default transporter;
