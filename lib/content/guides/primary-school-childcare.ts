import { applicationLink as link, guideSources, type AuthoredGuide } from "./authored-guide";

const law = "https://www.gesetze-im-internet.de/sgb_8/__24.html";
const federal = "https://www.bundesregierung.de/breg-de/schwerpunkte/recht-auf-ganztagsfoerderung-2386432";
const mannheim = "https://www.mannheim.de/de/bildung-staerken/schulen/schulkindbetreuung";
const mannheimSchools = "https://www.mannheim.de/de/bildung-staerken/schulen/ganztagsschulen/ganztagsgrundschulen-in-mannheim";
const mannheimHours = "https://www.mannheim.de/de/bildung-staerken/schulen/schulkindbetreuung/randzeitenbetreuung-an-ganztagsgrundschulen";
const mannheimFaq = "https://www.mannheim.de/sites/default/files/2026-05/13.05.2026_FAQ%20ab%2009_2026.pdf";

export const primarySchoolChildcare = {
  slugs: { en: "primary-school-childcare-germany", es: "cuidado-escolar-jornada-completa-alemania", de: "ganztagsbetreuung-grundschule-rechtsanspruch" },
  category: "daily-life",
  updated: "2026-11-20",
  readingMinutes: 4,
  related: ["kita-childcare-germany-apply", "child-benefits-germany", "elterngeld-germany", "best-cities-germany"],
  copy: {
    es: {
      title: "Cuidado escolar en Alemania: quién tiene derecho a 8 horas desde 2026",
      description: "El derecho al cuidado escolar de jornada completa empieza en primero de primaria en 2026/27. Consulta el calendario, las vacaciones y cómo pedir plaza.",
      eyebrow: "Ganztagsbetreuung en primaria",
      summary: "Desde el 1 de agosto de 2026, el derecho al cuidado de jornada completa se implanta por cursos en la primaria alemana. Empieza con quienes entran en primero en 2026/27 y cubre ocho horas por día de lunes a viernes, contando las clases.",
      takeaways: ["En 2026/27 empieza con primero. En 2029/30 cubrirá de primero a cuarto.", "Las horas de clase cuentan dentro de las ocho horas diarias.", "La escuela o el ayuntamiento explica cómo reservar plaza, qué pasa en vacaciones y qué servicios tienen coste."],
      sections: [
        { heading: "Qué cursos entran cada año", paragraphs: ["La ampliación sigue a los niños que entran en primero desde el curso 2026/27. El derecho de cada cohorte se mantiene hasta el inicio de quinto."], bullets: ["2026/27: primero.", "2027/28: primero y segundo.", "2028/29: primero, segundo y tercero.", "Desde 2029/30: de primero a cuarto."] },
        { heading: "Cómo se cuentan las ocho horas", paragraphs: ["Si el horario escolar y la atención del centro cubren de 8:00 a 13:00, ya suman cinco horas. En este ejemplo, con atención hasta las 16:00 se completan las tres horas restantes. Confirma con tu municipio cómo se organiza el horario en tu centro.", "El derecho también alcanza las vacaciones escolares, con la posibilidad de que la normativa del estado federado prevea hasta cuatro semanas de cierre al año durante las vacaciones. Pregunta si la plaza de vacaciones se pide aparte, dónde se presta el servicio y qué coste tienen la comida o el cuidado adicional."] },
        { heading: "Dónde se pide plaza: el ejemplo de Mannheim", paragraphs: ["Pregunta primero en la escuela y en el servicio municipal de atención escolar. Indica el curso, la fecha de inicio y las horas de recogida que necesitas. Pide que te confirmen por escrito los horarios de cada día, las vacaciones y las cuotas.", "En Mannheim, el sistema MeKi admite solicitudes de preinscripción para Hort y Verlässliche Grundschule (VGS). Para la ampliación de horario en una Ganztagsgrundschule, la ciudad indica un trámite propio con el centro o la secretaría. El módulo VGS anunciado va de 11:00 a 14:00 y el Hort escolar de 11:00 a 17:00. Son horarios locales de los módulos, que se coordinan con las clases."], resources: [link("Consultar la atención escolar en Mannheim", mannheim, "La ciudad enlaza el buscador y el servicio municipal para familias."), link("Ver cómo solicitar la ampliación de horario", mannheimHours, "Instrucciones municipales para escuelas de jornada completa.")] },
      ],
      faqs: [{ question: "¿Mi hijo que ya cursa segundo en 2026/27 tiene el nuevo derecho federal?", answer: "El despliegue federal empieza por quienes entran en primero en 2026/27. Si tu hijo ya cursaba segundo entonces, pregunta por las plazas que ofrece tu municipio." }, { question: "¿Es obligatorio quedarse toda la jornada?", answer: "La ley federal concede un derecho. La asistencia se organiza según el modelo y las reglas de inscripción del centro concreto." }],
      sources: guideSources([["§ 24 del SGB VIII: derecho y horario", law], ["Gobierno federal: calendario de implantación", federal], ["Mannheim: escuelas de jornada completa", mannheimSchools], ["Mannheim: preguntas frecuentes sobre MeKi", mannheimFaq]]),
    },
    en: {
      title: "Primary school childcare in Germany: the eight-hour right from 2026",
      description: "Who qualifies for Germany’s new all-day primary school childcare entitlement? See the rollout by school year, holiday rules and how to apply.",
      eyebrow: "All-day primary school childcare",
      summary: "From 1 August 2026, Germany is phasing in a right to all-day primary school childcare. It starts with children entering year one in 2026/27 and covers eight hours per day from Monday to Friday, including lessons.",
      takeaways: ["Year one qualifies first in 2026/27. Years one to four are covered from 2029/30.", "Class time counts towards the eight hours.", "Your school or municipality can explain how to register, what is available in the holidays and which services carry fees."],
      sections: [
        { heading: "Which school years are covered?", paragraphs: ["The rollout follows children who enter year one from 2026/27 onwards. Each eligible group retains its right until the start of year five."], bullets: ["2026/27: year one.", "2027/28: years one and two.", "2028/29: years one to three.", "From 2029/30: years one to four."] },
        { heading: "How to count the eight hours", paragraphs: ["Suppose the school programme covers 8:00 to 13:00. Those five hours already count. Care until 16:00 would add the remaining three hours in this example. Ask the municipality how your school combines lessons and care.", "The entitlement also covers school holidays. State law can allow closures of up to four weeks per year during those holidays. Ask whether holiday care requires a separate registration, where it is provided and whether meals or extended hours cost extra."] },
        { heading: "Where to book a place: Mannheim as an example", paragraphs: ["Start with the school and the municipal childcare office. Give the school year, your preferred start date and your pickup times. Ask for written details of the weekday schedule, holiday coverage and fees.", "In Mannheim, MeKi accepts advance registrations for Hort and Verlässliche Grundschule (VGS). For extended hours at an all-day primary school, the city directs families to the provider or school office. Mannheim lists VGS from 11:00 to 14:00 and school-based Hort from 11:00 to 17:00. These local care blocks are coordinated with lessons."], resources: [link("See school-age childcare in Mannheim", mannheim, "The city links to its childcare finder and family service."), link("Register for extended hours in Mannheim", mannheimHours, "Municipal instructions for all-day primary schools.")] },
      ],
      faqs: [{ question: "Does a child already in year two in 2026/27 get the new federal entitlement?", answer: "The rollout starts with children entering year one in 2026/27. If your child was already in year two, ask what places your municipality offers." }, { question: "Is it compulsory to stay for the whole day?", answer: "Federal law gives families a right to care. Attendance follows the model and registration rules of the individual school." }],
      sources: guideSources([["Section 24 SGB VIII: legal entitlement and hours", law], ["Federal government: rollout schedule", federal], ["Mannheim: all-day primary schools", mannheimSchools], ["Mannheim: MeKi registration FAQ", mannheimFaq]]),
    },
    de: {
      title: "Rechtsanspruch auf Ganztagsbetreuung in der Grundschule ab 2026",
      description: "Wer bekommt acht Stunden Ganztagsbetreuung? Start 2026/27, Stufenplan bis 2029/30, Ferien und Anmeldung am Beispiel Mannheim.",
      eyebrow: "Ganztagsförderung in der Grundschule",
      summary: "Seit dem 1. August 2026 wird der Rechtsanspruch auf Ganztagsbetreuung an Grundschulen stufenweise eingeführt. Er beginnt mit den Erstklässlern im Schuljahr 2026/27 und umfasst montags bis freitags acht Stunden täglich einschließlich der Unterrichtszeit.",
      takeaways: ["Der Anspruch beginnt 2026/27 in Klasse 1. Ab 2029/30 sind die Klassen 1 bis 4 erfasst.", "Die Unterrichtszeit zählt zu den acht Stunden.", "Die Schule oder Kommune informiert über Anmeldung, Ferienbetreuung und mögliche Gebühren."],
      sections: [
        { heading: "Welche Klassenstufen haben wann Anspruch?", paragraphs: ["Der Anspruch gilt für Kinder, die im Schuljahr 2026/27 oder später in die erste Klasse kommen. Für diese Kinder läuft er bis zum Beginn der fünften Klasse."], bullets: ["2026/27: Klasse 1.", "2027/28: Klassen 1 und 2.", "2028/29: Klassen 1 bis 3.", "Ab 2029/30: Klassen 1 bis 4."] },
        { heading: "Wie werden die acht Stunden und die Ferien gerechnet?", paragraphs: ["Deckt die Schule im Beispiel die Zeit von 8 bis 13 Uhr ab, sind bereits fünf Stunden erfüllt. Eine Betreuung bis 16 Uhr würde die verbleibenden drei Stunden abdecken. Wie Unterricht und Betreuung konkret zusammenspielen, klären Sie mit der Kommune.", "Der Anspruch gilt auch in den Schulferien. Das Landesrecht kann bis zu vier Wochen Schließzeit im Jahr während der Ferien vorsehen. Fragen Sie nach einer gesonderten Anmeldung, dem Betreuungsort und Kosten für Essen oder Zusatzzeiten."] },
        { heading: "Einen Platz beantragen: Beispiel Mannheim", paragraphs: ["Wenden Sie sich an Ihre Grundschule und die kommunale Schulkindbetreuung. Nennen Sie Klassenstufe, gewünschten Beginn und Abholzeiten. Lassen Sie sich Tageszeiten, Ferienangebot und Beiträge schriftlich bestätigen.", "In Mannheim können Familien einen Hort- oder VGS-Platz (Verlässliche Grundschule) über MeKi vormerken. Für die Randzeitenbetreuung an einer Ganztagsgrundschule verweist die Stadt an die Einrichtung oder das Schulsekretariat. Die Stadt nennt für VGS 11 bis 14 Uhr und für den Schulhort 11 bis 17 Uhr. Das sind örtliche Betreuungsmodule, die mit dem Unterricht verzahnt werden."], resources: [link("Schulkindbetreuung in Mannheim", mannheim, "Zum Betreuungsfinder und zur städtischen Servicestelle Eltern."), link("Randzeitenbetreuung anmelden", mannheimHours, "Informationen der Stadt für Ganztagsgrundschulen.")] },
      ],
      faqs: [{ question: "Hat mein Kind in Klasse 2 im Schuljahr 2026/27 schon Anspruch?", answer: "Die bundesweite Einführung beginnt mit Kindern, die 2026/27 eingeschult werden. Wer zu diesem Zeitpunkt bereits die zweite Klasse besucht, kann sich nach dem örtlichen Angebot erkundigen." }, { question: "Ist der Ganztag verpflichtend?", answer: "Der Bundesanspruch eröffnet eine Betreuungsmöglichkeit. Ob nach der Anmeldung eine Teilnahme verbindlich ist, richtet sich nach dem Modell und den Regeln der jeweiligen Schule." }],
      sources: guideSources([["§ 24 SGB VIII: Anspruch und Umfang", law], ["Bundesregierung: Stufenplan", federal], ["Stadt Mannheim: Ganztagsgrundschulen", mannheimSchools], ["Stadt Mannheim: FAQ zur MeKi-Vormerkung", mannheimFaq]]),
    },
  },
} satisfies AuthoredGuide;
