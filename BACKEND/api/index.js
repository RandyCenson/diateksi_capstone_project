const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();
require('./connect'); // koneksi MongoDB, buat file connect.js

const authRoutes = require('./routes/auth');
const checkRoutes = require('./routes/checks');

const app = express();

// CORS Setup
const corsOptions = {
  origin: ['http://localhost:9000', 'https://diateksi-capstone-project.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/checks', checkRoutes);

// Export ke Vercel (tanpa app.listen)
module.exports = app;
module.exports.handler = serverless(app);
