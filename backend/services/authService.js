const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');

// veritabanı yardımcı fonk

const getUserByEmail = (email) => {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
};

const getUserById = (id) => {
    return db.prepare('SELECT id, public_id, name, email, created_at FROM users WHERE id = ?').get(id);
};

const createUser = (publicId, name, email, passwordHash) => {
    const info = db
        .prepare('INSERT INTO users (public_id, name, email, password_hash) VALUES (?, ?, ?, ?)')
        .run(publicId, name, email, passwordHash);
    return info.lastInsertRowid;
};

// validasyon

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRegisterInput({ name, email, password }) {
    if (!name || !name.trim()) {
        const err = new Error('İsim zorunludur.');
        err.statusCode = 400;
        throw err;
    }
    if (!email || !EMAIL_REGEX.test(email)) {
        const err = new Error('Geçerli bir email adresi giriniz.');
        err.statusCode = 400;
        throw err;
    }
    if (!password || password.length < 6) {
        const err = new Error('Şifre en az 6 karakter olmalıdır.');
        err.statusCode = 400;
        throw err;
    }
}

// bussiness logic

async function registerUser({ name, email, password }) {
    validateRegisterInput({ name, email, password });

    const existing = getUserByEmail(email);
    if (existing) {
        const err = new Error('Bu email ile kayıtlı bir kullanıcı zaten var.');
        err.statusCode = 400;
        throw err;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const publicId = uuidv4();
    const userId = createUser(publicId, name.trim(), email.toLowerCase(), passwordHash);

    const token = jwt.sign(
        { userId, publicId, email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    return { token, user: { publicId, name: name.trim(), email } };
}

async function loginUser({ email, password }) {
    if (!email || !password) {
        const err = new Error('Email ve şifre zorunludur.');
        err.statusCode = 400;
        throw err;
    }

    const user = getUserByEmail(email);
    if (!user) {
        const err = new Error('Geçersiz email veya şifre.');
        err.statusCode = 401;
        throw err;
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        const err = new Error('Geçersiz email veya şifre.');
        err.statusCode = 401;
        throw err;
    }

    const token = jwt.sign(
        { userId: user.id, publicId: user.public_id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    return {
        token,
        user: { publicId: user.public_id, name: user.name, email: user.email }
    };
}

function getCurrentUser(userId) {
    return getUserById(userId);
}

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    // DB yardımcıları (test ve controller için)
    getUserByEmail,
    getUserById,
    createUser
};
