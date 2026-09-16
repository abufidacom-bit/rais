const CACHE_NAME = 'ri-sragen-direct-v1';
const ASSETS = [
  'https://radioislam.my.id',
  '/manifest.json',
  '/assets/icon-192.png',
  '/assets/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', e => {
  // Biarkan data streaming ditarik langsung dari jaringan tanpa cache
  if (e.request.url.includes('radio.mp3') || e.request.url.includes('/stream')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      return cachedResponse || fetch(e.request);
    })
  );
});
