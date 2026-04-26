const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Serve the Navy/Gold design from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Your Database Credentials
const BIN_ID = '69ee7d38aaba8821973e439a';
const MASTER_KEY = '$2a$10$bVJ7Cf6P4jpWaxsYRtHw..uqXOZRfvUOEt1DbzA61rHPoaWEeYZCK';

// This API checks if the student has paid
app.get('/api/status', async (req, res) => {
    try {
        const response = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: { 'X-Master-Key': MASTER_KEY }
        });
        
        // Sends the balance (e.g., 0) to your index.html
        res.json(response.data.record);
    } catch (err) {
        console.error("Database Error:", err.message);
        res.status(500).json({ error: "Portal data is currently offline." });
    }
});

// Main Route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`LOA Portal is live on port ${PORT}!`));

