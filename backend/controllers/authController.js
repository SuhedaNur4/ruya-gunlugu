const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validasyon
        if (!email || !password || !name) {
            return res.status(400).json({ error: "İsim, email ve şifre zorunludur." });
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Geçersiz email formatı." });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Şifre en az 6 karakter olmalıdır." });
        }

        // Kullanıcı var mı kontrol et
        const existingUser = authService.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "Bu email ile kayıtlı bir kullanıcı zaten var." });
        }

        // Şifreyi hashle
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Kullanıcıyı kaydet
        const publicId = uuidv4();
        const userId = authService.createUser(publicId, name || 'Gizemli Rüya Sahibi', email, passwordHash);

        // JWT Token oluştur
        const token = jwt.sign(
            { userId, publicId, email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: "Kayıt başarılı.",
            token,
            user: { publicId, name, email }
        });
    } catch (error) {
        console.error("Kayıt Hatası:", error);
        res.status(500).json({ error: "Kayıt işlemi sırasında bir hata oluştu." });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email ve şifre zorunludur." });
        }

        // Kullanıcıyı bul
        const user = authService.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: "Geçersiz email veya şifre." });
        }

        // Şifreyi doğrula
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: "Geçersiz email veya şifre." });
        }

        // JWT Token oluştur
        const token = jwt.sign(
            { userId: user.id, publicId: user.public_id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Giriş başarılı.",
            token,
            user: { publicId: user.public_id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error("Giriş Hatası:", error);
        res.status(500).json({ error: "Giriş işlemi sırasında bir hata oluştu." });
    }
};

const getMe = (req, res) => {
    try {
        const user = authService.getUserById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: "Kullanıcı bulunamadı." });
        }
        
        // Sadece güvenli alanları dönüyoruz (id ve hash hariç)
        res.status(200).json({ 
            user: {
                publicId: user.public_id,
                name: user.name,
                email: user.email,
                created_at: user.created_at
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Profil bilgileri alınırken hata oluştu." });
    }
};

module.exports = {
    register,
    login,
    getMe
};
