const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();
require('./connect'); // koneksi MongoDB

const authRoutes = require('./routes/auth');
const checkRoutes = require('./routes/checks');

const app = express();

// Konfigurasi CORS agar bisa diakses dari frontend
const corsOptions = {
  origin: [
    'http://localhost:9000',                      // saat development
    'https://diateksi-capstone-project.vercel.app' // domain Vercel frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // preflight CORS

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/checks', checkRoutes);

// Untuk Vercel Serverless: export handler
module.exports = app;
module.exports.handler = serverless(app);
