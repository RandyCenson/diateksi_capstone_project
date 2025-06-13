const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const connectDB = require('./connect');
const authRoutes = require('./routes/auth');
const checkRoutes = require('./routes/checks');

const app = express();

app.use(cors());
app.use(express.json());

// Middleware koneksi DB sebelum request dilayani
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Vercel Serverless!' });
});

app.use('/auth', authRoutes);
app.use('/checks', checkRoutes);

module.exports.handler = serverless(app);
