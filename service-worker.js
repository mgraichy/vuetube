const CACHE_NAME = 'video-cache';
const MAX_AGE    = 60 * 60 * 24;

async function cacheServerResponse(event, serverResponse) {
    const clonedServerResponse = serverResponse.clone();
    const cache = await caches.open(CACHE_NAME);

    if (cache) {
        cache.put(event.request, clonedServerResponse);
    }

    return serverResponse;
}

async function getCacheOrFetch(event) {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
        console.log('getCacheOrFetch(event), Serving from cache:', cachedResponse);
        return cachedResponse;
    };

    console.log('getCacheOrFetch(event), Serving from server:', event.request);
    const serverResponse = await fetch(event.request);
    return cacheServerResponse(event, serverResponse);
}

function possiblyCachedFetchEvent(event) {
    if (!(event.request.url.endsWith('.mp4'))) return;
    event.respondWith(getCacheOrFetch(event));
}


async function isCacheStale(request) {
    const cache = await caches.open(CACHE_NAME);

    const cachedResponse = await cache.match(request);
    if (!cachedResponse) return true

    const cachedDate = cachedResponse.headers.get('date');
    if (!cachedDate) return true;

    const cachedTime = new Date(cachedDate).getTime();
    const currentTime = Date.now();

    return (currentTime - cachedTime) > MAX_AGE;
}

async function deleteStaleCache(cacheName, request) {
    const stale = await isCacheStale(request)
    if (stale || cacheName !== CACHE_NAME) {
        return await caches.delete(cacheName);
    }
};

async function handleCacheCleanup(request) {
    const cacheNames = await caches.keys();
    return await Promise.all(cacheNames.map(name => deleteStaleCache(name, request)));
};

function cleanUpCache(event) {
    const request = event.request;
    event.waitUntil(handleCacheCleanup(request));
}

self.addEventListener('install', (event) => {
    // Skip the waiting stage (we don't need it for immutable .mp4s):
    self.skipWaiting();
});
self.addEventListener('activate', (event) => {
    // Immediately activate new service worker (no page reload necessary for .mp4s):
    event.waitUntil(self.clients.claim());
});
self.addEventListener('activate', cleanUpCache);

self.addEventListener('fetch', possiblyCachedFetchEvent);


