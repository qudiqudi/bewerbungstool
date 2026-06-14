# Vertiefungen – Implementierungsplan

Feature-Idee: Pro Stelle freischaltbare, thematisch vertiefte Fragebögen.
Dieser Plan ist die Grundlage für einen adversarialen Design-Review. Es ist
noch kein Code geschrieben.

## 1. Konzept (fixiert)

- Vertiefungen werden **pro Stelle ab Level 3** freigeschaltet (nicht global).
- Begründung Level 3: Das Feature verursacht zusätzliche Kosten, und eine
  Vertiefung ergibt erst Sinn, wenn der Nutzer die Stelle schon einige Male
  durchgespielt hat (Grundverständnis vorhanden, Schwachstellen erkennbar).
- Der Nutzer wählt **bis zu 3 Themenfelder**; die Mindest-Fragenzahl floatet mit:
  1 Feld ab 4 Fragen, 2 Felder ab 8, 3 Felder ab 10. Obergrenze bleibt 30.
- Themenfelder werden **einmalig je Stelle abgeleitet und gecacht**, dabei mit
  den Schwachstellen aus den bisherigen Versuchen gekreuzt.
- **Für lokale Modelle nicht angeboten** (Modelle halluzinieren bei generativen
  Quellen/Feldern; treffsichere Themenfelder sind genau so eine Aufgabe).
- **Schwierigkeit fix auf „schwer"** – eine Vertiefung soll explizit fordern.

## 2. Level-Mechanik (Ist-Zustand)

Aus `levelForXp` (`app.js:2298`): Stufe 1 ab 0 XP, jede weitere Stufe kostet
50 XP mehr. XP pro Versuch = erreichtes Prozent (0–100).

- Level 2 ab 100 XP
- Level 3 ab 250 XP

Bei Default-10-Fragen und ~70 % Treffer entspricht das grob 4 Versuchen bis
Level 3 – erreichbar an einem Nachmittag, aber nicht trivial.

## 3. Datenmodell (localStorage, rein additiv)

Beide Erweiterungen sind **optionale Felder** – altes Rendering ignoriert sie,
alte Einträge bleiben gültig (Regel „keine Breaking Changes").

Am Job-Objekt in `bewerbungstool.history`:

```
job.themenfelder = {
  v: 1,
  generatedAt: <ts>,
  generatedAtLevel: <int>,   // Stand für den Hintergrund-Refresh (siehe 8.)
  fields: [{ id, label, kurzbeschreibung, schwerpunkt: bool }],  // 4–6 Felder
  cost, tokens               // zur Anzeige analog zu Versuchen
}
```

`schwerpunkt: true` markiert Felder, die aus schwachen Antworten abgeleitet
wurden – die heben wir in der Auswahl optisch hervor.

Am Versuch (in `saveAttempt`, `app.js:3062`):

```
attempt.vertiefung = { felder: [{ id, label }] }   // nur bei Vertiefungs-Versuchen
```

Normale Versuche haben das Feld nicht – defensiv lesen.

## 4. Freischalt-Logik

- Gate je Stelle über `computeJobProgress(job).level >= VERTIEFUNG_MIN_LEVEL`
  (`= 3`), nicht global – Vertiefung ist stellenbezogen.
- Helfer `xpThresholdForLevel(n)` (Loop analog `levelForXp`), statt 250 hart zu
  verdrahten, damit der ausgegraute Button „noch X XP bis Stufe 3" zeigen kann
  (`totalXp` liegt in `computeJobProgress`).
- Zusätzlicher Block bei `settings.provider === "local"`: Button bleibt aus,
  Hinweis „nicht für lokale Modelle".

## 5. Themenfeld-Ableitung (lazy, einmal pro Stelle)

- Auslöser: erster Klick auf den freigeschalteten Vertiefungs-Button, wenn
  `job.themenfelder` fehlt. Nie beim Anlegen der Stelle – spart Kosten für
  Stellen, die Level 3 nie erreichen.
- Doppel-Auslösung verhindern (gegen versehentliche Doppel-Calls): die Ableitung
  läuft über denselben `actionRunning`-Guard wie die übrige Generierung
  (`app.js:1646`) – setzen vor dem Call, im `finally` zurücksetzen. Der
  auslösende Button wird synchron beim Klick deaktiviert und zeigt den
  Lade-Zustand. Damit kann innerhalb eines Tabs kein zweiter Call starten.
- Eingabe an `callLLM`: Stellentext + eine knappe Schwachstellen-Zusammenfassung,
  aggregiert aus `job.attempts[*].result.ergebnisse[*].punkte` zusammen mit
  `quiz.fragen[*].kategorie/frage`. So bekommt das Modell „wo stand der Nutzer
  schlecht".
- Neues kleines `THEMENFELDER_SCHEMA`: Array aus 4–6
  `{ id, label, kurzbeschreibung, schwerpunkt }`. Eigener System-Prompt:
  „Leite trennscharfe, stellenspezifische Themenfelder ab; priorisiere die, in
  denen der Bewerber schwach war."
- Ergebnis speichern wie jeder andere History-Write in dieser App (siehe
  Abschnitt 9.1): nach dem Call `loadHistory()` frisch lesen, Job über
  `key`/`urlKey` finden, nur dessen `themenfelder` setzen, `saveHistory`. Wenn
  ein zwischenzeitlich gespeicherter `themenfelder`-Stand bereits neuer ist
  (`generatedAt`), nicht überschreiben. Loading-Overlay während des Aufrufs.

## 6. UI – Vertiefung im Start-Panel (`buildStartPanel`, `app.js:3376`)

Unter den zwei bestehenden Startknöpfen ein dritter Bereich:

- Gesperrt: ausgegrauter Button „Vertiefungen" + Subtext „ab Stufe 3 – noch X
  XP" (bzw. „nicht für lokale Modelle"). Hängt sichtbar an der schon vorhandenen
  XP-Leiste.
- Frei: Button „Vertiefung starten". Klick klappt einen Auswahlbereich auf (kein
  Aufruf, bis explizit gestartet wird – Kostenregel):
  - Themenfeld-Chips, **Auswahl 1–3** (Schwerpunkt-Felder hervorgehoben). Toggle
    über 3 hinaus deaktiviert.
  - **Bei 0 ausgewählten Feldern sind beide Startknöpfe deaktiviert** – eine
    Vertiefung ohne Thema gibt es nicht. Erst ab einem gewählten Feld werden sie
    aktiv.
  - Fragen-Stepper, dessen Minimum live mitfloatet.
  - Zwei Startknöpfe „Lernmodus" / „Prüfung".
  - **Keine Schwierigkeit-Chips** – fix auf „schwer".

## 7. Dynamisches Stepper-Minimum

- `buildNumStepper` (`app.js:3334`) um optionales `{ min }` und eine
  `setMin(n)`-Methode am zurückgegebenen Element erweitern (re-klemmt den
  aktuellen Wert hoch, zieht Anzeige/Buttons mit – analog zum bestehenden
  `setValue`). Bestehende Aufrufe ohne `min` bleiben bei 4. Abwärtskompatibel.
- Helfer `vertiefungMinFragen(count)` → `0:4, 1:4, 2:8, 3:10` (für `count = 0`
  bewusst der Basiswert 4, damit der Stepper auch ohne Auswahl einen gültigen
  Bereich hat – gestartet wird in dem Zustand ohnehin nicht). Bei jeder
  Chip-Änderung `stepper.setMin(...)`.

## 8. Generierung des Vertiefungsbogens

**Kein Modul-Global.** Die Vertiefungs-Felder werden als expliziter Parameter
durchgereicht, nicht über eine gesetzte/geleerte Modulvariable – sonst kann ein
fehlgeschlagener Lauf, ein zweiter Start oder eine parallel laufende normale
Generierung den Zustand verschmutzen und einen Bogen mit falschen Constraints
oder falscher `attempt.vertiefung`-Metadaten speichern.

- `generateQuiz` (`app.js:1645`) bekommt ein optionales Optionsargument, z. B.
  `generateQuiz({ vertiefung })` mit `vertiefung = { felder }`. Ohne Argument
  verhält es sich exakt wie heute (abwärtskompatibel; bestehende Aufrufe bleiben
  `generateQuiz()`).
- `startTestForJob` (`app.js:3468`) reicht das Argument explizit weiter – kein
  Zwischenspeichern in Modulzustand.
- Validierung im Einstieg, nicht nur im UI: Ist `vertiefung` gesetzt, aber
  `vertiefung.felder` leer/undefiniert, bricht `generateQuiz` vor dem Modell-Call
  mit Fehlermeldung ab (kein bezahlter Lauf, keine irreführende
  `attempt.vertiefung`-Metadate). Das UI sperrt die Startknöpfe ohnehin (Abschnitt
  6), aber der Entry-Point verlässt sich nicht darauf.
- Innerhalb von `generateQuiz` werden die Felder synchron auf das frisch
  gebaute `quiz`-Objekt geschrieben (`quiz.vertiefungFelder = felder`). Das
  `quiz`-Objekt ist ohnehin der Träger pro Generierung (wie `genCost`/`urlKey`)
  und wird beim Start atomar neu gesetzt – kein separater, zu leerender Zustand.
- Überlappende Läufe sind bereits ausgeschlossen: `generateQuiz` und
  `startTestForJob` steigen bei `actionRunning` früh aus (`app.js:1646`,
  `app.js:3469`). Darauf stützen wir uns, statt neue Guards zu erfinden; das
  UI-Doppelklick-Risiko ist damit abgedeckt.
- Prompt-Augmentierung in `generateQuiz` nur, wenn `vertiefung` gesetzt ist:
  System-Zusatz „Dies ist ein Vertiefungsbogen", User-Zusatz „Konzentriere alle
  Fragen ausschließlich auf folgende Themenfelder: … Verteile die Fragen
  möglichst gleichmäßig (bei 10 Fragen / 3 Feldern z. B. 4/3/3)." Schwierigkeit
  wird lokal auf „schwer" gesetzt (überschreibt den DOM-Wert nur für diesen
  Lauf), damit greift `DIFFICULTY_MIX.schwer`.
- In `saveAttempt` wird `quiz.vertiefungFelder` als `attempt.vertiefung`
  rausgeschrieben und aus `quizCopy` gelöscht (wie schon `genCost`/`urlKey`).
- Reuse: restlicher Flow (Lern-/Prüfungsmodus, Auswertung, XP) bleibt identisch.
  Vertiefungs-Versuche zählen in denselben XP-Topf.

## 9. Auffrischen der Themenfelder (explizit, mit Hinweis)

Themenfelder werden einmal gecacht, sollen sich aber auffrischen lassen, wenn
sich nach weiteren Leveln die Schwächen verschoben haben.

Der ursprünglich angedachte stille Fire-and-forget-Call beim nächsten
Generieren ist **verworfen** – aus zwei Gründen:

1. Er löst einen zweiten, bezahlten Call aus, den der Nutzer nicht angefordert
   hat (er wollte einen Fragebogen). Das verstößt gegen die Projektregel, dass
   kostenverursachende Aktionen nie unbeabsichtigt auslösbar sind.
2. Ein detachter Callback persistiert gegen einen veralteten History-Snapshot
   und kann mit dem Vordergrund-Save (oder einem zweiten Tab) rennen und so
   frische Daten überschreiben.

Stattdessen **explizites Auffrischen mit niedriger Reibung**:

- Beim Öffnen des Vertiefungs-Panels prüfen, ob die Themenfelder veraltet sind:
  `computeJobProgress(job).level >= job.themenfelder.generatedAtLevel + 2`
  (und `provider !== "local"`).
- Ist das der Fall, oben im Panel ein dezenter Hinweis plus Knopf:
  „Deine Themenfelder sind älter – neu ableiten? (kostet einen Modell-Aufruf)".
  Die alten Felder bleiben nutzbar; der Nutzer entscheidet bewusst.
- Klick führt denselben foreground-Ableitungs-Call wie in Abschnitt 5 aus
  (mit Loading-Overlay, awaited, Fehler sichtbar) – kein detachter Pfad.
- Persistenz nach dem in 9.1 beschriebenen Muster.
- Kosten/Token der Ableitung werden – wie bei der Erst-Ableitung – am
  `job.themenfelder` mitgeführt und sind so nachvollziehbar.

### 9.1 Persistenz- und Nebenläufigkeits-Modell (bewusste Entscheidung)

Der Review fordert für das Schreiben der Themenfelder eine echte
Konflikt-Strategie (Revision-Counter mit Retry/Merge) oder einen eigenen
localStorage-Key pro Stelle. Beides setze ich **bewusst nicht** um, weil es
gegen die bestehende Architektur arbeitet:

- Die gesamte App hält ihren Zustand in **einem** Key (`bewerbungstool.history`).
  Jeder Write – auch `saveAttempt`, `deleteJob`, Import – ist ein nicht-atomarer
  read-modify-write dieses einen Blobs. Das ist keine Eigenheit der Vertiefung,
  sondern das Datenmodell der App (und Voraussetzung für den
  Export/Import-Flow). Ein eigener Themenfeld-Key würde diesen Flow und die
  Storage-Regeln aus CLAUDE.md brechen.
- Den Themenfeld-Write auf einen höheren Konsistenz-Standard zu heben als
  `saveAttempt`, das täglich läuft, wäre inkonsistent. Wir gleichen ihn dem
  bestehenden Muster an, statt ein zweites Persistenz-Modell einzuführen.

Was wir **tun**, um das reale Risiko klein zu halten:

- Der LLM-Call ist langlaufend, der gefährliche Teil ist nur der
  read-modify-write danach. Deshalb `loadHistory()` **erst unmittelbar vor dem
  Schreiben** aufrufen (nach Rückkehr des Calls), nicht den beim Panel-Aufbau
  gefangenen Snapshot benutzen.
- **Harte Regel: zwischen `loadHistory()` und `saveHistory()` kein `await`.**
  Read-modify-write läuft in einem einzigen synchronen Tick. Das ist die
  eigentliche Sicherheitseigenschaft: JS ist im Tab single-threaded, in einem
  synchronen Block kann kein anderer Tab-Callback und kein eigener Handler
  dazwischenfunken. Damit ist dieser Write **exakt so sicher wie `saveAttempt`**
  und nicht „etwas weniger sicher" – das von Codex beschriebene Fenster
  „nach loadHistory, vor saveHistory" existiert innerhalb unseres Tabs schlicht
  nicht, solange dort kein `await` steht.
- Innerhalb dieses frischen Reads nur das eine Feld `themenfelder` des über
  `key`/`urlKey` gefundenen Jobs ersetzen; alles andere (Versuche, andere Jobs)
  bleibt der frisch gelesene Stand.
- Wenn der frisch gelesene `themenfelder.generatedAt` bereits neuer ist als der
  eigene Stand, nicht überschreiben (deckt Doppelklick und den häufigen
  Tab-Fall ab).

Residuales Risiko – ehrlich benannt: Zwei **echte** Browser-Tabs laufen in
getrennten Event-Loops. Committet Tab B sein `saveHistory` exakt im
Sub-Millisekunden-Fenster zwischen Tab As synchronem Read und Write, kann Bs
Schreibvorgang verloren gehen. Das ist **kein vom Feature eingeführtes Problem**,
sondern gilt app-weit für jeden einzelnen Write (`saveAttempt`, `deleteJob`,
Import) seit jeher. Dieses Feature fügt eine weitere Schreibstelle mit demselben
winzigen Fenster hinzu – es verändert die Risiko-Klasse nicht.

Bewusste Scope-Entscheidung: Eine echte optimistische Nebenläufigkeit
(Versionsfeld auf der **gesamten** History plus Compare-and-Retry-Merge in
`saveHistory`) würde **alle** Schreibstellen betreffen und ist ein
eigenständiges, app-weites Hardening – ausgelöst werden sollte es durch eine
bewusste Entscheidung, nicht dadurch, dass die Vertiefung zufällig den Blob
anfasst. Es als Voraussetzung für dieses Feature zu fordern, hieße, eine
seit Version 1 bestehende Eigenschaft der App ausgerechnet hier zu einem Blocker
zu erklären. Daher: **separates Hardening-Ticket** (siehe unten), nicht Teil der
Vertiefungen. Wenn dieses Ticket umgesetzt wird, übernimmt dieser Write-Pfad das
gemeinsame Muster automatisch mit.

## 10. Historie/Auswertung

- In der Versuchszeile der Historie und in der Auswertungs-Meta ein dezentes
  „Vertiefung: X, Y" zeigen, wenn `attempt.vertiefung` existiert. Defensiv –
  fehlt bei allen Alt-Versuchen.

## 11. Querschnitt

- Kosten: jeder kostenverursachende Schritt (Ableitung, Generierung) nur per
  explizitem Klick bzw. gekoppelt an eine Nutzeraktion; Auswahlbereich allein
  löst nichts aus.
- Mobile ≤600px: Chips umbrechend, Touch-Flächen wie bei Schwierigkeit; bei
  360px prüfen.
- Umlaute durchgängig (ä/ö/ü/ß).

## 12. Deployment-Ritual

`VERSION` hochzählen, `APP_VERSION` + neuer `CHANGELOG`-Eintrag oben in `app.js`,
Feature-Branch + PR, CI grün, dann mergen. Lokal vorher
`python3 -m http.server` und Flows durchklicken.

Zusätzliche manuelle Testfälle für dieses Feature:

- Doppelklick auf „Themenfelder ableiten" / „neu ableiten" löst nur **einen**
  Call aus (Button synchron deaktiviert, `actionRunning`-Guard greift).
- Start ohne gewähltes Themenfeld ist nicht möglich (Buttons deaktiviert), und
  ein direkter `generateQuiz`-Aufruf mit leerem `felder` bricht vor dem Call ab.
- Zwei-Tab-Fall: in Tab A eine Ableitung anstoßen, während in Tab B ein Test
  abgeschlossen und gespeichert wird; prüfen, dass Bs Versuch nach Abschluss
  beider noch in der Historie steht. (Belegt, dass der synchrone
  read-modify-write das Verhalten nicht verschlechtert.)

## 13. PR-Schnitt

- **PR 1 – Fundament:** Datenfelder (`themenfelder`/`vertiefung`),
  `xpThresholdForLevel`, `buildNumStepper.setMin`, Gating-Logik + ausgegrauter
  Button mit XP-Hinweis. Noch ohne Generierung. Klein, risikoarm.
- **PR 2 – Funktion:** Themenfeld-Ableitung (Schema/Prompt) inkl. explizitem
  Auffrischen mit Hinweis, Auswahl-UI (Chips + dynamischer Stepper, ohne
  Schwierigkeit), Generierung auf „schwer" über expliziten `generateQuiz`-Param,
  Historie-Anzeige.

## Separates Hardening-Ticket (nicht Teil dieses Features)

App-weite optimistische Nebenläufigkeit für `bewerbungstool.history`:
Versionsfeld auf der gesamten History plus Compare-and-Retry-Merge in
`saveHistory`, sodass alle Schreibstellen (`saveAttempt`, `deleteJob`, Import,
Themenfeld-Write) den Zwei-Tab-Lost-Update-Fall sauber behandeln. Bewusst
ausgelagert, weil es alle Writes betrifft und nicht an dieses Feature gekoppelt
gehört. Optional zusätzlich ein `storage`-Event-Listener, der offene Tabs bei
Fremdänderung neu lädt.

## Offene Annahmen, die der Review prüfen soll

- Ist Level 3 (250 XP, ~4 Versuche) der richtige Schwellenwert, oder zu früh/spät?
- Tragen die Bänder 4/8/10 inhaltlich (genug Fragen je Feld für echte Vertiefung)?
- Reicht „Schwachstellen aus `punkte` aggregieren" als Input, oder ist das zu
  grobkörnig für treffsichere Themenfelder?
- Ist explizites Auffrischen mit Hinweis die richtige Wahl (statt automatisch),
  oder erwartet der Nutzer doch, dass die Felder sich von allein aktualisieren?
- Fließen Vertiefungs-Versuche zu Recht in denselben XP-Topf, oder verzerrt das
  die Progression?
