"use strict";

const CACHE = "bewerbungstool-v18";
const ASSETS = [
  ".",
  "index.html",
  "style.css",
  "app.js",
  "manifest.webmanifest",
  "icon.svg",
  "icon-maskable.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // API-Aufrufe und alles Fremde nie cachen
  if (event.request.method !== "GET" || url.origin !== location.origin) {
    return;
  }

  // Netzwerk zuerst, Cache als Offline-Fallback. "no-cache" erzwingt eine
  // Revalidierung beim Server (per ETag), weil GitHub Pages Assets sonst bis
  // zu 10 Minuten im HTTP-Cache des Browsers liegen und Updates verzoegern.
  event.respondWith(
    fetch(event.request, { cache: "no-cache" })
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
