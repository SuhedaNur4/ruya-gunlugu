const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware: Gelen isteklerdeki JSON verilerini okuyabilmek için
app.use(express.json());
// Middleware: Frontend'in farklı bir porttan (örn: 5500) istek atmasına izin vermek için
app.use(cors());

// Rotaları içe aktar
const dreamRoutes = require('./routes/dreamRoutes');

// API yollarını bağla
app.use('/api/dreams', dreamRoutes);

// app'i dışa aktarıyoruz ki server.js kullanabilsin
module.exports = app;
