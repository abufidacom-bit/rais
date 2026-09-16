const CACHE_NAME = 'rii-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/icon-192.png',
  '/assets/icon-512.png'
];

// Tahap Install Aset Tetap
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Mengambil Aset dari Cache (Kecuali Data Audio Server)
self.addEventListener('fetch', e => {
  // Abaikan request streaming audio port 9210 dari sistem caching agar tidak crash
  if (e.request.url.includes(':9210')) {
    return; 
  }
  
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      return cachedResponse || fetch(e.request);
    })
  );
});
