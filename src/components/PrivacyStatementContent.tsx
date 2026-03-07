import type { SiteLocale } from '@/lib/siteLocale';
import { localizedPath } from '@/lib/siteLocale';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type PrivacyStatementContentProps = {
  locale: SiteLocale;
};

export default function PrivacyStatementContent({
  locale,
}: PrivacyStatementContentProps) {
  const isGerman = locale === 'de';

  return (
    <main className="min-h-screen bg-gray-950 text-gray-50">
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <Link
          href={localizedPath(locale, '/')}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          {isGerman ? 'Zurück zur Startseite' : 'Back to Home'}
        </Link>

        <header className="mt-8 mb-10">
          <p className="text-amber-400 font-mono text-sm tracking-wider uppercase mb-3">
            {isGerman ? 'Rechtliches' : 'Legal'}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {isGerman ? 'Datenschutzerklärung' : 'Privacy Statement'}
          </h1>
        </header>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? '1. Allgemeine Hinweise' : '1. General Information'}
            </h2>
            {isGerman ? (
              <>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit deinen
                  personenbezogenen Daten passiert, wenn du diese Website besuchst.
                </p>
                <p>
                  Personenbezogene Daten sind alle Daten, mit denen du persönlich identifiziert
                  werden kannst. Die Datenverarbeitung auf dieser Website erfolgt durch den unten
                  genannten Websitebetreiber.
                </p>
              </>
            ) : (
              <>
                <p>
                  The following information provides an overview of what happens to your personal data
                  when you visit this website. Personal data means any information that can identify
                  you personally.
                </p>
                <p>
                  Data processing on this website is carried out by the website operator listed below.
                </p>
              </>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? '2. Verantwortliche Stelle' : '2. Responsible Entity'}
            </h2>
            <p>Georgios Avenidis</p>
            <p>Berliner Strasse 235</p>
            <p>65205 Wiesbaden</p>
            <p>Germany</p>
            <p>Phone: +49 (0) 173 4625411</p>
            <p>
              Email:{' '}
              <a
                href="mailto:info@georgevalandis.com"
                className="text-amber-300 hover:text-amber-200 transition-colors"
              >
                info@georgevalandis.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. Hosting</h2>
            <p>
              {isGerman
                ? 'Diese Website wird bei ALL-INKL.COM - Neue Medien Munnich, Inh. Rene Munnich, Hauptstrasse 68, 02742 Friedersdorf, Deutschland, gehostet.'
                : 'This website is hosted by ALL-INKL.COM - Neue Medien Munnich, Inh. Rene Munnich, Hauptstrasse 68, 02742 Friedersdorf, Germany.'}
            </p>
            <p>
              {isGerman ? 'Angaben des Anbieters:' : 'Provider details:'}{' '}
              <a
                href="https://all-inkl.com/datenschutzinformationen/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-amber-200 transition-colors"
              >
                https://all-inkl.com/datenschutzinformationen/
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? '4. Erhebung von Daten' : '4. How Data Is Collected'}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              {isGerman ? (
                <>
                  <li>Daten, die du selbst übermittelst, zum Beispiel per E-Mail.</li>
                  <li>
                    Technische Daten, die automatisch erfasst werden, etwa Browsertyp,
                    Betriebssystem, Uhrzeit des Zugriffs, Referrer und IP-Adresse in Server-Logfiles.
                  </li>
                </>
              ) : (
                <>
                  <li>Data you submit yourself, for example by email.</li>
                  <li>
                    Technical data collected automatically, such as browser type, operating system,
                    access time, referrer, and IP address (server log files).
                  </li>
                </>
              )}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? '5. Zwecke und Rechtsgrundlagen' : '5. Purposes and Legal Bases'}
            </h2>
            <p>
              {isGerman
                ? 'Personenbezogene Daten werden verarbeitet, um:'
                : 'Personal data is processed to:'}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              {isGerman ? (
                <>
                  <li>die Website bereitzustellen und abzusichern,</li>
                  <li>Anfragen zu beantworten,</li>
                  <li>die Nutzung der Website in anonymisierter Form auszuwerten.</li>
                </>
              ) : (
                <>
                  <li>Provide and secure the website.</li>
                  <li>Respond to inquiries.</li>
                  <li>Analyze website usage in anonymized form.</li>
                </>
              )}
            </ul>
            <p>
              {isGerman
                ? 'Die Verarbeitung erfolgt auf Grundlage der jeweils einschlägigen Rechtsgrundlagen, insbesondere Art. 6 Abs. 1 lit. a, b, c und f DSGVO.'
                : 'Processing is carried out under applicable legal bases, in particular Art. 6 para. 1 lit. a, b, c, and f GDPR depending on the case.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? '6. Cookies und Einwilligungen' : '6. Cookies and Analytics'}
            </h2>
            {isGerman ? (
              <>
                <p>
                  Diese Website verwendet technisch notwendige Cookies und vergleichbare Technologien,
                  um eine sichere und stabile Funktion sicherzustellen und deine Datenschutzeinstellungen
                  zu speichern.
                </p>
                <p>
                  Optionale Kategorien wie Analyse oder Marketing werden nur dann aktiviert, wenn du
                  über das Cookie-Interface ausdrücklich einwilligst.
                </p>
                <p>
                  Du kannst deine Einwilligung jederzeit erteilen, ablehnen oder widerrufen, indem du
                  den Button &quot;Cookie-Einstellungen&quot; auf der Website öffnest.
                </p>
                <p>
                  Zur Dokumentation deiner Auswahl kann die Website einen Consent-Datensatz speichern,
                  der die gewählten Kategorien, den Zeitpunkt der Entscheidung, eine Consent-ID,
                  Browserinformationen und einen pseudonymisierten IP-Hash enthält.
                </p>
              </>
            ) : (
              <>
                <p>
                  This website uses technically necessary cookies and similar technologies to ensure
                  secure and stable functionality and to remember your privacy choices.
                </p>
                <p>
                  Optional categories such as analytics or marketing are only activated if you give
                  explicit consent through the cookie settings interface.
                </p>
                <p>
                  You can grant, refuse, or withdraw consent at any time by opening the{' '}
                  &quot;Cookie Settings&quot; button on the website.
                </p>
                <p>
                  To document your choice, the website may store a consent record containing the
                  selected categories, the decision timestamp, a consent ID, browser information, and
                  a pseudonymized IP hash.
                </p>
              </>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">7. Social Media</h2>
            <p>
              {isGerman
                ? 'Diese Website kann Links oder Einbindungen zu sozialen Netzwerken wie X (ehemals Twitter) enthalten. Wenn solche Einbindungen aktiv sind, können Daten an den jeweiligen Anbieter übertragen werden.'
                : 'This website may include links or integrations to social networks such as X (formerly Twitter). If such integrations are active, data may be transmitted to the provider.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? '8. Deine Rechte' : '8. Your Rights'}
            </h2>
            <p>
              {isGerman
                ? 'Nach der DSGVO hast du insbesondere das Recht auf:'
                : 'Under GDPR, you have the right to:'}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              {isGerman ? (
                <>
                  <li>Auskunft über deine gespeicherten personenbezogenen Daten,</li>
                  <li>Berichtigung oder Löschung,</li>
                  <li>Einschränkung der Verarbeitung,</li>
                  <li>Widerspruch gegen die Verarbeitung in bestimmten Fällen,</li>
                  <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft,</li>
                  <li>Datenübertragbarkeit, soweit anwendbar,</li>
                  <li>Beschwerde bei einer Aufsichtsbehörde.</li>
                </>
              ) : (
                <>
                  <li>Access your stored personal data.</li>
                  <li>Request correction or deletion.</li>
                  <li>Restrict processing.</li>
                  <li>Object to processing in specific cases.</li>
                  <li>Withdraw consent with effect for the future.</li>
                  <li>Data portability where applicable.</li>
                  <li>Lodge a complaint with a supervisory authority.</li>
                </>
              )}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? '9. Kontaktanfragen' : '9. Contact Requests'}
            </h2>
            <p>
              {isGerman
                ? 'Wenn du uns per E-Mail oder Telefon kontaktierst, werden deine Anfrage und die damit verbundenen personenbezogenen Daten zum Zweck der Bearbeitung gespeichert und nicht ohne Rechtsgrundlage weitergegeben.'
                : 'If you contact us by email or phone, your inquiry and related personal data are stored for processing your request and are not shared without legal basis.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? '10. Speicherdauer' : '10. Storage Duration'}
            </h2>
            <p>
              {isGerman
                ? 'Personenbezogene Daten werden nur so lange gespeichert, wie dies für den jeweiligen Zweck oder gesetzliche Aufbewahrungspflichten erforderlich ist.'
                : 'Personal data is stored only as long as required for the processing purpose or legal retention obligations.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? '11. Sicherheit' : '11. Security'}
            </h2>
            <p>
              {isGerman
                ? 'Diese Website nutzt SSL- bzw. TLS-Verschlüsselung zum Schutz übertragener Inhalte.'
                : 'This website uses SSL/TLS encryption to protect transmitted content.'}
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
