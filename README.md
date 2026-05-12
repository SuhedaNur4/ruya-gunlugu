# 💤 Rüya Günlüğü Uygulaması

Bu proje, Sistem Analizi ve Tasarımı dersi kapsamında geliştirilmiş web tabanlı bir **Rüya Günlüğü** uygulamasıdır. 
Kullanıcıların gördükleri rüyaları sisteme ekleyebileceği, görüntüleyebileceği, güncelleyebileceği ve silebileceği tam bir CRUD sistemidir.

Amacı, temel yazılım mühendisliği prensiplerini uygulayarak modüler (katmanlı mimari), test edilebilir ve RESTful bir web uygulaması geliştirmektir.

---

## 🚀 Kullanılan Teknolojiler

- **Backend:** Node.js, Express.js
- **Veritabanı:** SQLite
- **Frontend:** Vanilla JavaScript (SPA Mimari), HTML5, CSS3
- **Test:** Jest
- **API Dokümantasyon:** Swagger UI

---

## 📁 Proje Yapısı (Katmanlı Mimari)

```text
ruya-gunlugu/
├── backend/
│   ├── config/           # Veritabanı yapılandırmaları
│   ├── controllers/      # HTTP isteklerini karşılayan katman
│   ├── services/         # İş mantığı (business logic)
│   ├── models/           # Veritabanı işlemleri
│   ├── routes/           # API endpoint tanımları
│   ├── tests/            # Unit testler (Jest)
│   ├── app.js            # Express uygulaması
│   ├── server.js         # Sunucu başlatma dosyası
│   ├── swagger.js        # API dokümantasyonu
│   └── package.json
│
├── frontend/
│   ├── index.html        # SPA ana sayfa
│   ├── style.css
│   └── app.js            # API çağrıları ve DOM işlemleri
│
└── README.md
```

---

## ⚙️ Kurulum ve Çalıştırma

Projeyi bilgisayarınızda (yeniden) üretmek ve çalıştırmak için aşağıdaki adımları izleyin.

### 1. Projeyi Klonlayın
```bash
git clone <github-repo-linki>
cd ruya-gunlugu/backend
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Uygulamayı Başlatın
```bash
npm start
```
*(Sunucu varsayılan olarak `http://localhost:3000` portunda çalışacaktır. Veritabanı dosyası ilk çalışmada SQLite tarafından otomatik olarak oluşturulur.)*

### 4. Frontend'i Açın
Uygulama arayüzüne erişmek için `frontend/index.html` dosyasını doğrudan bir web tarayıcısında açmanız yeterlidir. (Veya VS Code Live Server eklentisini kullanabilirsiniz.)

---

## 📌 API Endpoints (Rüyalar)

Frontend, aşağıdaki RESTful API uç noktalarıyla JSON formatında haberleşir:

- `GET /api/dreams` → Tüm rüyaları listele
- `GET /api/dreams/:id` → Belirli bir rüyanın detayını getir
- `POST /api/dreams` → Yeni rüya ekle
- `PUT /api/dreams/:id` → Mevcut rüyayı güncelle
- `DELETE /api/dreams/:id` → Rüyayı sil

---

## 🧪 Testleri Çalıştırma

Projede "iş mantığı" (Business Logic) katmanı olan `services` test edilmiştir.
```bash
npm test
```

---

## 📚 API Dokümantasyonu (Swagger)

API endpoint'lerini keşfetmek ve test etmek için sunucu çalışırken aşağıdaki adrese gidin:
```
http://localhost:3000/api-docs
```

---

## 🏗️ Mimari ve Tasarım Kararları

- **Katmanlı Mimari:** Uygulama modüler bir yapıdadır. İş mantığı (business logic) doğrudan route veya controller içerisinde değil, izole edilmiş `services` katmanında yönetilir. Bu sayede kodun test edilebilirliği ve bakımı kolaylaştırılmıştır.
- **Single Page Application (SPA):** Kullanıcı arayüzü Vanilla JavaScript ile geliştirilmiştir. Asenkron `fetch` istekleri kullanılarak sayfa yenilemesi olmadan dinamik bir deneyim sunulur.
- **Arama ve Basit Filtreleme:** Temel CRUD işlemlerine ek olarak, kullanıcıların rüyalarını metin bazlı arayabileceği ve belirli kategorilere (örn. Lucid rüyalar) göre filtreleyebileceği bir arama sistemi tasarlanmıştır.
