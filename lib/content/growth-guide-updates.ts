import { euros, moveBudget, moveExamples } from "@/lib/budget-scenarios";
import { type SiteLocale, toolUrl } from "@/lib/locale-paths";
import type { Guide } from "@/lib/types";

type Update = Partial<Pick<Guide, "title" | "description" | "summary" | "sources" | "related">>
  & Pick<Guide, "sections"> & { faqs?: Guide["faqs"]; takeaways?: Guide["takeaways"] };

const depositLaw = "https://www.gesetze-im-internet.de/bgb/__551.html";
const jobsPortal = "https://www.arbeitsagentur.de/jobsuche/";
const internationalJobs = "https://www.make-it-in-germany.com/en/working-in-germany/job-listings";
const recognition = "https://www.anerkennung-in-deutschland.de/html/en/index.php";
const sickPay = "https://www.gesetze-im-internet.de/entgfg/__3.html";
const sickBenefit = "https://www.gesetze-im-internet.de/sgb_5/__46.html";
const certification = "https://www.gesetze-im-internet.de/entgfg/__5.html";
const sickDismissal = "https://www.gesetze-im-internet.de/entgfg/__8.html";
const notice = "https://www.gesetze-im-internet.de/bgb/__622.html";
const challenge = "https://www.gesetze-im-internet.de/kschg/__4.html";

function moveUpdate(locale: SiteLocale): Update {
  const copy = {
    es: {
      title: "¿Cuánto dinero necesito para mudarme a Alemania?",
      description: "Calcula cuánto ahorrar para mudarte a Alemania. Ejemplos de 3.200 € en un piso compartido y 4.750 € en un piso propio, con alquiler y fianza desglosados.",
      summary: "Como punto de partida, una persona puede presupuestar 3.200 € para instalarse en una habitación compartida o 4.750 € para un piso propio. Son ejemplos que incluyen el primer alquiler, la fianza completa, gastos de llegada y un colchón. Ajusta las cifras a tus ofertas y a la fecha de tu primera nómina.",
      heading: "Cuánto ahorrar según el tipo de alojamiento",
      intro: "Suma el primer alquiler con gastos (Warmmiete), la fianza, el viaje y la instalación, y el dinero que necesitarás después del primer mes. Los gastos iniciales pueden incluir comida del primer mes, equipaje, transporte y compras básicas. Los ejemplos son presupuestos de planificación para una persona, no tarifas de mercado ni mínimos de visado.",
      installments: "En un alquiler residencial ordinario, la fianza en dinero está limitada a tres meses de alquiler sin gastos (Kaltmiete). Puedes abonarla en tres cuotas iguales. La primera vence al comenzar el alquiler y las siguientes con las dos mensualidades posteriores.",
      caption: "Ejemplos de presupuesto en euros para una persona", columns: ["Gasto", "Habitación en piso compartido", "Piso propio"],
      rows: ["Primer alquiler con gastos", "Fianza completa", "Viaje y gastos de llegada", "Colchón aparte", "Total con fianza", "Disponible al llegar con el primer plazo"],
      calculator: "Estima tus gastos mensuales", note: "Ajusta alimentación, transporte y gastos fijos a tu situación.",
      cashHeading: "Cuánto efectivo llevar hasta la primera nómina",
      cash: "Pregunta a tu empresa la fecha exacta de la primera nómina y anota qué pagos vencen antes. Si tu primer alquiler con gastos es de 550 €, tus gastos de llegada son 350 € y pagas 400 € de primera cuota de fianza, necesitas 1.300 € para esos tres pagos. Si antes de cobrar llega otro alquiler con la segunda cuota, suma otros 950 € más alimentación, luz y los demás gastos de ese segundo mes.",
      overlap: "Si pasas diez noches en un alojamiento temporal de 40 € por noche mientras se activa tu alquiler definitivo, añade 400 € si ambos costes se solapan. Revisa también si puedes hacer el Anmeldung en esa dirección antes de reservar.",
      q: "¿Cuánto necesito si voy a Alemania sin trabajo?", a: "Añade al cálculo todos los meses que preveas vivir sin ingresos. Si tu alquiler con gastos es de 850 € y el resto de tus gastos asciende a 550 €, cada mes adicional sin ingresos requiere 1.400 €. Aclara también el coste del seguro antes de viajar.",
    },
    en: {
      title: "How Much Money Do You Need to Move to Germany?",
      description: "Budget your move to Germany with two worked examples: €3,200 for a shared flat or €4,750 for your own flat. Includes the deposit and a moving calculator.",
      summary: "A single person could budget €3,200 to move into a shared flat in Germany, or €4,750 for their own flat. Both examples include the first month’s rent, a full deposit, setup costs and a reserve. Adjust the amounts to the listings you can secure and the date of your first paycheque.",
      heading: "How much to save for a room or a flat",
      intro: "Add the first month’s rent including charges (Warmmiete), the rental deposit, travel and setup costs, and enough money to get through the period after month one. Setup costs can include first-month groceries, luggage, local travel and essentials. These are budgets for one person, not local market prices or visa requirements.",
      installments: "For a standard residential lease, a cash deposit is capped at three months’ rent before charges (Kaltmiete). You can pay in three equal installments. The first is due at the start of the tenancy and the next two with the following rent payments.",
      caption: "Example relocation budgets for one person in euros", columns: ["Cost", "Room in a shared flat", "Your own flat"],
      rows: ["First month’s rent with charges", "Full deposit", "Travel and setup", "Separate reserve", "Total with full deposit", "Cash on arrival with first installment"],
      calculator: "Estimate your monthly expenses", note: "Set your own groceries, transport and fixed costs.",
      cashHeading: "How much cash do you need before your first payday?",
      cash: "Ask your employer when your first pay will reach you and list every bill due before that date. If the first rent with charges is €550, setup costs are €350 and the first deposit instalment is €400, those three payments come to €1,300. If the next rent and deposit instalment fall before payday, add another €950, plus food, electricity and any other bills for that second month.",
      overlap: "If ten nights in temporary accommodation at €40 per night overlap with your permanent lease, allow another €400. Check whether the temporary address supports registration before you book.",
      q: "How much should I save to move to Germany without a job?", a: "Set aside enough for each month you expect to have no earnings. If rent including charges is €850 and everything else comes to €550, each additional month costs €1,400. Check your health coverage costs before leaving.",
    },
    de: {
      title: "Umzug nach Deutschland: Wie viel Geld brauchst du?",
      description: "Was kostet ein Umzug nach Deutschland? Zwei Rechenbeispiele mit 3.200 € fürs WG-Zimmer und 4.750 € für eine eigene Wohnung, dazu ein Budgetrechner.",
      summary: "Als alleinstehende Person kannst du beispielhaft mit 3.200 € für ein WG-Zimmer oder 4.750 € für eine eigene Wohnung rechnen. Darin stecken die erste Warmmiete, die volle Kaution, Startkosten und eine Rücklage. Passe das Budget an deine Wohnungsangebote und den Termin der ersten Gehaltszahlung an.",
      heading: "Was du für ein WG-Zimmer oder eine eigene Wohnung zurücklegen solltest",
      intro: "Addiere die erste Warmmiete, die Mietkaution, die Anreise und weitere Startkosten sowie eine Rücklage für die Zeit nach dem ersten Monat. Zu den Startkosten können der Einkauf im ersten Monat, Gepäck, Fahrtkosten und die Grundausstattung gehören. Die Beträge sind Rechenbeispiele für eine Person. Für Visa und örtliche Mieten gelten eigene Vorgaben beziehungsweise Angebote.",
      installments: "Bei einem gewöhnlichen Wohnraummietvertrag darf eine Barkaution höchstens drei Nettokaltmieten betragen. Du kannst sie in drei gleichen Raten zahlen. Die erste Rate ist zu Mietbeginn fällig, die beiden folgenden zusammen mit den nächsten Mietzahlungen.",
      caption: "Zwei Umzugsbudgets für eine Person in Euro", columns: ["Ausgabe", "WG-Zimmer", "Eigene Wohnung"],
      rows: ["Erste Warmmiete", "Volle Kaution", "Anreise und Startkosten", "Separate Rücklage", "Gesamt mit voller Kaution", "Zum Einzug mit erster Kautionsrate"],
      calculator: "Monatliche Ausgaben schätzen", note: "Berechne deine Kosten für Lebensmittel, Verkehr und laufende Verträge.",
      cashHeading: "Wie viel Geld brauchst du bis zum ersten Gehalt?",
      cash: "Frag den Arbeitgeber nach dem ersten Auszahlungstermin und schreib auf, welche Zahlungen vorher fällig sind. Bei 550 € Warmmiete, 350 € Startkosten und 400 € erster Kautionsrate brauchst du dafür 1.300 €. Sind die zweite Miete und Kautionsrate vor dem ersten Gehalt fällig, kommen 950 € sowie Einkäufe, Strom und weitere Ausgaben für den zweiten Monat dazu.",
      overlap: "Überschneiden sich zehn Nächte in einer Übergangsunterkunft zu 40 € pro Nacht mit deinem Mietvertrag, plane 400 € zusätzlich ein. Kläre vor der Buchung auch, ob du dich unter der Adresse anmelden kannst.",
      q: "Wie viel Geld brauche ich für den Umzug ohne Job?", a: "Plane für jeden erwarteten Monat ohne Einkommen Geld ein. Bei 850 € Warmmiete und 550 € für den übrigen Bedarf kostet jeder zusätzliche Monat 1.400 €. Kläre vor der Anreise auch die Kosten für deinen Krankenversicherungsschutz.",
    },
  }[locale];
  const values = moveExamples.map(({ coldRent, rent, setup, reserve }) => {
    const { deposit, full, first } = moveBudget(coldRent, rent, setup, reserve);
    return [rent, deposit, setup, reserve, full, first];
  });
  return {
    title: copy.title, description: copy.description, summary: copy.summary,
    sections: [{
      heading: copy.heading, paragraphs: [copy.intro, copy.installments],
      table: { caption: copy.caption, columns: copy.columns, rows: copy.rows.map((label, index) => [label, ...values.map((example) => euros(locale, example[index]))]) },
      resources: [{ label: copy.calculator, note: copy.note, url: toolUrl(locale, "cost-of-living") }],
    }, { heading: copy.cashHeading, paragraphs: [copy.cash, copy.overlap] }],
    faqs: [{ question: copy.q, answer: copy.a }],
    sources: [{ name: "§ 551 BGB", url: depositLaw }],
    related: ["cities-germany-1800-euros", "jobs-without-german"],
  };
}

const jobsUpdate: Record<SiteLocale, Update> = {
  es: {
    title: "Trabajar en Alemania sin hablar alemán: qué buscar y dónde",
    description: "Busca trabajo en Alemania sin alemán o con nivel A1. Puestos en logística, limpieza, cocina y empresas internacionales, palabras clave y portales oficiales.",
    summary: "Sí, puedes encontrar trabajo en Alemania sin hablar alemán si el puesto acepta otro idioma y tienes derecho a trabajar. En logística, limpieza y cocina los requisitos cambian según el turno y el centro. En tecnología o investigación, busca equipos cuya lengua de trabajo sea el inglés.",
    sections: [{
      heading: "Cómo buscar trabajo sin alemán o con nivel A1",
      paragraphs: ["Combina el nombre del puesto, la ciudad y el idioma. Por ejemplo, prueba «Lagerhelfer Englisch Mannheim», «Reinigungskraft Teilzeit Deutsch A1» o «Küchenhilfe Englisch Berlin». Si tu perfil es técnico, busca «English speaking software engineer Germany» y filtra por idioma y presencialidad.",
        "Lee el anuncio completo. «Deutschkenntnisse von Vorteil» suele indicar que el alemán se valora. «Gute Deutschkenntnisse erforderlich» indica que se exige. Antes de acudir a una prueba, pregunta en qué idioma se dan las instrucciones y qué nivel hace falta durante el turno.",
        "Si tienes ciudadanía de la UE, puedes trabajar en Alemania sin permiso de trabajo. Si vienes de un país de fuera de la UE, verifica qué actividad permite tu visado o permiso. En profesiones reguladas, como enfermería, consulta también los requisitos de reconocimiento e idioma."],
      resources: [
        { label: "Buscar vacantes en la Agencia Federal de Empleo", url: jobsPortal, note: "Filtra por puesto, localidad y jornada." },
        { label: "Ofertas para perfiles internacionales", url: internationalJobs, note: "Portal oficial Make it in Germany." },
      ],
    }, {
      heading: "Un mensaje para confirmar el idioma antes de aceptar una entrevista",
      paragraphs: ["Puedes escribir: «Guten Tag, ich interessiere mich für die Stelle. Mein Deutsch ist auf A1-Niveau. Sind die Einarbeitung und die Sicherheitsunterweisung auf Englisch möglich?» Preguntas si pueden hacer la formación inicial y la explicación de seguridad en inglés.", "Si te ofrecen distintos turnos, confirma para cuál vale su respuesta. Antes de comparar ofertas de jornada parcial o de Minijob, pide salario bruto por hora y horas semanales previstas."],
    }],
    faqs: [{ question: "¿Es suficiente el nivel A1 de alemán para un trabajo de almacén?", answer: "Depende del centro y del turno. La empresa debe poder darte instrucciones de seguridad que entiendas. Pide que te confirmen el idioma, el horario y el salario bruto antes de aceptar." }],
  },
  en: {
    title: "Can You Work in Germany Without Speaking German?",
    description: "Find realistic English-speaking jobs in Germany, from warehouse and kitchen roles to international teams. Try exact searches and check work authorization.",
    summary: "Yes. You can work in Germany without speaking German if the employer accepts another working language and you have the right to work. Some warehouse, cleaning and kitchen teams accept basic German or English. For skilled roles, look for an explicitly English-speaking team.",
    sections: [{
      heading: "Where to look for English-speaking jobs, even with A1 German",
      paragraphs: ["Try combining a role, city and language: “Lagerhelfer Englisch Mannheim” for warehouse work, “Küchenhilfe Englisch Berlin” for kitchen work or “English working language data analyst Germany” for office roles. Search in both English and German. German job titles often uncover listings that a search in English misses.",
        "Read the language requirements in the advert. “Deutschkenntnisse von Vorteil” means German is an advantage. “Gute Deutschkenntnisse erforderlich” means good German is required. Ask which language the team uses for the work itself, including the safety briefing.",
        "EU citizens can work in Germany without a work permit. If you are moving from outside the EU, check what your residence status allows. In regulated professions such as nursing, check the recognition and language rules separately."],
      resources: [
        { label: "Federal Employment Agency vacancy search", url: jobsPortal, note: "Search by role, location and working hours." },
        { label: "Official job listings for international applicants", url: internationalJobs, note: "Search on Make it in Germany." },
      ],
    }, {
      heading: "A German message to check whether the shift is English-speaking",
      paragraphs: ["Write: “Guten Tag, ich interessiere mich für die Stelle. Mein Deutsch ist auf A1-Niveau. Sind die Einarbeitung und die Sicherheitsunterweisung auf Englisch möglich?” It asks whether training and the safety briefing are available in English.", "Confirm the language for the specific shift. If you are comparing part-time or Minijob offers, ask for the gross hourly rate and expected weekly hours."],
    }],
    faqs: [{ question: "Can I get a warehouse job in Germany with A1 German?", answer: "It depends on the site and the shift. Ask whether the employer can give you safety instructions in a language you understand, and confirm the working hours and gross pay before accepting." }],
  },
  de: {
    title: "Jobs ohne Deutschkenntnisse: So findest du passende Stellen",
    description: "Mit Englisch oder Deutsch A1 arbeiten? Konkrete Suchbegriffe für Lager, Reinigung, Küche und internationale Teams sowie amtliche Jobbörsen.",
    summary: "Arbeiten ohne fließendes Deutsch ist möglich, wenn der Betrieb eine andere Arbeitssprache akzeptiert und du arbeiten darfst. Im Lager, in der Reinigung und in der Küche hängen die Sprachvorgaben vom konkreten Arbeitsplatz ab. In internationalen Teams kann Englisch die Arbeitssprache sein.",
    sections: [{
      heading: "Welche Jobs gehen mit Englisch oder Deutsch A1?",
      paragraphs: ["Such nach Tätigkeit, Stadt und Sprache. Probiere etwa „Lagerhelfer Englisch Mannheim“, „Reinigungskraft Teilzeit Deutsch A1“ oder „Küchenhilfe Englisch Berlin“. Für Fachstellen kann die Formulierung „Arbeitssprache Englisch“ helfen.",
        "Achte auf den Wortlaut der Anzeige. „Deutschkenntnisse von Vorteil“ bedeutet, dass Deutsch erwünscht ist. „Gute Deutschkenntnisse erforderlich“ ist eine Voraussetzung. Frag vor dem Probearbeiten, in welcher Sprache die Einarbeitung und die Sicherheitsunterweisung stattfinden.",
        "EU-Bürgerinnen und EU-Bürger dürfen ohne Arbeitserlaubnis in Deutschland arbeiten. Bei einem Aufenthaltstitel aus einem anderen Grund prüfst du, welche Beschäftigung damit erlaubt ist. Für reglementierte Berufe wie Pflege gelten eigene Vorgaben zur Anerkennung und Sprache."],
      resources: [
        { label: "Jobsuche der Bundesagentur für Arbeit", url: jobsPortal, note: "Nach Tätigkeit, Ort und Arbeitszeit filtern." },
        { label: "Stellen für internationale Bewerber", url: internationalJobs, note: "Offizielle Jobbörse von Make it in Germany." },
      ],
    }, {
      heading: "Vor dem Probearbeiten nach der Arbeitssprache fragen",
      paragraphs: ["Schreib zum Beispiel: „Guten Tag, ich interessiere mich für die Stelle. Mein Deutsch ist auf A1-Niveau. Sind die Einarbeitung und die Sicherheitsunterweisung auf Englisch möglich?“", "Bei mehreren Schichten frag für deinen konkreten Einsatz nach. Lass dir auch den Bruttostundenlohn und die geplante Wochenarbeitszeit nennen, damit sich Teilzeit- und Minijobangebote vergleichen lassen."],
    }],
    faqs: [{ question: "Reicht Deutsch auf A1-Niveau für einen Lagerjob?", answer: "Das hängt vom Einsatzort und von der Schicht ab. Kläre vorab, in welcher Sprache die Sicherheitsunterweisung stattfindet, wie die Schichten liegen und was du brutto verdienst." }],
  },
};

const probationUpdate: Record<SiteLocale, Update> = {
  es: {
    title: "Baja médica en Alemania durante el periodo de prueba: quién paga",
    description: "Qué hacer si enfermas durante la Probezeit. Quién paga en las primeras 4 semanas, cómo funciona la eAU y qué plazo tienes si te despiden.",
    summary: "Si enfermas durante el periodo de prueba en Alemania, avisa a la empresa de inmediato y sigue sus reglas de certificación. Durante las primeras cuatro semanas de empleo continuo, la empresa todavía no está obligada a pagarte el sueldo por baja. A partir de entonces, el derecho ordinario es de hasta seis semanas si se cumplen los requisitos.",
    sections: [{
      heading: "Quién paga si enfermas durante la Probezeit",
      paragraphs: ["La espera de cuatro semanas se cuenta desde que empieza el contrato, con independencia de cuánto dure el periodo de prueba. Si tienes seguro público con derecho a Krankengeld, pregunta a tu caja qué puede cubrir durante la espera. Si la baja sigue al terminar esas cuatro semanas, puede empezar entonces el pago legal de la empresa.",
        "Si tu contrato empieza el 1 de diciembre de 2026, las cuatro semanas terminan el 28 de diciembre. Para una baja que empezó el 22 y continúa el 29, la obligación legal de la empresa puede comenzar el 29 si se cumplen los requisitos.",
        "Ejemplo: si enfermas en la segunda semana de un contrato nuevo, avisa a la empresa, obtén el justificante que corresponda y habla con tu aseguradora. Si la baja empieza cuando ya llevas dos meses trabajando, normalmente paga la empresa dentro del límite legal, aunque sigas en periodo de prueba."],
      table: { caption: "Baja durante el periodo de prueba", columns: ["Situación", "Qué hacer y a quién consultar"], rows: [
        ["Primeras 4 semanas de empleo continuo", "Avisa a la empresa y consulta si tu aseguradora reconoce el Krankengeld."],
        ["A partir de la quinta semana", "La empresa abona normalmente hasta seis semanas por la misma enfermedad, si tienes derecho."],
        ["Recibes un despido por escrito", "Guarda la carta y consulta enseguida. El plazo general para impugnar es de tres semanas desde la recepción."],
      ] },
    }, {
      heading: "¿Me pueden despedir estando de baja durante el periodo de prueba?",
      paragraphs: ["Una baja médica no impide por sí sola recibir un despido. Si hay un periodo de prueba pactado de hasta seis meses, normalmente se aplica un preaviso de dos semanas. La validez del despido depende del caso. Si la empresa despide precisamente a causa de la incapacidad, la ley protege el derecho a seguir cobrando la remuneración por baja en los supuestos aplicables."],
    }],
    faqs: [{ question: "¿La empresa puede pedirme la baja desde el primer día?", answer: "Sí. Avisa de inmediato, indica la duración prevista y comprueba si la empresa exige la certificación desde el primer día. Con eAU, normalmente la empresa consulta el justificante electrónico a la aseguradora." }],
  },
  en: {
    title: "Sick During Probation in Germany: Who Pays and What to Do",
    description: "Get sick during Probezeit? Check who pays in the first four weeks, when to notify your employer, how eAU works and what to do if you are dismissed.",
    summary: "If you are sick during probation in Germany, tell your employer immediately. The statutory entitlement to continued sick pay from the employer starts after four continuous weeks of employment. If you qualify, the employer normally pays for up to six weeks for the same illness.",
    sections: [{
      heading: "Who pays if you get sick during the first four weeks?",
      paragraphs: ["The four-week wait starts when employment begins, regardless of the length of your probation. Ask your statutory insurer about Krankengeld if your coverage includes it. If you are still sick once the four weeks have passed, the employer’s statutory payment may start at that point.",
        "If employment starts on 1 December 2026, the four-week waiting period ends on 28 December. If you are sick from 22 December and remain off on 29 December, statutory employer pay can start on the 29th if you qualify.",
        "For example, if you fall ill in week two, notify your employer, get the appropriate certificate and contact your insurer. If you first fall ill after two months of employment, the employer normally pays within the statutory limit even if you are still on probation."],
      table: { caption: "Sick leave during probation at a glance", columns: ["Timing", "What to do"], rows: [
        ["First 4 continuous weeks", "Notify your employer and check Krankengeld eligibility with your insurer."],
        ["From week 5", "Employer generally pays for up to six weeks for the same illness if you qualify."],
        ["You receive written notice of dismissal", "Keep the letter and get advice promptly. The usual time limit to challenge it is three weeks from receipt."],
      ] },
    }, {
      heading: "Can you be dismissed while off sick on probation?",
      paragraphs: ["Being on sick leave does not automatically prevent dismissal. During an agreed probationary period of up to six months, the usual notice period is two weeks. Whether a dismissal is valid depends on the circumstances. If an employer terminates the job specifically because of the incapacity, the law protects applicable entitlements to continued pay."],
    }],
    faqs: [{ question: "Can the employer require a sick note on the first day?", answer: "Yes. Notify the employer immediately, give the expected duration and check when certification is required. Under eAU, employers normally retrieve the certificate details electronically from the statutory insurer." }],
  },
  de: {
    title: "Krank in der Probezeit: Wer zahlt und wann droht Kündigung?",
    description: "Krank in den ersten 4 Wochen? Erfahre, wann Krankenkasse oder Arbeitgeber zahlen, wie die eAU funktioniert und welche Frist bei Kündigung gilt.",
    summary: "Wenn du in der Probezeit krank wirst, melde dich sofort beim Arbeitgeber. Der gesetzliche Anspruch auf Entgeltfortzahlung entsteht nach vier Wochen ununterbrochener Beschäftigung. Sind die Voraussetzungen erfüllt, zahlt der Arbeitgeber bei derselben Erkrankung grundsätzlich bis zu sechs Wochen.",
    sections: [{
      heading: "Krank in den ersten vier Wochen: Krankengeld oder Lohn?",
      paragraphs: ["Die vierwöchige Wartezeit beginnt mit dem Arbeitsverhältnis. Die vereinbarte Dauer der Probezeit ändert daran nichts. Bist du gesetzlich mit Anspruch auf Krankengeld versichert, frage deine Krankenkasse nach der Leistung in der Wartezeit. Dauert die Arbeitsunfähigkeit über die vier Wochen hinaus an, kann danach die Entgeltfortzahlung einsetzen.",
        "Beginnt dein Arbeitsverhältnis am 1. Dezember 2026, endet die Wartezeit am 28. Dezember. Bist du ab dem 22. arbeitsunfähig und am 29. noch krank, kann ab dem 29. die gesetzliche Entgeltfortzahlung beginnen, wenn die Voraussetzungen erfüllt sind.",
        "Beispiel: Wirst du in Woche zwei krank, informiere den Arbeitgeber, besorge den nötigen Nachweis und kontaktiere deine Krankenkasse. Beginnt die Arbeitsunfähigkeit erst nach zwei Monaten, zahlt in der Regel der Arbeitgeber, auch wenn deine Probezeit noch läuft."],
      table: { caption: "Krank in der Probezeit im Überblick", columns: ["Situation", "Was zu tun ist"], rows: [
        ["Erste 4 Wochen ununterbrochener Beschäftigung", "Beim Arbeitgeber krankmelden und den Krankengeldanspruch mit der Kasse klären."],
        ["Ab der fünften Woche", "Bei Anspruch zahlt der Arbeitgeber für dieselbe Krankheit grundsätzlich bis zu sechs Wochen."],
        ["Schriftliche Kündigung geht zu", "Schreiben aufbewahren und schnell beraten lassen. Die Klagefrist beträgt grundsätzlich drei Wochen ab Zugang."],
      ] },
    }, {
      heading: "Darf der Arbeitgeber in der Probezeit während der Krankheit kündigen?",
      paragraphs: ["Eine Krankschreibung schützt für sich genommen nicht vor einer Kündigung. In einer vereinbarten Probezeit von bis zu sechs Monaten gilt gewöhnlich eine zweiwöchige Kündigungsfrist. Ob eine Kündigung wirksam ist, hängt vom Einzelfall ab. Kündigt der Arbeitgeber aus Anlass der Arbeitsunfähigkeit, bleibt ein bestehender Anspruch auf Entgeltfortzahlung nach den gesetzlichen Regeln bestehen."],
    }],
    faqs: [{ question: "Ist eine Krankschreibung ab dem ersten Tag Pflicht?", answer: "Der Arbeitgeber kann die ärztliche Feststellung ab dem ersten Tag verlangen. Melde dich sofort krank und nenne die voraussichtliche Dauer. Bei der eAU ruft der Betrieb die Nachweisdaten normalerweise bei der gesetzlichen Krankenkasse ab." }],
  },
};

const familyTriage: Record<SiteLocale, Guide["sections"][number]> = {
  es: {
    heading: "¿Qué ayudas puedes pedir y cuál conviene tramitar primero?",
    paragraphs: ["Si acaba de nacer tu hijo, reúne los documentos para el Kindergeld y tramita en paralelo el Elterngeld si vas a reducir o dejar de trabajar. El Elterngeld solo puede pagarse retroactivamente por los tres últimos meses de vida del bebé, si se cumplen los requisitos. Si tus ingresos no cubren las necesidades del hogar, comprueba el Kinderzuschlag en el mismo mes. Si falta la pensión de alimentos, contacta con el Jugendamt."],
    table: { caption: "Principales ayudas familiares en 2026", columns: ["Ayuda", "Cuánto", "Dónde"], rows: [
      ["Kindergeld", "259 € por hijo al mes", "Familienkasse"],
      ["Kinderzuschlag", "Hasta 297 € por hijo al mes", "Familienkasse"],
      ["Basiselterngeld", "De 300 a 1.800 € al mes", "Elterngeldstelle"],
      ["Unterhaltsvorschuss", "227 €, 299 € o 394 € al mes según la edad", "Jugendamt o unidad local"],
    ] },
  },
  en: {
    heading: "What benefits can you claim, and which should you apply for first?",
    paragraphs: ["After the birth, get your documents ready for Kindergeld and apply for Elterngeld in parallel if you will reduce or stop work. Elterngeld can only be paid retrospectively for up to three months of the baby’s life, subject to eligibility. If your wages do not cover the family’s needs, check Kinderzuschlag that same calendar month. If child maintenance is missing, contact the youth welfare office (Jugendamt)."],
    table: { caption: "Main German family benefits in 2026", columns: ["Benefit", "Amount", "Where to apply"], rows: [
      ["Kindergeld", "€259 per child per month", "Familienkasse"],
      ["Kinderzuschlag", "Up to €297 per child per month", "Familienkasse"],
      ["Basiselterngeld", "€300 to €1,800 per month", "Elterngeldstelle"],
      ["Unterhaltsvorschuss", "€227, €299 or €394 per month by age", "Jugendamt or local office"],
    ] },
  },
  de: {
    heading: "Welche Familienleistungen kommen infrage und welcher Antrag ist zuerst dran?",
    paragraphs: ["Bereite nach der Geburt die Unterlagen für das Kindergeld vor und beantrage parallel Elterngeld, wenn du weniger oder gar nicht arbeitest. Bei Anspruch wird Elterngeld höchstens für drei Lebensmonate rückwirkend gezahlt. Reicht das Einkommen für die Familie nicht aus, prüfe den Kinderzuschlag noch im selben Kalendermonat. Bleibt der Kindesunterhalt aus, wende dich ans Jugendamt."],
    table: { caption: "Wichtige Familienleistungen 2026", columns: ["Leistung", "Höhe", "Anlaufstelle"], rows: [
      ["Kindergeld", "259 € pro Kind und Monat", "Familienkasse"],
      ["Kinderzuschlag", "Bis zu 297 € pro Kind und Monat", "Familienkasse"],
      ["Basiselterngeld", "300 bis 1.800 € im Monat", "Elterngeldstelle"],
      ["Unterhaltsvorschuss", "227 €, 299 € oder 394 € monatlich je nach Alter", "Jugendamt oder örtliche Stelle"],
    ] },
  },
};

export function refinePriorityGuide(guide: Guide, slug: string, locale: SiteLocale): Guide {
  let update: Update;
  switch (slug) {
    case "moving-to-germany":
      update = moveUpdate(locale);
      break;
    case "jobs-without-german":
      update = {
        ...jobsUpdate[locale],
        related: ["moving-to-germany", "germany-changes-january-2027"],
        sources: [
          { name: "Bundesagentur für Arbeit", url: jobsPortal },
          { name: "Make it in Germany", url: internationalJobs },
          { name: "Bundesagentur für Arbeit · Deutschkenntnisse", url: "https://www.arbeitsagentur.de/arbeiten-in-deutschland/deutschkenntnisse" },
          { name: "Anerkennung in Deutschland", url: recognition },
        ],
      };
      break;
    case "sick-leave-germany":
      update = {
        ...probationUpdate[locale],
        sources: [
          { name: "§ 3 Entgeltfortzahlungsgesetz", url: sickPay },
          { name: "§ 46 SGB V · Krankengeld", url: sickBenefit },
          { name: "§ 5 Entgeltfortzahlungsgesetz", url: certification },
          { name: "§ 8 Entgeltfortzahlungsgesetz", url: sickDismissal },
          { name: "§ 622 BGB", url: notice },
          { name: "§ 4 Kündigungsschutzgesetz", url: challenge },
        ],
      };
      break;
    case "child-benefits-germany":
      update = {
        sections: [familyTriage[locale]],
        related: ["kita-childcare-germany-apply", "germany-changes-january-2027"],
        sources: [
          { name: "Familienportal des Bundes · Elterngeld beantragen", url: "https://familienportal.de/familienportal/familienleistungen/elterngeld/faq/wie-kann-ich-elterngeld-beantragen--124762" },
          { name: "Familienportal des Bundes · Höhe des Unterhaltsvorschusses", url: "https://familienportal.de/familienportal/familienleistungen/unterhaltsvorschuss/wieviel-unterhaltsvorschuss-kann-ich-fuer-mein-kind-bekommen--125264" },
        ],
      };
      break;
    default:
      return guide;
  }
  return {
    ...guide, ...update,
    updated: "2026-11-27",
    readingMinutes: guide.readingMinutes + 1,
    sections: [...update.sections, ...guide.sections],
    faqs: [...(update.faqs ?? []), ...guide.faqs],
    takeaways: update.takeaways ?? guide.takeaways,
    sources: Array.from(new Map([...guide.sources, ...(update.sources ?? [])].map((source) => [source.url, source])).values()),
    related: [...new Set([...(update.related ?? []), ...guide.related])],
  };
}
