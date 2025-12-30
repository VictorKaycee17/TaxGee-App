require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'TaxPadi Tax Engine API is running.' });
});

// Import Engine Routes
const taxRoutes = require('./src/routes/taxEngine');
app.use('/api/tax-engine', taxRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
