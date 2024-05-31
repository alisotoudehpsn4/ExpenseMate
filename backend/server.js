const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../public')));

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Failed to connect to MongoDB:', err));

// Routes
app.use('/api/auth', require('./routes/auth')); // Auth routes
app.use('/api/expenses', require('./routes/expenses')); // Expenses routes
app.use('/api/budget', require('./routes/budget')); // Budget routes

// Serve the manifest.json file and other static assets
app.get('/manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'manifest.json'));
});

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'favicon.ico'));
});

app.get('/logo192.png', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'logo192.png'));
});

app.get('/logo512.png', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'logo512.png'));
});

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
