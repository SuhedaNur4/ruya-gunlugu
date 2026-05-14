const app = require('./app');

// Port numarasını .env'den al, yoksa 3000 yap
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(` Sunucu ${PORT} portunda çalışıyor...`);
    console.log(` Test için: http://localhost:${PORT}/api/dreams`);
});
