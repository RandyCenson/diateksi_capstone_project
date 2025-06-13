const connectDB = require('./connect');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http'); // WAJIB untuk Vercel Express
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
const app = express();

const authRoutes = require('./routes/auth');
const checkRoutes = require('./routes/checks');



app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('❌ DB Connect Middleware Error:', err.message);
    res.status(500).json({ message: 'Failed to connect to DB' });
  }
});

const cors = require('cors');

const allowedOrigins = [
  'http://localhost:3000',
  'https://diateksi-capstone-project.vercel.app'
];

app.use(cors({
  origin: allowedOrigins
}));

app.use(express.json());
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Vercel Serverless!' });
});
app.use('/api/auth', authRoutes);
app.use('/api/checks', checkRoutes);

// Jangan pakai app.listen(), ekspor sebagai handler

module.exports.handler = serverless(app);
module.exports = app;