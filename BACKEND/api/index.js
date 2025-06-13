const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const connectDB = require('./connect');
const authRoutes = require('./routes/auth');
const checkRoutes = require('./routes/checks');

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://diateksi-capstone-project.vercel.app',
  'https://randycenson.github.io',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'), false);
  }
}));

app.use(express.json());

// connectDB hanya dipanggil sekali via middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: 'DB Connection Failed' });
  }
});

app.get('/api', (req, res) => {
  res.json({ message: 'API up and running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/checks', checkRoutes);

module.exports.handler = serverless(app);
