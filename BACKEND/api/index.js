const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const connectDB = require('./connect');
const authRoutes = require('./routes/auth');
const checkRoutes = require('./routes/checks');

const app = express();

// Log semua request masuk
app.use((req, res, next) => {
  console.log('Incoming request from:', req.headers.origin || 'unknown origin');
  next();
});

// Koneksi MongoDB (lazy connect, hanya connect saat pertama)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('❌ DB Connect Middleware Error:', err.message);
    res.status(500).json({ message: 'Failed to connect to DB' });
  }
});

// Konfigurasi CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://diateksi-capstone-project.vercel.app',
  'https://randycenson.github.io'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS not allowed from this origin'), false);
  }
}));

app.use(express.json());

// Route test
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Vercel Serverless!' });
});

// Routes utama
app.use('/api/auth', authRoutes);
app.use('/api/checks', checkRoutes);

// Export handler
module.exports.handler = serverless(app);
module.exports = app;
