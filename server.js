const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Your BIN ID from your screenshot!
const BIN_ID = '69ee7d38aaba8821973e439a'; 
// Go to the "API KEYS" tab in your screenshot to find your Master Key
const MASTER_KEY = 'PASTE_YOUR_MASTER_KEY_HERE'; 

app.get('/api/status', async (req, res) => {
    try {
        const response = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: { 'X-Master-Key': MASTER_KEY }
        });
        res.json(response.data.record);
    } catch (err) {
        res.status(500).json({ error: "Data Offline" });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`LOA Portal is Live!`));
