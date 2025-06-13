// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// require('./api/connect'); // connect to MongoDB
// const app = express();

// const authRoutes = require('./api/routes/auth');
// const checkRoutes = require('./api/routes/checks');

// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/checks', checkRoutes);

// // const PORT = process.env.PORT || 7000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// module.exports = app;
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
require('dotenv').config();

// === INITIALIZE EXPRESS APP ===
const app = express();

// === CORS CONFIG (IMPORTANT) ===
app.use(cors({
  origin: ['http://localhost:9000', 'https://randycenson.github.io/diateksi_capstone_project/'],
  credentials: true,
}));

app.use(express.json());

// === ROUTES ===
const authRoutes = require('./routes/auth');
const checkRoutes = require('./routes/checks');

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Vercel Serverless!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/checks', checkRoutes);

// === EXPORT HANDLER FOR VERCEL ===
module.exports = app;
module.exports.handler = serverless(app);