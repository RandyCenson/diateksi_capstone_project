const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./api'); // connect to MongoDB
const app = express();

const authRoutes = require('./api/routes/auth');
const checkRoutes = require('./api/routes/checks');
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:3000', // Development
  'https://diateksi-capstone-project.vercel.app', // Vercel API
  'https://randycenson.github.io' // GitHub Pages frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser tools
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS not allowed from this origin'), false);
  }
}));


app.use(express.json());
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Vercel Serverless!' });
});
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/checks', checkRoutes);

// const PORT = process.env.PORT || 7000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;