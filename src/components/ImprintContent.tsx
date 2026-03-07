import type { SiteLocale } from '@/lib/siteLocale';
import { localizedPath } from '@/lib/siteLocale';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type ImprintContentProps = {
  locale: SiteLocale;
};

export default function ImprintContent({ locale }: ImprintContentProps) {
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
            {isGerman ? 'Impressum' : 'Imprint'}
          </h1>
        </header>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? 'Angaben gemäß § 5 TMG' : 'Legal Notice'}
            </h2>
            <p>Georgios Andi Avenidis</p>
            <p>Berliner Strasse 235</p>
            <p>65205 Wiesbaden</p>
            <p>Germany</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? 'Kontakt' : 'Contact'}
            </h2>
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
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? 'Verantwortlich für den Inhalt' : 'Responsible for Content'}
            </h2>
            {isGerman ? (
              <>
                <p>Georgios Andi Avenidis</p>
                <p>Anschrift wie oben.</p>
              </>
            ) : (
              <>
                <p>According to Section 55 para. 2 RStV:</p>
                <p>Georgios Andi Avenidis, address as above.</p>
              </>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? 'EU-Streitschlichtung' : 'EU Dispute Resolution'}
            </h2>
            {isGerman ? (
              <>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
                  bereit:{' '}
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:text-amber-200 transition-colors"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                  .
                </p>
                <p>Unsere E-Mail-Adresse findest du oben im Impressum.</p>
              </>
            ) : (
              <>
                <p>
                  The European Commission provides a platform for online dispute resolution (ODR):{' '}
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:text-amber-200 transition-colors"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                  .
                </p>
                <p>Our email address can be found above in the contact information.</p>
              </>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? 'Verbraucherstreitbeilegung' : 'Consumer Dispute Resolution'}
            </h2>
            <p>
              {isGerman
                ? 'Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
                : 'We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? 'Haftung für Inhalte' : 'Disclaimer'}
            </h2>
            {isGerman ? (
              <>
                <p>
                  Die Inhalte dieser Website wurden mit großer Sorgfalt erstellt. Für die Richtigkeit,
                  Vollständigkeit und Aktualität der Inhalte kann ich jedoch keine Gewähr übernehmen.
                </p>
                <p>
                  Als Diensteanbieter bin ich gemäß den allgemeinen Gesetzen für eigene Inhalte auf
                  diesen Seiten verantwortlich. Ich bin jedoch nicht verpflichtet, übermittelte oder
                  gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen,
                  die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p>
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
                  allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist
                  jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
                  Bei Bekanntwerden entsprechender Rechtsverletzungen werde ich diese Inhalte umgehend
                  entfernen.
                </p>
              </>
            ) : (
              <>
                <p>
                  The contents of this website have been created with great care. However, we cannot
                  guarantee the accuracy, completeness, or timeliness of the information provided.
                </p>
                <p>
                  As the operator of this website, we are responsible for our own content according to
                  general laws. However, we are not obliged to monitor transmitted or stored
                  third-party information or to investigate circumstances indicating illegal activity.
                </p>
                <p>
                  Obligations to remove or block the use of information under applicable law remain
                  unaffected. Liability in this regard is only possible from the time a concrete legal
                  violation becomes known. Upon becoming aware of such violations, we will remove this
                  content immediately.
                </p>
              </>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              {isGerman ? 'Urheberrecht' : 'Copyright'}
            </h2>
            {isGerman ? (
              <>
                <p>
                  Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                  unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                  Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts
                  bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
                <p>
                  Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
                  Gebrauch gestattet. Soweit Inhalte auf dieser Seite nicht vom Betreiber erstellt
                  wurden, werden die Urheberrechte Dritter beachtet und entsprechend gekennzeichnet.
                </p>
                <p>
                  Solltest du trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitte ich um
                  einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werde ich
                  derartige Inhalte umgehend entfernen.
                </p>
              </>
            ) : (
              <>
                <p>
                  The content and works created by the site operator are subject to German copyright
                  law. Duplication, editing, distribution, and any kind of use outside the limits of
                  copyright law require the written consent of the respective author or creator.
                </p>
                <p>
                  Downloads and copies of this site are only permitted for private, non-commercial use.
                  If content on this site was not created by the operator, third-party copyrights are
                  respected and marked accordingly.
                </p>
                <p>
                  If you become aware of a copyright infringement, please let us know. Upon
                  notification of legal violations, such content will be removed immediately.
                </p>
              </>
            )}
          </section>
        </div>
      </article>
    </main>
  );
}
