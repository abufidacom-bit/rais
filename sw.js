const CACHE_NAME = 'sragens-station-v1';
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
  // PENGECUALIAN: Jangan cache data audio streaming, proxy, atau pemutar eksternal
  if (
    e.request.url.includes('streamy1') || 
    e.request.url.includes('radioislam') || 
    e.request.url.includes('corsproxy') ||
    e.request.url.includes('player')
  ) {
    return; // Biarkan request langsung menembus ke internet (Network Only)
  }
  
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
