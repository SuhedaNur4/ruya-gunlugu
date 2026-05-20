require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/authRoutes');
const dreamRoutes = require('./routes/dreamRoutes');
const { swaggerUi, specs } = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Swagger Dokümantasyonu
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 1. Güvenlik Başlıkları (Helmet)
app.use(helmet());

// 2. CORS (Cross-Origin Resource Sharing)
const allowedOrigins = [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://localhost:3000',   // Swagger UI
    process.env.CLIENT_ORIGIN
].filter(Boolean);

app.use(cors({
    origin: function(origin, callback) {
        // curl, Postman veya same-origin isteklerinde origin gelmeyebilir
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('CORS policy violation'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Body parser
app.use(express.json());

// 3. Rate Limiting (Kaba kuvvet / Brute-force koruması)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 10, // 15 dakikada en fazla 10 istek
    message: { error: "Çok fazla istek gönderildi, lütfen daha sonra tekrar deneyin." }
});

// Rotalar
app.use('/api/auth', authLimiter, authRoutes); // Auth için limit uygulanır
app.use('/api/dreams', dreamRoutes);

// Test Endpoint'i
app.get('/', (req, res) => {
    res.json({ message: "Rüya Günlüğü API Çalışıyor 🌌" });
});

module.exports = app;
