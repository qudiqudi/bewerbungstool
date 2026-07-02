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
  "demo/beispieltest.json",
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
        // Einmal-Auth-URLs (Magic-Link/OAuth-Handoff) nie cachen, sonst landet
        // ein Token dauerhaft im Cache. URLSearchParams dekodiert die Parameter-
        // namen genau wie app.js — sonst umginge z. B. ?c%6fde=… den Filter.
        const isAuthUrl = ["auth", "code", "session"].some((k) => url.searchParams.has(k));
        if (res.ok && !isAuthUrl) {
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
          // Bei einer tiefen Adresse (z. B. /einstellungstest/x/) wuerde das
          // Ausliefern der Root-Huelle das Dokument-URL auf der tiefen Adresse
          // belassen — die relativen Asset-Refs der index.html zielten dann ins
          // Leere und nichts laedt. Stattdessen offline auf "/" umleiten, damit
          // die gecachte Huelle mit korrekten relativen Pfaden laedt; nur fuer
          // "/" die Huelle direkt zurueckgeben (Redirect-Ziel ist als "."/
          // "index.html" im Precache, also offline verfuegbar).
          if (url.pathname !== "/") {
            return Response.redirect(new URL("/", self.location.origin).href, 302);
          }
          return (await caches.match("index.html")) || (await caches.match("."));
        }
        return Response.error();
      })
  );
});
