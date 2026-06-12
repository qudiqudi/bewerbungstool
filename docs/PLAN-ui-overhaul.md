# Plan: UI-Overhaul (Branch `feature/ui-overhaul`)

Ziel: Eine moderne, eigenstaendige Huelle, die zum Thema (Karriere, Lernen, Fortschritt) passt und die spaetere Gamification visuell traegt. Reines Re-Skinning - Verhalten, Flows und DOM-Vertraege bleiben unangetastet.

## Leitplanken (nicht verhandelbar)

- Kein Build-Step: weiterhin pures HTML/CSS/JS, eine style.css.
- Alle IDs und JS-relevanten Klassen bleiben stabil (app.js und Tests haengen daran).
- Keine Aenderung an Flows, localStorage oder API-Aufrufen.
- Mobile-first (Pixel/iPhone), Print-Styles der Auswertung bleiben funktionsfaehig.
- Fonts selbst hosten (PWA muss offline starten, keine CDN-Abhaengigkeit).
- prefers-reduced-motion respektieren, WCAG-AA-Kontraste.

## Designrichtung

- Charakter: klar, warm, ermutigend - Lern-App, nicht Behoerdenformular. Kein generischer KI-Look (keine Standard-Palette, kein Inter/Roboto-Einerlei).
- Typografie: markante Display-Schrift fuer Titel/Zahlen (selbst gehostet, z. B. Space Grotesk oder Sora als woff2), Systemschrift fuer Fliesstext.
- Farbsystem als Design-Tokens (CSS Custom Properties): eine Identitaetsfarbe plus die bestehende Ampel-Semantik (gruen/orange/rot) fuer Scores und Schwierigkeit, abgestimmt auf kuenftige Gamification-Akzente (XP, Level, Abzeichen).
- Dark Mode ueber prefers-color-scheme (automatisch, kein Toggle in Phase 1 - Toggle waere neuer Settings-Key, kommt ggf. spaeter additiv).

## Phasen

1. **Fundament**: Design-Tokens (Farben, Typo-Skala fluid, Abstaende, Radien, Schatten), Font-Dateien ins Repo, Dark-Mode-Basistheme. Ergebnis: Seite sieht anders an, alles funktioniert unveraendert.
2. **Komponenten**: Buttons, Karten, Formulare, Tabs, Modus-/Schwierigkeits-Pills, Badges, Lernbox, Modals, Banner, Lade-Panel. Selektoren beibehalten, nur Stil.
3. **Screens**: Header (kompakter, App-artiger), Onboarding (freundlicher Einstieg), Eingabe, Quiz (Fokus-Ansicht: eine Frage, ruhig, grosse Touch-Ziele), Auswertung (animierter Score-Ring, klarere Hierarchie), Historie (Verlaufs-Balken als Mini-Chart aufwerten).
4. **Mikrointeraktionen**: View-Uebergaenge, Button-Feedback, Fortschritts-Animationen, sanfte Aufdeck-Animation der Lernbox - alles hinter prefers-reduced-motion-Guards.
5. **QA**: Mobil-Viewports (412/390 px), Print, Kontrast-Check, Offline-Start (Fonts im SW-Cache, ASSETS-Liste in sw.js ergaenzen), kompletter Flow-Durchklick lokal.

## Risiken und Gegenmittel

- Regression in Flows: Phase 1-4 aendern kein JS; nach jeder Phase kompletter UI-Durchklick mit injizierten Daten.
- Vergessene Views (Timeout-Modal, Fehlerbox, Update-Banner, Druckansicht): Checkliste aller 7 Views + 4 Overlays fuehren.
- sw.js: neue Font-Assets in die ASSETS-Liste aufnehmen, sonst kein Offline-Start.

## Abnahmekriterien

- Alle bestehenden Flows funktionieren unveraendert (Onboarding bis Historie).
- Kein horizontaler Overflow bei 390 px; Touch-Ziele >= 44 px.
- Dark Mode vollstaendig (auch Modals, Banner, Lernbox, Badges).
- Offline-Start mit gecachten Fonts.
- Druckansicht der Auswertung weiterhin sauber.
