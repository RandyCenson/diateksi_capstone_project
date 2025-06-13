const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();
require('./connect'); // koneksi MongoDB

const authRoutes = require('./routes/auth');
const checkRoutes = require('./routes/checks');

const app = express();

// Logging untuk debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Konfigurasi CORS
const corsOptions = {
  origin: [
    'http://localhost:9000',
    'https://diateksi-capstone-project.vercel.app',
    process.env.ALLOWED_ORIGIN,
  ].filter(Boolean),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Parsing JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/checks', checkRoutes);

// Error handling (opsional, untuk debugging)
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Untuk Vercel Serverless
module.exports = app;
module.exports.handler = serverless(app);