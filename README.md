# 🌾 موقع فلاحين - Falla7in Platform

منصة استشارة زراعية ذكية للفلاحين التونسيين 🇹🇳

---

## 🎯 نظرة عامة

موقع فلاحين هو منصة استشارة زراعية توفر:
- 🤖 استشارة ذكية مخصصة
- 🛒 متجر منتجات زراعية
- 👨‍💼 Admin Panel
- 📱 Responsive Design

---

## ✨ المميزات

### الاستشارة الذكية

**مسار الخضروات (7 أسئلة):**
- المحاصيل: 🍅 طماطم، 🌶️ فلفل، 🥕 سفنارية، 🌿 بسباس، 🥔 بطاطا، 🍈 دلاع، 🍉 بطيخ، 🍓 فراولة
- الأسئلة: المساحة، نوع الفلاحة، التربة، ملوحة الماء، فترة السقي، معلوماتك

**مسار الأشجار (6 أسئلة):**
- المحاصيل: 🫒 زيتون، 🫘 قوارص، 🌰 لوزيات
- الأسئلة: المساحة، 3 مراحل نمو (السبات، التزهير، الثمار)، معلوماتك

### المتجر
- Dynamic من Firestore
- Cart system كامل
- Checkout

### Admin Panel
- CRUD للمنتجات والأسئلة
- Firebase Authentication
- Dashboard

---

## 📁 الملفات

```
falla7in/
├── index.html              # الصفحة الرئيسية
├── shop.html               # المتجر
├── consultation.html       # الاستشارة
├── seed-data.html          # تحميل البيانات
├── README.md
├── .gitignore
└── admin/
    ├── index.html         # Login
    ├── dashboard.html
    ├── products.html
    └── questions.html
```

---

## 🚀 Deploy على Vercel

### الطريقة السريعة

1. Push للـ GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Import في Vercel:
   - https://vercel.com/new
   - Import Git Repository
   - Framework: Other
   - Root Directory: `./`
   - Deploy! 🚀

3. Firebase Setup:
   - أضف domain في Firebase Authorized domains

---

## 🔥 Firebase Setup

### Config (موجود في الملفات):
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyC-z9igQOo7PbKiTzhi2fIRrHHuUXhN6AU",
    authDomain: "fla7in.firebaseapp.com",
    projectId: "fla7in",
    // ...
};
```

### Firestore Rules:
```javascript
allow read, write: if true;
```

### تحميل البيانات:
1. افتح `/seed-data.html`
2. Login: `admin@falla7in.com` / `admin123`
3. اضغط "تحميل المنتجات" و "تحميل الأسئلة"

---

## 📊 الإحصائيات

```
المحاصيل: 11 محصول (8 خضروات + 3 أشجار)
الأسئلة: 7 للخضروات، 6 للأشجار
الصفحات: 8 صفحات (4 رئيسية + 4 admin)
```

---

## 🐛 Troubleshooting

**المنتجات undefined:**
```javascript
localStorage.clear()
location.reload()
```

**404 Error:**
- تأكد الملفات في root
- Vercel Root Directory: `./`

**Firebase Error:**
- أضف domain في Authorized domains
- تأكد Firestore Rules صحيحة

---

## 📞 Admin Credentials

```
Email: admin@falla7in.com
Password: admin123
```

⚠️ غيّر هذه في الإنتاج!

---

موقع فلاحين - صنع بكل حب في تونس 🇹🇳💚

**نسخة:** 2.0 (يناير 2026)
