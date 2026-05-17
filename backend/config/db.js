const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '../../dreams.db');
const db = new Database(dbPath, { verbose: console.log });

// === KULLANICILAR (USERS) TABLOSU ===
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        public_id TEXT NOT NULL UNIQUE,
        name TEXT,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
    )
`);

// === RÜYALAR (DREAMS) TABLOSU ===
db.exec(`
    CREATE TABLE IF NOT EXISTS dreams (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        public_id TEXT UNIQUE,
        user_id INTEGER,
        title TEXT NOT NULL,
        content TEXT,
        category TEXT DEFAULT 'Diğer',
        date TEXT NOT NULL DEFAULT (date('now')),
        is_deleted INTEGER DEFAULT 0,
        deleted_at TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
`);

// Var olan 'dreams' tablosunu yeni sisteme uydurmak için sütun eklemeleri:
const alterQueries = [
    "ALTER TABLE dreams ADD COLUMN public_id TEXT UNIQUE",
    "ALTER TABLE dreams ADD COLUMN user_id INTEGER",
    "ALTER TABLE dreams ADD COLUMN deleted_at TEXT",
    "ALTER TABLE dreams ADD COLUMN created_at TEXT DEFAULT (datetime('now'))",
    "ALTER TABLE dreams ADD COLUMN updated_at TEXT"
];

alterQueries.forEach(query => {
    try { db.exec(query); } catch (e) { /* Sütun zaten varsa hata verir, atla */ }
});

module.exports = db;
