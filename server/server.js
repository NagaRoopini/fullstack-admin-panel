const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static Folder
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Database Connection
const MONGO_URI = process.env.MONGO_URI;
const dbFallback = require('./utils/dbFallback');

// Database State
global.hasMongoDB = false;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log('MongoDB Connected');
        global.hasMongoDB = true;
    } catch (err) {
        console.log('MongoDB connection failed (Using Local JSON fallback)');
        console.error(err.message);
        global.hasMongoDB = false;
    }
};

connectDB();

// Routes
app.use('/api', apiRoutes);

// Fallback to index.html for SPA-like behavior (optional, mostly for React/Vue but good here too)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Admin Route
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
