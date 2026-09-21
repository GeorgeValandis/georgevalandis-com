import type { BlogPost, BlogSlug } from './blogPosts';
import type { SiteLocale } from '@/lib/siteLocale';

type LocalizedBlogPost = Pick<BlogPost, 'title' | 'excerpt' | 'content'>;

export const germanBlogPostTranslations: Record<BlogSlug, LocalizedBlogPost> = {
  'finding-a-better-rhythm-while-the-app-list-keeps-growing': {
    title: 'Einen besseren Rhythmus finden, während die App-Liste wächst',
    excerpt:
      'Ein Blick darauf, wie ich zwischen neuen Apps, Verbesserungen bestehender Produkte und ehrlichem Teilen einen ruhigeren Rhythmus finde.',
    content: [
      { type: 'paragraph', text: 'Hallo zusammen,' },
      { type: 'paragraph', text: 'ein kurzes Update von mir.' },
      {
        type: 'paragraph',
        text: 'Die App-Liste wächst weiter, und ich lerne langsam, dass mehr zu bauen nicht automatisch bedeutet, mehr zu veröffentlichen. Es bedeutet auch, mehr zu pflegen, mehr zuzuhören und bewusster zu entscheiden, was jede Woche meine Aufmerksamkeit verdient.',
      },
      {
        type: 'paragraph',
        text: 'An manchen Tagen dreht sich alles um neue Ideen. An anderen verbessere ich Apps, die bereits draußen sind, prüfe Feedback, poliere kleine Details und achte darauf, dass jedes Produkt einfach und nützlich bleibt. So spannend wie ein neuer Launch ist das nicht immer, aber es ist wichtig.',
      },
      {
        type: 'paragraph',
        text: 'Ich denke außerdem mehr darüber nach, wie ich alles präsentiere. Die Apps fühlen sich langsam wie ein kleines Portfolio statt wie einzelne Nebenprojekte an. Deshalb sollen Website, Inhalte und Updates klarer werden und sich leichter verfolgen lassen.',
      },
      {
        type: 'paragraph',
        text: 'Content gehört weiterhin dazu, aber ich möchte ihn ehrlich halten. Weniger erzwingen, mehr dokumentieren. Wenn etwas chaotisch ist, will ich auch das teilen, denn dort liegen oft die nützlichsten Erkenntnisse.',
      },
      { type: 'heading', text: 'Darum geht es gerade:' },
      {
        type: 'list',
        items: [
          'Die bestehenden Apps weiterentwickeln.',
          'Die Website verbessern, damit das Portfolio leichter zu entdecken ist.',
          'Einen realistischen Rhythmus für Inhalte finden.',
          'Fokussiert bleiben und trotzdem Raum für neue Ideen lassen.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Es bleibt viel gleichzeitig, aber ich sehe das Ganze immer besser als eine zusammenhängende Reise.',
      },
      { type: 'paragraph', text: 'Schritt für Schritt finde ich meinen Weg.' },
      { type: 'paragraph', text: 'Bis zum nächsten Mal, George' },
    ],
  },
  'juggling-7-apps-taking-a-breath-and-creating-more-long-form-content': {
    title: '7 Apps jonglieren und wieder meinen Weg finden',
    excerpt:
      'Ich jongliere gerade mit sieben Apps, kehre nach einer kurzen Pause zum Content zurück und probiere längere Videos aus.',
    content: [
      { type: 'paragraph', text: 'Hallo zusammen,' },
      { type: 'paragraph', text: 'ein kurzes Update von mir.' },
      {
        type: 'paragraph',
        text: 'Gerade jongliere ich mit sieben Apps gleichzeitig. Manche sind schon weiter, andere entwickeln sich noch, und wieder andere sind kleine Ideen, die langsam zu etwas Echtem werden. Es ist viel auf einmal, aber auf eine seltsame Art mag ich dieses Chaos. Jede App bringt mir etwas Neues bei, und der Wechsel zwischen den Projekten hält die gesamte Reise spannend.',
      },
      {
        type: 'paragraph',
        text: 'Gleichzeitig habe ich weiter Content rund um das erstellt, was ich baue. Den Prozess, die Erfolge, die chaotische Mitte und die kleinen Lektionen zu teilen, fühlt sich für mich weiterhin wie ein wichtiger Teil dieser Reise an.',
      },
      {
        type: 'paragraph',
        text: 'Vor Kurzem habe ich aus persönlichen Gründen eine kurze Pause gemacht. Manchmal verlangt das Leben, einen Moment langsamer zu werden, Abstand zu gewinnen und sich auf das zu konzentrieren, was außerhalb von Arbeit und Projekten wichtig ist. Diese Pause war nötig. Jetzt bin ich mit neuer Energie und einem klareren Kopf zurück.',
      },
      {
        type: 'paragraph',
        text: 'Ich experimentiere außerdem mehr mit längeren Inhalten. Ich habe ein oder zwei längere YouTube-Videos veröffentlicht, was im Vergleich zu kurzen Clips eine andere Herausforderung war. Es braucht mehr Planung, Struktur und Geduld, aber das tiefere Format gefällt mir sehr. Es gibt mir Raum, die ganze Geschichte zu erzählen statt nur kurze Ausschnitte zu zeigen.',
      },
      { type: 'heading', text: 'Darum geht es gerade:' },
      {
        type: 'list',
        items: [
          'Sieben Apps jonglieren und weiter voranbringen.',
          'Nach einer kurzen persönlichen Pause wieder Content erstellen.',
          'Längere YouTube-Videos neben kurzen Formaten ausprobieren.',
          'Schritt für Schritt öffentlich weiterbauen.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Manchmal fühlt es sich weiterhin nach viel an, aber ich lerne, meinem eigenen Tempo zu vertrauen und weiterzumachen.',
      },
      { type: 'paragraph', text: 'Schritt für Schritt finde ich meinen Weg.' },
      { type: 'paragraph', text: 'Bis zum nächsten Mal, George' },
    ],
  },
  'focus-on-marketing': {
    title: 'Fokus auf Marketing',
    excerpt:
      'Ich richte meine Aufmerksamkeit stärker auf das Marketing meiner Apps und lerne, wie UGC, Kurzvideos und gute Geschichten ihre Entdeckung beeinflussen.',
    content: [
      { type: 'paragraph', text: 'Hallo zusammen,' },
      { type: 'paragraph', text: 'ein kurzes Update zu dem, womit ich mich gerade beschäftige.' },
      {
        type: 'paragraph',
        text: 'Ich richte meinen Fokus stärker auf Marketing. Es geht nicht mehr nur darum, Apps zu bauen, sondern auch darum zu lernen, wie sie die richtigen Menschen erreichen. Ich schaue Tutorials, teste Formate und beobachte, wie andere Inhalte erstellen, die wirklich ankommen. Von UGC über TikToks und Reels bis zu einfachen Slideshows probiere ich gerade vieles aus.',
      },
      {
        type: 'paragraph',
        text: 'Im Vergleich zum Programmieren ist das eine ganz neue Welt. Gleichzeitig finde ich sie sehr kreativ. Eine Geschichte rund um eine App zu erzählen, in den ersten Sekunden Aufmerksamkeit zu gewinnen oder mit einem kurzen Clip etwas auszulösen, ist anspruchsvoll und macht Spaß.',
      },
      {
        type: 'paragraph',
        text: 'Ich spreche außerdem mit Menschen, die das bereits gut machen. Ihre Einblicke zu hören, ihre Herangehensweise an Videos zu beobachten und das Passende für meinen eigenen Stil zu übernehmen, fühlt sich wie das Erlernen eines neuen Handwerks an – ein Experiment nach dem anderen.',
      },
      { type: 'heading', text: 'So sehen meine Tage gerade aus:' },
      {
        type: 'list',
        items: [
          'Lernen, wie Inhalte entstehen, die Menschen erreichen.',
          'Verschiedene Marketingstile auf unterschiedlichen Plattformen testen.',
          'Mit Creators sprechen, die dieses Spiel bereits beherrschen.',
          'Weiter Apps bauen, aber mit mehr Fokus auf das Teilen der Arbeit.',
        ],
      },
      { type: 'paragraph', text: 'Es ist dieselbe Reise, nur ein neues Kapitel.' },
      { type: 'paragraph', text: 'Schritt für Schritt finde ich meinen Weg.' },
      { type: 'paragraph', text: 'Bis zum nächsten Mal, George' },
    ],
  },
  'many-apps-many-ideas-and-juggling-life': {
    title: 'Viele Apps, viele Ideen und der Alltag dazwischen',
    excerpt:
      'Warum ich mehrere kleine Apps gleichzeitig baue, was mich der App Store lehrt und wie ich das mit Familienleben verbinde.',
    content: [
      { type: 'paragraph', text: 'Hallo zusammen,' },
      { type: 'paragraph', text: 'ein kurzes Update dazu, wo ich gerade stehe.' },
      {
        type: 'paragraph',
        text: 'Ich baue immer mehr kleine Apps. Für mich ist das der beste Weg, Ideen schnell zu testen, herauszufinden, was funktioniert, und zügig zu lernen. Jede neue App ist ein weiteres Experiment. Manche werden funktionieren, manche nicht – und genau das gehört zum Prozess.',
      },
      {
        type: 'paragraph',
        text: 'Außerdem versuche ich zu verstehen, wie der Algorithmus des Apple App Store funktioniert. Jede Anpassung an Keywords, Screenshots oder Updates verändert, wie Nutzer meine Apps entdecken. Manchmal sind die Ergebnisse nachvollziehbar, manchmal nicht. Aber ich lerne gern daraus.',
      },
      {
        type: 'paragraph',
        text: 'Auf diesem Weg teile ich meinen Fortschritt im Build-in-Public-Stil. Über das zu posten, was ich baue, was funktioniert und woran ich scheitere, hält mich auf Kurs und ermutigt vielleicht andere, ebenfalls anzufangen.',
      },
      {
        type: 'paragraph',
        text: 'Und natürlich gibt es ein Leben außerhalb von Apps. Ich jongliere Familienleben, Zeit mit meinen Kindern und die kleinen Momente dazwischen. Die Balance ist manchmal chaotisch, aber sie hält mich geerdet.',
      },
      { type: 'heading', text: 'Darum geht es gerade:' },
      {
        type: 'list',
        items: [
          'Viele kleine Apps veröffentlichen und Ideen testen.',
          'Den App-Store-Algorithmus besser verstehen.',
          'Die Reise mit Build-in-Public-Content teilen.',
          'Die schönen Momente mit meinen Kindern nicht verpassen.',
        ],
      },
      { type: 'paragraph', text: 'Schritt für Schritt finde ich meinen Weg.' },
      { type: 'paragraph', text: 'Bis zum nächsten Mal, George' },
    ],
  },
  'a-little-content-reset-and-glanceaway-is-live': {
    title: 'Ein kleiner Content-Neustart und GlanceAway ist live',
    excerpt:
      'Ich habe LookAway in GlanceAway umbenannt, die App veröffentlicht und finde gerade einen nachhaltigeren Rhythmus für meine Inhalte.',
    content: [
      { type: 'paragraph', text: 'Hallo zusammen,' },
      { type: 'paragraph', text: 'ein kurzes Update zu Leben und Projekten.' },
      {
        type: 'paragraph',
        text: 'Ich habe meine App LookAway in GlanceAway umbenannt. Der Name passt besser: kurz, klar und passend zu dem, was die App tut – dich daran zu erinnern, vom Bildschirm aufzublicken und deinen Augen eine Pause zu gönnen.',
      },
      {
        type: 'paragraph',
        text: 'Die App ist jetzt live. Sie ist ganz bewusst einfach gehalten: ein kleiner Impuls für gesündere Bildschirmgewohnheiten. Ich freue mich, sie zu teilen, und habe außerdem begonnen, auf meinen Social-Kanälen Einblicke hinter die Kulissen von GlanceAway zu geben.',
      },
      {
        type: 'paragraph',
        text: 'Als Nächstes möchte ich mit KI-generiertem UGC und Nano Banana experimentieren. Es scheint eine spannende Möglichkeit zu sein, authentische Inhalte zu testen, die sich leichter produzieren lassen.',
      },
      {
        type: 'paragraph',
        text: 'Persönlich finde ich gerade wieder in einen regelmäßigen Posting-Rhythmus zurück. Ich möchte nachhaltig teilen, was ich baue: weniger Druck, mehr Ehrlichkeit.',
      },
      { type: 'heading', text: 'Darum geht es gerade:' },
      {
        type: 'list',
        items: [
          'GlanceAway ist live.',
          'Content für den Launch erstellen.',
          'KI-UGC-Workflows mit Nano Banana ausprobieren.',
          'Einen nachhaltigen Rhythmus fürs Posten finden.',
        ],
      },
      { type: 'paragraph', text: 'Danke, dass du mich auf diesem Weg begleitest.' },
      { type: 'paragraph', text: 'Bis zum nächsten Mal, George' },
    ],
  },
  'slowing-down-to-speed-up-shipping-perfect-day-and-building-lookaway': {
    title: 'Langsamer werden, um schneller voranzukommen',
    excerpt:
      'Ein langsameres Tempo hat mir geholfen, Energie zu schützen, Perfect Day zu veröffentlichen und weiter an LookAway zu bauen.',
    content: [
      { type: 'paragraph', text: 'Hallo zusammen,' },
      {
        type: 'paragraph',
        text: 'ein kurzes Update von mir. In letzter Zeit habe ich bewusst einen Gang zurückgeschaltet. Ich höre nicht auf, sondern hole Luft. Ich erstelle Content, wenn es sich richtig anfühlt – nicht nur, weil ein Kalender es vorgibt.',
      },
      { type: 'heading', text: 'In einem menschlichen Tempo kreativ bleiben' },
      {
        type: 'paragraph',
        text: 'Ich glaube weiterhin daran, die Reise zu zeigen, habe aber neu gelernt, wie schwer Beständigkeit sein kann. In manchen Wochen fließen die Ideen, in anderen übernimmt das Leben. Deshalb setze ich lieber auf Ehrlichkeit statt auf Output: weniger erzwungene Posts, mehr echte Momente.',
      },
      { type: 'heading', text: 'Neuigkeiten zu den Produkten' },
      {
        type: 'paragraph',
        text: 'Ich habe meine zweite kostenpflichtige App veröffentlicht: Perfect Day, einen Gewohnheitstracker. Sie ist bewusst einfach gehalten und hilft mit schnellen Check-ins und wenig Reibung dabei, durch kleine Erfolge Momentum aufzubauen.',
      },
      {
        type: 'paragraph',
        text: 'Nebenbei baue ich LookAway, eine kleine App, die dich daran erinnert, vom Handy aufzublicken. Mikro-Pausen für Augen und Kopf – eine kleine Idee mit großem Beitrag zu mehr Lebensqualität.',
      },
      { type: 'heading', text: 'Wo ich gerade stehe' },
      {
        type: 'list',
        items: [
          'Das Tempo reduziert, um Energie und Freude am Bauen zu schützen.',
          'Content erstellt, wenn es sich richtig anfühlt – nicht aus Schuldgefühl.',
          'Einfache Systeme für Beständigkeit aufgebaut: bündeln, einfache Formate, weniger Takes.',
          'Öffentlich veröffentlicht und iteriert, Schritt für Schritt.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Danke, dass du dabei bist und mich von der Seitenlinie aus anfeuerst. Wenn du ebenfalls Kreativität, Beständigkeit und echtes Leben unter einen Hut bringen willst, finden wir das gemeinsam heraus.',
      },
      { type: 'paragraph', text: 'Bis zum nächsten Mal, George' },
    ],
  },
  'pushing-content-building-community-the-next-chapter-for-flowa-perfect-day-beyond': {
    title: 'Content vorantreiben und Community aufbauen',
    excerpt:
      'Ein Update zu Kurzvideos, Indie-App-Communities und dem nächsten Kapitel für Flowa und Perfect Day.',
    content: [
      { type: 'paragraph', text: 'Hallo zusammen,' },
      {
        type: 'paragraph',
        text: 'Seit meinem letzten Update habe ich den Fokus verschoben. Ich baue nicht nur Apps, sondern teile auch stärker die Reise dahinter: Entwicklung, Content, Community und Austausch.',
      },
      { type: 'heading', text: 'Content erstellen – TikTok, Reels und YouTube Shorts' },
      {
        type: 'paragraph',
        text: 'Ich poste auf TikTok und Instagram Reels und veröffentliche inzwischen auch YouTube Shorts. Ich möchte einen echten Blick hinter die Kulissen beim Bau von Indie-Apps wie Flowa und Perfect Day geben.',
      },
      {
        type: 'list',
        items: [
          'Kurzform-Content hat viel Kraft.',
          'Ehrliche und ungeschliffene Geschichten kommen an.',
          'Beständigkeit schlägt Perfektion.',
        ],
      },
      { type: 'heading', text: 'Das Netzwerk erweitern – eine DM nach der anderen' },
      {
        type: 'paragraph',
        text: 'Ich tausche mich mit mehr Indie-Entwicklern und Creators aus, teile mein Wissen und lerne von ihrer Arbeit. Wachstum entsteht durch Gespräche.',
      },
      {
        type: 'list',
        items: [
          'Mit Indie-Entwicklern und Creators in Kontakt kommen.',
          'Lektionen und praktische Taktiken austauschen.',
          'Echte Freundschaften in der Indie-Szene aufbauen.',
        ],
      },
      { type: 'heading', text: 'Das Indie App & Content Lab gestartet' },
      {
        type: 'paragraph',
        text: 'Eine der größten Neuigkeiten: Ich habe eine Discord-Community namens Indie App & Content Lab gestartet. Dort können Builder und Creators Fortschritte, Ideen und Feedback teilen.',
      },
      { type: 'heading', text: 'Was als Nächstes kommt' },
      {
        type: 'list',
        items: [
          'Weiter TikToks, Shorts und Reels posten.',
          'Perfect Day weiter verfeinern und Flowa verbessern.',
          'Indie App & Content Lab zu etwas Wertvollem ausbauen.',
          'Beständig und neugierig bleiben und öffentlich weiterbauen.',
        ],
      },
      { type: 'paragraph', text: 'Danke, dass du mich begleitest und diese Reise unterstützt. Bald gibt es mehr Updates.' },
      { type: 'paragraph', text: 'Bis zum nächsten Mal, George' },
    ],
  },
  'flowa-is-live-my-first-paid-app-on-the-app-store': {
    title: 'Flowa ist live – meine erste kostenpflichtige App im App Store',
    excerpt:
      'Die Geschichte hinter dem Launch von Flowa, meiner ersten kostenpflichtigen App, und die Lektionen aus Entwicklung, Veröffentlichung und App-Store-Review.',
    content: [
      { type: 'paragraph', text: 'Hallo zusammen,' },
      {
        type: 'paragraph',
        text: 'Große Neuigkeiten: Flowa ist offiziell im App Store live. Nach einer intensiven Entwicklungsphase mit vielen Iterationen und Hürden ist meine erste kostenpflichtige App jetzt verfügbar.',
      },
      { type: 'heading', text: 'Der Weg zum Launch' },
      {
        type: 'paragraph',
        text: 'Flowa zu bauen war intensiv und hat sich gelohnt. Das Projekt hat mich aus meiner Komfortzone gebracht – von UX-Verbesserungen über Entscheidungen beim Datenmodell bis zu Details der App-Store-Richtlinien.',
      },
      {
        type: 'paragraph',
        text: 'Durch Apples Prüfprozess zu kommen, war nicht einfach. Zwischen dem Beheben von Sonderfällen und dem Optimieren von Layouts für kleinere Geräte wurde jede Blockade zu einer Lektion.',
      },
      { type: 'heading', text: 'Die ersten Verkäufe und Pläne für die Zukunft' },
      {
        type: 'paragraph',
        text: 'Zum ersten Mal eine kostenpflichtige App zu veröffentlichen, ist ein großer Meilenstein für mich. Es ist noch früh, aber ich habe bereits Ideen für Updates und Verbesserungen – darunter mehr Anpassungsmöglichkeiten und tiefere Einblicke.',
      },
      { type: 'heading', text: 'Was ich gelernt habe' },
      {
        type: 'list',
        items: [
          'Schnell vorankommen und kontinuierlich verbessern.',
          'Die App-Store-Richtlinien sind bis ins kleinste Detail wichtig.',
          'Die Indie-Reise ist anspruchsvoll und unglaublich lohnend.',
        ],
      },
      { type: 'heading', text: 'Was als Nächstes kommt' },
      {
        type: 'paragraph',
        text: 'Jetzt konzentriere ich mich auf Updates, Feedbackschleifen und Content. Ich möchte diese Reise weiterhin offen teilen.',
      },
      { type: 'paragraph', text: 'App-Store-Link: https://apps.apple.com/de/app/track-your-cycle-flowa/id6738320165' },
      { type: 'paragraph', text: 'Danke, dass du Teil dieses Abenteuers bist.' },
      { type: 'paragraph', text: 'Bis zum nächsten Mal, George' },
    ],
  },
};

export function getLocalizedBlogPost(post: BlogPost, locale: SiteLocale): BlogPost {
  if (locale !== 'de') {
    return post;
  }

  const translation = germanBlogPostTranslations[post.slug];

  return translation ? { ...post, ...translation } : post;
}

export function formatBlogPostDate(post: BlogPost, locale: SiteLocale): string {
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-US', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(new Date(`${post.publishedAt}T00:00:00Z`));
}
