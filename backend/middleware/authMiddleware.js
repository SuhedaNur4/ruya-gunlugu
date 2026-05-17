const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

const authMiddleware = (req, res, next) => {
    // 1. Token'ı Authorization başlığından al
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Erişim reddedildi. Geçerli bir token bulunamadı." });
    }

    const token = authHeader.split(' ')[1];

    try {
        // 2. Token'ı doğrula
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Kullanıcının veritabanında var olduğunu doğrula
        const user = authService.getUserById(decoded.userId);
        if (!user) {
            return res.status(401).json({ error: "Geçersiz oturum. Lütfen tekrar giriş yap." });
        }
        
        // 4. Kullanıcı bilgilerini request nesnesine ekle
        req.user = decoded; // { userId, publicId, email, iat, exp }
        
        next(); // Bir sonraki middleware'e veya route'a geç
    } catch (error) {
        return res.status(401).json({ error: "Token geçersiz veya süresi dolmuş." });
    }
};

module.exports = authMiddleware;
