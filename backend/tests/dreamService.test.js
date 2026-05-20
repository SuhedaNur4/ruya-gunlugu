const dreamService = require('../services/dreamService');
const db = require('../config/db');

describe('Dream Service - Unit Tests', () => {
    const TEST_USER_ID = 9999;
    const OTHER_USER_ID = 8888;
    let testPublicId = null;

    beforeAll(() => {
        // Test kullanıcısı oluştur (zaten varsa atla)
        try {
            db.exec(`INSERT INTO users (id, public_id, name, email, password_hash) VALUES (${TEST_USER_ID}, 'test-uuid-9999', 'Test Kullanıcı', 'test9999@example.com', 'testhash')`);
        } catch (e) { /* Zaten var */ }
    });

    afterAll(() => {
        // Test verilerini temizle
        db.exec(`DELETE FROM dreams WHERE user_id = ${TEST_USER_ID}`);
        db.exec(`DELETE FROM users WHERE id = ${TEST_USER_ID}`);
    });

    test('createDream: geçerli veriyle public_id döndürür', () => {
        const dream = dreamService.createDream(TEST_USER_ID, 'Test Rüyası', 'Test içeriği', 'Lucid');
        expect(dream).toBeDefined();
        expect(dream.public_id).toBeDefined();
        expect(typeof dream.public_id).toBe('string');
        expect(dream.title).toBe('Test Rüyası');
        expect(dream.category).toBe('Lucid');
        testPublicId = dream.public_id;
    });

    test('createDream: geçersiz kategori "Diğer" olarak normalize edilir', () => {
        const dream = dreamService.createDream(TEST_USER_ID, 'İkinci Rüya', 'İçerik', 'GecersizKategori');
        expect(dream.category).toBe('Diğer');
        // Temizlik için soft-delete yap
        dreamService.deleteDream(dream.public_id, TEST_USER_ID);
    });

    test('createDream: başlık boşsa hata fırlatır', () => {
        expect(() => {
            dreamService.createDream(TEST_USER_ID, '', 'İçerik', 'Lucid');
        }).toThrow();
    });

    test('getAllDreams: sadece ilgili userId\'nin is_deleted=0 rüyalarını döndürür', () => {
        const dreams = dreamService.getAllDreams(TEST_USER_ID);
        expect(Array.isArray(dreams)).toBe(true);
        expect(dreams.length).toBeGreaterThanOrEqual(1);
        // Başka kullanıcının rüyası olmamalı
        const otherUserDreams = dreamService.getAllDreams(OTHER_USER_ID);
        expect(otherUserDreams.length).toBe(0);
    });

    test('getDreamByPublicId: sahibi okuyabilir, başka kullanıcı okuyamaz', () => {
        const dream = dreamService.getDreamByPublicId(testPublicId, TEST_USER_ID);
        expect(dream).toBeDefined();
        expect(dream.title).toBe('Test Rüyası');

        const notFound = dreamService.getDreamByPublicId(testPublicId, OTHER_USER_ID);
        expect(notFound).toBeUndefined();
    });

    test('updateDream: sahibi güncelleyebilir', () => {
        const result = dreamService.updateDream(testPublicId, TEST_USER_ID, 'Güncel Başlık', 'Güncel içerik', 'Kabus');
        expect(result).toBe(true);

        const updated = dreamService.getDreamByPublicId(testPublicId, TEST_USER_ID);
        expect(updated.title).toBe('Güncel Başlık');
        expect(updated.category).toBe('Kabus');
    });

    test('updateDream: başka kullanıcı güncelleyemez (changes = 0)', () => {
        const result = dreamService.updateDream(testPublicId, OTHER_USER_ID, 'Hack', 'Hack içerik', 'Diğer');
        expect(result).toBe(false);
    });

    test('deleteDream: başka kullanıcı soft-delete yapamaz', () => {
        const result = dreamService.deleteDream(testPublicId, OTHER_USER_ID);
        expect(result).toBe(false);
    });

    test('deleteDream: sahibi soft-delete yapabilir', () => {
        const result = dreamService.deleteDream(testPublicId, TEST_USER_ID);
        expect(result).toBe(true);
    });

    test('deleteDream sonrası rüya getAllDreams listesinde görünmez', () => {
        const dreams = dreamService.getAllDreams(TEST_USER_ID);
        const found = dreams.find(d => d.public_id === testPublicId);
        expect(found).toBeUndefined();
    });

    test('deleteDream sonrası rüya DB\'de is_deleted=1 olarak duruyor', () => {
        const row = db.prepare('SELECT is_deleted, deleted_at FROM dreams WHERE public_id = ?').get(testPublicId);
        expect(row).toBeDefined();
        expect(row.is_deleted).toBe(1);
        expect(row.deleted_at).not.toBeNull();
    });

    test('normalizeCategory: bilinen kategori korunur', () => {
        expect(dreamService.normalizeCategory('Lucid')).toBe('Lucid');
        expect(dreamService.normalizeCategory('Kabus')).toBe('Kabus');
    });

    test('normalizeCategory: bilinmeyen kategori "Diğer" döner', () => {
        expect(dreamService.normalizeCategory('GecersizSey')).toBe('Diğer');
        expect(dreamService.normalizeCategory(undefined)).toBe('Diğer');
    });

    test('normalizeCategory: küçük harf girişi doğru formata dönüştürülür', () => {
        expect(dreamService.normalizeCategory('kabus')).toBe('Kabus');
        expect(dreamService.normalizeCategory('lucid')).toBe('Lucid');
        expect(dreamService.normalizeCategory('huzurlu')).toBe('Huzurlu');
    });

    test('normalizeCategory: büyük harf girişi doğru formata dönüştürülür', () => {
        expect(dreamService.normalizeCategory('KABUS')).toBe('Kabus');
        expect(dreamService.normalizeCategory('LUCID')).toBe('Lucid');
    });

    test('normalizeCategory: karışık harf girişi doğru formata dönüştürülür', () => {
        expect(dreamService.normalizeCategory('hUZURLU')).toBe('Huzurlu');
        expect(dreamService.normalizeCategory('KaBuS')).toBe('Kabus');
    });
});
