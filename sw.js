"use strict";

// __BUILD__ wird beim Deploy durch den Commit-Hash ersetzt (GitHub Action);
// lokal bleibt der Platzhalter stehen, was als Cache-Name ebenfalls funktioniert
const CACHE = "bewerbungstool-__BUILD__";
const ASSETS = [
  ".",
  "index.html",
  "style.css",
  "app.js",
  "manifest.webmanifest",
  "assets/icons/icon.svg",
  "assets/icons/icon-maskable.svg",
  "assets/icons/apple-touch-icon.png",
  "assets/icons/favicon-32.png",
  "assets/icons/favicon-16.png",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/icons/icon-maskable-192.png",
  "assets/icons/icon-maskable-512.png",
  "assets/fonts/Sora-variable.ttf",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      // "reload" umgeht den HTTP-Cache des Browsers: ein frisch installierter
      // Service Worker legt so garantiert die aktuellen Dateien ab und nicht
      // bis zu 10 Minuten alte Versionen aus dem GitHub-Pages-Cache.
      .then((cache) => cache.addAll(ASSETS.map((a) => new Request(a, { cache: "reload" }))))
      .then(() => self.skipWaiting())
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
        // Nur vollstaendige, erfolgreiche Antworten cachen: 404/500 (z. B.
        // waehrend eines Deploys) wuerden sonst den funktionierenden
        // Offline-Fallback ueberschreiben
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE)
            .then((cache) => cache.put(event.request, copy))
            .catch(() => {});
        }
        return res;
      })
      .catch(async () => {
        const hit = await caches.match(event.request);
        if (hit) return hit;
        // Offline und nicht im Cache: bei einer Seitennavigation (z. B. Reload
        // einer Unteradresse) auf die gecachte App-Huelle zurueckfallen, damit
        // die App offline laedt statt einer Browser-Fehlerseite.
        if (event.request.mode === "navigate") {
          return (await caches.match("index.html")) || (await caches.match("."));
        }
        return Response.error();
      })
  );
});
