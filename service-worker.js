const CACHE_NAME = 'pm-tv-cache-v3';

const FILES_TO_CACHE = [
  '/PMTV/',
  '/PMTV/index.html',
  '/PMTV/manifest.json',
  '/PMTV/navbar.html',
  '/PMTV/style.css',
  '/PMTV/script.js',
  '/PMTV/Images/icon-192.png',
  '/PMTV/Images/icon-512.png',
  '/PMTV/Images/capture-512x1024.png',
  '/PMTV/Images/favicon.ico',
  '/PMTV/Images/doudou.png',
  '/PMTV/chapitres/chapitre01.html',
  '/PMTV/chapitres/chapitre02.html',
  '/PMTV/chapitres/chapitre03.html',
  '/PMTV/chapitres/chapitre04.html',
  '/PMTV/chapitres/chapitre05.html',
  '/PMTV/chapitres/chapitre06.html',
  '/PMTV/chapitres/chapitre07.html',
  '/PMTV/chapitres/chapitre08.html',
  '/PMTV/chapitres/chapitre09.html',
  '/PMTV/chapitres/chapitre10.html',
  '/PMTV/chapitres/chapitre11.html',
  '/PMTV/chapitres/chapitre12.html',
  '/PMTV/chapitres/chapitre13.html',
  '/PMTV/chapitres/chapitre14.html',
  '/PMTV/chapitres/chapitre15.html',
  '/PMTV/chapitres/chapitre16.html',
  '/PMTV/chapitres/chapitre17.html',
  '/PMTV/chapitres/chapitre18.html',
  '/PMTV/chapitres/chapitre19.html',
  '/PMTV/chapitres/chapitre20.html',
  '/PMTV/chapitres/chapitre21.html',
  '/PMTV/chapitres/chapitre22.html',
  '/PMTV/chapitres/chapitre23.html',
  '/PMTV/chapitres/chapitre24.html',
  '/PMTV/chapitres/chapitre25.html',
  '/PMTV/chapitres/chapitre26.html',
  '/PMTV/chapitres/chapitre27.html',
  '/PMTV/chapitres/chapitre28.html',
  '/PMTV/chapitres/chapitre29.html',
  '/PMTV/chapitres/chapitre30.html',
  '/PMTV/chapitres/chapitre31.html',
  '/PMTV/chapitres/chapitre32.html',
  '/PMTV/chapitres/chapitre33.html',
  '/PMTV/chapitres/chapitre34.html',
  '/PMTV/chapitres/chapitre35.html',
  '/PMTV/chapitres/chapitre36.html',
  '/PMTV/chapitres/chapitre37.html',
  '/PMTV/chapitres/chapitre38.html',
  '/PMTV/chapitres/chapitre39.html',
  '/PMTV/chapitres/chapitre40.html',
  '/PMTV/chapitres/chapitre41.html',
  '/PMTV/chapitres/chapitre42.html',
  '/PMTV/chapitres/chapitre43.html',
  '/PMTV/chapitres/chapitre44.html',
  '/PMTV/chapitres/chapitre45.html',
  '/PMTV/chapitres/chapitre46.html',
  '/PMTV/chapitres/chapitre47.html',
  '/PMTV/chapitres/chapitre48.html',
  '/PMTV/chapitres/chapitre49.html',
  '/PMTV/chapitres/chapitre50.html',
  '/PMTV/chapitres/chapitre51.html',
  '/PMTV/chapitres/chapitre52.html',
  '/PMTV/chapitres/chapitre53.html',
  '/PMTV/chapitres/chapitre54.html',
  '/PMTV/chapitres/chapitre55.html',
  '/PMTV/chapitres/chapitre56.html',
  '/PMTV/chapitres/chapitre57.html',
  '/PMTV/chapitres/chapitre58.html',
  '/PMTV/chapitres/chapitre59.html',
  '/PMTV/chapitres/fin.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        }).catch(() => {
          // Ne fait rien si offline
        });

        return cachedResponse || fetchPromise;
      })
    )
  );
});
