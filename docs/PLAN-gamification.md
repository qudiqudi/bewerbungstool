# Plan: Gamification (Branch `feature/gamification`)

Ziel: Nutzer motivieren, dranzubleiben und sich messbar zu verbessern. Alles lokal, kein Backend, kein zusaetzlicher API-Verbrauch.

## Grundprinzip: Ableiten statt speichern

Fast alles laesst sich deterministisch aus der bestehenden Historie berechnen (Versuche mit Datum, Score, Modus, Schwierigkeit). Das haelt die Daten abwaertskompatibel und macht das System reparierbar. Nur zwei kleine, additive Keys kommen dazu:

- `bewerbungstool.stats`: kumulative Aggregate (Gesamt-XP, beste Streak, Zaehler), beim Speichern jedes Versuchs fortgeschrieben - so geht Fortschritt nicht verloren, wenn die Historie bei vollem Speicher alte Versuche verwirft.
- `bewerbungstool.achievements`: Liste freigeschalteter Abzeichen mit Datum (damit Unlock-Hinweise nur einmal erscheinen).

Bestehende Keys (settings, history) bleiben unveraendert.

## Bausteine

1. **XP und Level**: Punkte pro abgeschlossenem Test, gewichtet nach Score, Schwierigkeitsgrad und Modus (Pruefungsmodus > Lernmodus; aufgeloeste Fragen zaehlen weniger). Level mit Karriere-Titeln passend zum Thema (z. B. Praktikum, Junior, Professional, Senior, Lead, C-Level). Level-Fortschritt als Balken im Kopfbereich/Profil.
2. **Streak**: Uebungstage in Folge, berechnet aus den Versuchsdaten der Historie. Anzeige im Kopfbereich; "laengste Streak" in den Aggregaten.
3. **Abzeichen** (deterministisch aus Historie ableitbar, Auswahl):
   - Erster Test abgeschlossen / erster Pruefungsmodus
   - Aufsteiger: +20 Prozentpunkte gegenueber dem ersten Versuch einer Stelle
   - Bestleistung: >= 90 % im Pruefungsmodus
   - Fehlerfrei: alle Multiple-Choice-Fragen eines Tests richtig
   - Marathon: 5 Versuche zur selben Stelle
   - Allrounder: Tests auf allen drei Schwierigkeitsgraden
   - Punktlandung: Pruefungsmodus ohne Zeitueberschreitung abgegeben
   - Streak-Stufen: 3 und 7 Tage
4. **Momente**: Nach der Auswertung Delta zum letzten Versuch derselben Stelle ("+12 Prozentpunkte"), Markierung persoenlicher Bestleistungen, dezente Feier-Animation bei neuem Bestwert oder Abzeichen (reduced-motion beachten). Unlock-Hinweis als Toast im Stil des Update-Banners.
5. **Profil/Uebersicht**: Abschnitt in der Historie-Ansicht (oder eigener Bereich): Level, XP, Streak, Abzeichen-Galerie (gesperrte Abzeichen grau mit Hinweis, wie man sie bekommt).

## Bewusst NICHT enthalten

- Keine Mechanik, die zusaetzliche API-Aufrufe belohnt oder ausloest (Kostenschutz) - XP gibt es pro abgeschlossenem, ohnehin bezahltem Test, nie fuer "mehr Calls".
- Kein Backend, keine Vergleiche zwischen Nutzern (Leaderboards) - Daten bleiben lokal.
- Keine Pflicht-Elemente: Wer Gamification ignoriert, kann das Tool exakt wie bisher nutzen.

## Phasen

1. **Stats-Engine**: Berechnungsmodul (XP, Level, Streak, Abzeichen-Bedingungen) aus Historie + Aggregat-Fortschreibung in saveAttempt. Reine Logik, keine UI; mit injizierten Historien testbar.
2. **Profil-Widget**: Level/XP/Streak-Anzeige (Kopfbereich + Historie), Abzeichen-Galerie.
3. **Momente**: Delta- und Bestwert-Anzeige in der Auswertung, Unlock-Toasts, Feier-Animation.
4. **QA**: Fixtures fuer Grenzfaelle (leere Historie, Historie aus Vor-Gamification-Zeit, geprunte Historie), Mobile, Abnahme.

## Abhaengigkeit

Setzt auf dem UI-Overhaul auf (Merge-Reihenfolge: ui-overhaul zuerst), damit Widgets direkt im neuen Designsystem entstehen. Die Stats-Engine (Phase 1) ist UI-frei und kann parallel zum Overhaul entwickelt werden.

## Abnahmekriterien

- Bestehende Nutzerdaten (Historie von vor der Gamification) ergeben rueckwirkend korrekte XP/Abzeichen, ohne Migration.
- Kein neuer API-Aufruf durch Gamification-Funktionen.
- Toasts/Animationen stoeren laufende Tests nicht und respektieren reduced-motion.
- Tool bleibt ohne Beachtung der Gamification vollstaendig nutzbar.
