const Database = require('better-sqlite3');
const path = require('path');

// Veritabanı dosyasının konumu: backend/dreams.db
const db = new Database(path.join(__dirname, '..', 'dreams.db'));

// dreams tablosunu oluştur (yoksa)
db.exec(`
    CREATE TABLE IF NOT EXISTS dreams (
        id      INTEGER PRIMARY KEY AUTOINCREMENT,
        title   TEXT    NOT NULL,
        content TEXT,
        date    TEXT    NOT NULL DEFAULT (date('now'))
    )
`);

module.exports = db;
