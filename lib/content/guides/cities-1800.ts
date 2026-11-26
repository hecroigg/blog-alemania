import { cityBudget, cityBudgetDefaults, cityRentExamples, euros } from "@/lib/budget-scenarios";
import { cityUrl, toolUrl, type SiteLocale } from "@/lib/locale-paths";
import { applicationLink as link, guideSources, type AuthoredGuide } from "./authored-guide";

const greix = "https://www.kielinstitut.de/de/publikationen/greix-mietpreisindexq32026-mietpreisentwicklung-zeigt-wieder-nach-oben-20306/";
const sources = guideSources([["GREIX Mietpreisindex Q3 2026 · Kiel Institut für Weltwirtschaft", greix]]);

function examples(locale: SiteLocale, caption: string, columns: string[]) {
  const { income, expenses, reserve } = cityBudgetDefaults;
  return {
    caption, columns,
    rows: cityRentExamples.map(({ city, id, rent }) => [
      locale === "es" && id === "berlin" ? "Berlín" : id === "munich" ? { es: "Múnich", en: "Munich", de: city }[locale] : city,
      euros(locale, rent), euros(locale, rent + expenses + reserve),
      euros(locale, cityBudget(income, rent, expenses, reserve).remainder),
    ]),
  };
}

export const cities1800 = {
  slugs: { es: "vivir-alemania-1800-euros-ciudades", en: "cities-germany-1800-euros", de: "mit-1800-euro-netto-leben-staedte" },
  category: "housing",
  updated: "2026-11-26",
  readingMinutes: 5,
  related: ["best-cities-germany", "cost-of-living-germany", "moving-to-germany", "finding-housing-germany"],
  copy: {
    es: {
      title: "¿Dónde vivir en Alemania con 1.800 € netos al mes?",
      description: "Compara Leipzig, Mannheim, Berlín y Múnich con 1.800 € netos. Consulta alquileres publicados, cuatro presupuestos y una calculadora de alquiler máximo.",
      eyebrow: "Vivienda y presupuesto",
      summary: "Con 1.800 € netos al mes y sin coche, Leipzig es un buen punto de partida si priorizas el alquiler. Mannheim puede encajar si trabajas en la región. Con 600 € para otros gastos y 200 € de margen, el alquiler con gastos debería quedar en 1.000 € o menos. En Berlín y Múnich, una habitación compartida puede facilitarlo.",
      takeaways: ["Los 1.800 € son netos. Si tu oferta indica un bruto, calcula primero lo que recibirías.", "Separa la Warmmiete de la luz e internet cuando el contrato los cobre aparte.", "Compara anuncios reales y el coste de desplazarte a tu trabajo."],
      sections: [
        { heading: "Cuatro presupuestos con 1.800 € al mes", paragraphs: ["Los alquileres de la tabla son supuestos para comprobar tu presupuesto, no medias de mercado. Los cuatro casos reservan 600 € al mes para comida, luz, internet, transporte y otros gastos, y otros 200 € para ahorro o imprevistos. El seguro habitual de un asalariado ya está descontado del sueldo neto."], table: examples("es", "Escenarios para una persona sin coche", ["Ciudad", "Alquiler con gastos", "Total con margen", "Saldo disponible"]) },
        { heading: "Qué indican los alquileres de los anuncios", paragraphs: ["GREIX registró en el tercer trimestre de 2026 un alquiler anunciado sin gastos de 10,40 €/m² en Leipzig, 15,80 €/m² en Berlín y 23,70 €/m² en Múnich. Para un piso de 40 m² serían unos 416 €, 632 € y 948 € antes de gastos, si el piso tuviera el precio medio por metro cuadrado. El tamaño, el barrio y el tipo de contrato pueden cambiar mucho el precio. En Mannheim, el índice subió un 5,0 % interanual, así que comprueba los precios de los anuncios recientes."], resources: [link("Informe de alquileres GREIX", greix, "Datos de anuncios, no de contratos vigentes.")] },
        { heading: "Cómo decidir entre una ciudad y otra", paragraphs: ["Empieza en Leipzig si puedes elegir dónde trabajar o tienes una oferta allí. En Mannheim, compara trayectos desde los barrios y desde municipios próximos. Para Berlín o Múnich, compara una habitación compartida céntrica con una vivienda más lejos y calcula el trayecto durante tu turno real."], resources: [
          link("Vivir en Leipzig", cityUrl("es", "leipzig")!, "Vivienda, transporte y trámites de la ciudad."),
          link("Vivir en Mannheim", cityUrl("es", "mannheim")!, "Movilidad y trámites para instalarte."),
          link("Calcula tu salario neto", toolUrl("es", "salary-calculator"), "Convierte el bruto de tu oferta a una estimación mensual."),
          link("Compara ciudades alemanas", toolUrl("es", "compare-cities"), "Compara vivienda y transporte con los mismos criterios."),
        ] },
      ],
      faqs: [{ question: "¿Puedo vivir en Múnich con 1.800 € netos?", answer: "Puede cuadrar con un alquiler con gastos de 1.000 € o menos bajo este presupuesto. Si pagas 1.200 € de alquiler y mantienes 600 € para otros gastos, no te quedan los 200 € de margen. Compara habitaciones compartidas antes de comprometerte." }, { question: "¿Cuánto puedo pagar de alquiler con 1.800 € netos?", answer: "Si necesitas 600 € para otros gastos y quieres guardar 200 €, tu máximo es de 1.000 € con gastos. Si tus otras obligaciones suben 150 €, el límite baja a 850 €." }],
      sources,
    },
    en: {
      title: "Best German Cities to Live In on €1,800 a Month",
      description: "Can you live on €1,800 take-home pay in Germany? Compare Leipzig, Mannheim, Berlin and Munich with asking rents, sample budgets and a rent calculator.",
      eyebrow: "Housing and monthly budgets",
      summary: "If you take home €1,800 a month and live without a car, start with Leipzig for lower rents or Mannheim if your job is in the region. With €600 for other expenses and €200 set aside, you can spend up to €1,000 on rent including charges. In Berlin or Munich, sharing a flat may make that easier.",
      takeaways: ["The budget uses take-home income. Convert any gross salary offer before comparing.", "Check whether electricity and internet are charged separately from Warmmiete.", "Compare live listings and the door-to-door commute for your working hours."],
      sections: [
        { heading: "Four city budgets on €1,800 take-home pay", paragraphs: ["The rent amounts in this table are test scenarios, not local averages. The examples use €600 for groceries, electricity, internet, transport and other spending, plus a separate €200 savings or emergency buffer. Standard payroll health contributions have already been deducted from take-home pay."], table: examples("en", "Monthly scenarios for one adult without a car", ["City", "Rent with charges", "Total with buffer", "Balance"]) },
        { heading: "What advertised rents tell you", paragraphs: ["In Q3 2026, GREIX reported asking rents before charges of €10.40 per square metre in Leipzig, €15.80 in Berlin and €23.70 in Munich. For 40 m² at those per-square-metre rates that is roughly €416, €632 and €948 before charges. Small flats, specific neighbourhoods and furnished contracts can differ. Mannheim’s index rose 5.0% year on year, so use current listings when budgeting."], resources: [link("GREIX rental index report", greix, "Asking rents for advertised flats, rather than existing leases.")] },
        { heading: "Choosing a city for your job and budget", paragraphs: ["Start with Leipzig if you can choose where to work or have an offer there. In Mannheim, check tram and regional rail connections from neighbourhoods and nearby towns. In Berlin or Munich, compare a shared flat with a longer commute and include the journey at the actual time of your shift."], resources: [
          link("Leipzig city guide", cityUrl("en", "leipzig")!, "Housing, transport and local administration."),
          link("Mannheim city guide", cityUrl("en", "mannheim")!, "Transport and getting set up."),
          link("Estimate your take-home pay", toolUrl("en", "salary-calculator"), "Convert a gross offer to an estimated monthly amount."),
          link("Compare German cities", toolUrl("en", "compare-cities"), "Compare housing and transport using the same criteria."),
        ] },
      ],
      faqs: [{ question: "Can I live in Munich on €1,800 net a month?", answer: "It can work with rent including charges of €1,000 or less under this budget. Paying €1,200 in rent and €600 in other costs would leave no cash for the planned €200 buffer. Check shared flats before committing." }, { question: "How much rent can I afford on €1,800 take-home pay?", answer: "If other expenses are €600 and you want to save €200, the ceiling is €1,000 including charges. An extra €150 in regular obligations lowers it to €850." }],
      sources,
    },
    de: {
      title: "Mit 1.800 € netto leben: Welche Städte kannst du dir leisten?",
      description: "Reichen 1.800 € netto in Leipzig, Mannheim, Berlin oder München? Vergleiche Mieten und Monatsbudgets und berechne deine maximale Warmmiete.",
      eyebrow: "Wohnen und Monatsbudget",
      summary: "Mit 1.800 € netto im Monat und ohne Auto lohnt sich ein Blick auf Leipzig, wenn die Miete möglichst niedrig sein soll. Mannheim kann passen, wenn du in der Region arbeitest. Bei 600 € für laufende Ausgaben und 200 € Rücklage bleiben höchstens 1.000 € Warmmiete. In Berlin oder München kann ein WG-Zimmer helfen.",
      takeaways: ["Rechne mit dem Nettogehalt. Bei einem Angebot in brutto ziehst du zuerst Steuern und Abgaben ab.", "Prüfe, ob Strom und Internet schon in der Warmmiete stehen.", "Vergleiche aktuelle Anzeigen und die tatsächliche Fahrtzeit zur Arbeit."],
      sections: [
        { heading: "Vier Monatsbudgets mit 1.800 € netto", paragraphs: ["Die Warmmieten in der Tabelle sind Rechenbeispiele. Die vier Fälle rechnen mit 600 € für Lebensmittel, Strom, Internet, Verkehr und weitere Ausgaben sowie 200 € Rücklage. Die üblichen Sozialabgaben eines Angestellten sind im Nettogehalt bereits berücksichtigt."], table: examples("de", "Monatsbudgets für eine Person ohne Auto", ["Stadt", "Warmmiete", "Gesamt mit Rücklage", "Übrig"]) },
        { heading: "Wie hoch sind die Angebotsmieten?", paragraphs: ["GREIX meldete für das dritte Quartal 2026 Angebotskaltmieten von 10,40 €/m² in Leipzig, 15,80 €/m² in Berlin und 23,70 €/m² in München. Bei 40 m² und diesen Quadratmeterpreisen käme man auf etwa 416 €, 632 € und 948 € kalt. Kleine Wohnungen, einzelne Viertel und möblierte Angebote können stark abweichen. In Mannheim stieg der Index um 5,0 % zum Vorjahr. Prüfe deshalb auch aktuelle Inserate."], resources: [link("GREIX-Mietpreisbericht", greix, "Grundlage sind Wohnungsanzeigen für Neuvermietungen.")] },
        { heading: "Welche Stadt passt zu deinem Arbeitsweg?", paragraphs: ["Wenn du ortsunabhängig arbeitest oder ein Stellenangebot vor Ort hast, lohnt sich Leipzig als Ausgangspunkt. In Mannheim vergleiche Straßenbahn und Regionalbahn aus unterschiedlichen Stadtteilen und Umlandgemeinden. In Berlin oder München stelle WG-Angebote und weitere Pendelwege gegenüber. Prüfe die Verbindungen zu deinen konkreten Arbeitszeiten."], resources: [
          link("Stadtführer Leipzig", cityUrl("de", "leipzig")!, "Infos zu Wohnen, Verkehr und Behörden."),
          link("Stadtführer Mannheim", cityUrl("de", "mannheim")!, "Verkehr und die ersten Schritte vor Ort."),
          link("Nettogehalt berechnen", toolUrl("de", "salary-calculator"), "Schätze, wie viel von einem Bruttoangebot im Monat ankommt."),
          link("Deutsche Städte vergleichen", toolUrl("de", "compare-cities"), "Vergleiche Wohnen und Mobilität nach einheitlichen Kriterien."),
        ] },
      ],
      faqs: [{ question: "Kann ich mit 1.800 € netto in München leben?", answer: "Bei einer Warmmiete von höchstens 1.000 € kann das in diesem Budget klappen. Bei 1.200 € Warmmiete und 600 € weiteren Ausgaben bleibt kein Geld für die geplante Rücklage von 200 €. Prüfe zunächst auch WG-Angebote." }, { question: "Wie viel Warmmiete bei 1.800 € netto?", answer: "Bei 600 € laufenden Ausgaben und 200 € Rücklage sind es höchstens 1.000 €. Steigen deine anderen monatlichen Ausgaben um 150 €, sinkt das Mietbudget auf 850 €." }],
      sources,
    },
  },
} satisfies AuthoredGuide;
