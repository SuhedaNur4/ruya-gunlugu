const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware: Gelen isteklerdeki JSON verilerini okuyabilmek için
app.use(express.json());
// Middleware: Frontend'in farklı bir porttan (örn: 5500) istek atmasına izin vermek için
app.use(cors());

// Dummy Route - Sistem çalışıyor mu testi
app.get('/api/dreams', (req, res) => {
    res.status(200).json([
        { id: 1, title: "Test Rüya", description: "Backend çalışıyor!" }
    ]);
});

// app'i dışa aktarıyoruz ki server.js kullanabilsin
module.exports = app;
