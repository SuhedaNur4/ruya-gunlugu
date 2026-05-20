const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await authService.registerUser({ name, email, password });
        res.status(201).json({ message: 'Kayıt başarılı.', ...result });
    } catch (error) {
        console.error('Kayıt Hatası:', error);
        res.status(error.statusCode || 500).json({
            error: error.message || 'Kayıt işlemi sırasında bir hata oluştu.'
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.loginUser({ email, password });
        res.status(200).json({ message: 'Giriş başarılı.', ...result });
    } catch (error) {
        console.error('Giriş Hatası:', error);
        res.status(error.statusCode || 500).json({
            error: error.message || 'Giriş işlemi sırasında bir hata oluştu.'
        });
    }
};

const getMe = (req, res) => {
    try {
        const user = authService.getCurrentUser(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
        }
        res.status(200).json({
            user: {
                publicId: user.public_id,
                name: user.name,
                email: user.email,
                created_at: user.created_at
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Profil bilgileri alınırken hata oluştu.' });
    }
};

module.exports = { register, login, getMe };
