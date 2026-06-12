"use strict";

// Prüft, dass alle Dateien, auf die sw.js, manifest.webmanifest und
// index.html verweisen, tatsächlich im Repo liegen. Ein fehlendes Asset
// lässt sonst die Service-Worker-Installation (cache.addAll) komplett
// scheitern und die App ist offline nicht mehr nutzbar.

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "..");
const errors = [];

function checkExists(file, source) {
  if (file === ".") return;
  if (!fs.existsSync(path.join(root, file))) {
    errors.push(`${source}: "${file}" existiert nicht`);
  }
}

// sw.js: ASSETS-Liste
const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");
const assetsMatch = sw.match(/const ASSETS = \[([\s\S]*?)\];/);
if (!assetsMatch) {
  errors.push("sw.js: ASSETS-Liste nicht gefunden");
} else {
  const assets = [...assetsMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  if (assets.length === 0) errors.push("sw.js: ASSETS-Liste ist leer");
  assets.forEach((a) => checkExists(a, "sw.js ASSETS"));
}

// sw.js: Build-Platzhalter (wird beim Deploy durch den Commit-Hash ersetzt)
if (!sw.includes("bewerbungstool-__BUILD__")) {
  errors.push('sw.js: Platzhalter "bewerbungstool-__BUILD__" fehlt — der Deploy-Workflow braucht ihn für die Cache-Version');
}

// manifest.webmanifest: gültiges JSON, Icons vorhanden
const manifestRaw = fs.readFileSync(path.join(root, "manifest.webmanifest"), "utf8");
let manifest;
try {
  manifest = JSON.parse(manifestRaw);
} catch (e) {
  errors.push(`manifest.webmanifest: kein gültiges JSON (${e.message})`);
}
if (manifest) {
  (manifest.icons || []).forEach((icon) => checkExists(icon.src, "manifest icons"));
}

// VERSION-Datei, APP_VERSION und neuester Changelog-Eintrag müssen übereinstimmen
const version = fs.readFileSync(path.join(root, "VERSION"), "utf8").trim();
if (!/^\d+\.\d+\.\d+$/.test(version)) {
  errors.push(`VERSION: "${version}" ist keine gültige Versionsnummer (erwartet: x.y.z)`);
}
const appJs = fs.readFileSync(path.join(root, "app.js"), "utf8");
const appVersion = appJs.match(/const APP_VERSION = "([^"]+)"/);
if (!appVersion) {
  errors.push("app.js: APP_VERSION nicht gefunden");
} else if (appVersion[1] !== version) {
  errors.push(`app.js: APP_VERSION "${appVersion[1]}" passt nicht zur VERSION-Datei ("${version}")`);
}
const changelogHead = appJs.match(/const CHANGELOG = \[\s*\{\s*version: "([^"]+)"/);
if (!changelogHead) {
  errors.push("app.js: CHANGELOG nicht gefunden oder leer");
} else if (changelogHead[1] !== version) {
  errors.push(`app.js: neuester Changelog-Eintrag "${changelogHead[1]}" passt nicht zur VERSION-Datei ("${version}")`);
}

// index.html: lokale src/href-Verweise
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
[...html.matchAll(/(?:src|href)="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((ref) => !/^(https?:|mailto:|data:|#)/.test(ref))
  .forEach((ref) => checkExists(ref.split(/[?#]/)[0], "index.html"));

if (errors.length > 0) {
  console.error("Integritätsprüfung fehlgeschlagen:");
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log("Integritätsprüfung OK");
