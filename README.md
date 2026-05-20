# Rüya Günlüğü

Vanilla JavaScript SPA + Node.js/Express + SQLite kullanan, kullanıcı bazlı rüya CRUD uygulaması.

Sistem Analizi ve Tasarımı dersi kapsamında geliştirilmiştir.

---

## Proje Özeti

| Başlık | Bilgi |
|---|---|
| Proje türü | Kullanıcı bazlı rüya günlüğü uygulaması |
| Ana varlık | Rüya |
| CRUD kapsamı | Rüya ekleme, listeleme, detay görüntüleme, güncelleme ve silme |
| Endpoint sayısı | 8 |
| Unit test sayısı | 26 |
| Mimari | Route → Controller → Service → Model |
| Authentication | JWT Bearer Token |
| Frontend | Vanilla JavaScript SPA |
| Veritabanı | SQLite |
| API Dokümantasyonu | Swagger UI |

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

## Mimari Yapı

Proje, iş mantığını route ve controller dosyalarından ayıracak şekilde katmanlı olarak tasarlanmıştır.

```text
HTTP Request
     ↓
Route
     ↓
Controller
     ↓
Service
     ↓
Model / Database
```

- **Route:** URL eşleştirme ve middleware bağlantılarını yapar.
- **Controller:** HTTP isteğini alır, ilgili service fonksiyonunu çağırır ve response döner.
- **Service:** Validasyon, iş kuralları, auth işlemleri ve CRUD mantığı burada yer alır.
- **Model / Database:** SQLite sorguları ve veri erişim işlemlerinden sorumludur.

Bu yapı sayesinde iş mantığı daha kolay test edilebilir ve kod parçaları birbirinden bağımsız şekilde geliştirilebilir.

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
│   │   ├── authService.js         # Auth iş mantığı, validasyon, bcrypt ve JWT işlemleri
│   │   └── dreamService.js        # Dream iş mantığı ve validasyon
│   │
│   ├── tests/
│   │   ├── dreamService.test.js   # Rüya iş mantığı unit testleri
│   │   └── authService.test.js    # Auth iş mantığı unit testleri
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
```

---

## Kurulum

```bash
git clone <repo-url>
cd ruya-gunlugu/backend
npm install
```

---

## Hızlı Başlangıç

```bash
# 1. Bağımlılıkları yükle
cd backend
npm install

# 2. .env dosyasını oluştur (bkz. Ortam Değişkenleri)

# 3. Testleri çalıştır
npm test

# 4. Sunucuyu başlat
npm start

# 5. Swagger dokümantasyonuna git
# http://localhost:3000/api-docs
```

---

## Ortam Değişkenleri (.env)

`backend/` klasörüne `.env` adında bir dosya oluşturun ve şu içeriği yapıştırın:

```env
PORT=3000
JWT_SECRET=replace_this_with_a_long_random_secret_key
CLIENT_ORIGIN=http://127.0.0.1:5500
NODE_ENV=development
```

> `JWT_SECRET` için rastgele ve uzun bir değer kullanın.

---

## Backend Çalıştırma

```bash
cd backend

# Geliştirme modu:
npm run dev

# Normal başlatma:
npm start
```

Sunucu varsayılan olarak şu adreste başlar:

```text
http://localhost:3000
```

---

## Frontend Çalıştırma

`frontend/index.html` dosyasını VS Code **Live Server** ile açın.

Varsayılan frontend origin:

```text
http://127.0.0.1:5500
```

Herhangi bir derleme adımı, frontend framework veya bundler gerekmez.

---

## Swagger API Dokümantasyonu

Backend çalışırken Swagger UI şu adresten açılır:

```text
http://localhost:3000/api-docs
```

Tüm endpoint'ler Swagger UI üzerinden test edilebilir.

JWT gerektiren endpointleri test etmek için:

1. `POST /api/auth/register` veya `POST /api/auth/login` endpointinden token alın.
2. Swagger UI üzerindeki **Authorize** butonuna tıklayın.
3. Token değerini girin.
4. Korumalı endpointleri test edin.

---

## API Endpoints

### Auth

| Metot | Endpoint | Açıklama | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Yeni kullanıcı kaydı | Hayır |
| POST | `/api/auth/login` | Giriş yapar ve JWT token döner | Hayır |
| GET | `/api/auth/me` | Giriş yapan kullanıcı bilgilerini getirir | JWT |

### Dreams

| Metot | Endpoint | Açıklama | Auth |
|---|---|---|---|
| GET | `/api/dreams` | Kullanıcının tüm rüyalarını listeler | JWT |
| POST | `/api/dreams` | Yeni rüya ekler | JWT |
| GET | `/api/dreams/:publicId` | Belirli bir rüyanın detayını getirir | JWT |
| PUT | `/api/dreams/:publicId` | Rüyayı günceller | JWT |
| DELETE | `/api/dreams/:publicId` | Rüyayı arşivden kaldırır (soft delete) | JWT |

### Request Örneği

`POST /api/dreams`

```json
{
  "title": "Uçan şehir",
  "content": "Bulutların üzerinde yürüdüm...",
  "category": "Lucid"
}
```

Geçerli kategoriler:

```text
Lucid, Kabus, Huzurlu, Garip, Nostaljik, Macera, Kozmik, Diğer
```

Kategori değeri büyük/küçük harf farkından etkilenmez. Örneğin `kabus`, `KABUS` veya `KaBuS` değerleri `Kabus` olarak kaydedilir.

---

## Kullanıcı Akışı

1. Kullanıcı kayıt olur veya giriş yapar.
2. Başarılı girişten sonra JWT token alınır.
3. Kullanıcı yeni rüya ekleyebilir.
4. Rüya arşivinde yalnızca kendi rüyalarını görüntüler.
5. Rüyalarını kategoriye göre filtreleyebilir veya arama kutusuyla arayabilir.
6. Kendi rüyasını güncelleyebilir veya silebilir.
7. Çıkış yaptığında oturum bilgisi temizlenir.

---

## Sayfa Yapısı

| Sayfa | Açıklama |
|---|---|
| Ana Sayfa | Uygulamanın genel tanıtım ekranı |
| Rüya Arşivi | Kullanıcının kayıtlı rüyalarını listeler, arama ve filtreleme sağlar |
| Yeni | Yeni rüya ekleme formu |
| Ayarlar | Kullanıcı işlemleri ve çıkış alanı |
| Giriş / Kayıt | Kullanıcı kimlik doğrulama ekranları |

---

## Unit Testler

Testler Jest ile çalıştırılır.

```bash
cd backend
npm test
```

Test dosyaları `backend/tests/` klasöründe yer alır:

```text
backend/tests/
├── authService.test.js
└── dreamService.test.js
```

---

## Test Kapsamı

Projede iş mantığı service katmanı üzerinden test edilmektedir.

| Test dosyası | Test edilen konular |
|---|---|
| `authService.test.js` | Kayıt, giriş, eksik alanlar, hatalı e-posta, kısa şifre, tekrar eden e-posta, yanlış şifre ve olmayan kullanıcı |
| `dreamService.test.js` | Rüya oluşturma, listeleme, detay getirme, güncelleme, soft delete, kullanıcı izolasyonu ve kategori normalizasyonu |

Toplam 26 unit test bulunmaktadır.

---

## Veritabanı Şeması

Projede iki temel tablo bulunmaktadır: `users` ve `dreams`.

### users

| Alan | Açıklama |
|---|---|
| `id` | Veritabanı içi kullanıcı id değeri |
| `public_id` | Dışarıya gösterilen UUID |
| `name` | Kullanıcı adı |
| `email` | Benzersiz e-posta adresi |
| `password_hash` | bcrypt ile hashlenmiş şifre |
| `created_at` | Kullanıcının oluşturulma tarihi |

### dreams

| Alan | Açıklama |
|---|---|
| `id` | Veritabanı içi rüya id değeri |
| `public_id` | API üzerinde kullanılan UUID |
| `user_id` | Rüyanın sahibi olan kullanıcı |
| `title` | Rüya başlığı |
| `content` | Rüya içeriği |
| `category` | Rüya kategorisi |
| `date` | Rüya kayıt tarihi |
| `is_deleted` | Soft delete durumu |
| `deleted_at` | Silinme tarihi |
| `created_at` | Oluşturulma tarihi |
| `updated_at` | Güncellenme tarihi |

---

## JWT Akışı

1. Kullanıcı kayıt olur veya giriş yapar.
2. Backend kullanıcı bilgilerini doğrular.
3. Başarılı işlemden sonra JWT token üretilir.
4. Frontend, korumalı endpoint isteklerinde bu token'ı `Authorization: Bearer <token>` başlığıyla gönderir.
5. `authMiddleware` token'ı doğrular ve giriş yapan kullanıcıyı belirler.
6. Rüya işlemleri yalnızca token'daki kullanıcıya ait kayıtlar üzerinde yapılır.

Bu yapı sayesinde her kullanıcı sadece kendi rüyalarını görüntüleyebilir, güncelleyebilir veya silebilir.

---

## Güvenlik

- **Şifre Hashleme:** Kullanıcı şifreleri `bcryptjs` ile hashlenerek saklanır. Düz metin şifre veritabanında tutulmaz.
- **JWT:** Oturum tokeni `Authorization: Bearer <token>` başlığıyla her istekte gönderilir. `jwt.verify` ile doğrulanır; süresi dolmuş veya bozuk token 401 döner.
- **Kullanıcı İzolasyonu:** Tüm rüya sorguları `WHERE user_id = ?` filtresi içerir. A kullanıcısı, B kullanıcısının rüyasını göremez, güncelleyemez veya silemez.
- **public_id (UUID):** API'de tahmin edilebilir sıralı numeric id (`/api/dreams/1`) kullanılmaz. Her rüyanın UUID formatında `public_id` değeri vardır.
- **Soft Delete:** `DELETE` endpoint'i rüyayı veritabanından silmez; `is_deleted = 1` yaparak gizler. `GET` sorguları yalnızca `is_deleted = 0` kayıtları döner.
- **DB Varlık Kontrolü:** Token geçerli imzalı olsa bile, veritabanında karşılığı olmayan kullanıcılar için 401 döner.
- **CORS:** Frontend ve Swagger UI için izin verilen origin'ler tanımlanmıştır.
- **Rate Limit:** Auth endpointlerinde kısa sürede çok fazla istek gönderilmesi sınırlandırılır.
- **Helmet:** Express uygulamasında temel güvenlik header'ları kullanılır.

---

## Sorun Giderme

### `better-sqlite3` derleme hatası

Node.js sürümü değiştikten sonra `npm test` veya `npm start` hata verirse:

```bash
cd backend
npm rebuild better-sqlite3
```

> Öneri: Node.js LTS sürümü kullanın.

### Sunucu başlamazsa

- `.env` dosyasının `backend/` klasöründe olduğundan emin olun.
- `JWT_SECRET` alanının dolu olduğunu kontrol edin.
- Port 3000 başka uygulama tarafından kullanılıyorsa `.env` içinde `PORT` değerini değiştirin.

### Swagger üzerinden istek atarken hata alınırsa

- Backend sunucusunun çalıştığından emin olun.
- Swagger adresinin `http://localhost:3000/api-docs` olduğunu kontrol edin.
- JWT gerektiren endpointler için önce login/register ile token alın.
- Swagger UI üzerindeki **Authorize** alanına token girin.

---

## Ders Bilgisi

Bu proje, Sistem Analizi ve Tasarımı dersi kapsamında geliştirilmiştir.

Amaç; Vanilla JavaScript, Node.js/Express, REST API, veritabanı, Swagger dokümantasyonu, katmanlı mimari ve unit test yaklaşımını birlikte kullanan tam yığın bir CRUD uygulaması geliştirmektir.
