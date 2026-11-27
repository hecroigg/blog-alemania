import { applicationLink as link, guideSources, type AuthoredGuide } from "./authored-guide";

const entitlement = "https://www.gesetze-im-internet.de/sgb_8/__24.html";
const fees = "https://www.gesetze-im-internet.de/sgb_8/__90.html";
const berlin = "https://service.berlin.de/dienstleistung/324873/";
const berlinTiming = "https://www.berlin.de/ba-mitte/politik-und-verwaltung/aemter/jugendamt/kindertagesbetreuung/kita-gutscheinstelle-245394.php";
const mannheim = "https://www.mannheim.de/de/bildung-staerken/kitas-und-kindertagespflege/ihr-weg-zum-betreuungsplatz-servicestelle-eltern-meki";
const sources = guideSources([
  ["§ 24 SGB VIII · Kindertagesbetreuung", entitlement],
  ["§ 90 SGB VIII · Kostenbeiträge", fees],
  ["Serviceportal Berlin · Kita-Gutschein", berlin],
  ["Bezirksamt Berlin-Mitte · Kita-Gutscheinstelle", berlinTiming],
  ["Stadt Mannheim · Servicestelle Eltern (MeKi)", mannheim],
]);

export const kitaChildcare = {
  slugs: { es: "guarderia-kita-alemania-solicitar-plaza", en: "kita-childcare-germany-apply", de: "kitaplatz-beantragen-rechtsanspruch" },
  category: "daily-life",
  updated: "2026-11-27",
  readingMinutes: 5,
  related: ["child-benefits-germany", "primary-school-childcare-germany", "moving-to-germany"],
  copy: {
    es: {
      title: "Guardería en Alemania: cómo pedir plaza de Kita desde 1 año",
      description: "¿Cuándo pedir plaza de Kita en Alemania? Consulta el derecho desde el primer cumpleaños, los plazos de Berlín y Mannheim y cómo pedir ayuda con la cuota.",
      eyebrow: "Guardería y trámites",
      summary: "Desde el primer cumpleaños hasta antes de cumplir tres años, los niños tienen derecho a atención en una Kita o en una modalidad autorizada de cuidado infantil (Kindertagespflege). La solicitud y los plazos dependen del municipio. Si quieres empezar en septiembre, averigua en invierno cómo funciona el proceso local.",
      takeaways: ["Contacta con el Jugendamt o la oficina municipal que gestiona las plazas.", "Indica la edad del menor, la fecha de inicio y las horas de cuidado que necesitas.", "Solicitar una plaza y recibir una confirmación de admisión son pasos distintos."],
      sections: [
        { heading: "¿Desde qué edad existe el derecho a guardería?", paragraphs: ["Antes del primer cumpleaños, puede haber derecho si se cumplen condiciones como el trabajo, la búsqueda de empleo, la formación o las necesidades de desarrollo del menor. De uno a menos de tres años, la atención puede prestarse en una Kita o mediante Kindertagespflege. Desde los tres años hasta entrar en el colegio existe el derecho a atención en un centro infantil."], resources: [link("Leer el derecho a atención infantil", entitlement, "El § 24 SGB VIII distingue los tramos de edad.")] },
        { heading: "Cuándo solicitar una plaza para septiembre", paragraphs: ["Si necesitas cuidado a partir del 1 de septiembre de 2027, estos dos ejemplos muestran cómo cambia el calendario según la ciudad. En Berlín, el portal público aconseja pedir el bono entre nueve y dos meses antes del comienzo. En Mannheim, para la asignación principal de septiembre, registra la solicitud y los justificantes antes de que acabe el 1 de febrero."], table: { caption: "Dos procesos municipales para una plaza que empieza en septiembre de 2027", columns: ["Ciudad", "Qué hacer", "Cuándo"], rows: [["Berlín", "Pide el Kita-Gutschein y busca un proveedor con plaza.", "Del 1 de diciembre de 2026 al 1 de julio de 2027 según la ventana recomendada."], ["Mannheim", "Registra la Vormerkung con sus documentos en MeKi.", "Hasta el 1 de febrero de 2027 para la ronda principal."]] }, resources: [link("Pedir el Kita-Gutschein en Berlín", berlin, "Trámite municipal y documentos."), link("Buscar plaza o presentar la Vormerkung en Mannheim", mannheim, "Acceso a MeKi y al buscador de centros.")] },
        { heading: "Qué hacer si estás en lista de espera", paragraphs: ["Pide al Jugendamt que confirme por escrito cómo está registrada tu necesidad de atención. Indica desde qué fecha la necesitas, el horario y los centros a los que ya has consultado. Pregunta por plazas en otros barrios o por una Tagesmutter o un Tagesvater si esa modalidad se ajusta a la edad y las necesidades de tu hijo."], bullets: ["Guarda el número de solicitud y los correos de los centros.", "Si ya tienes una oferta, confirma por escrito el horario, la fecha de adaptación y el coste total."] },
        { heading: "¿Se puede pedir una reducción de la cuota de Kita?", paragraphs: ["Si recibes Kinderzuschlag o Wohngeld, la cuota de atención se considera no asumible a efectos del § 90 SGB VIII. Pide al Jugendamt la exención o que cubra la cuota y aporta la resolución de la prestación. Consulta por separado cuánto se cobra por comedor u otros extras."], resources: [link("Consultar la exención de la cuota", fees, "El § 90 SGB VIII recoge las condiciones y la solicitud.")] },
      ],
      faqs: [
        { question: "¿El Kita-Gutschein de Berlín me asigna una guardería?", answer: "El bono acredita el alcance de la atención autorizada. Contacta con los centros o cuidadores con plazas y formaliza el contrato con el proveedor." },
        { question: "¿Puedo solicitar plaza después del 1 de febrero en Mannheim?", answer: "Contacta con MeKi si necesitas una plaza fuera de la ronda principal o después de la fecha. Explica cuándo la necesitas y pregunta por la disponibilidad." },
      ],
      sources,
    },
    en: {
      title: "How to Apply for a Kita Place in Germany: Rights and Deadlines",
      description: "When can your child get a Kita place in Germany? Check the right from age one, Berlin and Mannheim deadlines, waitlists and help with childcare fees.",
      eyebrow: "Childcare and applications",
      summary: "From their first birthday until they turn three, children in Germany are entitled to a Kita place or regulated childminding (Kindertagespflege). Your municipality sets the application process and deadlines. If you want a September start, check the local process in winter.",
      takeaways: ["Start with the local youth welfare office (Jugendamt) or municipal childcare service.", "Give the child’s age, intended start date and hours of care needed.", "Keep the application receipt and ask the provider for a written offer."],
      sections: [
        { heading: "At what age is a child entitled to a Kita place?", paragraphs: ["Before age one, eligibility can arise from circumstances including work, job-seeking, training or the child’s developmental needs. From age one to under three, a daycare centre or childminder can provide the care. From age three until school entry, children are entitled to care at a childcare centre."], resources: [link("Read the statutory childcare entitlement", entitlement, "Section 24 SGB VIII sets out the age groups.")] },
        { heading: "When to apply for a September start", paragraphs: ["For a 1 September 2027 start, compare the two local processes below. Berlin recommends applying for a voucher between nine and two months ahead. Mannheim asks families to submit their advance registration and supporting documents by 1 February for the main September allocation."], table: { caption: "Two local application timelines for September 2027", columns: ["City", "What to do", "When"], rows: [["Berlin", "Apply for a Kita-Gutschein and find a provider with an opening.", "1 December 2026 to 1 July 2027 under the recommended application window."], ["Mannheim", "Submit the advance registration and documents to MeKi.", "By 1 February 2027 for the regular allocation."]] }, resources: [link("Apply for a Berlin Kita voucher", berlin, "Official application and supporting documents."), link("Find or request a place in Mannheim", mannheim, "The city links to the childcare finder and MeKi.")] },
        { heading: "What to do if you are on a waiting list", paragraphs: ["Ask the Jugendamt to confirm how your childcare need has been recorded. State your start date and hours and list the providers you have already contacted. Ask about neighbouring districts or a regulated childminder (Tagesmutter or Tagesvater), where that suits your child’s age and needs."], bullets: ["Keep your application reference and messages from providers.", "When you receive an offer, confirm the available hours, settling-in schedule and full cost."] },
        { heading: "Help with daycare fees if you receive Kinderzuschlag or Wohngeld", paragraphs: ["Section 90 SGB VIII treats the childcare charge as unaffordable for families receiving Kinderzuschlag or Wohngeld. Apply to the local youth welfare office for the fee to be waived or covered and include your benefits notice. Ask separately about meals and other charges."], resources: [link("Check the law on childcare charges", fees, "Section 90 SGB VIII covers contributions and applications.")] },
      ],
      faqs: [
        { question: "Does a Berlin childcare voucher give me a place automatically?", answer: "The voucher states the scope of childcare approved. You still need to find a provider with an opening and sign a childcare contract." },
        { question: "Can I apply in Mannheim after 1 February?", answer: "If you are applying outside the main allocation period, contact MeKi with your preferred date and ask about availability." },
      ],
      sources,
    },
    de: {
      title: "Kitaplatz beantragen: Rechtsanspruch ab 1 Jahr und Fristen",
      description: "Ab wann hat dein Kind Anspruch auf Betreuung? Mit Fristen für den Kita-Gutschein in Berlin und die Vormerkung in Mannheim sowie Hilfe bei Elternbeiträgen.",
      eyebrow: "Kita und Kindertagespflege",
      summary: "Ab dem ersten Geburtstag bis zum dritten Geburtstag besteht ein Anspruch auf Betreuung in einer Kita oder in Kindertagespflege. Anmeldung und Vergabe laufen örtlich unterschiedlich. Wer einen Platz ab September braucht, sollte das Verfahren vor Ort bereits im Winter prüfen.",
      takeaways: ["Wende dich an das Jugendamt oder an die örtliche Anmeldestelle.", "Gib das Alter des Kindes, den gewünschten Beginn und den Betreuungsumfang an.", "Bewahre die Eingangsbestätigung auf und lass dir eine Zusage schriftlich geben."],
      sections: [
        { heading: "Ab welchem Alter besteht ein Rechtsanspruch?", paragraphs: ["Vor dem ersten Geburtstag kann bereits ein Anspruch bestehen, etwa wenn Eltern arbeiten, Arbeit suchen, in Ausbildung sind oder die Betreuung für die Entwicklung des Kindes erforderlich ist. Von eins bis unter drei Jahren kommt eine Kita oder Kindertagespflege infrage. Ab drei Jahren bis zum Schuleintritt besteht Anspruch auf Förderung in einer Tageseinrichtung."], resources: [link("Rechtsanspruch in § 24 SGB VIII nachlesen", entitlement, "Regelungen für die einzelnen Altersgruppen.")] },
        { heading: "Wann für einen Kitaplatz ab September anmelden?", paragraphs: ["Für einen Betreuungsstart am 1. September 2027 gelten je nach Stadt unterschiedliche Schritte. Berlin empfiehlt, den Gutschein neun bis zwei Monate vor Beginn zu beantragen. In Mannheim muss die Vormerkung samt Nachweisen bis zum 1. Februar eingehen, um an der regulären Vergabe für September teilzunehmen."], table: { caption: "Zwei Wege zur Betreuung ab September 2027", columns: ["Stadt", "Schritt", "Zeitraum"], rows: [["Berlin", "Kita-Gutschein beantragen und einen freien Betreuungsplatz suchen.", "Empfohlen: 1. Dezember 2026 bis 1. Juli 2027."], ["Mannheim", "Vormerkung mit Nachweisen bei MeKi einreichen.", "Bis 1. Februar 2027 für die Hauptvergabe."]] }, resources: [link("Kita-Gutschein in Berlin beantragen", berlin, "Offizielles Verfahren und nötige Unterlagen."), link("Betreuungsplatz in Mannheim vormerken", mannheim, "Servicestelle Eltern und Kita-Finder.")] },
        { heading: "Was tun, wenn dein Kind auf der Warteliste steht?", paragraphs: ["Bitte das Jugendamt um eine Bestätigung deines angemeldeten Betreuungsbedarfs. Nenne Beginn, benötigte Stunden und die Einrichtungen, die du bereits kontaktiert hast. Frag auch nach Plätzen in benachbarten Stadtteilen oder nach einer Tagesmutter beziehungsweise einem Tagesvater, wenn Kindertagespflege für euch passt."], bullets: ["Bewahre Eingangsbestätigungen, Aktenzeichen und Rückmeldungen der Einrichtungen auf.", "Kläre mit dem Anbieter Öffnungszeiten, Eingewöhnung und den Gesamtpreis."] },
        { heading: "Kita-Beitrag bei Kinderzuschlag oder Wohngeld", paragraphs: ["Wer Kinderzuschlag oder Wohngeld erhält, kann beim Jugendamt den Erlass oder die Übernahme des Elternbeitrags beantragen. Nach § 90 SGB VIII sind diese Beiträge in den genannten Fällen nicht zumutbar. Lege den Bescheid vor und frage separat nach Kosten für Essen oder Zusatzleistungen."], resources: [link("Kostenbeiträge in § 90 SGB VIII nachlesen", fees, "Rechtsgrundlage für Erlass oder Übernahme auf Antrag.")] },
      ],
      faqs: [
        { question: "Bekomme ich mit dem Kita-Gutschein automatisch einen Platz?", answer: "Der Gutschein weist den bewilligten Betreuungsumfang aus. Für den Platz nimmst du Kontakt mit einem Anbieter auf und schließt dort den Betreuungsvertrag." },
        { question: "Kann ich in Mannheim nach dem 1. Februar noch einen Platz suchen?", answer: "Wende dich bei späterem Betreuungsbedarf mit deinem Wunschdatum an MeKi und frage nach freien Plätzen außerhalb der Hauptvergabe." },
      ],
      sources,
    },
  },
} satisfies AuthoredGuide;
