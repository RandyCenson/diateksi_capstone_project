
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

app.use(cors());
app.use(express.json());
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Vercel Serverless!' });
});
app.use('/api/auth', authRoutes);
app.use('/api/checks', checkRoutes);

// Jangan pakai app.listen(), ekspor sebagai handler

module.exports.handler = serverless(app);
module.exports = app;