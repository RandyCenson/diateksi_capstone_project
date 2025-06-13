const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const connectDB = require('./connect'); // karena connect.js ada di folder yg sama
const authRoutes = require('./routes/auth');
const checkRoutes = require('./routes/checks');

connectDB(); // Inisialisasi koneksi MongoDB

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Vercel Serverless!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/checks', checkRoutes);

module.exports.handler = serverless(app);
