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
      robots: {
        index: false,
        follow: true,
      },
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
    robots: {
      index: false,
      follow: true,
    },
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
    const usesAggregateCampaignMeasurement = app.slug === 'glanceaway';

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
              {app.slug === 'glanceaway' ? (
                <p>
                  The optional anonymous feedback survey shown after a cancelled timer session is
                  part of the GlanceAway app flow and opens a form hosted by Tally. This landing
                  page does not send survey answers to Tally. The survey and its data processing are
                  described in the{' '}
                  <Link
                    href="/apps/glanceaway/privacy/"
                    className="text-amber-300 hover:text-amber-200 transition-colors underline"
                  >
                    GlanceAway App Privacy Policy
                  </Link>
                  .
                </p>
              ) : null}
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
                  The version of the cookie notice stored in a necessary first-party cookie after
                  you acknowledge that notice.
                </li>
                <li>
                  Data you actively send by contacting George Valandis by email or phone.
                </li>
                {usesAggregateCampaignMeasurement ? (
                  <li>
                    The campaign label in a GlanceAway landing-page URL and a daily aggregate
                    count when an App Store button is opened.
                  </li>
                ) : null}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                {usesAggregateCampaignMeasurement
                  ? '5. Cookies and Campaign Analytics'
                  : '5. Cookies and Analytics'}
              </h2>
              <p>
                This landing page does not use analytics or marketing cookies and does not load
                analytics services, advertising SDKs, Meta or TikTok pixels, fingerprinting, or
                other marketing trackers.
              </p>
              <p>
                If you acknowledge the cookie notice, the page stores only the necessary
                first-party cookie <code>gv_cookie_notice_*</code>. It contains the notice version
                and prevents the same information from appearing on every page view. It is kept
                for up to 180 days.
              </p>
              <p>
                The cookie-information function does not use local storage, a consent ID, or
                server-side consent logging. Acknowledging the notice is not consent to analytics
                or marketing because those technologies are not used.
              </p>
              {usesAggregateCampaignMeasurement ? (
                <>
                  <p>
                    GlanceAway campaign measurement itself is cookieless and does not use local
                    storage or another visitor identifier.
                  </p>
                  <p>
                    A campaign link may contain a short, shared campaign label in the URL. The page
                    reads that label only in the current page view and uses it to route a later App
                    Store button click through a first-party redirect. Opening the landing page
                    alone does not send a campaign analytics request.
                  </p>
                  <p>
                    When an App Store button is opened, the redirect records only the UTC calendar
                    day, the fixed source &quot;landing&quot;, the shared campaign label, and an aggregate
                    click total. The campaign statistics do not contain an IP address, user agent,
                    device identifier, full referrer, or individual click timestamp. Technical
                    hosting access logs remain subject to the hosting information above.
                  </p>
                  <p>
                    Campaign labels must describe a shared campaign or creative. They are not used
                    as visitor IDs and must not contain a name, email address, device identifier, or
                    another label assigned to one person.
                  </p>
                </>
              ) : null}
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
              {usesAggregateCampaignMeasurement ? (
                <p>
                  When you open the App Store from a measured GlanceAway campaign, the redirect
                  adds the GlanceAway App Store provider token and the shared campaign token to the
                  App Store URL. Apple receives those tokens only after you choose to open the App
                  Store. Apple&apos;s own privacy terms then apply.
                </p>
              ) : null}
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                7. Purposes and Legal Bases
              </h2>
              <p>Landing page data is processed to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>provide, display, and secure the landing page,</li>
                <li>remember that the cookie notice was acknowledged,</li>
                <li>respond to direct inquiries,</li>
                {usesAggregateCampaignMeasurement ? (
                  <li>measure aggregate App Store button interest by shared campaign label.</li>
                ) : null}
              </ul>
              <p>
                The notice cookie is used under Section 25(2) no. 2 TDDDG to provide the
                notice-memory function you requested. Technical delivery and security processing
                is based on Art. 6 para. 1 lit. f GDPR. Direct inquiries are processed under Art. 6
                para. 1 lit. b GDPR where they concern pre-contractual communication and otherwise
                under Art. 6 para. 1 lit. f GDPR.
              </p>
              {usesAggregateCampaignMeasurement ? (
                <p>
                  The GlanceAway campaign totals are used to understand whether a positioning
                  creates interest in the App Store and to improve the landing page. The legal
                  basis is Art. 6 para. 1 lit. f GDPR, based on the legitimate interest in measuring
                  the effectiveness of first-party product communication in a data-minimizing way.
                  No visitor profile is created from the campaign total.
                </p>
              ) : null}
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                8. Storage Duration
              </h2>
              <p>
                Personal data is stored only as long as required for the relevant purpose or legal
                retention obligations.
              </p>
              <p>
                The necessary notice cookie is kept for up to 180 days. No related consent record
                is stored on the server.
              </p>
              {usesAggregateCampaignMeasurement ? (
                <p>
                  GlanceAway campaign click totals are retained as daily aggregate statistics.
                  They may be kept for long-term campaign comparisons because they contain no
                  visitor or device identifier and individual visitors cannot be identified from
                  the campaign count. Technical hosting logs follow the separate retention rules of
                  the hosting and security process.
                </p>
              ) : null}
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
              {usesAggregateCampaignMeasurement ? (
                <p>
                  You may object at any time to processing based on Art. 6 para. 1 lit. f GDPR for
                  reasons arising from your particular situation. The aggregate campaign count
                  cannot be assigned back to an individual visitor.
                </p>
              ) : null}
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
