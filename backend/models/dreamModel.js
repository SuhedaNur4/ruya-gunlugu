// Veritabanı sorguları ve CRUD işlemleri (Data Access Layer)
const db = require('../config/db');

function findAllByUser(userId) {
    return db.prepare(`
        SELECT public_id, title, content, category, date, created_at, updated_at
        FROM dreams
        WHERE user_id = ?
          AND is_deleted = 0
        ORDER BY created_at DESC
    `).all(userId);
}

function findByPublicIdAndUser(publicId, userId) {
    return db.prepare(`
        SELECT public_id, title, content, category, date, created_at, updated_at
        FROM dreams
        WHERE public_id = ?
          AND user_id = ?
          AND is_deleted = 0
    `).get(publicId, userId);
}

function create({ publicId, userId, title, content, category }) {
    db.prepare(`
        INSERT INTO dreams (
            public_id, user_id, title, content, category,
            date, is_deleted, deleted_at, created_at, updated_at
        )
        VALUES (
            ?, ?, ?, ?, ?,
            datetime('now'),
            0,
            NULL,
            datetime('now'),
            datetime('now')
        )
    `).run(publicId, userId, title, content, category);

    return findByPublicIdAndUser(publicId, userId);
}

function updateByPublicIdAndUser(publicId, userId, { title, content, category }) {
    return db.prepare(`
        UPDATE dreams
        SET title = ?,
            content = ?,
            category = ?,
            updated_at = datetime('now')
        WHERE public_id = ?
          AND user_id = ?
          AND is_deleted = 0
    `).run(title, content, category, publicId, userId);
}

function softDeleteByPublicIdAndUser(publicId, userId) {
    return db.prepare(`
        UPDATE dreams
        SET is_deleted = 1,
            deleted_at = datetime('now'),
            updated_at = datetime('now')
        WHERE public_id = ?
          AND user_id = ?
          AND is_deleted = 0
    `).run(publicId, userId);
}

module.exports = {
    findAllByUser,
    findByPublicIdAndUser,
    create,
    updateByPublicIdAndUser,
    softDeleteByPublicIdAndUser
};
