const CACHE_NAME = 'falla7in-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/base.css',
  '/css/components.css',
  '/js/main.js',
  '/js/config.js'
];

// تنصيب الـ Service Worker وتخزين الملفات الأساسية
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

// التعامل مع الطلبات (Fetch)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : { title: 'تنبيه جديد', body: 'تفقد تطبيق فلاحين!' };
    
    const options = {
        body: data.body,
        icon: '/images/icon-192.png',
        badge: '/images/icon-192.png',
        vibrate: [100, 50, 100],
        data: { url: '/' }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// كي ينزل الفلاح على التنبيه، يتحل الموقع
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});