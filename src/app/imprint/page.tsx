import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Imprint - George Valandis',
  description: 'Legal notice and provider information for georgevalandis.com.',
};

export default function ImprintPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Imprint</h1>
        </header>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Legal Notice</h2>
            <p>Georgios Andi Avenidis</p>
            <p>Berliner Strasse 235</p>
            <p>65205 Wiesbaden</p>
            <p>Germany</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Contact</h2>
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
            <h2 className="text-2xl font-semibold text-white mb-3">Responsible for Content</h2>
            <p>According to Section 55 para. 2 RStV:</p>
            <p>Georgios Andi Avenidis, address as above.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">EU Dispute Resolution</h2>
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
            <p>
              Our email address can be found above in the contact information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Consumer Dispute Resolution
            </h2>
            <p>
              We are not willing or obliged to participate in dispute resolution proceedings before
              a consumer arbitration board.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Disclaimer</h2>
            <p>
              The contents of this website have been created with great care. However, we cannot
              guarantee the accuracy, completeness, or timeliness of the information provided.
            </p>
            <p>
              As the operator of this website, we are responsible for our own content according to
              general laws. However, we are not obliged to monitor transmitted or stored third-party
              information or to investigate circumstances indicating illegal activity.
            </p>
            <p>
              Obligations to remove or block the use of information under applicable law remain
              unaffected. Liability in this regard is only possible from the time a concrete legal
              violation becomes known. Upon becoming aware of such violations, we will remove this
              content immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Copyright</h2>
            <p>
              The content and works created by the site operator are subject to German copyright law.
              Duplication, editing, distribution, and any kind of use outside the limits of copyright
              law require the written consent of the respective author or creator.
            </p>
            <p>
              Downloads and copies of this site are only permitted for private, non-commercial use.
              If content on this site was not created by the operator, third-party copyrights are
              respected and marked accordingly.
            </p>
            <p>
              If you become aware of a copyright infringement, please let us know. Upon notification
              of legal violations, such content will be removed immediately.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
