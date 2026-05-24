# Agentenregeln fuer diese Homepage

Diese Datei gilt fuer `/Users/georgiosavenidis/CascadeProjects/windsurf-project/homepage`.

## Erst lesen

1. Globalen Wissenspalast lesen:
   `/Users/georgiosavenidis/.codex/WISSENSPALAST.md`
2. Danach nur projektnahe Dateien lesen, die fuer die konkrete Aufgabe relevant sind:
   `README.md`, `docs/WISSENSPALAST.md` falls vorhanden, und passende Aufgaben-Dokumente.
3. Nicht pauschal alle Markdown-Dateien laden.
4. Bei Frontend-, Website-, Web-App- oder visuellen UI-Aufgaben den verfuegbaren `frontend-skill` / Brix-Frontend-Skill nutzen.

## Multi-Agent-Koordination

Vor jeder Datei-Aenderung:

1. `git status --short --branch` pruefen.
2. `docs/AGENT_COORDINATION.md` lesen.
3. Eine konkrete Datei- oder App-Slug-Zustandigkeit waehlen.
4. Nur Dateien anfassen, die fuer diese Zustandigkeit notwendig sind.

Wenn mehrere Agenten parallel arbeiten:

- Pro Agent moeglichst nur einen App-Slug gleichzeitig bearbeiten.
- App-spezifische Assets nur unter `public/apps/{slug}/` und `public/apps/{slug}-icon.*` bearbeiten.
- App-spezifische Copy nur im passenden Record in `src/content/appLandingPages.ts` bearbeiten.
- Neue Apps nur in `src/content/apps.ts` anfuegen, nicht bestehende Eintraege umsortieren.
- Shared-Dateien wie `src/components/AppLandingPage.tsx`, `src/components/CookieConsent.tsx`, `src/components/Work.tsx`, `src/content/siteCopy.ts`, Legal-Routen und Consent-PHP nur bearbeiten, wenn die Aufgabe explizit shared Verhalten betrifft.
- Keine globalen Formatierlaeufe ueber das ganze Repo, solange andere Agenten parallel arbeiten.
- Keine `git pull`, `rebase`, `reset`, `checkout --`, Massenloeschungen oder Asset-Ersetzungen ohne klare Zustimmung.
- Keine fremden uncommitted Aenderungen zuruecksetzen.

## Landingpage-Qualitaetsstandard

- Jede Landingpage muss echte Produktwahrheit zeigen: reale Screenshots, konkrete Workflows, keine Platzhalter und keine generische SaaS-Card-Flut.
- Hero und Screenshot-Auswahl muessen den App-Nutzen im ersten Viewport klar machen.
- Copy kurz halten: Suchintention, konkreter Nutzen, Vertrauen, Store-Klick.
- Privacy/Terms fuer Landingpages muessen Website-/Landingpage-Daten beschreiben, nicht ungeprueft Mobile-App-Privacy kopieren.
- Consent bleibt nach Scope getrennt: Hauptseite `site`, App-Landingpage `app:{slug}`.

## Vor Abschluss

Mindestens ausfuehren, sofern die Aufgabe Code oder Content beruehrt:

- `npm run lint`
- `npx tsc --noEmit`
- fuer groessere/shared Aenderungen zusaetzlich `npm run build`

Bei visuellen Landingpage-Aenderungen desktop und mobil im Browser pruefen.
