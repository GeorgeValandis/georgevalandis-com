# Interessenabwägung (LIA) – Cloudflare Web Analytics

**Status:** Entwurf – vor Freigabe durch den Verantwortlichen

**Version:** 1.0
**Erstellt:** 13. September 2026
**Geltungsbereich:** georgevalandis.com und öffentliche Landingpages, sofern dort dieselbe manuelle Cloudflare-Web-Analytics-Einbindung und dieselbe Cookie-Information-Funktion aktiv ist.

Dieses Dokument ist eine interne Arbeitsgrundlage für die Prüfung einer Verarbeitung nach
Art. 6 Abs. 1 lit. f DSGVO. Es ist keine Einwilligung, kein Nachweis einer bereits erfolgten
Freigabe und kein Ersatz für eine rechtliche Einzelfallprüfung.

## 1. Verantwortlicher und Verarbeitung

Der Verantwortliche ist im jeweils aktuellen Impressum genannt.

Die Website lädt den Cloudflare-Web-Analytics-Beacon nur, wenn der Build dafür konfiguriert ist
und kein gespeicherter Analytics-Widerspruch vorliegt. Die manuelle Einbindung lädt den Beacon von
`static.cloudflareinsights.com` und übermittelt Messdaten an Cloudflare, Inc.

Der vorgesehene Zweck ist die aggregierte Auswertung von Seitenaufrufen, Referrer-Quellen sowie
technischen Messwerten, etwa Ladezeiten und – soweit vom Dienst ausgewiesen – Browser-, Geräte-,
Seiten- oder Navigationsinformationen.

Für diese Einbindung werden keine eigenen Nutzer-, Besucher- oder Geräte-IDs zur individuellen
Wiedererkennung eingesetzt und keine individuellen Nutzerprofile erstellt. Nach Angaben von
Cloudflare verwendet Web Analytics keine Analytics-Cookies oder Local Storage, kein Fingerprinting
und kein Cross-Site-Tracking einzelner Endnutzer.

Das notwendige Erstanbieter-Cookie für den Cookie-Hinweis und das zusätzliche notwendige
Erstanbieter-Cookie `gv_analytics_optout` für die Analyse-Einstellung sind von der Webanalyse
getrennt. Sie enthalten keine Analysedaten. Eine etwaige serverseitige Dokumentation der
Hinweisbestätigung ist ebenfalls getrennt und stellt keine Analytics-Einwilligung dar.

## 2. Berechtigtes Interesse

Das berechtigte Interesse liegt darin,

- die Herkunft und die aggregierte Nutzung der eigenen Website zu verstehen,
- technische Probleme und Performance-Einbußen zu erkennen,
- Inhalte, Navigation und technische Leistung der Website zu verbessern und
- den Erfolg der eigenen Website-Kommunikation datensparsam zu beurteilen.

Es geht nicht um Werbung, Retargeting, Profilbildung oder die individuelle Wiedererkennung von
Besuchern.

## 3. Erforderlichkeit

Ohne eine Messung stehen keine belastbaren aggregierten Informationen zu Seitenaufrufen,
Referrer-Quellen und realer technischer Leistung zur Verfügung. Die eingesetzte Lösung wurde
wegen ihres vorgesehenen Verzichts auf Analytics-Cookies, Local Storage, Fingerprinting und
Cross-Site-Tracking ausgewählt.

Vor der Freigabe ist zu dokumentieren, dass für denselben Zweck keine gleich geeignete und noch
weniger eingriffsintensive Lösung verfügbar ist und dass nur eine Web-Analytics-Einbindung aktiv
ist.

## 4. Abwägung der Interessen

### Vorteile für den Verantwortlichen

Die Messwerte ermöglichen eine sachliche Beurteilung von Reichweite, Quellen und technischer
Leistung. Dadurch können Inhalte und Fehler priorisiert verbessert werden, ohne Marketingprofile
oder individuelle Besuchshistorien aufzubauen.

### Auswirkungen auf Besucher

Die Auswirkungen sind nach dem aktuellen technischen und vertraglichen Stand begrenzt, weil

- der Beacon selbst keine Analytics-Cookies oder Local Storage verwenden soll,
- keine eigenen Nutzer-, Besucher- oder Geräte-IDs zur individuellen Wiedererkennung eingesetzt
  werden,
- kein Fingerprinting und kein Cross-Site-Tracking einzelner Endnutzer vorgesehen sind,
- keine Werbe- oder Marketingprofile erstellt werden,
- die Analyse-Einstellung jederzeit über „Cookie-Information“ → „Analyse deaktivieren“ geändert
  werden kann und
- bei gespeichertem Widerspruch auf künftigen Seitenaufrufen kein Beacon geladen wird.

Besucher können dennoch erwarten, dass beim Aufruf einer öffentlichen Website technische
Verbindungs- und Messdaten an die eingesetzten Infrastruktur- und Analysedienstleister gelangen.
Diese Erwartung wird durch die Datenschutzerklärung, die Cookie-Information und die sichtbare
Deaktivierungsmöglichkeit konkretisiert.

### Ergebnis der vorläufigen Abwägung

Auf Grundlage der oben beschriebenen Minimierungsmaßnahmen überwiegt das berechtigte Interesse
nicht offensichtlich die Interessen oder Grundrechte der Besucher. Diese Einschätzung gilt jedoch
nur, wenn die technischen Tatsachen, die Cloudflare-Vertragsunterlagen, die Speicherfristen und
eine etwaige Drittlandübermittlung vor der Freigabe geprüft und dokumentiert werden.

## 5. Schutzmaßnahmen

- Manuelle Einbindung eines einzelnen Beacons; keine zusätzliche automatische Cloudflare-Injektion.
- Laden des Beacons nur bei vorhandener Build-Konfiguration und ohne gespeicherten Widerspruch.
- Jederzeitiger technischer Widerspruch über die Cookie-Information.
- Keine Werbe-, Retargeting- oder Marketing-Tracker.
- Klare deutsche und englische Beschreibung in Datenschutzerklärung und Cookie-Information.
- Trennung der notwendigen Hinweis-/Opt-out-Cookies von Analytics-Daten.
- Keine Speicherung von Analytics-Daten im Opt-out-Cookie.

## 6. Vor Freigabe zu vervollständigen

Der Verantwortliche sollte vor einer endgültigen Freigabe noch festhalten:

1. Datum, Name und Freigabe der verantwortlichen Person.
2. Die konkret aktive Cloudflare-Web-Analytics-Konfiguration und den Nachweis, dass kein zweiter
   Beacon oder automatisches Tracking aktiv ist.
3. Die Rolle von Cloudflare, die aktuelle Auftragsverarbeitungs-/Datenschutzvereinbarung und die
   Rechtsgrundlage für eine etwaige Übermittlung in Drittländer.
4. Die anwendbaren Speicher- und Löschfristen bei Cloudflare.
5. Den Anlass für eine erneute Prüfung, mindestens bei Änderung des Beacons, der Cloudflare-
   Bedingungen, der Datenkategorien oder der Opt-out-Funktion.

**Freigabe:** ____________________
**Name / Funktion:** ____________________
**Datum:** ____________________
