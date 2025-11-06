
// server.js - start server and connect to DB
require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;

async function start() {
    if (process.env.NODE_ENV !== 'test') {
        try {
            await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log('Connected to MongoDB');
        } catch (err) {
            console.error('Mongo connection error', err);
            process.exit(1);
        }
    }

    app.listen(PORT, () => console.log(Server running on port ${ PORT }));
}
start();

module.exports = app; // Export app for testing purposes