const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 1. GET /api/dreams (Tüm rüyaları listele)
router.get('/', (req, res) => {
    try {
        // En son eklenen rüyayı en üstte göstermek için ORDER BY id DESC kullanıyoruz
        const dreams = db.prepare('SELECT * FROM dreams ORDER BY id DESC').all();
        res.status(200).json(dreams);
    } catch (error) {
        res.status(500).json({ error: "Rüyalar listelenirken bir hata oluştu." });
    }
});

// 2. GET /api/dreams/:id (Tek bir rüyayı getir)
router.get('/:id', (req, res) => {
    try {
        // ? işareti güvenli sorgu (SQL Injection'dan korur)
        const dream = db.prepare('SELECT * FROM dreams WHERE id = ?').get(req.params.id);

        if (!dream) {
            return res.status(404).json({ error: "Rüya bulunamadı." });
        }
        res.status(200).json(dream);
    } catch (error) {
        res.status(500).json({ error: "Rüya getirilirken bir hata oluştu." });
    }
});

// 3. POST /api/dreams (Yeni rüya ekle)
router.post('/', (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Başlık (title) zorunludur." });// baslık bossa hata 400 donuyoruz 
        }

        const info = db.prepare('INSERT INTO dreams (title, content) VALUES (?, ?)').run(title, content);

        // 201 Created (Başarıyla oluşturuldu)
        res.status(201).json({
            id: info.lastInsertRowid,
            title: title,
            content: content,
            message: "Rüya başarıyla eklendi."
        });
    } catch (error) {
        console.error("POST Hatası:", error);
        res.status(500).json({ error: error.message });
    }
});

// 4. PUT /api/dreams/:id (Rüyayı güncelle)
router.put('/:id', (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Başlık (title) zorunludur." });
        }

        const info = db.prepare('UPDATE dreams SET title = ?, content = ? WHERE id = ?').run(title, content, req.params.id);

        // changes: 0  o ID'ye ait bir satır bulunamadı demek
        if (info.changes === 0) {
            return res.status(404).json({ error: "Güncellenecek rüya bulunamadı." });
        }

        res.status(200).json({ message: "Rüya başarıyla güncellendi." });
    } catch (error) {
        res.status(500).json({ error: "Rüya güncellenirken bir hata oluştu." });
    }
});

// 5. DELETE /api/dreams/:id (Rüyayı sil)
router.delete('/:id', (req, res) => {
    try {
        const info = db.prepare('DELETE FROM dreams WHERE id = ?').run(req.params.id);

        if (info.changes === 0) {
            return res.status(404).json({ error: "Silinecek rüya bulunamadı." });
        }

        res.status(200).json({ message: "Rüya başarıyla silindi." });
    } catch (error) {
        res.status(500).json({ error: "Rüya silinirken bir hata oluştu." });
    }
});

module.exports = router;
