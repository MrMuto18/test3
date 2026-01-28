const CACHE_NAME = 'falla7in-v1.1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/base.css',
  '/css/components.css',
  '/js/main.js',
  '/js/config.js',
  '/email.js',
  '/images/icon-192.png',
  '/images/icon-512.png'
];

// 🔧 تنصيب الـ Service Worker وتخزين الملفات الأساسية
self.addEventListener('install', event => {
  console.log('⚙️ Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Caching assets...');
        return cache.addAll(ASSETS);
      })
      .then(() => {
        console.log('✅ Service Worker: Installed successfully!');
        return self.skipWaiting(); // تفعيل فوري
      })
  );
});

// 🔄 تفعيل الـ Service Worker وحذف الـ caches القديمة
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker: Activated!');
      return self.clients.claim(); // السيطرة على كل الصفحات
    })
  );
});

// 🌐 التعامل مع الطلبات (Fetch) - Strategy: Cache First, then Network
self.addEventListener('fetch', event => {
  // تجاهل الطلبات من Chrome Extensions
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          console.log('📦 Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // إذا مش موجود في الـ cache، نجيبوه من الـ network
        return fetch(event.request)
          .then(response => {
            // نحفظوه في الـ cache للمرة الجاية
            if (response && response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseClone);
              });
            }
            return response;
          })
          .catch(error => {
            console.error('❌ Fetch failed:', error);
            
            // Offline fallback - نرجعو صفحة offline مخصصة
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// 🔔 استقبال Push Notifications
self.addEventListener('push', function(event) {
    console.log('📬 Push notification received!');
    
    const data = event.data ? event.data.json() : { 
        title: '🌾 فلاحين', 
        body: 'تفقد التطبيق للحصول على آخر التحديثات!' 
    };
    
    const options = {
        body: data.body,
        icon: '/images/icon-512.png',
        badge: '/images/icon-192.png',
        vibrate: [200, 100, 200],
        tag: 'falla7in-notification', // باش ما يعمللناش spam
        requireInteraction: false,
        data: { 
            url: data.url || '/',
            timestamp: Date.now()
        },
        actions: [
            { action: 'open', title: 'فتح التطبيق', icon: '/images/icon-192.png' },
            { action: 'close', title: 'إغلاق', icon: '/images/icon-192.png' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// 👆 كي ينزل الفلاح على التنبيه، يتحل الموقع
self.addEventListener('notificationclick', function(event) {
    console.log('🔔 Notification clicked!');
    event.notification.close();
    
    const urlToOpen = event.notification.data.url || '/';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(windowClients => {
                // إذا الموقع مفتوح، نحط الفوكوس عليه
                for (let client of windowClients) {
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }
                // إذا مش مفتوح، نفتحوه
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});

// 📊 Background Sync (للمستقبل - باش نحفظو الطلبات إذا مافماش نت)
self.addEventListener('sync', function(event) {
    if (event.tag === 'sync-orders') {
        console.log('🔄 Syncing orders...');
        event.waitUntil(syncOrders());
    }
});

async function syncOrders() {
    // هذا للمستقبل - باش نحفظو الطلبات لين يرجع النت
    console.log('📤 Attempting to sync pending orders...');
    // TODO: Implement order sync logic
}

console.log('✅ Service Worker script loaded!');
