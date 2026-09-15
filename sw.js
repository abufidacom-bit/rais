const CACHE_NAME = 'radio-cache-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

// Menyimpan aset dasar ke dalam memori cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Mengambil data dari cache agar aplikasi terbuka instan
self.addEventListener('fetch', (e) => {
  // Sistem tidak akan menyimpan audio streaming ke cache karena durasinya tanpa akhir
  if (e.request.url.includes('stream') || e.request.url.includes('live')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
