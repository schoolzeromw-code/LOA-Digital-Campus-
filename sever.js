const express = require('express');
const sql = require('mssql');
const path = require('path');
const app = express();

// Serve the HTML files from the /public folder
app.use(express.static(path.join(__dirname, 'public')));

// Database connection using your Render Environment Variables
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: { encrypt: true, trustServerCertificate: true }
};

// API to check student balance
app.get('/api/status', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .query("SELECT TOP 1 Balance FROM Students WHERE StudentID = 'LOA-2026-001'");
        res.json(result.recordset[0] || { Balance: 0 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "SQL Connection Error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`LOA Portal Live on Port ${PORT}`));
