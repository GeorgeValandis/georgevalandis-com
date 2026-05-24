import { getAppHubGroups, platformLabel } from '@/lib/appHub';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type AppHubListProps = {
  groupHeadingLevel?: 2 | 3;
};

export default function AppHubList({ groupHeadingLevel = 2 }: AppHubListProps) {
  const groupedApps = getAppHubGroups();
  const HeadingTag = groupHeadingLevel === 3 ? 'h3' : 'h2';
  const ItemHeadingTag = groupHeadingLevel === 3 ? 'h4' : 'h3';

  return (
    <div className="space-y-20">
      {groupedApps.map(({ group, title, description, items }) => (
        <section key={group} aria-labelledby={`${group}-heading`}>
          <div className="grid gap-5 border-t border-white/10 pt-8 lg:grid-cols-[minmax(240px,0.34fr)_1fr]">
            <div>
              <HeadingTag
                id={`${group}-heading`}
                className="text-3xl font-bold tracking-tight"
              >
                {title}
              </HeadingTag>
              <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
                {description}
              </p>
            </div>

            <div className="grid gap-4">
              {items.map(({ app, landingPage, seo }, index) => {
                if (!landingPage || !seo) {
                  return null;
                }

                return (
                  <article
                    key={app.slug}
                    className={`grid gap-5 py-6 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center ${
                      index === 0 ? '' : 'border-t border-white/10'
                    }`}
                  >
                    <Image
                      src={app.logo}
                      alt={`${app.title} app icon`}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-2xl object-cover shadow-lg shadow-black/30"
                    />

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                          {seo.primaryKeyword}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {app.platforms.map((platform) => (
                            <span
                              key={platform}
                              className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-1 text-[0.68rem] font-bold tracking-[0.08em] text-cyan-100"
                            >
                              {platformLabel(platform)}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ItemHeadingTag className="mt-2 text-2xl font-bold tracking-tight">
                        <Link
                          href={`/apps/${app.slug}/`}
                          className="transition-colors hover:text-amber-300"
                        >
                          {landingPage.appStoreName}
                        </Link>
                      </ItemHeadingTag>
                      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-400">
                        {seo.searchIntent}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {seo.secondaryKeywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-gray-300"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 md:justify-end">
                      <Link
                        href={`/apps/${app.slug}/`}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-gray-200"
                      >
                        Landing page
                        <ArrowRight size={15} />
                      </Link>
                      {app.appStoreLink ? (
                        <a
                          href={app.appStoreLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-bold text-gray-200 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          Store
                          <ExternalLink size={15} />
                        </a>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
