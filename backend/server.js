const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connection');
const transactionRoutes = require('./routes/transactionRoute');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/transactions', transactionRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
