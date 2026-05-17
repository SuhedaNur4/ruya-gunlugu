const dreamService = require('../services/dreamService');

const getAllDreams = (req, res) => {
    try {
        const dreams = dreamService.getAllDreams(req.user.userId);
        res.status(200).json(dreams);
    } catch (error) {
        res.status(500).json({ error: 'Rüyalar listelenirken bir hata oluştu.' });
    }
};

const getDreamByPublicId = (req, res) => {
    try {
        const dream = dreamService.getDreamByPublicId(req.params.publicId, req.user.userId);
        if (!dream) {
            return res.status(404).json({ error: 'Rüya bulunamadı.' });
        }
        res.status(200).json(dream);
    } catch (error) {
        res.status(500).json({ error: 'Rüya getirilirken bir hata oluştu.' });
    }
};

const createDream = (req, res) => {
    try {
        const { title, content, category } = req.body;
        const dream = dreamService.createDream(req.user.userId, title, content, category);
        res.status(201).json({
            message: 'Rüya başarıyla eklendi.',
            dream
        });
    } catch (error) {
        console.error('POST /dreams Hatası:', error.message);
        const status = error.statusCode || 500;
        const msg = status < 500 ? error.message : 'Rüya kaydedilirken bir hata oluştu.';
        res.status(status).json({ error: msg });
    }
};

const updateDream = (req, res) => {
    try {
        const { title, content, category } = req.body;
        const isUpdated = dreamService.updateDream(req.params.publicId, req.user.userId, title, content, category);
        if (!isUpdated) {
            return res.status(404).json({ error: 'Güncellenecek rüya bulunamadı veya yetkiniz yok.' });
        }
        res.status(200).json({ message: 'Rüya başarıyla güncellendi.' });
    } catch (error) {
        console.error('PUT /dreams Hatası:', error.message);
        const status = error.statusCode || 500;
        const msg = status < 500 ? error.message : 'Rüya güncellenirken bir hata oluştu.';
        res.status(status).json({ error: msg });
    }
};

const deleteDream = (req, res) => {
    try {
        const isDeleted = dreamService.deleteDream(req.params.publicId, req.user.userId);
        if (!isDeleted) {
            return res.status(404).json({ error: 'Silinecek rüya bulunamadı veya yetkiniz yok.' });
        }
        res.status(200).json({ message: 'Rüya arşivden kaldırıldı.' });
    } catch (error) {
        res.status(500).json({ error: 'Rüya silinirken bir hata oluştu.' });
    }
};

module.exports = {
    getAllDreams,
    getDreamByPublicId,
    createDream,
    updateDream,
    deleteDream
};
