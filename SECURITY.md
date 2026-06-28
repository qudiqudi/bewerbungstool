# Sicherheitshinweise

Wenn du eine Sicherheitslücke findest, melde sie bitte nicht über ein
öffentliches Issue, sondern vertraulich über GitHubs Private Vulnerability
Reporting: [Security Advisory erstellen](https://github.com/qudiqudi/jobreif/security/advisories/new).

Unterstützt wird ausschließlich der aktuelle Stand auf `main`
(deployt auf https://jobreif.de).

Zum Kontext: Im BYOK-/lokalen Modus läuft die App komplett im Browser ohne
Backend; die API-Keys der Nutzer liegen dann ausschließlich im localStorage
des eigenen Browsers und werden nur direkt an den jeweils gewählten KI-Provider
gesendet. Im standardmäßigen gehosteten Modus laufen die Generierungs-Anfragen
über einen eigenen Cloudflare-Worker (`api.jobreif.de`) – dort wird kein
Nutzer-API-Key benötigt. Besonders relevant sind daher Meldungen zu XSS,
unsicherem Umgang mit API-Keys oder Problemen im Service Worker.

Eine Ausnahme vom „bleibt im Browser“-Grundsatz: Wenn du eine Stellenanzeige
**per URL** importierst, wird die eingegebene Adresse an den Drittanbieter-Reader
Jina AI (`r.jina.ai`) gesendet, der die Seite abruft und den lesbaren Text
zurückliefert. Das Einfügen als Text (`Text einfügen`) bleibt dagegen
vollständig lokal.
