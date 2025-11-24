const CACHE_NAME = 'etat-lieux-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  '[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)',
  '[https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css)'
];

// Installation : mise en cache des fichiers statiques
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch : servir le cache si disponible, sinon réseau
self.addEventListener('fetch', (e) => {
  // On ignore les requêtes vers l'API Google Apps Script (elles doivent être live)
  if (e.request.url.includes('script.google.com')) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
