// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Import routes
const characterRoutes = require('./routes/characterRoutes');
const journalRoutes = require('./routes/journalRoutes');

// Connect to database
connectDB();

const app = express();

app.use((req, res, next) => {
    // Explicitly set security headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    next();
});


// Update CORS configuration with specific options
app.use(cors({
    origin: '*', // During development, we can accept all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
}));

app.use(express.json());

// Add these debugging middlewares
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    next();
});

// Use routes
app.use('/api/character', characterRoutes);
app.use('/api/journal', journalRoutes);

// Basic test route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to LifeTracker API!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});