// Tracking dashboard service worker
// Scope: /tracking — does not affect the main site

const CACHE_NAME = 'tracking-shell-v1';

// Cache the app shell pages so the dashboard loads when offline
const SHELL_URLS = ['/tracking', '/tracking/login'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  // Remove any old caches from previous versions
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== CACHE_NAME)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Always go network-first for API routes — data must be live
  if (url.pathname.startsWith('/api/')) return;

  // Network-first for everything else; fall back to cache if offline
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful GET responses for the tracking shell
        if (request.method === 'GET' && response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request)),
  );
});
