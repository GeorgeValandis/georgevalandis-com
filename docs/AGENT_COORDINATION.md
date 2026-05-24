# Agent Coordination

Stand: 2026-05-23

Zweck: Diese Datei verhindert, dass parallel laufende Agenten dieselben Homepage-Dateien ueberschreiben. Sie ist kein Aufgaben-Backlog, sondern ein kurzer Betriebsmodus fuer vorsichtige Landingpage-Arbeit.

## Sofort-Broadcast fuer laufende Agenten

Wenn du bereits in einem laufenden Agenten-Thread bist, poste dort diese kurze Anweisung:

```text
Bitte sofort docs/AGENT_COORDINATION.md und AGENTS.md lesen. Arbeite nur an deinem App-Slug bzw. deinem expliziten Bereich. Nicht pullen, nicht rebasen, keine globalen Formatierlaeufe, keine fremden uncommitted Aenderungen anfassen. Shared-Dateien nur minimal patchen und vorher git diff -- <datei> pruefen.
```

## Aktueller Repo-Zustand

- Branch: `main`, aktuell 1 Commit hinter `origin/main`.
- Worktree ist stark dirty: viele Landingpage-, Consent-, Legal-, App-Content- und Asset-Aenderungen sind uncommitted.
- Deshalb aktuell kein automatisches `git pull`, kein Rebase, kein Reset und keine fremden Aenderungen bereinigen.

## Zielzustand fuer diese Rollout-Runde

Alle Apps aus `src/content/apps.ts`, die in der App-Sektion auf georgevalandis.com erscheinen, brauchen:

- `websitePath: '/apps/{slug}/'` in `src/content/apps.ts`.
- Einen passenden Record in `src/content/appLandingPages.ts`.
- Lokales App-Icon unter `public/apps/{slug}-icon.*`, sofern die App eine Landingpage hat.
- Mindestens drei echte App-/Store-Screenshots unter `public/apps/{slug}/screens/`.
- Eine Details-Verlinkung ueber `src/components/Work.tsx`.
- Landingpage-Privacy unter `/apps/{slug}/privacy-statement/`, die Website-/Landingpage-Daten beschreibt.
- Terms unter `/apps/{slug}/terms-and-conditions/`.
- Cookie-Consent-Scope `app:{slug}` fuer die Landingpage, getrennt vom Hauptseiten-Scope `site`.
- Gruene Abschlusspruefung: `npm run lint`, `npx tsc --noEmit`, `npm run build`.
- Danach Deployment/Live-Schaltung und Live-Check fuer `https://georgevalandis.com/apps/{slug}/`.

## Laufende Threads laut Seitenleiste

Diese Zuordnung basiert auf der sichtbaren Chat-Liste vom 2026-05-23. Wenn ein Thread bereits fertig ist, soll er keine weiteren Dateien anfassen ausser fuer explizite Nachbesserungen.

| Thread | Primaerer Bereich | Darf bearbeiten | Nicht bearbeiten |
| --- | --- | --- | --- |
| `Erstelle Landingpage fuer SafeTab` | `savetap` | `public/apps/savetap/**`, eigener Record in `src/content/appLandingPages.ts`, noetige App-Registry-Zeile | andere Slugs, Template, Consent/Legal |
| `Erstelle Store-Reviews-Landingpage` | `store-reviews` | `public/apps/store-reviews/**`, eigener Record in `src/content/appLandingPages.ts`, noetige App-Registry-Zeile | andere Slugs, Template, Consent/Legal |
| `Landingpage fuer MediMemo erstellen` | `medimemo` | `public/apps/medimemo/**`, eigener Record in `src/content/appLandingPages.ts`, noetige App-Registry-Zeile | andere Slugs, Template, Consent/Legal |
| `Erstelle Landingpage fuer Axlo` | `axlo` | `public/apps/axlo/**`, eigener Record in `src/content/appLandingPages.ts`, noetige App-Registry-Zeile | andere Slugs, Template, Consent/Legal |
| `Landingpage-Privacy anpassen` | Legal/Consent shared | Privacy/Terms/Consent-Dateien, `src/content/appLegalContent.json`, Support-Content falls noetig | App-Copy und App-Assets ausser fuer konkrete Legal-Links |
| `Landingpage fuer Livecoin erstellen` | `livecoin` | `public/apps/livecoin/**`, eigener Record in `src/content/appLandingPages.ts`, noetige App-Registry-Zeile | andere Slugs, Template, Consent/Legal |
| `Erstelle Landingpage fuer t-rexlow` | vermutlich `trexlo` | `public/apps/trexlo/**`, eigener Record in `src/content/appLandingPages.ts`, noetige App-Registry-Zeile | Schreibweise/Slug nicht ohne Pruefung aendern; andere Slugs |
| `Landingpage fuer Moodflora erstellen` | `moodflora` | `public/apps/moodflora/**`, eigener Record in `src/content/appLandingPages.ts`, noetige App-Registry-Zeile | andere Slugs, Template, Consent/Legal |
| `Erstelle Landingpage fuer Nightlog` | vermutlich `nightlock` | `public/apps/nightlock/**`, eigener Record in `src/content/appLandingPages.ts`, noetige App-Registry-Zeile | Schreibweise/Slug nicht ohne Pruefung aendern; andere Slugs |
| `Landingpage fuer RingSizer erstellen` | `ring-sizer` | `public/apps/ring-sizer/**`, `public/apps/ring-sizer-icon.png`, eigener Record in `src/content/appLandingPages.ts`, noetige App-Registry-Zeile | andere Slugs, Template, Consent/Legal |
| `Erstelle PerfectDay Landingpage` | `perfect-day` | `public/apps/perfect-day/**`, eigener Record in `src/content/appLandingPages.ts`, noetige App-Registry-Zeile | andere Slugs, Template, Consent/Legal |
| `MyGraine-Landingpage bauen` | `my-grain-tracker` | `public/apps/my-grain-tracker/**`, eigener Record in `src/content/appLandingPages.ts`, noetige App-Registry-Zeile | andere Slugs, Template, Consent/Legal |

Hinweis: `SafeTab` wirkt im Code aktuell wie `savetap`. `t-rexlow` wirkt wie `trexlo`. `Nightlog` wirkt wie `nightlock`. Diese Slugs vor Umbenennungen immer gegen `src/content/apps.ts` pruefen.

## Abnahme-Matrix

Stand nach Orchestrator-Audit am 2026-05-23:

| Slug | websitePath | Landing-Content | Screenshots | Status |
| --- | --- | --- | --- | --- |
| `flowa` | ja | ja | 5 | lokal komplett |
| `flower` | ja | ja | 5 | lokal komplett |
| `moodflora` | ja | ja | 3 | lokal komplett |
| `my-grain-tracker` | ja | ja | 4 | lokal komplett |
| `glanceaway` | ja | ja | 4 | lokal komplett |
| `perfect-day` | ja | ja | 4 | lokal komplett |
| `frokus` | ja | ja | 3 | lokal komplett |
| `savetap` | ja | ja | 5 | lokal komplett |
| `ring-sizer` | ja | ja | 5 | lokal komplett |
| `quitergy` | ja | ja | 3 | lokal komplett |
| `axlo` | ja | ja | 3 | lokal komplett |
| `trexlo` | ja | ja | 3 | lokal komplett |
| `store-reviews` | ja | ja | 3 | lokal komplett |
| `medimemo` | ja | ja | 5 | lokal komplett |
| `lifechron` | ja | ja | 5 | lokal komplett |
| `livecoin` | ja | ja | 4 | lokal komplett |
| `nightlock` | ja | ja | 6 | lokal komplett |

Gate-Status:

- `npm run lint`: gruen, nur bestehende Next-`img`-Warnings.
- `npx tsc --noEmit`: gruen.
- `npm run build`: gruen mit System-Node `/usr/local/bin/node`; Codex-App-Node blockiert lokale native Next/LightningCSS-Bindings wegen macOS Library Validation.
- Chrome-Check: Startseiten-Details, Flowa, Frokus, LifeChron und Landingpage-Privacy ohne Console-Errors geprueft.
- Production-Deploy: erfolgreich am 2026-05-23 via `npx vercel deploy --prod -y`.
- Live-Check: alle 17 App-, Privacy- und Terms-URLs unter `https://georgevalandis.com/apps/{slug}/` liefern HTTP 200.

Keine weiteren Agenten sollten jetzt noch neue Slug-Grundlagen anfassen, ausser sie beheben konkrete Check-Fehler.

## Aktive Arbeitsbereiche

Wenn du als Agent eine Aufgabe beginnst, trage hier deinen Bereich ein oder halte dich strikt an den Bereich, den der Nutzer dir genannt hat.

| Bereich | Dateien | Status | Hinweise |
| --- | --- | --- | --- |
| Landingpage-Template | `src/components/AppLandingPage.tsx`, `src/components/AppLandingPage.template.md`, `src/content/appLandingPages.template.ts` | Shared, nur mit Vorsicht | Aenderungen betreffen alle App-Landingpages. Vorher pruefen, ob eine app-spezifische Loesung reicht. |
| App-Registry | `src/content/apps.ts`, `src/components/Work.tsx` | Shared, nur gezielt | Neue Apps hinten anfuegen. Bestehende Slugs, Links und Logos nicht umsortieren. |
| Landingpage-Content | `src/content/appLandingPages.ts` | Hohe Konfliktgefahr | Nur den konkreten App-Record bearbeiten. Keine breite Umformatierung. |
| Legal/Consent | `src/app/apps/[slug]/privacy-statement/page.tsx`, `src/app/apps/[slug]/terms-and-conditions/page.tsx`, `src/components/CookieConsent.tsx`, `src/components/PrivacyStatementContent.tsx`, `public/consent/*`, `docs/consent-log.sql`, `docs/CONSENT_LOG_SETUP.md` | Shared, sehr vorsichtig | Consent-Scope `site` vs. `app:{slug}` erhalten. |
| App-Assets | `public/apps/{slug}/`, `public/apps/{slug}-icon.*` | App-spezifisch | Nur Assets des eigenen Slugs bearbeiten. Keine fremden Icons ersetzen. |

## Beobachtete neue/aktive Slugs

Diese Slugs tauchen im aktuellen Worktree als Landingpage- oder Asset-Arbeit auf:

- `axlo`
- `flowa`
- `flower`
- `frokus`
- `lifechron`
- `livecoin`
- `medimemo`
- `moodflora`
- `my-grain-tracker`
- `nightlock`
- `perfect-day`
- `ring-sizer`
- `savetap`
- `store-reviews`
- `trexlo`

## Vorsichtsregeln

- Vor dem Editieren immer `git diff -- <datei>` ansehen, wenn die Datei bereits geaendert ist.
- Wenn eine Datei schon geaendert ist, nur den benoetigten kleinen Abschnitt patchen.
- Bei `src/content/appLandingPages.ts` keine automatische Sortierung, kein Prettier ueber die ganze Datei, keine Record-Reihenfolge aendern.
- Bei Bildern keine Optimierung oder Konvertierung ueber ganze Ordner laufen lassen.
- Bei unklaren Konflikten stoppen und den Nutzer fragen, statt fremde Arbeit zu ueberschreiben.
- Nach Aenderungen kurz notieren, welche Slugs und Shared-Dateien betroffen waren.

## Empfohlene Abschlusspruefung

Je nach Aenderung:

- Content-only: `npx tsc --noEmit` und `npm run lint`
- Shared React/Next-Code: `npm run lint`, `npx tsc --noEmit`, `npm run build`
- Visuelle Landingpages: zusaetzlich Browsercheck fuer Desktop und Mobile

## Kurzprotokoll

Neue Agenten koennen hier kurze Eintraege anfuegen:

| Zeit | Agent/Task | Bereich | Geaendert | Verifiziert |
| --- | --- | --- | --- | --- |
| 2026-05-23 | Codex Orchestration | Governance | `AGENTS.md`, `docs/AGENT_COORDINATION.md` | Keine Produktdateien geaendert |
| 2026-05-23 | Codex Orchestration | Thread-Zuordnung | `docs/AGENT_COORDINATION.md` | Seitenleisten-Threads in Bereiche gemappt |
| 2026-05-23 | Codex Orchestration | Fehlende App-Landingpages | `flowa`, `frokus`, `lifechron` | Lokale Assets, `websitePath`, Landingpage-Content ergaenzt |
| 2026-05-23 | Codex Orchestration | Deployment | alle 17 App-Landingpages | Build gruen, Production-Deploy gruen, Live-HTTP-200 fuer App/Privacy/Terms |
