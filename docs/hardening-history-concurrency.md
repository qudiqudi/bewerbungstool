# Nebenläufige Schreibzugriffe auf `bewerbungstool.history`

Status: umgesetzt. Dieses Dokument beschreibt das gelöste Problem und die
Mechanik – kein offenes Ticket mehr.

## Problem (vorher)

Die gesamte App hält ihren Zustand in einem localStorage-Key
(`bewerbungstool.history`). Jeder Write war ein read-modify-write des gesamten
Blobs: `loadHistory()` → mutieren → `saveHistory()`.

Innerhalb eines Tabs ist das unkritisch, solange zwischen Read und Write kein
`await` steht – JS ist single-threaded, ein synchroner Block ist atomar.

Das Risiko waren **zwei echte Browser-Tabs**: Sie laufen in getrennten
Event-Loops. Committet Tab B sein `saveHistory` im Fenster zwischen Tab As
synchronem Read und Write, ging Bs Schreibvorgang verloren (lost update). Das
galt app-weit für jede Schreibstelle.

## Lösung

Eine einzige serialisierte Schreibsektion, `mutateHistory(mutator)` in `app.js`:

- Liest die History **innerhalb** der kritischen Sektion frisch, lässt den
  `mutator` sie in place ändern und schreibt zurück.
- Die Sektion läuft unter einem origin-weiten Lock der **Web Locks API**
  (`navigator.locks.request("bewerbungstool.history", …)`). Der Lock serialisiert
  den read-modify-write über alle Tabs desselben Origins – parallele Tabs können
  sich nicht mehr gegenseitig überschreiben.
- Der `mutator` ist synchron (kein `await` zwischen Lesen und Schreiben), damit
  die Atomarität der Sektion innerhalb eines Tabs erhalten bleibt.

Alle vier Schreibstellen laufen darüber: `saveAttempt`, `saveThemenfelder`,
`deleteJob` und der History-Teil von `importData`. Ihre Aufrufer sind bereits in
asynchronen Kontexten und `await`-en den Write.

Gibt ein `mutator` explizit `false` zurück, war nichts zu ändern – dann
unterbleibt der Write. Das vermeidet No-op-Schreibvorgänge, die unter Quota-Druck
sonst die Bereinigung (ältesten Versuch verwerfen) auslösen und echte Daten
verdrängen könnten, obwohl sich nichts geändert hat (relevant z. B. für
`saveThemenfelder`, wenn keine passende Stelle existiert oder bereits neuere
Themenfelder vorliegen).

Ergänzend trägt `saveHistory` ein additives `rev`-Feld (Zähler) auf dem
History-Objekt. Es ist optional und abwärtskompatibel (alte Leser ignorieren es)
und macht eine Fremdänderung für künftige Erweiterungen erkennbar.

## Warum kein reines `rev`-Compare-and-Swap

`localStorage` kennt kein atomares Compare-and-Swap. Ein „schreibe nur, wenn
`rev` noch passt" ist selbst nicht atomar – zwei Tabs können denselben `rev`
lesen, beide den Check bestehen und beide schreiben. `rev` allein *erkennt* Drift
also nur, es *verhindert* den Lost Update nicht. Die echte Serialisierung
liefert der Web-Lock; `rev` ist nur additive Drift-Information.

## Residuales Verhalten ohne Web Locks

In sehr alten Browsern ohne Web Locks API fällt `mutateHistory` auf den früheren
synchronen read-modify-write zurück (best effort) – dort besteht das
ursprüngliche Sub-Millisekunden-Fenster theoretisch weiter, aber es gibt keinen
Regress gegenüber vorher. Web Locks ist in allen aktuellen Browsern verfügbar
(Chrome/Edge seit 69, Firefox seit 96, Safari seit 15.4).

## Optional, nicht umgesetzt

- Ein `storage`-Event-Listener, der offene Tabs bei Fremdänderung neu rendert,
  damit die sichtbare Liste nicht auf einem veralteten Stand weiterläuft. Das
  betrifft die *Anzeige*, nicht die Datenintegrität (die der Lock schon sichert),
  und birgt Risiko, laufende Flows zu stören – daher bewusst separat gelassen.
