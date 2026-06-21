# Sicherheitshinweise

Wenn du eine Sicherheitslücke findest, melde sie bitte nicht über ein
öffentliches Issue, sondern vertraulich über GitHubs Private Vulnerability
Reporting: [Security Advisory erstellen](https://github.com/qudiqudi/jobreif/security/advisories/new).

Unterstützt wird ausschließlich der aktuelle Stand auf `main`
(deployt auf https://jobreif.de).

Zum Kontext: Die App läuft komplett im Browser, es gibt kein Backend.
API-Keys der Nutzer liegen ausschließlich im localStorage des eigenen
Browsers und werden nur direkt an den jeweils gewählten KI-Provider
gesendet. Besonders relevant sind daher Meldungen zu XSS, unsicherem
Umgang mit API-Keys oder Problemen im Service Worker.
