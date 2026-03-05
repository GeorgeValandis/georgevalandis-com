import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Statement - George Valandis',
  description: 'Privacy information for georgevalandis.com.',
};

export default function PrivacyStatementPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-50">
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <header className="mt-8 mb-10">
          <p className="text-amber-400 font-mono text-sm tracking-wider uppercase mb-3">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Privacy Statement</h1>
        </header>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. General Information</h2>
            <p>
              The following information provides an overview of what happens to your personal data
              when you visit this website. Personal data means any information that can identify you
              personally.
            </p>
            <p>
              Data processing on this website is carried out by the website operator listed below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. Responsible Entity</h2>
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
              This website is hosted by ALL-INKL.COM - Neue Medien Munnich, Inh. Rene Munnich,
              Hauptstrasse 68, 02742 Friedersdorf, Germany.
            </p>
            <p>
              Provider details:{' '}
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
            <h2 className="text-2xl font-semibold text-white mb-3">4. How Data Is Collected</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Data you submit yourself, for example by email.</li>
              <li>
                Technical data collected automatically, such as browser type, operating system,
                access time, referrer, and IP address (server log files).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. Purposes and Legal Bases</h2>
            <p>Personal data is processed to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and secure the website.</li>
              <li>Respond to inquiries.</li>
              <li>Analyze website usage in anonymized form.</li>
            </ul>
            <p>
              Processing is carried out under applicable legal bases, in particular Art. 6 para. 1
              lit. a, b, c, and f GDPR depending on the case.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">6. Cookies and Analytics</h2>
            <p>
              This website may use cookies and similar technologies to ensure functionality,
              remember consent settings, and improve user experience.
            </p>
            <p>
              Website analytics may be performed with WP Statistics. Data is stored on the own
              server. IP addresses are anonymized where possible.
            </p>
            <p>
              Consent management is handled via Real Cookie Banner.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">7. Social Media</h2>
            <p>
              This website may include links or integrations to social networks such as X (formerly
              Twitter). If such integrations are active, data may be transmitted to the provider.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">8. Your Rights</h2>
            <p>Under GDPR, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your stored personal data.</li>
              <li>Request correction or deletion.</li>
              <li>Restrict processing.</li>
              <li>Object to processing in specific cases.</li>
              <li>Withdraw consent with effect for the future.</li>
              <li>Data portability where applicable.</li>
              <li>Lodge a complaint with a supervisory authority.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">9. Contact Requests</h2>
            <p>
              If you contact us by email or phone, your inquiry and related personal data are stored
              for processing your request and are not shared without legal basis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">10. Storage Duration</h2>
            <p>
              Personal data is stored only as long as required for the processing purpose or legal
              retention obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">11. Security</h2>
            <p>
              This website uses SSL/TLS encryption to protect transmitted content.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
