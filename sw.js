/* Offline ondersteuning: netwerk heeft voorrang; eerdere succesvolle bestanden blijven beschikbaar. */
const CACHE_NAME = "hvac-academy-static-v1-20261103";
const OFFLINE_FILES = ["./", "./index.html", "./styles.css", "./curriculum.js", "./app.js", "./favicon.svg", "./manifest.webmanifest"];
self.addEventListener("install", function(event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function(cache) { return cache.addAll(OFFLINE_FILES); }).then(function() { return self.skipWaiting(); }));
});
self.addEventListener("activate", function(event) {
  event.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.filter(function(key) { return key.startsWith("hvac-academy-static-") && key !== CACHE_NAME; }).map(function(key) { return caches.delete(key); }));
  }).then(function() { return self.clients.claim(); }));
});
self.addEventListener("fetch", function(event) {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then(function(response) {
    if (response.ok) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE_NAME).then(function(cache) { return cache.put(event.request, copy); }));
    }
    return response;
  }).catch(function() { return caches.match(event.request).then(function(cached) {
    return cached || (event.request.mode === "navigate" ? caches.match("./index.html") : Response.error());
  }); }));
});
