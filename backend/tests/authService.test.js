// JWT_SECRET test ortamında zorunlu
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret_key_for_jest';

const authService = require('../services/authService');
const db = require('../config/db');

describe('Auth Service - Unit Tests', () => {
    const ts = Date.now();
    const TEST_EMAIL = `testauth_${ts}@example.com`;
    const TEST_NAME = 'Test Kullanıcı';
    const TEST_PASS = 'sifre123';

    afterAll(() => {
        // Test kullanıcılarını temizle
        db.prepare("DELETE FROM users WHERE email LIKE 'testauth\\_%@example.com' ESCAPE '\\'").run();
    });

    // 1. Geçerli kayıt
    test('registerUser: geçerli bilgilerle kayıt olur ve token döner', async () => {
        const result = await authService.registerUser({
            name: TEST_NAME,
            email: TEST_EMAIL,
            password: TEST_PASS
        });
        expect(result.token).toBeDefined();
        expect(typeof result.token).toBe('string');
        expect(result.user.email).toBe(TEST_EMAIL);
        expect(result.user.name).toBe(TEST_NAME);
    });

    // 2. Eksik name
    test('registerUser: eksik name hata verir', async () => {
        await expect(
            authService.registerUser({ name: '', email: 'a@b.com', password: 'sifre123' })
        ).rejects.toThrow('zorunludur');
    });

    // 2. Eksik email
    test('registerUser: eksik email hata verir', async () => {
        await expect(
            authService.registerUser({ name: 'Ad', email: '', password: 'sifre123' })
        ).rejects.toThrow();
    });

    // 2. Eksik password
    test('registerUser: eksik password hata verir', async () => {
        await expect(
            authService.registerUser({ name: 'Ad', email: 'pw@example.com', password: '' })
        ).rejects.toThrow();
    });

    // 3. Geçersiz email formatı
    test('registerUser: geçersiz email formatı hata verir', async () => {
        await expect(
            authService.registerUser({ name: 'Ad', email: 'gecersizemail', password: 'sifre123' })
        ).rejects.toThrow();
    });

    
    test('registerUser: 6 karakterden kısa şifre hata verir', async () => {
        await expect(
            authService.registerUser({ name: 'Ad', email: 'kisa@example.com', password: '123' })
        ).rejects.toThrow('6 karakter');
    });

  
    test('registerUser: aynı email ile ikinci kayıt engellenir', async () => {
        await expect(
            authService.registerUser({ name: TEST_NAME, email: TEST_EMAIL, password: TEST_PASS })
        ).rejects.toThrow('zaten var');
    });

    // Geçerli login
    test('loginUser: doğru email/şifre ile login token döner', async () => {
        const result = await authService.loginUser({
            email: TEST_EMAIL,
            password: TEST_PASS
        });
        expect(result.token).toBeDefined();
        expect(typeof result.token).toBe('string');
        expect(result.user.email).toBe(TEST_EMAIL);
    });

   
    test('loginUser: yanlış şifre ile login hata verir', async () => {
        await expect(
            authService.loginUser({ email: TEST_EMAIL, password: 'yanlisSifre' })
        ).rejects.toThrow();
    });

    // kullanıcı yoksa hata versin testi
    test('loginUser: olmayan kullanıcı ile login hata verir', async () => {
        await expect(
            authService.loginUser({ email: 'olmayan@example.com', password: 'sifre123' })
        ).rejects.toThrow();
    });
});
