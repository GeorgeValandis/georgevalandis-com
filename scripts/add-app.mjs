#!/usr/bin/env node
/**
 * App-Fabrik generator: adds a new app to georgevalandis.com from one small JSON.
 *
 *   node scripts/add-app.mjs <app.json> [--dry-run] [--update] [--privacy-out <file>]
 *
 * Writes (only for the new slug, never touching existing apps):
 *   src/content/apps.ts              hub tile (marker block)
 *   src/content/appLandingPages.ts   landing page record (marker block)
 *   src/content/appSeo.ts            SEO/AEO record (marker block)
 *   src/content/appLegalContent.json terms + privacy text, English plus German under `de`
 *                                    (key marked "generator": "app-fabrik")
 *   public/apps/{slug}-icon.*        icon
 *   public/apps/{slug}/screens/*     raw screenshots
 *   privacy-asc.json                 App Privacy answers for `asc web privacy plan`
 *                                    (default: next to the input JSON)
 *
 * Idempotent: a second run with the same JSON changes nothing. Existing entries that were
 * not created by this script abort the run. Entries created by this script and now different
 * are only replaced with --update. See scripts/add-app.example.json for the input format.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GENERATOR = 'app-fabrik';
const CONTACT_EMAIL = 'support@georgevalandis.com';
const OPERATOR = 'Georgios Andi Avenidis';
const OPERATOR_ADDRESS = 'Berliner Strasse 235, 65205 Wiesbaden, Germany';
const OPERATOR_ADDRESS_DE = 'Berliner Straße 235, 65205 Wiesbaden, Deutschland';
const APPLE_EULA = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

const SEO_GROUPS = [
  'health-self-tracking',
  'habits-focus-wellbeing',
  'utilities-tools',
  'cozy-companions',
];

/**
 * Standard stack. `privacy` feeds the App Privacy answers (App Store Connect tokens).
 * Declared conservatively: anonymous IDs only, never linked to identity, never used for tracking.
 */
const SERVICES = {
  revenuecat: {
    privacy: [
      {
        category: 'PURCHASE_HISTORY',
        purposes: ['ANALYTICS', 'APP_FUNCTIONALITY'],
        dataProtections: ['DATA_NOT_LINKED_TO_YOU'],
      },
    ],
  },
  telemetrydeck: {
    privacy: [
      {
        category: 'DEVICE_ID',
        purposes: ['ANALYTICS'],
        dataProtections: ['DATA_NOT_LINKED_TO_YOU'],
      },
      {
        category: 'PRODUCT_INTERACTION',
        purposes: ['ANALYTICS'],
        dataProtections: ['DATA_NOT_LINKED_TO_YOU'],
      },
    ],
  },
};

// ---------------------------------------------------------------- CLI

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--') && a !== '--privacy-out'));
const privacyOutIndex = args.indexOf('--privacy-out');
const privacyOutArg = privacyOutIndex >= 0 ? args[privacyOutIndex + 1] : undefined;
const inputArg = args.find(
  (a, i) => !a.startsWith('--') && !(privacyOutIndex >= 0 && i === privacyOutIndex + 1)
);
const dryRun = flags.has('--dry-run');
const update = flags.has('--update');

if (!inputArg) {
  console.error('Usage: node scripts/add-app.mjs <app.json> [--dry-run] [--update] [--privacy-out <file>]');
  process.exit(2);
}

function fail(message) {
  console.error(`add-app: ${message}`);
  process.exit(1);
}

// ---------------------------------------------------------------- input

const inputPath = path.resolve(inputArg);
const inputDir = path.dirname(inputPath);
let spec;
try {
  spec = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
} catch (error) {
  fail(`cannot read ${inputPath}: ${error.message}`);
}

function validate(s) {
  const errors = [];
  const str = (value, label) => {
    if (typeof value !== 'string' || !value.trim()) errors.push(`${label} must be a non-empty string`);
  };
  str(s.name, 'name');
  str(s.slug, 'slug');
  str(s.subtitle, 'subtitle');
  str(s.keyword, 'keyword');
  str(s.icon, 'icon');
  if (typeof s.slug === 'string' && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s.slug)) {
    errors.push('slug must be lowercase letters, digits and single hyphens');
  }
  if (!s.hero || typeof s.hero !== 'object') {
    errors.push('hero {headline, intro} is required');
  } else {
    str(s.hero.headline, 'hero.headline');
    str(s.hero.intro, 'hero.intro');
  }
  if (!Array.isArray(s.benefits) || s.benefits.length !== 3) {
    errors.push('benefits must contain exactly 3 {title, description} steps');
  } else {
    s.benefits.forEach((b, i) => {
      str(b?.title, `benefits[${i}].title`);
      str(b?.description, `benefits[${i}].description`);
    });
  }
  if (!Array.isArray(s.faq) || s.faq.length < 3 || s.faq.length > 5) {
    errors.push('faq must contain 3 to 5 {question, answer} entries');
  } else {
    s.faq.forEach((f, i) => {
      str(f?.question, `faq[${i}].question`);
      str(f?.answer, `faq[${i}].answer`);
    });
  }
  if (!Array.isArray(s.screens) || s.screens.length < 3 || s.screens.length > 6) {
    errors.push('screens must contain 3 to 6 {path, label} raw app screenshots');
  } else {
    s.screens.forEach((sc, i) => {
      str(sc?.path, `screens[${i}].path`);
      str(sc?.label, `screens[${i}].label`);
    });
  }
  if (!Array.isArray(s.services)) {
    errors.push(`services must be an array (allowed: ${Object.keys(SERVICES).join(', ')}; [] = no services)`);
  } else {
    for (const service of s.services) {
      if (!SERVICES[service]) errors.push(`unknown service "${service}" (allowed: ${Object.keys(SERVICES).join(', ')})`);
    }
  }
  if (s.appStoreId !== undefined && !/^\d{6,}$/.test(String(s.appStoreId))) {
    errors.push('appStoreId must be the numeric App Store ID');
  }
  if (s.accent !== undefined && !/^#[0-9a-fA-F]{6}$/.test(s.accent)) {
    errors.push('accent must be a #rrggbb color');
  }
  if (s.group !== undefined && !SEO_GROUPS.includes(s.group)) {
    errors.push(`group must be one of: ${SEO_GROUPS.join(', ')}`);
  }
  if (s.lang !== undefined && !['en', 'de'].includes(s.lang)) {
    errors.push('lang must be "en" or "de"');
  }
  if (s.updated !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(s.updated)) {
    errors.push('updated must be YYYY-MM-DD');
  }
  return errors;
}

const specErrors = validate(spec);
if (specErrors.length > 0) {
  fail(`invalid input:\n- ${specErrors.join('\n- ')}`);
}

const { slug } = spec;
const name = spec.name.trim();
const services = [...new Set(spec.services)].sort();
const hasRevenueCat = services.includes('revenuecat');
const hasTelemetryDeck = services.includes('telemetrydeck');
const accent = (spec.accent ?? '#e0602a').toLowerCase();
// Landing page language. Legal texts stay English (no German version yet).
const de = spec.lang === 'de';
const platforms = spec.platforms ?? ['iOS'];
const appStoreLink = spec.appStoreId
  ? `https://apps.apple.com/us/app/id${spec.appStoreId}?uo=4`
  : undefined;

// ---------------------------------------------------------------- assets

const POSTER_NAME = /(^|[-_])(app-?store|asc|mockup|poster|storefront)([-_.]|$)/i;
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);

function resolveInput(p) {
  return path.resolve(inputDir, p);
}

const iconSource = resolveInput(spec.icon);
const iconExt = path.extname(iconSource).toLowerCase();
const assetPlan = [];
const assetErrors = [];

if (!fs.existsSync(iconSource)) assetErrors.push(`icon not found: ${iconSource}`);
if (!IMAGE_EXT.has(iconExt)) assetErrors.push(`icon must be png/jpg/webp: ${iconSource}`);
const iconPublic = `/apps/${slug}-icon${iconExt}`;
assetPlan.push({ from: iconSource, publicPath: iconPublic });

const usedNames = new Set();
const screens = spec.screens.map((screen) => {
  const source = resolveInput(screen.path);
  const ext = path.extname(source).toLowerCase();
  const base = path.basename(source, path.extname(source));
  if (!fs.existsSync(source)) assetErrors.push(`screenshot not found: ${source}`);
  if (!IMAGE_EXT.has(ext)) assetErrors.push(`screenshot must be png/jpg/webp: ${source}`);
  if (POSTER_NAME.test(base)) {
    assetErrors.push(
      `screenshot "${base}${ext}" looks like a store/ASC poster; use raw app screenshots (see AGENTS.md)`
    );
  }
  const fileName = `${base}${ext}`;
  if (usedNames.has(fileName)) assetErrors.push(`duplicate screenshot file name: ${fileName}`);
  usedNames.add(fileName);
  const publicPath = `/apps/${slug}/screens/${fileName}`;
  assetPlan.push({ from: source, publicPath });
  return {
    src: publicPath,
    label: screen.label.trim(),
    alt: (screen.alt ?? (de ? `${name}: ${screen.label.trim()}` : `${name} ${screen.label.trim()} screen.`)).trim(),
  };
});
if (assetErrors.length > 0) fail(`invalid assets:\n- ${assetErrors.join('\n- ')}`);

// ---------------------------------------------------------------- rendering helpers

const quote = (value) =>
  `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
const bareKey = (key) => (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? key : quote(key));
const htmlEscape = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function prop(indent, key, value) {
  const inline = `${indent}${key}: ${value},`;
  return inline.length > 100 && value.startsWith("'")
    ? `${indent}${key}:\n${indent}  ${value},`
    : inline;
}

function list(indent, key, items) {
  return [`${indent}${key}: [`, ...items.map((item) => `${indent}  ${item},`), `${indent}],`].join('\n');
}

function mix(hex, amount) {
  const channel = (offset) => parseInt(hex.slice(offset, offset + 2), 16);
  const blend = (c) => Math.round(c + (255 - c) * amount);
  return `#${[1, 3, 5]
    .map((o) => blend(channel(o)).toString(16).padStart(2, '0'))
    .join('')}`;
}

const begin = `// ${GENERATOR}:begin ${slug}`;
const end = `// ${GENERATOR}:end ${slug}`;

// ---------------------------------------------------------------- date (stable across runs)

const legalPath = path.join(repoRoot, 'src/content/appLegalContent.json');
const legalRaw = fs.readFileSync(legalPath, 'utf8');
const legalJson = JSON.parse(legalRaw);
const existingLegal = legalJson[slug];
const today = new Date().toISOString().slice(0, 10);
const updated = spec.updated ?? existingLegal?.updated ?? today;
const [yyyy, mm, dd] = updated.split('-');
const updatedDisplay = `${dd}.${mm}.${yyyy}`;

// ---------------------------------------------------------------- apps.ts block

const appsBlock = (() => {
  const tags = spec.tags ?? ['Swift', 'SwiftUI'];
  return [
    `  ${begin}`,
    `  {`,
    prop('    ', 'slug', quote(slug)),
    prop('    ', 'title', quote(name)),
    prop('    ', 'subtitle', quote(spec.subtitle)),
    prop('    ', 'description', quote(spec.description ?? spec.hero.intro)),
    `    platforms: [${platforms.map(quote).join(', ')}],`,
    `    tags: [${tags.map(quote).join(', ')}],`,
    prop('    ', 'gradient', quote(`from-[${mix(accent, 0.55)}]/30 to-[${mix(accent, 0.8)}]/30`)),
    prop('    ', 'accentBorder', quote(`group-hover:border-[${accent}]/40`)),
    ...(appStoreLink ? [prop('    ', 'appStoreLink', quote(appStoreLink))] : []),
    prop('    ', 'websitePath', quote(`/apps/${slug}/`)),
    prop('    ', 'logo', quote(iconPublic)),
    `  },`,
    `  ${end}`,
    '',
  ].join('\n');
})();

// ---------------------------------------------------------------- landing block

const privacyDescription = (() => {
  if (de) {
    const parts = ['Kein Konto und keine Werbung.'];
    if (hasRevenueCat) parts.push('Käufe laufen über Apple und RevenueCat mit einer anonymen ID.');
    if (hasTelemetryDeck) parts.push('Anonyme Nutzungsstatistiken von TelemetryDeck lassen sich nicht auf dich zurückführen.');
    if (!hasRevenueCat && !hasTelemetryDeck) parts.push('Nichts verlässt dein Gerät.');
    return parts.join(' ');
  }
  const parts = ['No account and no ads.'];
  if (hasRevenueCat) parts.push('Purchases are handled by Apple and RevenueCat with an anonymous ID.');
  if (hasTelemetryDeck) parts.push('Anonymous usage statistics from TelemetryDeck cannot be traced back to you.');
  if (!hasRevenueCat && !hasTelemetryDeck) parts.push('Nothing leaves your device.');
  return parts.join(' ');
})();

const landingBlock = (() => {
  const i1 = '    ';
  const i2 = '      ';
  const i3 = '        ';
  const pair = (indent, a, b) =>
    `${indent}{\n${prop(`${indent}  `, a[0], quote(a[1]))}\n${prop(`${indent}  `, b[0], quote(b[1]))}\n${indent}}`;
  const screenshots = screens.map(
    (s) =>
      `{\n${prop(i3, 'src', quote(s.src))}\n${prop(i3, 'alt', quote(s.alt))}\n${prop(i3, 'label', quote(s.label))}\n${i2}}`
  );
  const features = spec.benefits.map((b) =>
    pair(i2, ['title', b.title], ['description', b.description]).trimStart()
  );
  const workflow = (spec.workflow ?? spec.benefits).map((b) =>
    pair(i2, ['title', b.title], ['description', b.description]).trimStart()
  );
  const faq = spec.faq.map((f) =>
    pair(i2, ['question', f.question], ['answer', f.answer]).trimStart()
  );
  const highlights = [
    ...spec.benefits.map((b) => quote(b.title)),
    quote(
      de
        ? hasRevenueCat || hasTelemetryDeck
          ? 'Kein Konto, keine Werbung, anonym'
          : 'Kein Konto, keine Werbung, kein Tracking'
        : hasRevenueCat || hasTelemetryDeck
          ? 'No account, no ads, anonymous by design'
          : 'No account, no ads, no tracking'
    ),
  ];
  const lines = [
    `  ${begin}`,
    `  ${bareKey(slug)}: {`,
    ...(de ? [prop(i1, 'lang', quote('de'))] : []),
    prop(i1, 'appStoreName', quote(spec.appStoreName ?? `${name}: ${spec.subtitle}`)),
    prop(i1, 'eyebrow', quote(spec.keyword)),
    prop(i1, 'headline', quote(spec.hero.headline)),
    prop(i1, 'intro', quote(spec.hero.intro)),
    prop(
      i1,
      'primaryCta',
      quote(
        de
          ? appStoreLink ? 'Im App Store ansehen' : 'Bald im App Store'
          : appStoreLink ? 'View in the App Store' : 'Coming soon to the App Store'
      )
    ),
    prop(i1, 'secondaryCta', quote(de ? 'App ansehen' : 'See the app')),
    prop(
      i1,
      'availability',
      quote(
        spec.availability ??
          (de
            ? appStoreLink ? 'Im App Store für iPhone erhältlich.' : 'Bald im App Store für iPhone.'
            : appStoreLink ? 'Available on the App Store for iPhone.' : 'Coming soon to the App Store for iPhone.')
      )
    ),
    prop(i1, 'accent', quote(accent)),
    prop(
      i1,
      'background',
      quote(`from-[${mix(accent, 0.88)}] via-[#fafaf8] to-[${mix(accent, 0.94)}]`)
    ),
    prop(i1, 'category', quote(spec.category ?? 'UtilitiesApplication')),
    `${i1}price: ${Number(spec.price ?? 0)},`,
    prop(i1, 'priceCurrency', quote('USD')),
    list(i1, 'highlights', highlights),
    list(i1, 'screenshots', screenshots),
    prop(i1, 'featureTitle', quote(spec.featureTitle ?? (de ? `So funktioniert ${name}` : `How ${name} works`))),
    prop(i1, 'featureIntro', quote(spec.featureIntro ?? `${spec.subtitle}.`)),
    list(i1, 'features', features),
    prop(
      i1,
      'workflowTitle',
      quote(spec.workflowTitle ?? (de ? `${name} in drei Schritten` : `${name} in three steps`))
    ),
    list(i1, 'workflow', workflow),
    prop(i1, 'privacyTitle', quote(de ? 'Privat von Anfang an' : 'Private by design')),
    prop(i1, 'privacyDescription', quote(privacyDescription)),
    prop(
      i1,
      'finalCtaDescription',
      quote(
        spec.finalCtaDescription ??
          (de
            ? appStoreLink
              ? `Lade ${name} aus dem App Store und leg in Sekunden los.`
              : `${name} kommt bald in den App Store.`
            : appStoreLink
              ? `Install ${name} from the App Store and get started in seconds.`
              : `${name} is coming soon to the App Store.`)
      )
    ),
    list(i1, 'faq', faq),
    `  },`,
    `  ${end}`,
    '',
  ];
  return lines.join('\n');
})();

// ---------------------------------------------------------------- SEO block

const seoBlock = [
  `  ${begin}`,
  `  ${bareKey(slug)}: {`,
  prop('    ', 'primaryKeyword', quote(spec.keyword)),
  `    secondaryKeywords: [${(spec.secondaryKeywords ?? []).map(quote).join(', ')}],`,
  prop(
    '    ',
    'searchIntent',
    quote(spec.searchIntent ?? (de ? `${spec.keyword}: ${spec.subtitle}.` : `Find a ${spec.keyword}: ${spec.subtitle}.`))
  ),
  prop('    ', 'group', quote(spec.group ?? 'utilities-tools')),
  prop('    ', 'updatedAt', quote(updated)),
  `  },`,
  `  ${end}`,
  '',
].join('\n');

// ---------------------------------------------------------------- legal text

const h = (text) => `<h5 class="wp-block-heading"><strong>${text}</strong></h5>`;
const p = (text) => `<p>${text}</p>`;
const mail = `<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`;
const safeName = htmlEscape(name);

function numbered(sections) {
  return sections
    .map((section, index) => [h(`${index + 1}. ${section.title}`), ...section.paragraphs.map(p)].join('\n\n'))
    .join('\n\n');
}

const thirdParties = [hasRevenueCat && 'RevenueCat', hasTelemetryDeck && 'TelemetryDeck'].filter(Boolean);

const privacySections = [
  {
    title: 'Introduction',
    paragraphs: [
      `This Privacy Policy applies to the ${safeName} app developed by ${OPERATOR}. For privacy questions, contact ${mail}.`,
    ],
  },
  {
    title: 'Data stored on your device',
    paragraphs: [
      `${safeName} stores your content, settings, and purchase state locally on your device. This data is used to provide the app and is not sent to George Valandis servers.`,
    ],
  },
  {
    title: 'Accounts and data transfer',
    paragraphs: [`${safeName} does not require an account or login.`],
  },
  ...(hasRevenueCat
    ? [
        {
          title: 'Purchases',
          paragraphs: [
            `If you buy or restore premium access, Apple processes the payment. RevenueCat processes technical purchase, entitlement, and restore information, together with an anonymous app user ID generated by the app, in order to validate, unlock, and restore premium access. This information is not linked to your name or used for advertising. For details, see the <a href="https://www.revenuecat.com/privacy/">RevenueCat Privacy Policy</a>.`,
          ],
        },
      ]
    : []),
  {
    title: 'Analytics, advertising, and tracking',
    paragraphs: hasTelemetryDeck
      ? [
          `${safeName} uses TelemetryDeck for anonymous usage statistics, for example which features are used, whether onboarding was completed, the app version, and the operating system version. TelemetryDeck uses an anonymized identifier that cannot be traced back to you and does not store your IP address. This data is not linked to your identity and is not used for advertising. For details, see the <a href="https://telemetrydeck.com/privacy/">TelemetryDeck Privacy Policy</a>.`,
          `${safeName} does not use advertising SDKs, does not show ads, and does not track you across apps, websites, or services.`,
        ]
      : [
          `${safeName} does not use analytics SDKs or advertising SDKs, does not show ads, and does not track you across apps, websites, or services.`,
        ],
  },
  {
    title: 'Data deletion',
    paragraphs: [
      `Removing ${safeName} from your device deletes locally stored app data from that device. Platform-managed backups may retain local app data according to your Apple account settings.`,
    ],
  },
  {
    title: 'Controller, legal bases, and your rights',
    paragraphs: [
      `The controller for data processing in connection with ${safeName} is ${OPERATOR}, ${OPERATOR_ADDRESS}, ${mail}.`,
      ...(hasRevenueCat || hasTelemetryDeck
        ? [
            [
              hasRevenueCat &&
                'Processing purchase and entitlement data serves the performance of the contract with you (Art. 6(1)(b) GDPR).',
              hasTelemetryDeck &&
                `Anonymous usage statistics serve our legitimate interest in understanding how ${safeName} is used and improving the app (Art. 6(1)(f) GDPR).`,
            ]
              .filter(Boolean)
              .join(' '),
          ]
        : []),
      ...(hasRevenueCat
        ? [
            `RevenueCat, Inc. is based in the USA and stores data on Amazon Web Services servers in the USA. This transfer is based on the EU standard contractual clauses in RevenueCat's data processing agreement.`,
          ]
        : []),
      ...(hasTelemetryDeck
        ? ['TelemetryDeck GmbH is based in Germany and, according to its own information, processes the data on servers in the EU.']
        : []),
      `If you contact us by email, for example for support or feedback, we receive your email address, your message, and any technical details it contains, such as the app and operating system version. We use this data only to handle your enquiry (Art. 6(1)(b) GDPR for support relating to the app, otherwise Art. 6(1)(f) GDPR) and delete it once the enquiry is settled, unless statutory retention obligations apply.`,
      [
        'Data on your device remains until you delete it or remove the app.',
        thirdParties.length
          ? `${thirdParties.join(' and ')} ${thirdParties.length > 1 ? 'retain' : 'retains'} data according to the privacy ${thirdParties.length > 1 ? 'policies' : 'policy'} linked above.`
          : '',
      ]
        .filter(Boolean)
        .join(' '),
      'Under the GDPR, you have the right to access, rectification, erasure, restriction of processing, data portability, and objection, and the right to lodge a complaint with a supervisory authority, for example the Hessian Commissioner for Data Protection and Freedom of Information (HBDI) in Wiesbaden.',
    ],
  },
  {
    title: 'Contact',
    paragraphs: [`If you have questions about privacy, please contact ${mail}.`],
  },
];

const privacyHtml = [
  `<h3 class="wp-block-heading"><strong>Privacy Policy for ${safeName}</strong></h3>`,
  h(`Last Updated: ${updatedDisplay}`),
  numbered(privacySections),
].join('\n\n');

const termsHtml = [
  `<h3 class="wp-block-heading"><strong>Terms and Conditions - ${safeName} App</strong></h3>`,
  h(`Last Updated: ${updatedDisplay}`),
  p(
    `${safeName} is subject to Apple's Terms of Use, the <a href="${APPLE_EULA}">Licensed Application End User License Agreement</a>.`
  ),
  p(`${safeName}: ${htmlEscape(spec.subtitle)}. The app is provided by ${OPERATOR}.`),
  ...(hasRevenueCat
    ? [
        h('Purchases'),
        p(
          `Premium features are optional in-app purchases. Billing and refunds are handled by Apple through the App Store. RevenueCat may process technical purchase and entitlement data required to validate, unlock, and restore premium access.`
        ),
      ]
    : []),
  h('Availability'),
  p(
    `Some features may depend on device storage, iOS capabilities, and app version. We may update, improve, or remove features over time.`
  ),
  h('Contact'),
  p(`If you have questions about these Terms, please contact ${mail}.`),
].join('\n\n');

// German legal text: faithful translation of the English text above (draft, review pending).

const privacyTitleDe = `Datenschutzerklärung - App ${name}`;
const termsTitleDe = `Nutzungsbedingungen - App ${name}`;

const privacySectionsDe = [
  {
    title: 'Einleitung',
    paragraphs: [
      `Diese Datenschutzerklärung gilt für die App ${safeName}, entwickelt von ${OPERATOR}. Bei Fragen zum Datenschutz wenden Sie sich an ${mail}.`,
    ],
  },
  {
    title: 'Auf Ihrem Gerät gespeicherte Daten',
    paragraphs: [
      `${safeName} speichert Ihre Inhalte, Einstellungen und Ihren Kaufstatus lokal auf Ihrem Gerät. Diese Daten werden zur Bereitstellung der App verwendet und nicht an Server von George Valandis gesendet.`,
    ],
  },
  {
    title: 'Konten und Datenübertragung',
    paragraphs: [`${safeName} erfordert kein Konto und keine Anmeldung.`],
  },
  ...(hasRevenueCat
    ? [
        {
          title: 'Käufe',
          paragraphs: [
            `Wenn Sie den Premium-Zugang kaufen oder wiederherstellen, verarbeitet Apple die Zahlung. RevenueCat verarbeitet technische Informationen zu Kauf, Berechtigung und Wiederherstellung zusammen mit einer anonymen, von der App erzeugten App-Nutzer-ID, um den Premium-Zugang zu validieren, freizuschalten und wiederherzustellen. Diese Informationen werden nicht mit Ihrem Namen verknüpft und nicht für Werbung verwendet. Einzelheiten finden Sie in der <a href="https://www.revenuecat.com/privacy/">Datenschutzerklärung von RevenueCat</a>.`,
          ],
        },
      ]
    : []),
  {
    title: 'Analyse, Werbung und Tracking',
    paragraphs: hasTelemetryDeck
      ? [
          `${safeName} nutzt TelemetryDeck für anonyme Nutzungsstatistiken, zum Beispiel welche Funktionen genutzt werden, ob das Onboarding abgeschlossen wurde, die App-Version und die Version des Betriebssystems. TelemetryDeck verwendet eine anonymisierte Kennung, die nicht auf Sie zurückgeführt werden kann, und speichert Ihre IP-Adresse nicht. Diese Daten werden nicht mit Ihrer Identität verknüpft und nicht für Werbung verwendet. Einzelheiten finden Sie in der <a href="https://telemetrydeck.com/privacy/">Datenschutzerklärung von TelemetryDeck</a>.`,
          `${safeName} verwendet keine Werbe-SDKs, zeigt keine Werbung an und verfolgt Sie nicht über Apps, Websites oder Dienste hinweg.`,
        ]
      : [
          `${safeName} verwendet weder Analyse-SDKs noch Werbe-SDKs, zeigt keine Werbung an und verfolgt Sie nicht über Apps, Websites oder Dienste hinweg.`,
        ],
  },
  {
    title: 'Löschung von Daten',
    paragraphs: [
      `Wenn Sie ${safeName} von Ihrem Gerät entfernen, werden die lokal gespeicherten App-Daten auf diesem Gerät gelöscht. Von der Plattform verwaltete Backups können lokale App-Daten entsprechend den Einstellungen Ihres Apple Accounts weiterhin enthalten.`,
    ],
  },
  {
    title: 'Verantwortlicher, Rechtsgrundlagen und Ihre Rechte',
    paragraphs: [
      `Verantwortlicher für die Datenverarbeitung im Zusammenhang mit ${safeName} ist ${OPERATOR}, ${OPERATOR_ADDRESS_DE}, ${mail}.`,
      ...(hasRevenueCat || hasTelemetryDeck
        ? [
            [
              hasRevenueCat &&
                'Die Verarbeitung von Kauf- und Berechtigungsdaten dient der Erfüllung des Vertrags mit Ihnen (Art. 6 Abs. 1 lit. b DSGVO).',
              hasTelemetryDeck &&
                `Anonyme Nutzungsstatistiken dienen unserem berechtigten Interesse, zu verstehen, wie ${safeName} genutzt wird, und die App zu verbessern (Art. 6 Abs. 1 lit. f DSGVO).`,
            ]
              .filter(Boolean)
              .join(' '),
          ]
        : []),
      ...(hasRevenueCat
        ? [
            'Die RevenueCat, Inc. hat ihren Sitz in den USA und speichert Daten auf Servern von Amazon Web Services in den USA. Grundlage dieser Übermittlung sind die EU-Standardvertragsklauseln im Auftragsverarbeitungsvertrag von RevenueCat.',
          ]
        : []),
      ...(hasTelemetryDeck
        ? ['Die TelemetryDeck GmbH hat ihren Sitz in Deutschland und verarbeitet die Daten nach eigenen Angaben auf Servern in der EU.']
        : []),
      'Wenn Sie uns per E-Mail kontaktieren, zum Beispiel für Support oder Feedback, erhalten wir Ihre E-Mail-Adresse, Ihre Nachricht und die darin enthaltenen technischen Angaben, etwa die Version der App und des Betriebssystems. Wir verwenden diese Daten nur zur Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO bei Support zur App, sonst Art. 6 Abs. 1 lit. f DSGVO) und löschen sie, sobald die Anfrage erledigt ist, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.',
      [
        'Daten auf Ihrem Gerät bleiben gespeichert, bis Sie sie löschen oder die App entfernen.',
        thirdParties.length
          ? `${thirdParties.join(' und ')} ${thirdParties.length > 1 ? 'speichern' : 'speichert'} Daten nach ${thirdParties.length > 1 ? 'ihren oben verlinkten Datenschutzerklärungen' : 'der oben verlinkten Datenschutzerklärung'}.`
          : '',
      ]
        .filter(Boolean)
        .join(' '),
      'Sie haben nach der DSGVO das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie das Recht auf Beschwerde bei einer Aufsichtsbehörde, zum Beispiel beim Hessischen Beauftragten für Datenschutz und Informationsfreiheit (HBDI) in Wiesbaden.',
    ],
  },
  {
    title: 'Kontakt',
    paragraphs: [`Wenn Sie Fragen zum Datenschutz haben, wenden Sie sich bitte an ${mail}.`],
  },
];

const privacyHtmlDe = [
  `<h3 class="wp-block-heading"><strong>Datenschutzerklärung für ${safeName}</strong></h3>`,
  h(`Zuletzt aktualisiert: ${updatedDisplay}`),
  numbered(privacySectionsDe),
].join('\n\n');

const termsHtmlDe = [
  `<h3 class="wp-block-heading"><strong>Nutzungsbedingungen - App ${safeName}</strong></h3>`,
  h(`Zuletzt aktualisiert: ${updatedDisplay}`),
  p(
    `${safeName} unterliegt den Nutzungsbedingungen von Apple, dem <a href="${APPLE_EULA}">Endbenutzer-Lizenzvertrag für lizenzierte Apps</a>.`
  ),
  p(`${safeName}: ${htmlEscape(spec.subtitle)}. Die App wird von ${OPERATOR} bereitgestellt.`),
  ...(hasRevenueCat
    ? [
        h('Käufe'),
        p(
          `Premium-Funktionen sind optionale In-App-Käufe. Abrechnung und Erstattungen werden von Apple über den App Store abgewickelt. RevenueCat kann technische Kauf- und Berechtigungsdaten verarbeiten, die erforderlich sind, um den Premium-Zugang zu validieren, freizuschalten und wiederherzustellen.`
        ),
      ]
    : []),
  h('Verfügbarkeit'),
  p(
    `Einige Funktionen können vom Gerätespeicher, von den Möglichkeiten von iOS und von der App-Version abhängen. Wir können Funktionen im Laufe der Zeit aktualisieren, verbessern oder entfernen.`
  ),
  h('Kontakt'),
  p(`Wenn Sie Fragen zu diesen Nutzungsbedingungen haben, wenden Sie sich bitte an ${mail}.`),
].join('\n\n');

const legalEntry = {
  generator: GENERATOR,
  updated,
  terms: {
    sourceUrl: `https://georgevalandis.com/apps/${slug}/terms-and-conditions/`,
    sourceTitle: `Terms and Conditions - ${name} App`,
    html: termsHtml,
  },
  privacy: {
    sourceUrl: `https://georgevalandis.com/apps/${slug}/privacy/`,
    sourceTitle: `Privacy Policy - ${name} App`,
    html: privacyHtml,
  },
  de: {
    terms: {
      sourceUrl: `https://georgevalandis.com/apps/${slug}/nutzungsbedingungen/`,
      sourceTitle: termsTitleDe,
      html: termsHtmlDe,
    },
    privacy: {
      sourceUrl: `https://georgevalandis.com/apps/${slug}/datenschutz/`,
      sourceTitle: privacyTitleDe,
      html: privacyHtmlDe,
    },
  },
};

// ---------------------------------------------------------------- privacy-asc.json

const privacyAsc = (() => {
  const byCategory = new Map();
  for (const service of services) {
    for (const usage of SERVICES[service].privacy) {
      const existing = byCategory.get(usage.category);
      if (existing) {
        existing.purposes = [...new Set([...existing.purposes, ...usage.purposes])].sort();
      } else {
        byCategory.set(usage.category, { ...usage, purposes: [...usage.purposes].sort() });
      }
    }
  }
  const dataUsages =
    byCategory.size === 0
      ? [{ dataProtections: ['DATA_NOT_COLLECTED'] }]
      : [...byCategory.values()].sort((a, b) => a.category.localeCompare(b.category));
  return `${JSON.stringify({ schemaVersion: 1, dataUsages }, null, 2)}\n`;
})();
const privacyAscPath = path.resolve(privacyOutArg ?? path.join(inputDir, 'privacy-asc.json'));

// ---------------------------------------------------------------- planning

const report = [];
const writes = []; // { file, content } (text) or { copy: {from,to} }
let blocking = false;

function planMarkerBlock({ file, anchor, block, label, keyPattern }) {
  const full = path.join(repoRoot, file);
  const text = fs.readFileSync(full, 'utf8');
  const beginIdx = text.indexOf(`  ${begin}\n`);
  if (beginIdx >= 0) {
    const endMarker = `  ${end}\n`;
    const endIdx = text.indexOf(endMarker, beginIdx);
    if (endIdx < 0) {
      report.push(`ERROR ${label}: begin marker without end marker`);
      blocking = true;
      return;
    }
    const current = text.slice(beginIdx, endIdx + endMarker.length);
    if (current === block) {
      report.push(`unchanged  ${label}`);
    } else if (update) {
      writes.push({
        file: full,
        content: text.slice(0, beginIdx) + block + text.slice(endIdx + endMarker.length),
      });
      report.push(`updated    ${label}`);
    } else {
      report.push(`differs    ${label} (generated earlier, left unchanged; use --update)`);
    }
    return;
  }
  if (keyPattern.test(text)) {
    report.push(`ERROR ${label}: "${slug}" already exists and was not created by add-app; refusing to touch it`);
    blocking = true;
    return;
  }
  const anchorIdx = text.indexOf(anchor);
  if (anchorIdx < 0) {
    report.push(`ERROR ${label}: insertion anchor not found in ${file}`);
    blocking = true;
    return;
  }
  const insertAt = anchor.startsWith('\n') ? anchorIdx + 1 : anchorIdx;
  writes.push({ file: full, content: text.slice(0, insertAt) + block + text.slice(insertAt) });
  report.push(`added      ${label}`);
}

const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
planMarkerBlock({
  file: 'src/content/apps.ts',
  anchor: '] as const;\n\nexport const apps',
  block: appsBlock,
  label: 'apps.ts (hub tile)',
  keyPattern: new RegExp(`slug:\\s*['"]${escapedSlug}['"]`),
});
planMarkerBlock({
  file: 'src/content/appLandingPages.ts',
  anchor: '};\n\nexport function getAppLandingPage',
  block: landingBlock,
  label: 'appLandingPages.ts (landing page)',
  keyPattern: new RegExp(`^  (['"]?)${escapedSlug}\\1:\\s*\\{`, 'm'),
});
planMarkerBlock({
  file: 'src/content/appSeo.ts',
  anchor: '};\n\nexport const supportSeoMetadata',
  block: seoBlock,
  label: 'appSeo.ts (SEO/AEO)',
  keyPattern: new RegExp(`^  (['"]?)${escapedSlug}\\1:\\s*\\{`, 'm'),
});

// legal JSON
if (existingLegal && existingLegal.generator !== GENERATOR) {
  report.push(`ERROR appLegalContent.json: "${slug}" already exists and was not created by add-app; refusing to touch it`);
  blocking = true;
} else if (existingLegal && JSON.stringify(existingLegal) === JSON.stringify(legalEntry)) {
  report.push('unchanged  appLegalContent.json (terms + privacy, EN + DE)');
} else if (existingLegal && !update) {
  report.push('differs    appLegalContent.json (generated earlier, left unchanged; use --update)');
} else {
  legalJson[slug] = legalEntry;
  writes.push({ file: legalPath, content: `${JSON.stringify(legalJson, null, 2)}\n` });
  report.push(existingLegal ? 'updated    appLegalContent.json (terms + privacy, EN + DE)' : 'added      appLegalContent.json (terms + privacy, EN + DE)');
}

// assets
for (const asset of assetPlan) {
  const to = path.join(repoRoot, 'public', asset.publicPath.replace(/^\//, ''));
  const source = fs.readFileSync(asset.from);
  if (!fs.existsSync(to)) {
    writes.push({ copy: { from: asset.from, to } });
    report.push(`added      public${asset.publicPath}`);
  } else if (Buffer.compare(fs.readFileSync(to), source) === 0) {
    report.push(`unchanged  public${asset.publicPath}`);
  } else if (update) {
    writes.push({ copy: { from: asset.from, to } });
    report.push(`updated    public${asset.publicPath}`);
  } else {
    report.push(`differs    public${asset.publicPath} (left unchanged; use --update)`);
  }
}

// privacy-asc.json
if (!fs.existsSync(privacyAscPath)) {
  writes.push({ file: privacyAscPath, content: privacyAsc });
  report.push(`added      ${privacyAscPath}`);
} else if (fs.readFileSync(privacyAscPath, 'utf8') === privacyAsc) {
  report.push(`unchanged  ${privacyAscPath}`);
} else if (update) {
  writes.push({ file: privacyAscPath, content: privacyAsc });
  report.push(`updated    ${privacyAscPath}`);
} else {
  report.push(`differs    ${privacyAscPath} (left unchanged; use --update)`);
}

// ---------------------------------------------------------------- apply

console.log(`add-app: ${name} (${slug})${dryRun ? ' [dry run]' : ''}`);
for (const line of report) console.log(`  ${line}`);

if (blocking) {
  console.error('add-app: aborted, nothing was written.');
  process.exit(1);
}

if (!dryRun) {
  // Several writes may target the same file (never the case today, but keep the last one).
  const lastByFile = new Map();
  for (const write of writes) {
    if (write.file) lastByFile.set(write.file, write.content);
  }
  for (const [file, content] of lastByFile) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }
  for (const write of writes) {
    if (write.copy) {
      fs.mkdirSync(path.dirname(write.copy.to), { recursive: true });
      fs.copyFileSync(write.copy.from, write.copy.to);
    }
  }
}

const changed = writes.length > 0;
console.log(changed ? (dryRun ? 'add-app: would change the files above.' : 'add-app: done.') : 'add-app: nothing to do (already up to date).');
if (changed && !dryRun) {
  console.log('Next: npm run lint && npx tsc --noEmit && npm run build, check /apps/ and /apps/' + slug + '/ locally.');
  console.log(`App Privacy in ASC: asc web privacy plan --app <APP_ID> --file ${privacyAscPath}`);
  console.log('Upload only after Georgios\' go: npm run deploy -- --yes');
}
