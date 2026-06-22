# Hardening-Ticket: Nebenläufige Schreibzugriffe auf `bewerbungstool.history`

Status: geparkt für später.

## Problem

Die gesamte App hält ihren Zustand in einem localStorage-Key
(`bewerbungstool.history`). Jeder Write (`saveAttempt`, `deleteJob`, Import) ist
ein read-modify-write des gesamten Blobs: `loadHistory()` → mutieren →
`saveHistory()`.

Innerhalb eines Tabs ist das unkritisch, solange zwischen Read und Write kein
`await` steht – JS ist single-threaded, ein synchroner Block ist atomar.

Das verbleibende Risiko sind **zwei echte Browser-Tabs**: Sie laufen in
getrennten Event-Loops. Committet Tab B sein `saveHistory` exakt im
Sub-Millisekunden-Fenster zwischen Tab As synchronem Read und Write, geht Bs
Schreibvorgang verloren (lost update). Das gilt app-weit für jede Schreibstelle,
seit Version 1 – es ist keine Eigenheit eines einzelnen Features.

## Warum separat

Eine saubere Lösung betrifft **alle** Schreibstellen und ist ein app-weiter
Eingriff. Sie an ein einzelnes Feature zu koppeln, nur weil dieses zufällig auch
den Blob anfasst, wäre der falsche Auslöser. Darum als eigenständiges Ticket.

## Lösungsskizze

Optimistische Nebenläufigkeit für die gesamte History:

- Ein `rev`-Feld (Zähler oder Zeitstempel) auf dem History-Objekt.
- `saveHistory` schreibt nur, wenn der gespeicherte `rev` noch dem entspricht,
  der beim `loadHistory` gelesen wurde. Bei Drift: frisch lesen, die eigene
  Mutation neu anwenden (Merge auf Feldebene), erneut versuchen.
- Mutationen als kleine, feldgenaue Funktionen ausdrücken (z. B. „setze
  `job.themenfelder`", „füge Versuch an"), damit der Retry die Änderung auf den
  frischen Stand neu anwenden kann, statt einen ganzen Snapshot zurückzuschreiben.

Optional zusätzlich:

- Ein `storage`-Event-Listener, der offene Tabs bei Fremdänderung neu lädt bzw.
  warnt, damit die sichtbare Ansicht nicht auf einem veralteten Stand weiterläuft.

## Akzeptanzkriterien

- Zwei-Tab-Test: In Tab A eine länger laufende Aktion (z. B. eine Ableitung)
  anstoßen, währenddessen in Tab B einen Test abschließen und speichern. Nach
  Abschluss beider stehen sowohl Bs Versuch als auch As Ergebnis in der Historie.
- Bestehende Flows (Speichern, Löschen, Import/Export) unverändert; localStorage
  bleibt abwärtskompatibel (`rev` ist additiv und optional zu lesen).

## Kontext

Ursprünglich aus dem Vertiefungen-Plan ausgelagert (der Plan selbst liegt nicht
mehr im Repo). Der Kern: der Themenfeld-Write begrenzte das Risiko durch einen
rein synchronen read-modify-write auf das Niveau der bestehenden Writes – dieses
Ticket hebt das Niveau für alle Writes gemeinsam an.
