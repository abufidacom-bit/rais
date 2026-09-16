const CACHE_NAME = 'radio-islam-sragen-v20';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  // Cegah browser melakukan caching pada audio streaming kajian
  if (e.request.url.includes('11252') || e.request.url.includes('radioislam')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
