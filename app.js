require('dotenv').config();
const express = require('express');
const allAPIRoutes = require('./routes/allApiRoutes');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', allAPIRoutes);
// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the Car Auction System!');
});

mongoose.connect(uri).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error starting server:', error);
    }
    console.log(`Server is running on port ${PORT}`);
});
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});



module.exports = app;