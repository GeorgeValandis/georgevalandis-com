import { ArrowLeft, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { appSlugs, getAppBySlug } from '@/content/apps';
import { getAppLegalContentBySlug } from '@/content/appLegalContent';
import { canonicalPath } from '@/lib/seo';

type AppPrivacyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return appSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AppPrivacyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  const legal = getAppLegalContentBySlug(slug);

  if (!app) {
    return {
      title: 'Privacy Statement not found - George Valandis',
    };
  }

  if (app.websitePath) {
    return {
      title: `Privacy Policy for ${app.title} Landing Page - George Valandis`,
      description: `Privacy information for the ${app.title} landing page on georgevalandis.com.`,
      alternates: {
        canonical: canonicalPath(`/apps/${app.slug}/privacy-statement`),
      },
    };
  }

  if (!legal) {
    return {
      title: 'Privacy Statement not found - George Valandis',
    };
  }

  return {
    title: `${legal.privacy.sourceTitle} - George Valandis`,
    description: `Privacy information for the ${app.title} iOS app.`,
    alternates: {
      canonical: canonicalPath(`/apps/${app.slug}/privacy-statement`),
    },
  };
}

export default async function AppPrivacyStatementPage({
  params,
}: AppPrivacyPageProps) {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  const legal = getAppLegalContentBySlug(slug);

  if (!app) {
    notFound();
  }

  if (app.websitePath) {
    const appStoreProvider = app.platforms.includes('Android') && !app.platforms.includes('iOS')
      ? 'Google Play'
      : 'the App Store';

    return (
      <main className="min-h-screen bg-gray-950 text-gray-50">
        <article className="max-w-3xl mx-auto px-6 lg:px-8 py-16 md:py-24">
          <Link
            href={`/apps/${app.slug}/`}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to {app.title}
          </Link>

          <header className="mt-8 mb-10">
            <p className="text-amber-400 font-mono text-sm tracking-wider uppercase mb-3">
              Landing Page Privacy
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Privacy Policy for the {app.title} Landing Page
            </h1>
            <p className="mt-5 text-base leading-7 text-gray-300">
              This policy explains which data is processed when you visit the {app.title}
              landing page on georgevalandis.com. It does not describe data processing inside
              the {app.title} mobile app.
            </p>
          </header>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                1. Responsible Entity
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
              <h2 className="text-2xl font-semibold text-white mb-3">
                2. Scope of This Policy
              </h2>
              <p>
                This privacy policy applies only to the public product landing page at{' '}
                <Link
                  href={`/apps/${app.slug}/`}
                  className="text-amber-300 hover:text-amber-200 transition-colors underline"
                >
                  georgevalandis.com/apps/{app.slug}/
                </Link>
                , including its screenshots, product copy, legal links, and external store links.
              </p>
              <p>
                The landing page does not provide an app account, does not collect health, habit,
                purchase, journal, tracking, or other content that you may enter inside the mobile
                app, and does not process mobile app data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">3. Hosting</h2>
              <p>
                This website is hosted by ALL-INKL.COM - Neue Medien Munnich, Inh. Rene
                Munnich, Hauptstrasse 68, 02742 Friedersdorf, Germany.
              </p>
              <p>
                When you open the landing page, technical access data may be processed in server
                log files. This can include IP address, date and time of access, requested URL,
                referrer, browser type, operating system, transferred data volume, and technical
                status codes.
              </p>
              <p>
                Provider details:{' '}
                <a
                  href="https://all-inkl.com/datenschutzinformationen/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:text-amber-200 transition-colors underline"
                >
                  https://all-inkl.com/datenschutzinformationen/
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                4. Data Processed on the Landing Page
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Technical access data required to deliver and secure the page.</li>
                <li>
                  Cookie consent information, if you interact with the cookie settings interface.
                </li>
                <li>
                  Basic browser and device information needed for layout, security, and consent
                  handling.
                </li>
                <li>
                  Data you actively send by contacting George Valandis by email or phone.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                5. Cookies, Consent, and Analytics
              </h2>
              <p>
                The landing page uses technically necessary cookies or comparable storage only
                where needed to provide the page securely and remember privacy choices.
              </p>
              <p>
                Optional analytics or marketing categories are only activated if you give explicit
                consent through the cookie settings interface. You can withdraw or change that
                choice at any time by opening the cookie settings on the website.
              </p>
              <p>
                To document your choice, the website may store a consent record containing the
                selected categories, decision timestamp, consent ID, browser information, the
                scope for this standalone landing page, and a pseudonymized IP hash. No plain IP
                address is stored in the consent log.
              </p>
              <p>
                Consent records are separated by scope. The main georgevalandis.com website uses
                the scope &quot;site&quot;, while this app landing page uses its own app-specific scope.
                Records are indexed by the Consent ID shown in the cookie settings and can also be
                filtered by scope and page URL. This allows the website operator to locate the
                matching landing page consent record for access requests and to delete that record
                after a verified deletion request.
              </p>
              <p>
                You can open the cookie settings on the website to view your Consent ID and change
                or withdraw optional analytics and marketing consent. For access or deletion
                requests about a stored consent record, include that Consent ID in your message.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                6. External Links
              </h2>
              <p>
                The landing page may link to {appStoreProvider}, the imprint, terms pages, email
                addresses, or other external websites. If you open an external link, the privacy
                policy of the respective provider applies. George Valandis does not control the
                data processing on those external websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                7. Purposes and Legal Bases
              </h2>
              <p>Landing page data is processed to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>provide, display, and secure the landing page,</li>
                <li>remember and document privacy choices,</li>
                <li>respond to direct inquiries,</li>
                <li>measure and improve the page only where legally permitted or consented to.</li>
              </ul>
              <p>
                Processing is carried out under applicable legal bases, in particular Art. 6
                para. 1 lit. a, b, c, and f GDPR depending on the case.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                8. Storage Duration
              </h2>
              <p>
                Personal data is stored only as long as required for the relevant purpose or legal
                retention obligations. Consent records are generally stored for up to three years
                from the end of the calendar year in which the choice was made, unless longer
                storage is required for legal obligations or defense of legal claims.
              </p>
              <p>
                Consent records can be searched by Consent ID, scope, or page URL through the
                protected consent export workflow and can be removed from the consent log through
                the protected deletion workflow when deletion is legally required or justified.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                9. Your Rights
              </h2>
              <p>Under GDPR, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>access your stored personal data,</li>
                <li>request correction or deletion,</li>
                <li>restrict processing,</li>
                <li>object to processing in specific cases,</li>
                <li>withdraw consent with effect for the future,</li>
                <li>data portability where applicable,</li>
                <li>lodge a complaint with a supervisory authority.</li>
              </ul>
              <p>
                Because the consent log stores a pseudonymized IP hash instead of a plain IP
                address, the Consent ID is the practical identifier for locating and deleting your
                landing page consent record.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                10. Security
              </h2>
              <p>
                The landing page uses SSL/TLS encryption to protect transmitted content. Technical
                and organizational measures are used to keep the website stable and secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                11. Contact
              </h2>
              <p>
                If you have questions about privacy on the {app.title} landing page, contact{' '}
                <a
                  href="mailto:info@georgevalandis.com"
                  className="text-amber-300 hover:text-amber-200 transition-colors underline"
                >
                  info@georgevalandis.com
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
    );
  }

  if (!legal) {
    notFound();
  }

  const privacyContent = legal.privacy;

  return (
    <main className="min-h-screen bg-gray-950 text-gray-50">
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <Link
          href="/apps/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Apps
        </Link>

        <header className="mt-8 mb-10">
          <p className="text-amber-400 font-mono text-sm tracking-wider uppercase mb-3">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {privacyContent.sourceTitle}
          </h1>
          {app.appStoreLink ? (
            <a
              href={app.appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-amber-300 hover:text-amber-200 transition-colors"
            >
              View {app.title} in the App Store
              <ExternalLink size={14} />
            </a>
          ) : null}
          <a
            href={privacyContent.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Source link
          </a>
        </header>

        <div
          className="text-gray-300 leading-relaxed [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:text-white [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-4 [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:text-white [&_h4]:mt-6 [&_h4]:mb-3 [&_h5]:text-xl [&_h5]:font-semibold [&_h5]:text-white [&_h5]:mt-6 [&_h5]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-4 [&_li]:text-gray-300 [&_a]:text-amber-300 [&_a]:underline [&_a]:break-all [&_a]:hover:text-amber-200 [&_hr]:my-6 [&_hr]:border-white/10"
          dangerouslySetInnerHTML={{ __html: privacyContent.html }}
        />
      </article>
    </main>
  );
}
