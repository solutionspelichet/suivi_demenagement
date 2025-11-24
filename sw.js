const CACHE_NAME = 'etat-lieux-v3'; // Nouvelle version v3
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
  // On a retiré les liens externes (Tailwind/FontAwesome) ici pour éviter l'erreur "Failed to fetch"
  // Le navigateur les mettra en cache via son cache standard HTTP.
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (e) => {
  // On ignore les requêtes API vers Google
  if (e.request.url.includes('script.google.com')) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
