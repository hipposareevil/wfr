const CACHE_NAME = 'firstaid-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './diagrams/diagram-sling-swathe-clean.jpg',
  './diagrams/diagram-lower-leg-splint.png',
  './diagrams/diagram-buddy-tape-finger.png',
  './diagrams/diagram-forearm-splint.png',
  './diagrams/diagram-foot-ankle-splint.png',
  './diagrams/diagram-primary-survey-flow-clean.jpg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
