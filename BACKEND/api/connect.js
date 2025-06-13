const mongoose = require('mongoose');
require('dotenv').config();

console.log('⛳ MONGODB_URI:', process.env.MONGODB_URI); // Cek ini di logs Vercel

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    throw err; // pastikan error dilempar agar serverless function tidak lanjut
  }
};

module.exports = connectDB;
