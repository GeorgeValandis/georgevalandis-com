import type { SiteLocale } from '@/lib/siteLocale';

export const amazonPartnerTag = 'georgevalan01-21';

type LocalizedText = Record<SiteLocale, string>;

export type SetupItem = {
  name: string;
  note: LocalizedText;
  asin?: string;
  search?: string;
};

export type SetupSection = {
  id: string;
  title: LocalizedText;
  items: SetupItem[];
};

export function amazonUrl(item: SetupItem): string {
  if (item.asin) {
    return `https://www.amazon.de/dp/${item.asin}?tag=${amazonPartnerTag}`;
  }

  return `https://www.amazon.de/s?k=${encodeURIComponent(item.search ?? item.name)}&tag=${amazonPartnerTag}`;
}

export const setupSections: SetupSection[] = [
  {
    id: 'desk',
    title: { en: 'Desk', de: 'Schreibtisch' },
    items: [
      { name: 'ALBATROS Lift S5W', asin: 'B08MKVT7DF', note: { en: 'Electric standing desk frame', de: 'Elektrisch höhenverstellbar' } },
      { name: 'Dell S2725QC 27″ 4K', asin: 'B0F29RSLHP', note: { en: 'Main display, USB-C', de: 'Hauptmonitor, USB-C' } },
      { name: 'ARZOPA portable monitor', search: 'ARZOPA tragbarer Monitor 16 Zoll', note: { en: 'Second screen for the simulator', de: 'Zweiter Screen für den Simulator' } },
      { name: 'Suptek MD6821', asin: 'B07DK2BLZT', note: { en: 'Dual monitor arm', de: 'Doppel-Monitorarm' } },
      { name: 'Feising FS07D', asin: 'B0DBZQ2N2N', note: { en: 'Monitor arm', de: 'Monitorarm' } },
      { name: 'AINAK XXL desk mat', asin: 'B09P5PC1W9', note: { en: 'Two-tone desk mat', de: 'Zweifarbige Schreibtischunterlage' } },
    ],
  },
  {
    id: 'coding',
    title: { en: 'Coding', de: 'Coding' },
    items: [
      { name: 'NuPhy Air75', search: 'NuPhy Air75', note: { en: 'Low-profile mechanical keyboard', de: 'Flache mechanische Tastatur' } },
      { name: 'Logitech MX Vertical', asin: 'B07FNHV4MW', note: { en: 'Vertical mouse', de: 'Vertikale Maus' } },
      { name: 'Apple Magic Trackpad', search: 'Apple Magic Trackpad', note: { en: 'Gestures in Xcode and Figma', de: 'Gesten in Xcode und Figma' } },
      { name: 'Elgato Stream Deck Mini', search: 'Elgato Stream Deck Mini', note: { en: 'Shortcuts for builds and recording', de: 'Shortcuts für Builds und Aufnahmen' } },
      { name: 'SanDisk Portable SSD 1 TB', asin: 'B0C5JQ68FY', note: { en: 'Footage and backups', de: 'Videos und Backups' } },
    ],
  },
  {
    id: 'camera',
    title: { en: 'Camera & light', de: 'Kamera & Licht' },
    items: [
      { name: 'Sony ZV-E10', asin: 'B098M236VR', note: { en: 'Camera for reels and talking head', de: 'Kamera für Reels und Talking Head' } },
      { name: 'Tamron 17–70 mm F2.8', asin: 'B08PFNNKCC', note: { en: 'Everyday lens', de: 'Immer-drauf-Objektiv' } },
      { name: 'SmallRig ZV-E10 cage', asin: 'B09GVH1JC1', note: { en: 'Cage with grip', de: 'Cage mit Griff' } },
      { name: 'Ulanzi ZJ02', asin: 'B0D8BDDR7L', note: { en: 'Desk-mounted camera arm', de: 'Kameraarm am Tisch' } },
      { name: 'Elgato Cam Link 4K', asin: 'B07K3FN5MR', note: { en: 'Camera as webcam', de: 'Kamera als Webcam' } },
      { name: 'Sony AC-PW20', asin: 'B003LV0IXO', note: { en: 'Continuous power', de: 'Dauerstrom statt Akku' } },
      { name: 'Elgato Key Light Mini', search: 'Elgato Key Light Mini', note: { en: 'LED panel', de: 'LED-Panel' } },
    ],
  },
  {
    id: 'audio',
    title: { en: 'Audio', de: 'Audio' },
    items: [
      { name: 'RØDE VideoMicro II', asin: 'B0BM8HQL6L', note: { en: 'On-camera mic', de: 'Mikrofon auf der Kamera' } },
      { name: 'Hollyland Lark M2', asin: 'B0CP7QXWPN', note: { en: 'Wireless lavalier', de: 'Funk-Ansteckmikrofon' } },
      { name: 'Behringer UMC22', asin: 'B00FFIGZF6', note: { en: 'Audio interface', de: 'Audio-Interface' } },
      { name: 'Apple AirPods 4', asin: 'B0DGHYDYJL', note: { en: 'Calls and focus', de: 'Calls und Fokus' } },
      { name: 'Sony WH-XB900N', asin: 'B07RVC23SG', note: { en: 'Noise-cancelling headphones', de: 'Kopfhörer mit Noise Cancelling' } },
    ],
  },
];

export const setupCopy = {
  en: {
    eyebrow: 'Setup',
    title: 'My desk setup',
    intro: 'The gear I build my iOS apps and content with.',
    imageAlt: 'George Valandis desk setup with two monitors, a MacBook, keyboard and microphone',
    cta: 'Amazon',
    back: 'Back to home',
    disclosure:
      'Links on this page are Amazon affiliate links (ads). As an Amazon Associate I earn from qualifying purchases. The price stays the same for you.',
  },
  de: {
    eyebrow: 'Setup',
    title: 'Mein Schreibtisch-Setup',
    intro: 'Das Equipment, mit dem ich meine iOS-Apps und Inhalte baue.',
    imageAlt: 'Schreibtisch-Setup von George Valandis mit zwei Monitoren, MacBook, Tastatur und Mikrofon',
    cta: 'Amazon',
    back: 'Zur Startseite',
    disclosure:
      'Die Links auf dieser Seite sind Amazon-Partnerlinks (Werbung). Als Amazon-Partner verdiene ich an qualifizierten Verkäufen. Für dich ändert sich der Preis nicht.',
  },
} satisfies Record<SiteLocale, Record<string, string>>;
