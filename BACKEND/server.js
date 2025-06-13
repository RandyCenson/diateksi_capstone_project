const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./api'); // connect to MongoDB
const app = express();

const authRoutes = require('./api/routes/auth');
const checkRoutes = require('./api/routes/checks');

const cors = require('cors');

app.use(cors({
  origin: "https://randycenson.github.io/", // GitHub Pages domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
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