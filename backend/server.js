const app = require('./app');

// Port numarasını .env'den al, yoksa 3000 yap
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🌌 Sinematik Rüya Arşivi API'si hazır.`);
    console.log(`✨ Sunucu http://localhost:${PORT} portunda çalışıyor.`);
    if (!process.env.JWT_SECRET) {
        console.warn("⚠️ UYARI: JWT_SECRET tanımlı değil! Lütfen .env dosyasında belirtin.");
    }
});
