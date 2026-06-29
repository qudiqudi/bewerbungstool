#!/usr/bin/env node
// SEO-Generator (Plan 2026, 3.7b / Abschnitt 6) — dependency-frei.
//
// Liest seo/catalog.json, validiert minimal und schreibt pro Eintrag eine
// statische Landingpage `einstellungstest/<slug>/index.html` sowie eine
// komplett neu erzeugte `sitemap.xml` (Root + alle SEO-URLs). Kein Bundler,
// keine Templates, kein Laufzeit-Build: HTML wird selbst escaped und als
// String zusammengesetzt. Output wird committet.
//
// WICHTIG (Plan 3.7b):
//   - Die erzeugten Seiten gehoeren NICHT in die `sw.js` ASSETS-Precache-Liste.
//     Network-first cacht same-origin GETs ohnehin; ein Precache wuerde mit
//     jedem Katalogwachstum aufblaehen.
//   - Personalisierte/echte Testgenerierung passiert erst on-demand in der App
//     (per Klick, ueber Gratis-Kontingent/Credits gegated). Diese Seiten sind
//     statischer Einstieg + Beispielaufgaben, KEINE vorgerenderte Personalisierung.
//
// Nutzung:  node scripts/generate-seo.mjs   (vom Repo-Root oder via npm-Skript)

import { readFile, writeFile, mkdir, rm, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const catalogPath = path.join(root, "seo", "catalog.json");
const outDir = path.join(root, "einstellungstest");

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Mapping testType -> vertiefende Lernseite (/lernen/). Verlinkt die Berufsseiten
// mit den vorhandenen Modul-Erklaerseiten (interne Vernetzung + Discovery der
// bislang schwach verlinkten /lernen/-Seiten). fachwissen hat keine Lernseite.
const LERNEN = {
  zahlenreihe: "/lernen/zahlenreihen.html",
  sprachlogik: "/lernen/sprachlogik.html",
  konzentration: "/lernen/konzentration.html",
  figural: "/lernen/figuren-matrizen.html",
};
const MAX_RELATED = 6;

// --- HTML/XML-Escaping (selbst, ohne Abhaengigkeit) -------------------------
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
// JSON-LD sicher in ein <script>-Tag einbetten: nur das schliessende Tag /
// die <-Sequenz neutralisieren, sonst bleibt es valides JSON.
function jsonLd(obj) {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

// --- Validierung ------------------------------------------------------------
function validate(cat) {
  const errs = [];
  const fail = (m) => errs.push(m);

  if (!cat || typeof cat !== "object" || Array.isArray(cat)) {
    return ["catalog: kein Objekt"];
  }
  if (!Number.isInteger(cat.version) || cat.version < 1) fail("version: positive Ganzzahl erwartet");
  if (typeof cat.baseUrl !== "string" || !/^https:\/\/[^/]+$/.test(cat.baseUrl)) {
    fail('baseUrl: erwartet "https://host" ohne abschliessenden Slash');
  }
  if (typeof cat.updatedAt !== "string" || !DATE_RE.test(cat.updatedAt)) fail("updatedAt: YYYY-MM-DD erwartet");

  // staticPages: handgepflegte Seiten (z. B. /lernen/), die NICHT vom Generator
  // erzeugt werden, aber in der Sitemap stehen muessen (sonst fallen sie raus).
  if (cat.staticPages != null) {
    if (!Array.isArray(cat.staticPages)) fail("staticPages: Array erwartet");
    else cat.staticPages.forEach((s, i) => {
      if (!s || typeof s.loc !== "string" || !s.loc.startsWith("/")) fail(`staticPages[${i}].loc: muss mit "/" beginnen`);
      if (typeof s.lastmod !== "string" || !DATE_RE.test(s.lastmod)) fail(`staticPages[${i}].lastmod: YYYY-MM-DD erwartet`);
    });
  }

  const types = cat.testTypes;
  if (!types || typeof types !== "object" || Array.isArray(types)) {
    fail("testTypes: Objekt {key: {label, description}} erwartet");
  } else {
    for (const [k, v] of Object.entries(types)) {
      if (!SLUG_RE.test(k)) fail(`testTypes.${k}: Key muss slug-foermig sein`);
      if (!v || typeof v.label !== "string" || !v.label) fail(`testTypes.${k}.label fehlt`);
      if (!v || typeof v.description !== "string" || !v.description) fail(`testTypes.${k}.description fehlt`);
    }
  }
  const knownType = (t) => !!types && Object.prototype.hasOwnProperty.call(types, t);

  if (!Array.isArray(cat.pages) || cat.pages.length === 0) {
    fail("pages: nicht-leeres Array erwartet");
    return errs;
  }
  const seen = new Set();
  cat.pages.forEach((p, i) => {
    const at = (m) => fail(`pages[${i}]${p && p.slug ? ` (${p.slug})` : ""}: ${m}`);
    if (!p || typeof p !== "object") return at("kein Objekt");
    if (typeof p.slug !== "string" || !SLUG_RE.test(p.slug)) at("slug fehlt/ungueltig (a-z0-9, mit Bindestrichen)");
    else if (seen.has(p.slug)) at("slug doppelt"); else seen.add(p.slug);
    for (const f of ["beruf", "title", "description", "intro"]) {
      if (typeof p[f] !== "string" || !p[f].trim()) at(`${f} fehlt/leer`);
    }
    if (!Array.isArray(p.testTypes) || p.testTypes.length === 0) at("testTypes: nicht-leeres Array");
    else p.testTypes.forEach((t) => { if (!knownType(t)) at(`testTypes-Eintrag "${t}" nicht in catalog.testTypes`); });
    if (p.samples != null) {
      if (!Array.isArray(p.samples)) at("samples: Array erwartet");
      else p.samples.forEach((s, j) => {
        if (!s || typeof s !== "object") return at(`samples[${j}]: kein Objekt`);
        if (!knownType(s.type)) at(`samples[${j}].type "${s.type}" unbekannt`);
        if (typeof s.question !== "string" || !s.question.trim()) at(`samples[${j}].question fehlt`);
        if (typeof s.answer !== "string" || !s.answer.trim()) at(`samples[${j}].answer fehlt`);
        if (s.options != null && (!Array.isArray(s.options) || s.options.some((o) => typeof o !== "string"))) {
          at(`samples[${j}].options: String-Array erwartet`);
        }
      });
    }
    if (p.faq != null) {
      if (!Array.isArray(p.faq)) at("faq: Array erwartet");
      else p.faq.forEach((q, j) => {
        if (!q || typeof q.q !== "string" || !q.q.trim() || typeof q.a !== "string" || !q.a.trim()) {
          at(`faq[${j}]: {q, a} als nicht-leere Strings erwartet`);
        }
      });
    }
    if (typeof p.lastmod !== "string" || !DATE_RE.test(p.lastmod)) at("lastmod: YYYY-MM-DD erwartet");
  });
  return errs;
}

// --- Geteilte Bausteine (F10: Berufseite + Hub nur einmal pflegen) ----------
// F6: strikte CSP fuer die statischen SEO-Seiten. Diese Seiten nutzen nur
// inline <style> (daher style-src 'unsafe-inline') und inline JSON-LD
// (application/ld+json ist ein Datenblock, wird NICHT ausgefuehrt — script-src
// 'self' blockt es nicht). Es gibt KEIN ausfuehrbares inline-<script>.
const CSP = `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; object-src 'none'; base-uri 'none'; form-action 'self'">`;

// Gemeinsame Basis-Styles. Enthaelt @font-face fuer Sora (F8, exakt wie
// /lernen/lernen.css), damit beide Seitentypen die Markenschrift laden statt
// nur den System-Fallback. Seiten-spezifische Regeln bleiben inline.
const BASE_CSS = `    :root{--primary:#c5543a;--primary-dark:#a8442e;--bg:#fbf7f2;--card:#fff;--text:#3a322e;--muted:#7a6f68;--border:#e7ddd3;--radius:14px}
    *{box-sizing:border-box}
    html{-webkit-text-size-adjust:100%}
    @font-face{font-family:"Sora";src:url("/assets/fonts/Sora-variable.ttf") format("truetype");font-weight:400 800;font-display:swap}
    body{margin:0;font-family:"Sora",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:var(--text);background:var(--bg);line-height:1.6}
    a{color:var(--primary-dark)}
    header.site{background:var(--primary);color:#fff;padding:14px 20px}
    header.site a{color:#fff;text-decoration:none;font-weight:700;font-size:1.1rem}
    main{max-width:760px;margin:0 auto;padding:28px 20px 56px}
    nav.crumbs{font-size:.82rem;color:var(--muted);margin:4px 0 18px}
    nav.crumbs a{color:var(--muted)}
    h1{font-size:1.7rem;line-height:1.25;margin:.2em 0 .4em;color:#2c2521}
    .lead{font-size:1.08rem;color:#4a413c}
    footer{max-width:760px;margin:0 auto;padding:24px 20px 48px;font-size:.84rem;color:var(--muted);border-top:1px solid var(--border)}
    footer a{color:var(--muted)}
    @media(max-width:600px){h1{font-size:1.4rem}main{padding:20px 16px 44px}}`;

// Identische Kopf-/Fusszeile beider Seitentypen.
const HEADER = `  <header class="site"><a href="/">jobreif.de</a></header>`;
const FOOTER = `  <footer>
    <p>jobreif.de macht aus jeder Stellenanzeige einen simulierten Einstellungstest mit KI-Feedback. Deine Daten bleiben in deinem Browser. <a href="/">Zur App</a></p>
  </footer>`;

// --- Seitenbau --------------------------------------------------------------
function renderSample(s, types) {
  const label = esc((types[s.type] && types[s.type].label) || s.type);
  const opts = Array.isArray(s.options) && s.options.length
    ? `<ul class="opts">${s.options.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>`
    : "";
  return `<li class="sample">
        <div class="sample-type">${label}</div>
        <p class="sample-q">${esc(s.question)}</p>
        ${opts}
        <details class="sample-a"><summary>Lösung anzeigen</summary><p>${esc(s.answer)}</p></details>
      </li>`;
}

function renderPage(p, cat) {
  const { baseUrl, testTypes } = cat;
  const url = `${baseUrl}/einstellungstest/${p.slug}/`;
  const samples = Array.isArray(p.samples) ? p.samples : [];
  const faq = Array.isArray(p.faq) ? p.faq : [];

  const typeList = p.testTypes.map((t) => {
    const def = testTypes[t];
    const label = LERNEN[t]
      ? `<a href="${LERNEN[t]}"><strong>${esc(def.label)}</strong></a>`
      : `<strong>${esc(def.label)}</strong>`;
    return `<li>${label} — ${esc(def.description)}</li>`;
  }).join("\n        ");

  // Vorbereitungs-Tipps (optional, beruf-spezifisch) — echter Zusatzinhalt.
  const tipps = Array.isArray(p.tipps) ? p.tipps.filter((x) => typeof x === "string" && x.trim()) : [];
  const tippsHtml = tipps.length
    ? `<section class="block">
        <h2>So bereitest du dich vor</h2>
        <ul class="tipps">
        ${tipps.map((x) => `<li>${esc(x)}</li>`).join("\n        ")}
        </ul>
      </section>`
    : "";

  // Verwandte Berufe (interne Vernetzung) — bis MAX_RELATED andere Katalogseiten.
  const related = cat.pages.filter((q) => q.slug !== p.slug).slice(0, MAX_RELATED);
  const relatedHtml = related.length
    ? `<section class="block">
        <h2>Einstellungstest für andere Berufe</h2>
        <ul class="related">
        ${related.map((q) => `<li><a href="/einstellungstest/${esc(q.slug)}/">Einstellungstest ${esc(q.beruf)}</a></li>`).join("\n        ")}
        </ul>
      </section>`
    : "";

  const samplesHtml = samples.length
    ? `<section class="block">
        <h2>Beispielaufgaben</h2>
        <ul class="samples">
        ${samples.map((s) => renderSample(s, testTypes)).join("\n        ")}
        </ul>
      </section>`
    : "";

  const faqHtml = faq.length
    ? `<section class="block">
        <h2>Häufige Fragen</h2>
        ${faq.map((q) => `<details class="faq"><summary>${esc(q.q)}</summary><p>${esc(q.a)}</p></details>`).join("\n        ")}
      </section>`
    : "";

  // JSON-LD: BreadcrumbList + (falls FAQ vorhanden) FAQPage.
  const ld = [{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Einstellungstest", item: `${baseUrl}/einstellungstest/` },
      { "@type": "ListItem", position: 3, name: p.beruf, item: url },
    ],
  }];
  if (faq.length) {
    ld.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((q) => ({
        "@type": "Question", name: q.q,
        acceptedAnswer: { "@type": "Answer", text: q.a },
      })),
    });
  }
  const ldHtml = ld.map((o) => `<script type="application/ld+json">${jsonLd(o)}</script>`).join("\n  ");

  const ctaUrl = `${baseUrl}/?ref=einstellungstest-${p.slug}`;

  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${CSP}
  <title>${esc(p.title)}</title>
  <meta name="description" content="${esc(p.description)}">
  <link rel="canonical" href="${url}">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#c5543a">
  <link rel="icon" href="/assets/icons/favicon-32.png" sizes="32x32">
  <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="jobreif.de">
  <meta property="og:locale" content="de_DE">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(p.title)}">
  <meta property="og:description" content="${esc(p.description)}">
  <meta property="og:image" content="${baseUrl}/assets/social-preview.png">
  ${ldHtml}
  <style>
${BASE_CSS}
    h2{font-size:1.25rem;margin:1.6em 0 .5em;color:#2c2521}
    .block{margin-top:8px}
    ul.types,ul.samples{list-style:none;padding:0;margin:0}
    ul.types li{padding:10px 0;border-bottom:1px solid var(--border)}
    ul.tipps{margin:.4em 0;padding-left:1.2em}
    ul.tipps li{padding:4px 0}
    ul.related{list-style:none;padding:0;margin:8px 0}
    ul.related li{padding:8px 0;border-bottom:1px solid var(--border)}
    ul.related a{font-weight:600}
    .samples li.sample{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:16px 18px;margin:12px 0;box-shadow:0 2px 8px -5px rgba(80,50,40,.25)}
    .sample-type{display:inline-block;font-size:.72rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--primary-dark);background:#f6e7e1;border-radius:999px;padding:3px 10px;margin-bottom:8px}
    .sample-q{font-weight:600;margin:.2em 0}
    ul.opts{margin:.4em 0 .2em;padding-left:1.2em}
    ul.opts li{padding:2px 0}
    details{margin:.4em 0}
    details summary{cursor:pointer;font-weight:600;color:var(--primary-dark)}
    details.faq{border-bottom:1px solid var(--border);padding:10px 0}
    details.faq summary{font-weight:600;color:#2c2521}
    .cta{display:block;text-align:center;margin:28px 0 8px;background:var(--primary);color:#fff;text-decoration:none;font-weight:700;padding:16px 22px;border-radius:var(--radius);box-shadow:0 10px 24px -12px rgba(197,84,58,.7)}
    .cta:hover{background:var(--primary-dark)}
    .cta-note{text-align:center;font-size:.84rem;color:var(--muted);margin:0}
  </style>
</head>
<body>
${HEADER}
  <main>
    <nav class="crumbs"><a href="/">Start</a> › <a href="/einstellungstest/">Einstellungstest</a> › ${esc(p.beruf)}</nav>
    <h1>${esc(p.title)}</h1>
    <p class="lead">${esc(p.intro)}</p>

    <a class="cta" href="${esc(ctaUrl)}">Jetzt kostenlos üben →</a>
    <p class="cta-note">Aus echter Stellenanzeige · KI-Feedback · ohne Installation. Allgemeine Übungsmodule sofort ohne Anmeldung – der komplette, stellenbezogene Test braucht eine kostenlose Anmeldung.</p>

    <section class="block">
      <h2>Diese Testarten übst du hier</h2>
      <ul class="types">
        ${typeList}
      </ul>
    </section>

    ${samplesHtml}

    ${tippsHtml}

    ${faqHtml}

    <a class="cta" href="${esc(ctaUrl)}">Test für ${esc(p.beruf)} starten →</a>

    ${relatedHtml}
  </main>
${FOOTER}
</body>
</html>
`;
}

// Hub-/Uebersichtsseite unter /einstellungstest/ — verlinkt alle Berufe (interne
// Verlinkung fuer SEO) und macht den Breadcrumb-Mittelknoten begehbar (sonst 404).
function renderHub(cat) {
  const { baseUrl } = cat;
  const url = `${baseUrl}/einstellungstest/`;
  // Einmal definiert, fuer <meta name="description"> und og:description (F9).
  const desc = "Einstellungstest gezielt nach Beruf üben: Fachfragen aus echten Stellenanzeigen plus Sprachlogik, Zahlenreihen, Konzentration und figurale Aufgaben – kostenlos mit KI-Feedback.";
  const title = "Einstellungstest nach Beruf üben – jobreif.de";
  const items = cat.pages.map((p) =>
    `<li><a href="/einstellungstest/${esc(p.slug)}/">Einstellungstest ${esc(p.beruf)}</a></li>`).join("\n        ");
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Einstellungstest", item: url },
    ],
  };
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${CSP}
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="canonical" href="${url}">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#c5543a">
  <link rel="icon" href="/assets/icons/favicon-32.png" sizes="32x32">
  <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="jobreif.de">
  <meta property="og:locale" content="de_DE">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:image" content="${baseUrl}/assets/social-preview.png">
  <script type="application/ld+json">${jsonLd(ld)}</script>
  <style>
${BASE_CSS}
    ul.berufe{list-style:none;padding:0;margin:20px 0}
    ul.berufe li{margin:0 0 10px}
    ul.berufe a{display:block;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:14px 16px;text-decoration:none;font-weight:600;box-shadow:0 2px 8px -5px rgba(80,50,40,.25)}
    ul.berufe a:hover{border-color:var(--primary)}
    .cta{display:block;text-align:center;margin:24px 0 4px;background:var(--primary);color:#fff;text-decoration:none;font-weight:700;padding:16px 22px;border-radius:var(--radius)}
    .cta:hover{background:var(--primary-dark)}
  </style>
</head>
<body>
${HEADER}
  <main>
    <nav class="crumbs"><a href="/">Start</a> › Einstellungstest</nav>
    <h1>Einstellungstest nach Beruf üben</h1>
    <p class="lead">Wähle deinen Beruf und übe mit realistischen Aufgaben – Fachfragen aus echten Stellenanzeigen plus die typischen Eignungstest-Module. Kostenlos, im Browser, mit KI-Feedback.</p>
    <ul class="berufe">
        ${items}
    </ul>
    <a class="cta" href="/?ref=einstellungstest-hub">Eigene Stellenanzeige einfügen →</a>
  </main>
${FOOTER}
</body>
</html>
`;
}

function renderSitemap(cat) {
  const staticPages = Array.isArray(cat.staticPages) ? cat.staticPages : [];
  const urls = [
    { loc: `${cat.baseUrl}/`, lastmod: cat.updatedAt },
    // Handgepflegte Bestandsseiten (z. B. /lernen/) — duerfen beim Neuschreiben
    // der Sitemap NICHT verloren gehen.
    ...staticPages.map((s) => ({ loc: `${cat.baseUrl}${s.loc}`, lastmod: s.lastmod })),
    { loc: `${cat.baseUrl}/einstellungstest/`, lastmod: cat.updatedAt },
    ...cat.pages.map((p) => ({ loc: `${cat.baseUrl}/einstellungstest/${p.slug}/`, lastmod: p.lastmod })),
  ];
  const body = urls.map((u) =>
    `  <url>\n    <loc>${esc(u.loc)}</loc>\n    <lastmod>${esc(u.lastmod)}</lastmod>\n  </url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

// --- Aufraeumen: verwaiste Slug-Verzeichnisse entfernen ---------------------
async function pruneStale(validSlugs) {
  let entries;
  try { entries = await readdir(outDir, { withFileTypes: true }); }
  catch { return []; }
  const removed = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    if (!validSlugs.has(e.name)) {
      await rm(path.join(outDir, e.name), { recursive: true, force: true });
      removed.push(e.name);
    }
  }
  return removed;
}

// --- Lauf -------------------------------------------------------------------
async function main() {
  let cat;
  try {
    cat = JSON.parse(await readFile(catalogPath, "utf8"));
  } catch (e) {
    console.error(`seo/catalog.json nicht lesbar/gueltig: ${e.message}`);
    process.exit(1);
  }
  const errs = validate(cat);
  if (errs.length) {
    console.error("SEO-Katalog ungueltig:");
    errs.forEach((m) => console.error(`  - ${m}`));
    process.exit(1);
  }

  await mkdir(outDir, { recursive: true });
  const slugs = new Set(cat.pages.map((p) => p.slug));
  const removed = await pruneStale(slugs);

  await writeFile(path.join(outDir, "index.html"), renderHub(cat), "utf8");
  for (const p of cat.pages) {
    const dir = path.join(outDir, p.slug);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "index.html"), renderPage(p, cat), "utf8");
  }
  await writeFile(path.join(root, "sitemap.xml"), renderSitemap(cat), "utf8");

  const staticCount = Array.isArray(cat.staticPages) ? cat.staticPages.length : 0;
  const sitemapUrls = 1 /* root */ + staticCount + 1 /* hub */ + cat.pages.length;
  console.log(`SEO generiert: Hub + ${cat.pages.length} Beruf-Seite(n), sitemap.xml mit ${sitemapUrls} URLs.`);
  if (removed.length) console.log(`Entfernt (nicht mehr im Katalog): ${removed.join(", ")}`);
}

main();
