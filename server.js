const express = require('express');
const path = require('path');
const app = express();

// This tells the server to look in the "public" folder for your website face
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Port for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`LOA Campus is Live on port ${PORT}`));

