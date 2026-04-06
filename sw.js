/* ═══════════════════════════════════════════════════
   NihonGo Service Worker v3
   Cache-first dla lokalnych zasobów,
   Network-first dla Google Fonts,
   Nigdy nie cache'uje Anthropic API.
═══════════════════════════════════════════════════ */
const CACHE = 'nihongo-v3';

const PRECACHE = [
  './',
  './index.html',
  './favicon/site.webmanifest',
  './favicon/favicon.ico',
  './favicon/favicon-96x96.png',
  './favicon/apple-touch-icon.png',
  './favicon/icon192x192.png',
  './favicon/icon512x512.png',
];

const FONT_CACHE = 'nihongo-fonts-v1';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(PRECACHE))
      .catch(err => console.warn('[SW] Precache partial fail:', err))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE && k !== FONT_CACHE).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Google Fonts — cache-first
  if (url.origin.includes('googleapis.com') || url.origin.includes('gstatic.com')) {
    e.respondWith(
      caches.open(FONT_CACHE).then(cache =>
        cache.match(e.request).then(cached => {
          if (cached) return cached;
          return fetch(e.request).then(resp => {
            cache.put(e.request, resp.clone());
            return resp;
          }).catch(() => cached);
        })
      )
    );
    return;
  }

  // Anthropic API — zawsze sieć, nigdy cache
  if (url.origin === 'https://api.anthropic.com') {
    e.respondWith(fetch(e.request));
    return;
  }

  // Pozostałe zasoby — cache-first, fallback do index.html offline
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp.ok && url.origin === self.location.origin) {
          caches.open(CACHE).then(cache => cache.put(e.request, resp.clone()));
        }
        return resp;
      }).catch(() =>
        e.request.mode === 'navigate'
          ? caches.match('./index.html')
          : Response.error()
      );
    })
  );
});
