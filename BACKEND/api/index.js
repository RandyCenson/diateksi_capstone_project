// const mongoose = require('mongoose');
// require('dotenv').config();

// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http'); // WAJIB untuk Vercel Express
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
const app = express();

const authRoutes = require('./routes/auth');
const checkRoutes = require('./routes/checks');

app.use(cors());
app.use(express.json());
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Vercel Serverless update err msg!' });
});
app.use('/api/auth', authRoutes);
app.use('/api/checks', checkRoutes);

module.exports = serverless(app);

