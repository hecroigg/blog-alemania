import { trustPageMap, trustPages, type TrustPage } from "@/lib/content/trust";
import type { EditorialLocale } from "@/lib/content/localized-general-guides";
import esCatalog from "@/lib/translations/es.json";
import deCatalog from "@/lib/translations/de.json";

const catalogs = { es: esCatalog as Record<string, string>, de: deCatalog as Record<string, string> };

// Recent editorial/legal amendments were added after the original catalog
// generation. Translate those exact source strings rather than showing English
// inside localized pages.
const supplemental: Record<string, { es: string; de: string }> = {
  "GermanyBase is edited from Germany. We use first-hand checks of everyday processes where useful, then verify time-sensitive rules, prices and deadlines against the responsible official or primary source.": {
    es: "GermanyBase se edita desde Alemania. Cuando resulta útil, comprobamos de primera mano los procesos cotidianos y verificamos las normas, los precios y los plazos que pueden cambiar utilizando la fuente oficial o primaria responsable.",
    de: "GermanyBase wird in Deutschland redaktionell betreut. Wo es sinnvoll ist, prüfen wir alltägliche Abläufe aus eigener Erfahrung und gleichen zeitabhängige Regeln, Preise und Fristen mit den zuständigen amtlichen oder primären Quellen ab.",
  },
  "Who reviews the guides": {
    es: "Quién revisa las guías",
    de: "Wer die Ratgeber überprüft",
  },
  "Guides are published under GermanyBase Editorial. Each practical guide shows a review date, links the sources used, and distinguishes national rules from city-specific or personal-status questions. We do not invent personal case studies or present one experience as a universal rule.": {
    es: "Las guías se publican bajo la responsabilidad de GermanyBase Editorial. Cada guía práctica muestra la fecha de revisión, enlaza las fuentes utilizadas y distingue las normas nacionales de las cuestiones que dependen de la ciudad o de la situación personal. No inventamos casos personales ni presentamos una experiencia como regla universal.",
    de: "Die Ratgeber erscheinen unter der redaktionellen Verantwortung von GermanyBase Editorial. Jeder praktische Ratgeber zeigt das Prüfdatum, verlinkt die verwendeten Quellen und unterscheidet bundesweite Regeln von städtischen oder persönlichen Besonderheiten. Wir erfinden keine Erfahrungsberichte und stellen Einzelfälle nicht als allgemeingültige Regeln dar.",
  },
  "Email linkedlab.info@gmail.com with the subject ‘Correction’. Include the page URL, the statement you believe is wrong, and the strongest source you have found.": {
    es: "Escribe a linkedlab.info@gmail.com con el asunto «Corrección». Incluye la URL de la página, la afirmación que consideras errónea y la fuente más fiable que hayas encontrado.",
    de: "Senden Sie eine E-Mail an linkedlab.info@gmail.com mit dem Betreff „Korrektur“. Geben Sie die Seiten-URL, die aus Ihrer Sicht falsche Aussage und die verlässlichste gefundene Quelle an.",
  },
  "Advertising may be used to fund GermanyBase. Ads are separated from editorial text and do not determine which topics we cover, which sources we trust, or the conclusions of a guide.": {
    es: "GermanyBase puede financiarse mediante publicidad. Los anuncios se distinguen del contenido editorial y no determinan los temas que tratamos, las fuentes que consideramos fiables ni las conclusiones de las guías.",
    de: "GermanyBase kann durch Werbung finanziert werden. Anzeigen sind vom redaktionellen Inhalt getrennt und bestimmen weder unsere Themen noch die Auswahl vertrauenswürdiger Quellen oder die Schlussfolgerungen unserer Ratgeber.",
  },
  "A plain-language explanation of data handling on GermanyBase.": {
    es: "Una explicación sencilla de cómo trata los datos GermanyBase.",
    de: "Eine verständliche Erklärung zur Datenverarbeitung bei GermanyBase.",
  },
  "Account-free use": {
    es: "Uso sin cuenta",
    de: "Nutzung ohne Benutzerkonto",
  },
  "GermanyBase is designed to work without a user account. Core guides and tools can be used without creating a profile or submitting an email address.": {
    es: "GermanyBase está diseñado para utilizarse sin cuenta de usuario. Las guías y herramientas principales pueden consultarse sin crear un perfil ni proporcionar una dirección de correo electrónico.",
    de: "GermanyBase ist für die Nutzung ohne Benutzerkonto ausgelegt. Die wichtigsten Ratgeber und Werkzeuge können ohne Profil und ohne Angabe einer E-Mail-Adresse verwendet werden.",
  },
  "Your optional analytics choice is stored in this browser. Google AdSense advertising choices are separately obtained and stored by Google’s certified European consent platform, where applicable.": {
    es: "La elección opcional sobre analítica se guarda en este navegador. Cuando corresponde, las preferencias publicitarias de Google AdSense se solicitan y almacenan por separado mediante la plataforma europea de consentimiento certificada de Google.",
    de: "Ihre optionale Entscheidung zur Analyse wird in diesem Browser gespeichert. Soweit zutreffend, werden Werbeeinwilligungen für Google AdSense getrennt über Googles zertifizierte europäische Einwilligungsplattform eingeholt und gespeichert.",
  },
  "Google Analytics only loads after our separate analytics opt-in. The Google AdSense publisher tag loads to make the official Google consent message available; Google’s CMP manages advertising purposes, including personalized advertising consent where required. Hosting and security providers process necessary technical request information.": {
    es: "Google Analytics solo se carga después de aceptar la analítica por separado. La etiqueta de editor de Google AdSense se carga para mostrar el mensaje oficial de consentimiento de Google; su plataforma de gestión del consentimiento administra las finalidades publicitarias, incluida la publicidad personalizada cuando es obligatorio solicitar permiso. Los proveedores de alojamiento y seguridad tratan los datos técnicos necesarios de las solicitudes.",
    de: "Google Analytics wird erst nach einer gesonderten Zustimmung zur Analyse geladen. Das Google-AdSense-Publisher-Tag wird geladen, damit die offizielle Einwilligungsnachricht von Google verfügbar ist. Googles Consent-Management-Plattform verwaltet Werbezwecke und gegebenenfalls die Einwilligung in personalisierte Werbung. Hosting- und Sicherheitsanbieter verarbeiten notwendige technische Anfrageinformationen.",
  },
  "Data-protection rights depend on the processing and applicable law. Questions about privacy or correction requests can be sent to linkedlab.info@gmail.com.": {
    es: "Los derechos de protección de datos dependen del tratamiento y de la normativa aplicable. Puedes enviar preguntas sobre privacidad o solicitudes de corrección a linkedlab.info@gmail.com.",
    de: "Datenschutzrechte hängen von der jeweiligen Verarbeitung und dem geltenden Recht ab. Datenschutzfragen oder Berichtigungsanfragen können an linkedlab.info@gmail.com gerichtet werden.",
  },
  "The AdSense publisher tag loads to initiate Google’s Privacy & messaging consent platform. Advertising data purposes and optional advertising storage are managed through the Google-certified consent message for covered regions. Refusing advertising consent does not block access to guides or tools. Ads are not served until Google approves the site.": {
    es: "La etiqueta de editor de AdSense se carga para iniciar la plataforma «Privacidad y mensajes» de Google. En las regiones correspondientes, las finalidades de los datos publicitarios y el almacenamiento publicitario opcional se gestionan mediante el mensaje de consentimiento certificado por Google. Rechazar el consentimiento publicitario no impide acceder a las guías o herramientas. No se muestran anuncios hasta que Google apruebe el sitio.",
    de: "Das AdSense-Publisher-Tag wird geladen, um Googles Plattform „Datenschutz und Mitteilungen“ zu starten. In den betroffenen Regionen werden Werbedatenzwecke und optionaler Werbespeicher über die von Google zertifizierte Einwilligungsnachricht verwaltet. Die Ablehnung einer Werbeeinwilligung sperrt den Zugang zu Ratgebern oder Werkzeugen nicht. Anzeigen werden erst nach der Freigabe der Website durch Google ausgeliefert.",
  },
  "The site’s analytics preference can be changed with Cookie settings. Advertising choices can be revisited with the Google advertising preferences control when it is available. Clearing browser storage can reset locally saved choices.": {
    es: "Puedes cambiar tu preferencia de analítica en la configuración de cookies. Las opciones publicitarias pueden revisarse mediante el control de preferencias de publicidad de Google cuando esté disponible. Al borrar los datos del navegador podrían restablecerse las elecciones almacenadas localmente.",
    de: "Die Analyse-Einstellung der Website lässt sich über die Cookie-Einstellungen ändern. Werbeentscheidungen können über die Google-Werbeeinstellungen erneut geprüft werden, sofern diese verfügbar sind. Das Löschen des Browserspeichers kann lokal gespeicherte Entscheidungen zurücksetzen.",
  },
  "Responsible use": {
    es: "Uso responsable",
    de: "Verantwortungsvolle Nutzung",
  },
  "Do not rely on a GermanyBase page as the only source for a deadline, eligibility decision, legal dispute, medical decision, tax filing, or immigration application. Use the linked authority or a qualified professional where the consequences are significant.": {
    es: "No utilices una página de GermanyBase como única fuente para plazos, requisitos, disputas legales, decisiones médicas, declaraciones fiscales o solicitudes de inmigración. Si las consecuencias son importantes, consulta la autoridad enlazada o a un profesional cualificado.",
    de: "Verlassen Sie sich bei Fristen, Anspruchsprüfungen, Rechtsstreitigkeiten, medizinischen Entscheidungen, Steuererklärungen oder Einwanderungsanträgen nicht ausschließlich auf GermanyBase. Bei erheblichen Folgen sollten Sie die verlinkte Behörde oder qualifizierte Fachleute hinzuziehen.",
  },
  "For a correction, include the page URL, the passage concerned, and an authoritative source where possible. Email linkedlab.info@gmail.com with the subject ‘Correction’.": {
    es: "Para solicitar una corrección, incluye la URL de la página, el fragmento en cuestión y, si es posible, una fuente autorizada. Escribe a linkedlab.info@gmail.com con el asunto «Corrección».",
    de: "Für eine Korrektur geben Sie bitte die Seiten-URL, die betroffene Passage und nach Möglichkeit eine maßgebliche Quelle an. Schreiben Sie an linkedlab.info@gmail.com mit dem Betreff „Korrektur“.",
  },
  "We cannot provide personal legal, immigration, tax, medical, or financial advice. Messages asking for individual professional advice may receive a pointer to the responsible authority instead.": {
    es: "No ofrecemos asesoramiento jurídico, migratorio, fiscal, médico o financiero personalizado. Si un mensaje solicita asesoramiento profesional individual, podemos remitir a la autoridad responsable.",
    de: "Wir können keine persönliche Rechts-, Einwanderungs-, Steuer-, medizinische oder Finanzberatung anbieten. Bei Anfragen nach individueller Fachberatung verweisen wir gegebenenfalls an die zuständige Stelle.",
  },
};

export function trustPageForLocale(locale: EditorialLocale, slug: string): TrustPage | null {
  const source = trustPageMap.get(slug);
  if (!source) return null;
  if (locale === "en") return source;
  const t = (text: string) => catalogs[locale][text] || supplemental[text]?.[locale] || text;
  return {
    ...source,
    title: t(source.title), eyebrow: t(source.eyebrow),
    description: t(source.description),
    sections: source.sections.map((section) => ({
      ...section,
      heading: t(section.heading),
      paragraphs: section.paragraphs.map(t),
      bullets: section.bullets?.map(t),
    })),
  };
}
export function allTrustPageSlugs() { return trustPages.map((item) => item.slug); }
