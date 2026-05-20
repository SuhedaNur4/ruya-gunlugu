const { v4: uuidv4 } = require('uuid');
const dreamModel = require('../models/dreamModel');

const ALLOWED_CATEGORIES = ['Lucid', 'Kabus', 'Huzurlu', 'Garip', 'Nostaljik', 'Macera', 'Kozmik', 'Diğer'];

function normalizeCategory(category) {
    if (!category) return 'Diğer';
    const lower = category.toLowerCase();
    const match = ALLOWED_CATEGORIES.find(c => c.toLowerCase() === lower);
    return match || 'Diğer';
}

function validateDreamInput({ title, content }) {
    if (!title || !title.trim()) {
        const error = new Error('Başlık zorunludur.');
        error.statusCode = 400;
        throw error;
    }
    if (title.length > 120) {
        const error = new Error('Başlık en fazla 120 karakter olabilir.');
        error.statusCode = 400;
        throw error;
    }
    if (content && content.length > 5000) {
        const error = new Error('İçerik en fazla 5000 karakter olabilir.');
        error.statusCode = 400;
        throw error;
    }
}

function getAllDreams(userId) {
    return dreamModel.findAllByUser(userId);
}

function getDreamByPublicId(publicId, userId) {
    return dreamModel.findByPublicIdAndUser(publicId, userId);
}

function createDream(userId, title, content, category) {
    validateDreamInput({ title, content });
    const publicId = uuidv4();
    return dreamModel.create({
        publicId,
        userId,
        title: title.trim(),
        content: (content || '').trim(),
        category: normalizeCategory(category)
    });
}

function updateDream(publicId, userId, title, content, category) {
    validateDreamInput({ title, content });
    const result = dreamModel.updateByPublicIdAndUser(publicId, userId, {
        title: title.trim(),
        content: (content || '').trim(),
        category: normalizeCategory(category)
    });
    return result.changes > 0;
}

function deleteDream(publicId, userId) {
    const result = dreamModel.softDeleteByPublicIdAndUser(publicId, userId);
    return result.changes > 0;
}

module.exports = {
    getAllDreams,
    getDreamByPublicId,
    createDream,
    updateDream,
    deleteDream,
    validateDreamInput,
    normalizeCategory
};
