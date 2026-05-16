const db = require('../config/db');

const getAllDreams = () => {
    return db.prepare('SELECT * FROM dreams ORDER BY id DESC').all();
};

const getDreamById = (id) => {
    return db.prepare('SELECT * FROM dreams WHERE id = ?').get(id);
};

const createDream = (title, content) => {
    const info = db.prepare('INSERT INTO dreams (title, content) VALUES (?, ?)').run(title, content);
    return info.lastInsertRowid; // Yeni eklenen rüyanın id dönecek
};

const updateDream = (id, title, content) => {
    const info = db.prepare('UPDATE dreams SET title = ?, content = ? WHERE id = ?').run(title, content, id);
    return info.changes > 0; // Eğer güncellendiyse true, bulunamadıysa false döner
};

const deleteDream = (id) => {
    const info = db.prepare('DELETE FROM dreams WHERE id = ?').run(id);
    return info.changes > 0; // Eğer silindiyse true, bulunamadıysa false döner
};

module.exports = {
    getAllDreams,
    getDreamById,
    createDream,
    updateDream,
    deleteDream
};
