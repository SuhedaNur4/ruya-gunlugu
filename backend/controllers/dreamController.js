const dreamService = require('../services/dreamService');

const getAllDreams = (req, res) => {
    try {
        const dreams = dreamService.getAllDreams();
        res.status(200).json(dreams);
    } catch (error) {
        res.status(500).json({ error: "Rüyalar listelenirken bir hata oluştu." });
    }
};

const getDreamById = (req, res) => {
    try {
        const dream = dreamService.getDreamById(req.params.id);
        if (!dream) {
            return res.status(404).json({ error: "Rüya bulunamadı." });
        }
        res.status(200).json(dream);
    } catch (error) {
        res.status(500).json({ error: "Rüya getirilirken bir hata oluştu." });
    }
};

const createDream = (req, res) => {
    try {
        const { title, content } = req.body;
        
        if (!title) {
            return res.status(400).json({ error: "Başlık (title) zorunludur." });
        }

        const newId = dreamService.createDream(title, content);
        
        res.status(201).json({ 
            id: newId, 
            title: title, 
            content: content,
            message: "Rüya başarıyla eklendi." 
        });
    } catch (error) {
        console.error("POST Hatası:", error);
        res.status(500).json({ error: error.message });
    }
};

const updateDream = (req, res) => {
    try {
        const { title, content } = req.body;
        
        if (!title) {
            return res.status(400).json({ error: "Başlık (title) zorunludur." });
        }

        const isUpdated = dreamService.updateDream(req.params.id, title, content);
        
        if (!isUpdated) {
            return res.status(404).json({ error: "Güncellenecek rüya bulunamadı." });
        }
        
        res.status(200).json({ message: "Rüya başarıyla güncellendi." });
    } catch (error) {
        res.status(500).json({ error: "Rüya güncellenirken bir hata oluştu." });
    }
};

const deleteDream = (req, res) => {
    try {
        const isDeleted = dreamService.deleteDream(req.params.id);
        
        if (!isDeleted) {
            return res.status(404).json({ error: "Silinecek rüya bulunamadı." });
        }
        
        res.status(200).json({ message: "Rüya başarıyla silindi." });
    } catch (error) {
        res.status(500).json({ error: "Rüya silinirken bir hata oluştu." });
    }
};

module.exports = {
    getAllDreams,
    getDreamById,
    createDream,
    updateDream,
    deleteDream
};
