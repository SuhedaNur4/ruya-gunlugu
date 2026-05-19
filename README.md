# Rüya Günlüğü

Vanilla JavaScript SPA + Node.js/Express + SQLite kullanan, kullanıcı bazlı rüya CRUD uygulaması.  

Sistem Analizi ve Tasarımı dersi kapsamında geliştirilmiştir.

---

## Kullanılan Teknolojiler

| Katman | Teknoloji |
|---|---|
| Frontend | HTML, CSS, Vanilla JavaScript |
| SPA Yapısı | JavaScript ile dinamik view yönetimi |
| Backend | Node.js, Express.js |
| Veritabanı | SQLite, better-sqlite3 |
| Kimlik Doğrulama | bcryptjs, JSON Web Token |
| Güvenlik | JWT Bearer, Helmet, CORS, Rate Limit |
| API Dokümantasyonu | Swagger UI, swagger-jsdoc |
| Test | Jest |
| ID Sistemi | UUID public_id |

---

## Proje Yapısı

```text
ruya-gunlugu/
├── backend/
│   ├── config/
│   │   └── db.js                  # SQLite bağlantısı ve tablo oluşturma
│   │
│   ├── controllers/
│   │   ├── authController.js      # Auth request/response yönetimi
│   │   └── dreamController.js     # Dream request/response yönetimi
│   │
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT doğrulama ve kullanıcı kontrolü
│   │
│   ├── models/
│   │   └── dreamModel.js          # Veritabanı sorguları / Data Access Layer
│   │
│   ├── routes/
│   │   ├── authRoutes.js          # Auth endpointleri
│   │   └── dreamRoutes.js         # Dream endpointleri + Swagger JSDoc
│   │
│   ├── services/
│   │   ├── authService.js         # Auth iş mantığı
│   │   └── dreamService.js        # Dream iş mantığı ve validasyon
│   │
│   ├── tests/
│   │   └── dreamService.test.js   # Jest unit testleri
│   │
│   ├── app.js                     # Express app yapılandırması
│   ├── server.js                  # Sunucu başlatma
│   ├── swagger.js                 # Swagger ayarları
│   └── package.json
│
├── frontend/
│   ├── index.html                 # Tek sayfa SPA yapısı
│   ├── style.css                  # Arayüz stilleri
│   └── app.js                     # SPA akışı, fetch istekleri, DOM işlemleri
│
├── .gitignore
└── README.md

---

## Kurulum

```bash
git clone <repo-url>
cd ruya-gunlugu/backend
npm install
```

---

## Ortam Değişkenleri (.env)

`backend/` klasörüne `.env` adında bir dosya oluşturun ve şu içeriği yapıştırın:

```
PORT=3000
JWT_SECRET=replace_this_with_a_long_random_secret_key
CLIENT_ORIGIN=http://127.0.0.1:5500
NODE_ENV=development
```

> ⚠️  `JWT_SECRET` için rastgele ve uzun bir değer kullanın

---

## Backend Çalıştırma

```bash
cd backend

# Geliştirme (otomatik yeniden başlatma):
npm run dev

# Üretim:
npm start
```

Sunucu `http://localhost:3000` adresinde başlar.

---

## Frontend Çalıştırma

`frontend/index.html` dosyasını VS Code **Live Server** ile açın.  
Varsayılan origin: `http://127.0.0.1:5500`

Herhangi bir derleme adımı (Webpack, Vite vb.) gerekmez.

---

## Swagger API Dokümantasyonu

Backend çalışırken:

```
http://localhost:3000/api-docs
```

Tüm endpoint'ler Swagger UI üzerinden test edilebilir. "Authorize" butonuna JWT token'ı girin.

---

## Unit Testler

```bash
cd backend
npm test
```

---

## API Endpoints

### Auth

| Metot | Endpoint | Açıklama | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Yeni kullanıcı kaydı | Hayır |
| POST | `/api/auth/login` | Giriş, JWT token döner | Hayır |
| GET | `/api/auth/me` | Giriş yapan kullanıcı bilgileri | JWT |

### Dreams

| Metot | Endpoint | Açıklama | Auth |
|---|---|---|---|
| GET | `/api/dreams` | Kullanıcının tüm rüyalarını listele | JWT |
| POST | `/api/dreams` | Yeni rüya ekle | JWT |
| GET | `/api/dreams/:publicId` | Belirli rüyanın detayı | JWT |
| PUT | `/api/dreams/:publicId` | Rüyayı güncelle | JWT |
| DELETE | `/api/dreams/:publicId` | Rüyayı arşivden kaldır (soft delete) | JWT |

**Request örneği (POST /api/dreams):**
```json
{
  "title": "Uçan şehir",
  "content": "Bulutların üzerinde yürüdüm...",
  "category": "Lucid"
}
```

Geçerli kategoriler: `Lucid`, `Kabus`, `Huzurlu`, `Garip`, `Nostaljik`, `Macera`, `Kozmik`, `Diğer`

---

## Güvenlik

- **Şifre Hashleme:** Kullanıcı şifreleri `bcryptjs` ile hashlenerek saklanır. Düz metin şifre veritabanında tutulmaz.
- **JWT:** Oturum tokeni `Authorization: Bearer <token>` başlığıyla her istekte gönderilir. `jwt.verify` ile doğrulanır; süresi dolmuş veya bozuk token 401 döner.
- **Kullanıcı İzolasyonu:** Tüm rüya sorguları `WHERE user_id = ?` filtresi içerir. A kullanıcısı, B kullanıcısının rüyasını göremez, güncelleyemez veya silemez.
- **public_id (UUID):** API'de tahmin edilebilir sıralı numeric id (`/api/dreams/1`) kullanılmaz. Her rüyanın UUID formatında `public_id`'si vardır.
- **Soft Delete:** `DELETE` endpoint'i rüyayı veritabanından silmez; `is_deleted = 1` yaparak gizler. `GET` sorguları yalnızca `is_deleted = 0` kayıtları döner.
- **DB Varlık Kontrolü:** Token geçerli imzalı olsa bile, veritabanında artık karşılığı olmayan kullanıcılar için 401 döner (500 değil).
