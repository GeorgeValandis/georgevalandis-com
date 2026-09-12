import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { canonicalPath } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy for One Sentence - George Valandis',
  description: 'Privacy policy for One Sentence, a local journal app.',
  alternates: {
    canonical: canonicalPath('/apps/one-sentence/privacy'),
  },
};

const privacySections = [
  {
    id: 'de',
    label: 'Deutsch',
    title: 'Datenschutzerklärung – One Sentence',
    effective: 'Stand: 2. September 2026',
    controllerLabel: 'Verantwortlich',
    controller: ['Georgios Andi Avenidis', 'Berliner Straße 235', '65205 Wiesbaden, Deutschland'],
    sections: [
      {
        heading: '1. Geltungsbereich',
        text: 'Diese Datenschutzerklärung gilt für die One Sentence App. One Sentence ist ein lokales Tagebuch für kurze persönliche Einträge.',
      },
      {
        heading: '2. Daten auf deinem Gerät',
        text: 'Deine Einträge, dein aktueller Entwurf und die in der App ausgewählte Stimmung werden ausschließlich lokal auf deinem Gerät gespeichert. Die App benötigt kein Konto und sendet diese Inhalte nicht automatisch an unsere Server oder an Dritte.',
      },
      {
        heading: '3. Spracheingabe',
        text: 'One Sentence nimmt selbst kein Audio auf und lädt keine Sprachaufnahmen hoch. Wenn du das Mikrofon deiner Systemtastatur verwendest, verarbeitet dein Betriebssystem die Spracheingabe nach seinen eigenen Einstellungen und Datenschutzbedingungen. Der erkannte Text wird wie eine normale Tastatureingabe in deinem Entwurf gespeichert.',
      },
      {
        heading: '4. Export und Feedback',
        text: 'Wenn du einen Export startest, übergibst du den von dir ausgewählten Text an die von dir gewählte Teilen- oder Speicher-App. Wenn du Feedback per E-Mail sendest, verarbeitet dein E-Mail-Anbieter die Nachricht. Diese Vorgänge werden von dir ausdrücklich gestartet.',
      },
      {
        heading: '5. Backups und Löschung',
        text: 'Das Betriebssystem kann lokale App-Daten in eigene Geräte- oder Cloud-Backups aufnehmen. Darauf haben wir keinen Zugriff. Du kannst Einträge und Entwürfe in den Einstellungen löschen; beim Entfernen der App werden die lokalen Daten von diesem Gerät gelöscht. Backups werden vom jeweiligen Plattformanbieter verwaltet.',
      },
      {
        heading: '6. Keine Werbung und kein Tracking',
        text: 'Die aktuelle Version verwendet keine Werbe-SDKs und kein appübergreifendes Werbetracking. Es gibt keine eigene Analyseübertragung für deine Tagebuchinhalte.',
      },
      {
        heading: '7. Deine Rechte und Kontakt',
        text: 'Je nach anwendbarem Recht kannst du Auskunft, Berichtigung, Löschung, Einschränkung oder Widerspruch verlangen. Da die Tagebuchinhalte lokal auf deinem Gerät liegen, kannst du sie dort selbst exportieren oder löschen. Bei Fragen erreichst du uns unter info@georgevalandis.com.',
      },
    ],
  },
  {
    id: 'en',
    label: 'English',
    title: 'Privacy Policy – One Sentence',
    effective: 'Effective: September 2, 2026',
    controllerLabel: 'Controller',
    controller: ['Georgios Andi Avenidis', 'Berliner Straße 235', '65205 Wiesbaden, Germany'],
    sections: [
      {
        heading: '1. Scope',
        text: 'This Privacy Policy applies to the One Sentence app, a local journal for short personal entries.',
      },
      {
        heading: '2. Data on your device',
        text: 'Your entries, current draft, and selected mood are stored locally on your device. The app does not require an account and does not automatically send this content to our servers or to third parties.',
      },
      {
        heading: '3. Voice input',
        text: 'One Sentence does not record audio or upload voice recordings. If you use your system keyboard microphone, your operating system processes the speech according to its own settings and privacy terms. The recognized text is saved in your draft like ordinary keyboard input.',
      },
      {
        heading: '4. Export and feedback',
        text: 'When you export, you give the selected text to the sharing or storage app you choose. When you send feedback by email, your email provider processes the message. These actions are started by you.',
      },
      {
        heading: '5. Backups and deletion',
        text: 'Your operating system may include local app data in its own device or cloud backups. We cannot access those backups. You can delete entries and drafts in Settings; removing the app deletes local data from that device. Backups are managed by the relevant platform provider.',
      },
      {
        heading: '6. No advertising or tracking',
        text: 'The current version uses no advertising SDKs and no cross-app advertising tracking. It does not send your journal content for product analytics.',
      },
      {
        heading: '7. Your rights and contact',
        text: 'Depending on applicable law, you may request access, correction, deletion, restriction, or object to processing. Because journal content stays on your device, you can export or delete it there. Contact info@georgevalandis.com with questions.',
      },
    ],
  },
  {
    id: 'fr',
    label: 'Français',
    title: 'Politique de confidentialité – One Sentence',
    effective: 'En vigueur le 2 septembre 2026',
    controllerLabel: 'Responsable du traitement',
    controller: ['Georgios Andi Avenidis', 'Berliner Straße 235', '65205 Wiesbaden, Allemagne'],
    sections: [
      {
        heading: '1. Champ d’application',
        text: 'Cette politique concerne l’application One Sentence, un journal local destiné à de courtes notes personnelles.',
      },
      {
        heading: '2. Données sur ton appareil',
        text: 'Tes entrées, ton brouillon actuel et l’humeur sélectionnée sont enregistrés localement sur ton appareil. L’application ne demande pas de compte et n’envoie pas automatiquement ces contenus à nos serveurs ni à des tiers.',
      },
      {
        heading: '3. Saisie vocale',
        text: 'One Sentence n’enregistre pas d’audio et ne téléverse pas de fichiers vocaux. Si tu utilises le microphone du clavier système, ton système d’exploitation traite la voix selon ses propres réglages et règles de confidentialité. Le texte reconnu est enregistré dans le brouillon comme une saisie normale.',
      },
      {
        heading: '4. Export et retours',
        text: 'Lors d’un export, le texte choisi est remis à l’application de partage ou d’enregistrement que tu sélectionnes. Si tu envoies un e-mail, ton fournisseur de messagerie traite le message. Ces actions sont lancées par toi.',
      },
      {
        heading: '5. Sauvegardes et suppression',
        text: 'Le système peut inclure les données locales dans ses sauvegardes d’appareil ou cloud. Nous n’y avons pas accès. Tu peux supprimer les entrées et les brouillons dans les réglages ; supprimer l’application efface les données locales de cet appareil.',
      },
      {
        heading: '6. Pas de publicité ni de suivi',
        text: 'La version actuelle n’utilise pas de SDK publicitaires ni de suivi publicitaire entre applications. Le contenu de ton journal n’est pas envoyé pour des analyses produit.',
      },
      {
        heading: '7. Droits et contact',
        text: 'Selon le droit applicable, tu peux demander l’accès, la rectification, la suppression ou la limitation du traitement. Comme le contenu reste sur ton appareil, tu peux l’exporter ou le supprimer directement. Contact : info@georgevalandis.com.',
      },
    ],
  },
  {
    id: 'es',
    label: 'Español',
    title: 'Política de privacidad – One Sentence',
    effective: 'Vigente desde el 2 de septiembre de 2026',
    controllerLabel: 'Responsable',
    controller: ['Georgios Andi Avenidis', 'Berliner Straße 235', '65205 Wiesbaden, Alemania'],
    sections: [
      {
        heading: '1. Ámbito',
        text: 'Esta política se aplica a One Sentence, un diario local para notas personales breves.',
      },
      {
        heading: '2. Datos en tu dispositivo',
        text: 'Tus entradas, el borrador actual y el estado de ánimo seleccionado se guardan localmente en tu dispositivo. La aplicación no requiere una cuenta y no envía automáticamente estos contenidos a nuestros servidores ni a terceros.',
      },
      {
        heading: '3. Entrada de voz',
        text: 'One Sentence no graba audio ni sube grabaciones de voz. Si usas el micrófono del teclado del sistema, tu sistema operativo procesa la voz según sus propios ajustes y condiciones de privacidad. El texto reconocido se guarda en el borrador como una entrada normal del teclado.',
      },
      {
        heading: '4. Exportación y comentarios',
        text: 'Al exportar, entregas el texto seleccionado a la aplicación de compartir o guardar que elijas. Si envías comentarios por correo, tu proveedor de correo procesa el mensaje. Estas acciones las inicias tú.',
      },
      {
        heading: '5. Copias de seguridad y borrado',
        text: 'El sistema operativo puede incluir los datos locales en sus copias de seguridad del dispositivo o de la nube. No tenemos acceso a ellas. Puedes borrar entradas y borradores en Ajustes; al eliminar la aplicación se borran los datos locales de ese dispositivo.',
      },
      {
        heading: '6. Sin publicidad ni seguimiento',
        text: 'La versión actual no usa SDK de publicidad ni seguimiento publicitario entre aplicaciones. No enviamos el contenido de tu diario para análisis de producto.',
      },
      {
        heading: '7. Derechos y contacto',
        text: 'Según la legislación aplicable, puedes solicitar acceso, rectificación, eliminación o limitación del tratamiento. Como el contenido permanece en tu dispositivo, puedes exportarlo o eliminarlo allí. Contacto: info@georgevalandis.com.',
      },
    ],
  },
  {
    id: 'pt',
    label: 'Português',
    title: 'Política de privacidade – One Sentence',
    effective: 'Em vigor desde 2 de setembro de 2026',
    controllerLabel: 'Responsável',
    controller: ['Georgios Andi Avenidis', 'Berliner Straße 235', '65205 Wiesbaden, Alemanha'],
    sections: [
      {
        heading: '1. Âmbito',
        text: 'Esta política aplica-se à One Sentence, um diário local para notas pessoais curtas.',
      },
      {
        heading: '2. Dados no teu dispositivo',
        text: 'As tuas entradas, o rascunho atual e o estado de espírito selecionado são guardados localmente no teu dispositivo. A aplicação não requer uma conta e não envia automaticamente estes conteúdos para os nossos servidores ou para terceiros.',
      },
      {
        heading: '3. Entrada de voz',
        text: 'A One Sentence não grava áudio nem envia gravações de voz. Se usares o microfone do teclado do sistema, o sistema operativo trata a voz segundo as suas próprias definições e condições de privacidade. O texto reconhecido é guardado no rascunho como uma entrada normal do teclado.',
      },
      {
        heading: '4. Exportação e feedback',
        text: 'Ao exportar, entregas o texto selecionado à aplicação de partilha ou gravação que escolheres. Se enviares feedback por e-mail, o teu fornecedor de e-mail trata a mensagem. Estas ações são iniciadas por ti.',
      },
      {
        heading: '5. Cópias de segurança e eliminação',
        text: 'O sistema operativo pode incluir os dados locais nas suas cópias de segurança do dispositivo ou da cloud. Não temos acesso a essas cópias. Podes apagar entradas e rascunhos nas definições; ao remover a aplicação, os dados locais desse dispositivo são apagados.',
      },
      {
        heading: '6. Sem publicidade nem rastreio',
        text: 'A versão atual não usa SDKs de publicidade nem rastreio publicitário entre aplicações. O conteúdo do teu diário não é enviado para análise de produto.',
      },
      {
        heading: '7. Direitos e contacto',
        text: 'Consoante a legislação aplicável, podes solicitar acesso, retificação, eliminação ou limitação do tratamento. Como o conteúdo fica no teu dispositivo, podes exportá-lo ou apagá-lo aí. Contacto: info@georgevalandis.com.',
      },
    ],
  },
] as const;

export default function OneSentencePrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-50">
      <article className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-24">
        <Link
          href="/apps/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Apps
        </Link>

        <header className="mb-12 mt-8">
          <p className="mb-3 font-mono text-sm uppercase tracking-wider text-amber-400">
            App Privacy
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Privacy Policy for One Sentence
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300">
            One Sentence is a local journal for short personal entries. This page explains what
            the app stores on your device and how system features such as keyboard dictation,
            export, and backups are handled. The same policy is provided below in all five app
            languages.
          </p>
          <nav aria-label="Available languages" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {privacySections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-amber-300 underline decoration-amber-300/40 underline-offset-4 transition-colors hover:text-amber-200"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </header>

        <div className="space-y-16 text-gray-300 leading-relaxed">
          {privacySections.map((section) => (
            <section key={section.id} id={section.id} lang={section.id} className="scroll-mt-8">
              <div className="border-t border-white/10 pt-8">
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-gray-500">
                  {section.label}
                </p>
                <h2 className="text-2xl font-semibold text-white md:text-3xl">{section.title}</h2>
                <p className="mt-2 text-sm text-gray-500">{section.effective}</p>
              </div>

              <div className="mt-8 space-y-1 text-sm text-gray-300">
                <p className="font-semibold text-white">{section.controllerLabel}</p>
                {section.controller.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <p>
                  {section.id === 'de'
                    ? 'E-Mail: '
                    : section.id === 'fr'
                      ? 'E-mail : '
                      : section.id === 'es'
                        ? 'Correo: '
                        : section.id === 'pt'
                          ? 'E-mail: '
                          : 'Email: '}
                  <a
                    href="mailto:info@georgevalandis.com"
                    className="text-amber-300 underline decoration-amber-300/40 underline-offset-4 hover:text-amber-200"
                  >
                    info@georgevalandis.com
                  </a>
                </p>
              </div>

              <div className="mt-8 space-y-8">
                {section.sections.map((item) => (
                  <div key={item.heading}>
                    <h3 className="mb-3 text-xl font-semibold text-white">{item.heading}</h3>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-16 border-t border-white/10 pt-8 text-sm leading-6 text-gray-500">
          <p>
            This is the app privacy policy for One Sentence. It is separate from the privacy
            policy for the georgevalandis.com website and its landing pages.
          </p>
          <p className="mt-3">
            Contact:{' '}
            <a
              href="mailto:info@georgevalandis.com"
              className="text-amber-300 underline decoration-amber-300/40 underline-offset-4 hover:text-amber-200"
            >
              info@georgevalandis.com
            </a>
          </p>
        </footer>
      </article>
    </main>
  );
}
