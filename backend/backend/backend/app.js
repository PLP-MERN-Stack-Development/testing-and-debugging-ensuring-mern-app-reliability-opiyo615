
// app.js - Express app (exported for testing)
const express = require('express');
const cors = require('cors');
const bugsRouter = require('./routes/bugs');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/bugs', bugsRouter);

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error('Error middleware caught:', err);
    res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

module.exports = app;

