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
                  <li>zu speichern, dass der Cookie-Hinweis bestätigt wurde.</li>
                </>
              ) : (
                <>
                  <li>Provide and secure the website.</li>
                  <li>Respond to inquiries.</li>
                  <li>Remember that the cookie notice was acknowledged.</li>
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
              {isGerman
                ? '6. Cookies und ähnliche Technologien'
                : '6. Cookies and Similar Technologies'}
            </h2>
            {isGerman ? (
              <>
                <p>
                  Diese Website verwendet keine Analyse- oder Marketing-Cookies und lädt keine
                  Analyse-, Werbe- oder Marketing-Tracker.
                </p>
                <p>
                  Wenn du den Cookie-Hinweis bestätigst, speichert die Website ausschließlich das
                  notwendige Erstanbieter-Cookie <code>gv_cookie_notice_*</code>. Es enthält nur die
                  Version des bestätigten Hinweises und verhindert, dass derselbe Hinweis bei jedem
                  Seitenaufruf erneut erscheint. Das Cookie wird bis zu 180 Tage gespeichert.
                </p>
                <p>
                  Für die Cookie-Hinweisfunktion selbst werden kein Local Storage und keine Analyse-
                  oder Marketing-Technologien verwendet. Wenn die serverseitige Protokollierung aktiv
                  ist, werden die Bestätigung, Version, Geltungsbereich, Zeitpunkt, Seitenadresse,
                  Sprache und Zeitzone sowie ein gesalzener IP-Hash und der User-Agent in einem
                  getrennten Consent-Protokoll dokumentiert. Diese Dokumentation ist keine Einwilligung
                  in Analyse oder Marketing.
                </p>
                <p>
                  Du kannst die Angaben jederzeit über den Button &quot;Cookie-Information&quot; erneut
                  öffnen. Das notwendige Cookie wird auf Grundlage von § 25 Abs. 2 Nr. 2 TDDDG
                  eingesetzt, um die von dir angeforderte Speicherung der Hinweisbestätigung
                  bereitzustellen.
                </p>
              </>
            ) : (
              <>
                <p>
                  This website does not use analytics or marketing cookies and does not load
                  analytics, advertising, or marketing trackers.
                </p>
                <p>
                  If you acknowledge the cookie notice, the website stores only the necessary
                  first-party cookie <code>gv_cookie_notice_*</code>. It contains only the version of
                  the acknowledged notice and prevents the same notice from appearing on every page
                  view. The cookie is kept for up to 180 days.
                </p>
                <p>
                  The cookie-notice function itself does not use local storage or analytics and
                  marketing technologies. If server-side logging is enabled, the acknowledgement,
                  version, scope, timestamp, page address, language and time zone, together with a
                  salted IP hash and the user agent, are documented in a separate consent log. This
                  documentation is not consent to analytics or marketing.
                </p>
                <p>
                  You can reopen this information at any time with the &quot;Cookie Information&quot;
                  button. The necessary cookie is used under Section 25(2) no. 2 TDDDG to provide
                  the notice-memory function you requested.
                </p>
              </>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">7. Social Media</h2>
            <p>
              {isGerman
                ? 'Diese Website enthält Links zu sozialen Netzwerken wie X, Instagram, Threads, TikTok und Bluesky. Beim bloßen Aufruf dieser Website wird über diese Links keine Verbindung zu den jeweiligen Anbietern hergestellt. Erst wenn du einen Link öffnest, gelten die Datenschutzbedingungen des jeweiligen Anbieters.'
                : 'This website contains links to social networks such as X, Instagram, Threads, TikTok, and Bluesky. Merely opening this website does not create a connection to those providers through the links. Their privacy terms apply only after you open a link.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? '8. Newsletter „After Work“' : '8. “After Work” Newsletter'}
            </h2>
            {isGerman ? (
              <>
                <p>
                  Wenn du dich für den Newsletter „After Work“ anmeldest, verarbeiten wir deine
                  E-Mail-Adresse sowie die mit Anmeldung und Bestätigung verbundenen Nachweisdaten,
                  um dir redaktionelle Nachrichten aus George Valandis’ Indie-App-Developer-Alltag
                  zu senden. Die Anmeldung erfolgt über ein eingebettetes Formular von MailerLite.
                </p>
                <p>
                  Die Verarbeitung erfolgt auf Grundlage deiner Einwilligung nach Art. 6 Abs. 1 lit. a
                  DSGVO. Die Einwilligung wird durch das Absenden des eindeutig beschrifteten Buttons
                  „Subscribe“ erteilt; dieser Anmeldevorgang wird serverseitig als
                  <span className="font-mono text-sm">signup_requested</span>-Ereignis mit Zeitstempel
                  protokolliert. Wir verwenden zusätzlich ein Double-Opt-in-Verfahren. Die
                  Bestätigungsnachricht dient ausschließlich der Bestätigung der Anmeldung. Du kannst
                  die Einwilligung jederzeit über den Abmeldelink in jeder Ausgabe widerrufen; die
                  Rechtmäßigkeit der bis dahin erfolgten Verarbeitung bleibt unberührt. Alternativ
                  kannst du den Widerruf an die im Impressum genannte Kontaktadresse richten; die
                  E-Mail-Adresse wird dann zur Zuordnung im Newsletter-System verwendet.
                </p>
                <p>
                  MailerLite Limited, 88 Harcourt Street, Dublin 2, D02 DK18, Irland, verarbeitet die
                  Newsletterdaten in unserem Auftrag. Die Verarbeitung wird durch die aktuellen
                  Vertrags- und Datenschutzdokumente von MailerLite einschließlich des{' '}
                  <a
                    href="https://www.mailerlite.com/legal/data-processing-agreement"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:text-amber-200 transition-colors underline"
                  >
                    Data Processing Addendum
                  </a>{' '}
                  geregelt. MailerLite kann Unterauftragsverarbeiter einsetzen und beschreibt in seinen
                  aktuellen Anbieterinformationen die dafür vorgesehenen Schutzmechanismen.
                </p>
                <p>
                  Für den Nachweis der Einwilligung werden der serverseitig protokollierte
                  Absendevorgang sowie Ereignisse aus MailerLite über signaturgesicherte Webhooks
                  verarbeitet. Das getrennte Protokoll enthält keinen Klartext der E-Mail-Adresse,
                  sondern einen gesicherten E-Mail-Hash, die MailerLite-
                  Abonnenten-ID, Statusänderungen, Zeitpunkte, gegebenenfalls einen gesalzenen
                  Hash der Opt-in-IP sowie die verwendeten Formular- und
                  Datenschutzerklärungsversionen. Double-Opt-in-Bestätigung, Abmeldung und manuelle
                  Widerrufe werden als getrennte Ereignisse gespeichert. Die Hashes bleiben
                  personenbezogen und werden nicht für Marketing verwendet.
                </p>
                <p>
                  Für den ersten Versand ist kein Öffnungs-Tracking vorgesehen. MailerLite kann
                  technische Zustell-, Bounce-, Abmelde- und gegebenenfalls Klickdaten verarbeiten;
                  die konkreten Kampagneneinstellungen werden vor einem Versand geprüft. Die
                  Newsletterdaten werden grundsätzlich bis zur Abmeldung verarbeitet. Nach einem
                  Widerruf wird der Versand beendet. Begrenzte Nachweis- oder Sperrlistendaten können
                  darüber hinaus so lange gespeichert werden, wie dies zur Dokumentation der
                  Einwilligung, zur Vermeidung einer erneuten ungewollten Anmeldung, zur Erfüllung
                  gesetzlicher Pflichten oder zur Rechtsverteidigung erforderlich ist. Eine pauschale
                  feste Frist wird dafür nicht festgelegt.
                </p>
                <p>
                  Weitere Informationen zum Anbieter findest du in der{' '}
                  <a
                    href="https://www.mailerlite.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:text-amber-200 transition-colors underline"
                  >
                    Datenschutzerklärung von MailerLite
                  </a>
                  .
                </p>
              </>
            ) : (
              <>
                <p>
                  If you subscribe to the “After Work” newsletter, we process your email address and
                  the evidence connected with the sign-up and confirmation in order to send editorial
                  notes from George Valandis’ indie app development life. The subscription uses an
                  embedded MailerLite form.
                </p>
                <p>
                  Processing is based on your consent under Article 6(1)(a) GDPR. Consent is given by
                  submitting the clearly labelled “Subscribe” button; that sign-up action is recorded
                  server-side as a <span className="font-mono text-sm">signup_requested</span> event
                  with a timestamp. We also use a double opt-in process. The confirmation message is
                  used only to confirm the subscription. You can withdraw your consent at any time
                  through the unsubscribe link in every issue; this does not affect the lawfulness of
                  processing before the withdrawal. You can also send the withdrawal to the contact
                  address stated in the imprint; the email address is then used to locate the
                  newsletter record.
                </p>
                <p>
                  MailerLite Limited, 88 Harcourt Street, Dublin 2, D02 DK18, Ireland, processes
                  newsletter data on our behalf. The processing is governed by MailerLite’s current
                  contractual and privacy documents, including its{' '}
                  <a
                    href="https://www.mailerlite.com/legal/data-processing-agreement"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:text-amber-200 transition-colors underline"
                  >
                    Data Processing Addendum
                  </a>
                  . MailerLite may use sub-processors and describes the safeguards for such processing
                  in its current provider information.
                </p>
                <p>
                  To document consent, we process the server-side sign-up action and events received
                  from MailerLite through signature-protected webhooks. The separate log does not
                  contain the email address in plain text; it stores a protected email HMAC, the MailerLite
                  subscriber ID, status changes, timestamps, where supplied a salted hash of the
                  opt-in IP, and the form and Privacy Statement versions in use. Double-opt-in
                  confirmation, unsubscribe events, and manual withdrawals are stored as separate
                  events. The hashes remain personal data and are not used for marketing.
                </p>
                <p>
                  Open tracking is not planned for the first send. MailerLite may process technical
                  delivery, bounce, unsubscribe, and, where applicable, click data; the concrete
                  campaign settings are checked before sending. Newsletter data is generally processed
                  until you unsubscribe. After withdrawal, sending stops. Limited suppression or
                  consent-evidence data may be retained afterwards only as long as necessary to
                  document consent, prevent an unwanted re-subscription, comply with legal obligations,
                  or defend legal claims. No single fixed period is applied to all such records.
                </p>
                <p>
                  For more information, see MailerLite’s{' '}
                  <a
                    href="https://www.mailerlite.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:text-amber-200 transition-colors underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? '9. Datenschutz in den Apps' : '9. Privacy in the Apps'}
            </h2>
            {isGerman ? (
              <p>
                Diese Datenschutzerklärung gilt für die Hauptwebsite georgevalandis.com. Einzelne
                Apps können zusätzliche Dienste verwenden. GlanceAway bietet beispielsweise nach
                dem Abbruch einer aktiven Timer-Session freiwillig einen anonymen, von Tally
                gehosteten Feedback-Fragebogen an. Die Hauptwebsite sendet keine Antworten an
                Tally. Einzelheiten stehen in der jeweiligen{' '}
                <Link
                  href="/apps/glanceaway/privacy/"
                  className="text-amber-300 hover:text-amber-200 transition-colors underline"
                >
                  App-Datenschutzerklärung
                </Link>
                .
              </p>
            ) : (
              <p>
                This Privacy Statement applies to the main georgevalandis.com website. Individual
                apps may use additional services. For example, after an active timer session is
                cancelled, GlanceAway may offer a voluntary anonymous feedback survey hosted by
                Tally. The main website does not send survey answers to Tally. Details are provided
                in the relevant{' '}
                <Link
                  href="/apps/glanceaway/privacy/"
                  className="text-amber-300 hover:text-amber-200 transition-colors underline"
                >
                  app privacy policy
                </Link>
                .
              </p>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? '10. Deine Rechte' : '10. Your Rights'}
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
              {isGerman ? '11. Kontaktanfragen' : '11. Contact Requests'}
            </h2>
            <p>
              {isGerman
                ? 'Wenn du uns per E-Mail oder Telefon kontaktierst, werden deine Anfrage und die damit verbundenen personenbezogenen Daten zum Zweck der Bearbeitung gespeichert und nicht ohne Rechtsgrundlage weitergegeben.'
                : 'If you contact us by email or phone, your inquiry and related personal data are stored for processing your request and are not shared without legal basis.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? '12. Speicherdauer' : '12. Storage Duration'}
            </h2>
            <p>
              {isGerman
                ? 'Personenbezogene Daten werden nur so lange gespeichert, wie dies für den jeweiligen Zweck oder gesetzliche Aufbewahrungspflichten erforderlich ist.'
                : 'Personal data is stored only as long as required for the processing purpose or legal retention obligations.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? '13. Sicherheit' : '13. Security'}
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
