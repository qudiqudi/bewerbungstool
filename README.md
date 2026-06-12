# Bewerbungstool

Eine kleine PWA, die aus einer Stellenbeschreibung einen interaktiven, simulierten Einstellungstest erstellt. Läuft komplett im Browser, ohne Backend.

## Funktionsweise

1. Stellenbeschreibung einfügen oder per URL laden (über den Jina-Reader `r.jina.ai`)
2. Das Tool erstellt per Claude- oder OpenAI-API einen Fragenkatalog (Multiple-Choice und offene Fragen)
3. Fragen werden interaktiv beantwortet
4. Die Antworten werden ausgewertet: Punkte pro Frage, Feedback, Musterantworten und eine Gesamteinschätzung

## Eigener API-Key

Jeder Nutzer hinterlegt seinen eigenen API-Key in den Einstellungen. Der Key wird ausschließlich im localStorage des Browsers gespeichert und direkt an den jeweiligen Anbieter gesendet (Anthropic, OpenAI und DeepSeek erlauben Browser-Aufrufe per CORS). Es gibt keinen Server, der den Key sieht.

Unterstützte Anbieter und Modelle:

- Claude (Anthropic): Opus 4.8 (empfohlen), Fable 5, Sonnet 4.6
- OpenAI: GPT-5.1 (empfohlen), GPT-5, GPT-4.1
- DeepSeek: V3 (empfohlen), R1

Die Auswahl ist bewusst auf leistungsstarke Modelle beschränkt: Kleine Modelle (Haiku, Mini-Varianten) erzeugen keine zuverlässig strukturierten Fragenkataloge und bewerten freie Antworten zu oberflächlich. Zu jedem Modell zeigt das Dropdown eine kurze Einordnung, wofür es sich eignet.

## Lokal ausführen

Beliebigen statischen Server starten, z. B.:

```sh
python3 -m http.server 8000
```

Dann http://localhost:8000 öffnen. Der Service Worker (Offline-Cache) ist nur über HTTPS aktiv, die App funktioniert lokal aber auch ohne.

## Deployment

Statisches Hosting genügt (z. B. GitHub Pages). Einfach den Inhalt des Repos ausliefern, es gibt keinen Build-Schritt.
