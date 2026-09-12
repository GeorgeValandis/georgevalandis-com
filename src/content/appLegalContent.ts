import appLegalContentJson from '@/content/appLegalContent.json';
import { glanceAwayPrivacyHtml } from '@/content/glanceAwayPrivacy';

type LegacyLegalDocument = {
  sourceUrl: string;
  sourceTitle: string;
  html: string;
  note?: string;
};

type LegacyAppLegalContent = {
  terms: LegacyLegalDocument;
  privacy: LegacyLegalDocument;
};

const appLegalContent = appLegalContentJson as Record<string, LegacyAppLegalContent>;

const glanceAwayLegalContent: LegacyAppLegalContent = {
  ...appLegalContent.glanceaway,
  privacy: {
    ...appLegalContent.glanceaway.privacy,
    sourceUrl: 'https://georgevalandis.com/apps/glanceaway/privacy/',
    sourceTitle: 'Privacy Policy for GlanceAway',
    html: glanceAwayPrivacyHtml,
  },
};

const oneSentenceLegalContent: LegacyAppLegalContent = {
  terms: {
    sourceUrl: 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/',
    sourceTitle: 'Terms of Use – One Sentence',
    html: `
      <h3><strong>Terms of Use – One Sentence</strong></h3>
      <p><strong>Last updated: 2 September 2026</strong></p>
      <p>One Sentence is a private, local journal for short writing and reflection, provided by Georgios Andi Avenidis, Berliner Strasse 235, 65205 Wiesbaden, Germany.</p>
      <h5><strong>Personal use</strong></h5>
      <p>You may use One Sentence to create, edit, save, review, export, and delete your own journal entries. You are responsible for the content you enter and for protecting access to your device.</p>
      <h5><strong>Not professional advice</strong></h5>
      <p>One Sentence is a writing and reflection tool. It is not a medical, psychological, therapeutic, or emergency service and does not replace professional advice.</p>
      <h5><strong>Local storage and availability</strong></h5>
      <p>The current release stores journal data locally on your device. Data may be lost if you remove the app or reset its local storage. Platform-managed backups are controlled by the relevant platform provider.</p>
      <h5><strong>App Store terms</strong></h5>
      <p>If you obtain One Sentence through an app store, that store’s terms also apply. The app is currently provided as a free test release; any future purchase terms will be shown before a purchase is made.</p>
      <h5><strong>Contact</strong></h5>
      <p>Questions about these terms can be sent to <a href="mailto:info@georgevalandis.com">info@georgevalandis.com</a>.</p>
    `,
  },
  privacy: {
    sourceUrl: 'https://georgevalandis.com/apps/one-sentence/privacy/',
    sourceTitle: 'Privacy Policy – One Sentence',
    html: `
      <h3><strong>Privacy Policy – One Sentence</strong></h3>
      <p>One Sentence is designed as a local-first journal. Journal entries, drafts, moods, and settings remain on your device and are not sent to George Valandis servers.</p>
      <p>One Sentence does not require an account, does not include its own audio recording flow, and does not upload keyboard dictation. Your operating system and keyboard provider handle any dictation you choose to use.</p>
      <p>Read the full <a href="https://georgevalandis.com/apps/one-sentence/privacy/">One Sentence app privacy policy</a>.</p>
    `,
  },
};

export function getAppLegalContentBySlug(slug: string) {
  if (slug === 'glanceaway') {
    return glanceAwayLegalContent;
  }

  return slug === 'one-sentence' ? oneSentenceLegalContent : appLegalContent[slug];
}
