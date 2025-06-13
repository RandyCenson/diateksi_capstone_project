const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const connectDB = require('../connect'); // Menggunakan koneksi MongoDB
const authRoutes = require('../routes/auth');
const checkRoutes = require('../routes/checks');

connectDB(); // Panggil koneksi

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Vercel Serverless!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/checks', checkRoutes);

// Untuk Vercel, hanya ekspor handler
module.exports.handler = serverless(app);
