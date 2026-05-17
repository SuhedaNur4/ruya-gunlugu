const db = require('../config/db');

const getUserByEmail = (email) => {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
};

const createUser = (publicId, name, email, passwordHash) => {
    const info = db.prepare('INSERT INTO users (public_id, name, email, password_hash) VALUES (?, ?, ?, ?)').run(publicId, name, email, passwordHash);
    return info.lastInsertRowid;
};

const getUserById = (id) => {
    return db.prepare('SELECT id, public_id, name, email, created_at FROM users WHERE id = ?').get(id);
};

module.exports = {
    getUserByEmail,
    createUser,
    getUserById
};
