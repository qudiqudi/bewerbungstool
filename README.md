# Bewerbungstool

Eine kleine PWA, die aus einer Stellenbeschreibung einen interaktiven, simulierten Einstellungstest erstellt. Läuft komplett im Browser, ohne Backend.

## Funktionsweise

1. Stellenbeschreibung einfügen oder per URL laden (über den Jina-Reader `r.jina.ai`)
2. Das Tool erstellt per Claude- oder OpenAI-API einen Fragenkatalog (Multiple-Choice und offene Fragen)
3. Fragen werden interaktiv beantwortet
4. Die Antworten werden ausgewertet: Punkte pro Frage, Feedback, Musterantworten und eine Gesamteinschätzung

## Eigener API-Key

Jeder Nutzer hinterlegt seinen eigenen API-Key in den Einstellungen. Der Key wird ausschließlich im localStorage des Browsers gespeichert und direkt an den jeweiligen Anbieter gesendet (Anthropic erlaubt Browser-Aufrufe per CORS, OpenAI ebenfalls). Es gibt keinen Server, der den Key sieht.

Unterstützte Anbieter:

- Claude (Anthropic), Standardmodell `claude-opus-4-8`
- OpenAI, Standardmodell `gpt-4o`

Das Modell ist in den Einstellungen frei änderbar.

## Lokal ausführen

Beliebigen statischen Server starten, z. B.:

```sh
python3 -m http.server 8000
```

Dann http://localhost:8000 öffnen. Der Service Worker (Offline-Cache) ist nur über HTTPS aktiv, die App funktioniert lokal aber auch ohne.

## Deployment

Statisches Hosting genügt (z. B. GitHub Pages). Einfach den Inhalt des Repos ausliefern, es gibt keinen Build-Schritt.
