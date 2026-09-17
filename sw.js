const CACHE_NAME = 'radio-sragen-v1';
const assets = [
  'index.html',
  'manifest.json'
];

// Pemasangan Awal Aplikasi
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Strategi jaringan untuk memutar streaming audio secara real-time
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
