const express = require('express');
const router = express.Router();
const dreamController = require('../controllers/dreamController');
const authMiddleware = require('../middleware/authMiddleware');

// Tüm rüya işlemleri kullanıcı girişine (token) bağlıdır
router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Dreams
 *   description: Rüya CRUD işlemleri (JWT gerektirir)
 */

/**
 * @swagger
 * /dreams:
 *   get:
 *     summary: Giriş yapan kullanıcının tüm rüyalarını listele
 *     tags: [Dreams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rüya listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dream'
 *       401:
 *         description: Token geçersiz veya eksik
 */
router.get('/', dreamController.getAllDreams);

/**
 * @swagger
 * /dreams:
 *   post:
 *     summary: Yeni rüya ekle
 *     tags: [Dreams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 120
 *                 example: "Uçan şehir"
 *               content:
 *                 type: string
 *                 maxLength: 5000
 *                 example: "Rüyamda bulutların üzerinde bir şehir gördüm..."
 *               category:
 *                 type: string
 *                 enum: [Lucid, Kabus, Huzurlu, Garip, Nostaljik, Macera, Kozmik, Diğer]
 *                 example: "Lucid"
 *     responses:
 *       201:
 *         description: Rüya başarıyla eklendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 dream:
 *                   $ref: '#/components/schemas/Dream'
 *       400:
 *         description: Geçersiz giriş (başlık zorunlu, max 120 karakter)
 *       401:
 *         description: Token geçersiz veya eksik
 */
router.post('/', dreamController.createDream);

/**
 * @swagger
 * /dreams/{publicId}:
 *   get:
 *     summary: Belirli bir rüyanın detayını getir
 *     tags: [Dreams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: publicId
 *         required: true
 *         schema:
 *           type: string
 *         description: Rüyanın UUID public_id değeri
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Rüya detayı
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dream'
 *       404:
 *         description: Rüya bulunamadı veya başka kullanıcıya ait
 *       401:
 *         description: Token geçersiz veya eksik
 */
router.get('/:publicId', dreamController.getDreamByPublicId);

/**
 * @swagger
 * /dreams/{publicId}:
 *   put:
 *     summary: Rüyayı güncelle
 *     tags: [Dreams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: publicId
 *         required: true
 *         schema:
 *           type: string
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 120
 *                 example: "Güncellenmiş başlık"
 *               content:
 *                 type: string
 *                 maxLength: 5000
 *               category:
 *                 type: string
 *                 enum: [Lucid, Kabus, Huzurlu, Garip, Nostaljik, Macera, Kozmik, Diğer]
 *     responses:
 *       200:
 *         description: Rüya güncellendi
 *       404:
 *         description: Rüya bulunamadı veya yetkiniz yok
 *       401:
 *         description: Token geçersiz veya eksik
 */
router.put('/:publicId', dreamController.updateDream);

/**
 * @swagger
 * /dreams/{publicId}:
 *   delete:
 *     summary: Rüyayı arşivden kaldır (soft delete)
 *     description: >
 *       Rüyayı kalıcı olarak silmez. Veritabanında `is_deleted = 1` yaparak gizler.
 *       Sadece rüyanın sahibi bu işlemi yapabilir.
 *     tags: [Dreams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: publicId
 *         required: true
 *         schema:
 *           type: string
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Rüya arşivden kaldırıldı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rüya arşivden kaldırıldı."
 *       404:
 *         description: Rüya bulunamadı veya başka kullanıcıya ait
 *       401:
 *         description: Token geçersiz veya eksik
 */
router.delete('/:publicId', dreamController.deleteDream);

module.exports = router;
