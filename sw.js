// Service Worker - Version 2.0 - CLEAN (NO EMAIL.JS)
const CACHE_NAME = 'falla7in-v2.0-clean';
const ASSETS = [
  '/',
  '/index.html'
];

self.addEventListener('install', event => {
  console.log('✅ SW v2.0: Installing (NO email.js)');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  console.log('🚀 SW v2.0: Activating');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.startsWith('chrome-extension://')) return;
  
  if (event.request.url.includes('firestore') || 
      event.request.url.includes('web3forms')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

console.log('✅ SW v2.0 loaded');
