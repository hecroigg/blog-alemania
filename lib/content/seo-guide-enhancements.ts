import type { Guide } from "@/lib/types";

type Lang = "en" | "es" | "de";
type Enhancement = { title: string; description: string; section: Guide["sections"][number]; source?: Guide["sources"][number] };
const internetSource = "https://www.bundesnetzagentur.de/DE/Vportal/TK/InternetTelefon/Vertrag/start.html";
const taxSource = "https://bzst.de/DE/Privatpersonen/SteuerlicheIdentifikationsnummer/steuerlicheidentifikationsnummer.html";
const internet: Record<Lang, Enhancement> = {
  de: {
    title: "Internetanschluss für Zuhause: Tarife, Kosten und Anbieter",
    description: "DSL, Kabel, Glasfaser oder 5G? So finden Sie günstiges Internet für Zuhause, vergleichen Gesamtkosten und prüfen Laufzeit, Router und Verfügbarkeit.",
    section: { heading: "Günstiges Internet für Zuhause: richtig vergleichen", paragraphs: [
      "Rechenbeispiel (kein aktuelles Tarifangebot): 20 € monatlich in den ersten 12 Monaten, danach 40 € für weitere 12 Monate, 50 € Anschlussgebühr und 5 € monatliche Routermiete ergeben 890 € für 24 Monate, also 37,08 € im Monat. Vergleichen Sie diesen Effektivpreis statt des Werbepreises.",
      "Für eine kurze Mietdauer kann ein monatlich kündbarer Anschluss sinnvoll sein. Prüfen Sie, ob Mindestlaufzeit, Router, Versand und Bereitstellung in der Vertragszusammenfassung enthalten sind. Ein WLAN-Router verteilt die Verbindung in der Wohnung; DSL, Kabel, Glasfaser oder Mobilfunk bestimmen den eigentlichen Internetzugang.",
      "Die oben genannten Anbieterpreise sind Beispiele vom 24. September 2026, keine garantierten heutigen Angebote. Prüfen Sie die Preise und die Verfügbarkeit direkt beim Anbieter."
    ] },
    source: { name: "Bundesnetzagentur – Internet- und Telefonverträge", url: internetSource, note: "Vertragszusammenfassung und Produktinformationsblatt" }
  },
  es: {
    title: "Internet en casa en Alemania: tarifas, precios y compañías",
    description: "Compara DSL, cable, fibra y 5G en Alemania. Calcula el precio real del contrato, comprueba cobertura y elige internet con o sin permanencia.",
    section: { heading: "Cómo encontrar internet barato para casa", paragraphs: [
      "Ejemplo ilustrativo, no una oferta vigente: 20 € al mes los primeros 12 meses, 40 € los 12 siguientes, 50 € de alta y 5 € mensuales de router suman 890 € en 24 meses: 37,08 € al mes. Compara el coste efectivo, no solo la promoción.",
      "Si tu alquiler es corto, valora una tarifa cancelable mensualmente. Comprueba permanencia, router, envío y alta en el resumen contractual. El Wi-Fi distribuye la conexión dentro de casa; DSL, cable, fibra o red móvil son tecnologías de acceso.",
      "Los precios de proveedores citados arriba son referencias del 24 de septiembre de 2026, no ofertas garantizadas hoy. Confirma precio y cobertura directamente con cada proveedor."
    ] },
    source: { name: "Bundesnetzagentur – contratos de internet y telefonía", url: internetSource, note: "Resumen del contrato y ficha del producto" }
  },
  en: {
    title: "Home internet in Germany: providers, prices and contracts",
    description: "Compare DSL, cable, fibre and 5G home internet in Germany. Work out the real monthly cost, check availability and choose a flexible contract.",
    section: { heading: "How to compare cheap home internet", paragraphs: [
      "Illustrative example, not a live offer: €20 per month for 12 months, €40 for the next 12, a €50 connection fee and €5 monthly router rental total €890 over 24 months, or €37.08 per month. Compare this effective price rather than the promotional price.",
      "For a short tenancy, consider a monthly-cancellable plan. Check the minimum term, router, delivery and activation charges in the contract summary. Wi-Fi distributes the connection inside your home; DSL, cable, fibre or mobile networks provide the connection itself.",
      "The provider prices above are examples dated 24 September 2026, not guaranteed current offers. Confirm prices and address availability with each provider."
    ] },
    source: { name: "Federal Network Agency – internet and telephone contracts", url: internetSource, note: "Contract summary and product information sheet" }
  }
};
const tax: Record<Lang, Enhancement> = {
  es: { title: "Steuer-ID en Alemania: cómo conseguir y recuperar el número fiscal", description: "Qué es la Steuer-ID alemana, dónde encontrarla, cómo recuperarla si has perdido la carta y qué hacer si todavía no la recibes tras el Anmeldung.", section: { heading: "Dónde encontrar y recuperar tu Steuer-ID", paragraphs: ["Antes de solicitarla otra vez, revisa la carta original del BZSt, tu certificado anual de retenciones salariales (Lohnsteuerbescheinigung) y las notificaciones de liquidación del impuesto sobre la renta (Einkommensteuerbescheid). Busca la Identifikationsnummer, no la Steuernummer.", "Si no la encuentras, solicita una nueva comunicación mediante el formulario oficial del BZSt. No necesitas un intermediario de pago. El trámite no crea un número nuevo."] }, source: { name: "BZSt – número de identificación fiscal", url: taxSource } },
  de: { title: "Steuer-ID finden oder erneut anfordern: so geht es", description: "Wo steht die Steueridentifikationsnummer? So finden Sie Ihre Steuer-ID, fordern sie beim BZSt erneut an und unterscheiden sie von der Steuernummer.", section: { heading: "Steuer-ID finden oder erneut anfordern", paragraphs: ["Prüfen Sie zunächst das ursprüngliche BZSt-Schreiben, die Lohnsteuerbescheinigung und den Einkommensteuerbescheid. Suchen Sie nach der Identifikationsnummer und nicht nach der Steuernummer.", "Ist die Nummer nicht auffindbar, nutzen Sie das offizielle BZSt-Formular zur erneuten Mitteilung. Ein kostenpflichtiger Vermittler ist nicht erforderlich; es wird keine neue Nummer vergeben."] }, source: { name: "BZSt – steuerliche Identifikationsnummer", url: taxSource } },
  en: { title: "German Tax ID (Steuer-ID): how to get or find your number", description: "Find your German Tax ID, request it again if you lost your letter, and understand how it differs from a Steuernummer after Anmeldung.", section: { heading: "Where to find or request your Tax ID again", paragraphs: ["Check the original BZSt letter, your annual wage tax certificate (Lohnsteuerbescheinigung) and income tax assessment (Einkommensteuerbescheid). Look for the Identifikationsnummer, not the Steuernummer.", "If you cannot find it, use the official BZSt request form for a repeat notification. There is no need for a paid intermediary; this does not create a new number."] }, source: { name: "BZSt – personal tax identification number", url: taxSource } }
};
const health: Record<Lang, Enhancement> = {
  de: { title: "Krankenkassenbeitrag 2026: Was kostet die gesetzliche Krankenversicherung?", description: "GKV-Beitrag 2026: 14,6 % plus Zusatzbeitrag. Berechnen Sie Ihren Arbeitnehmeranteil mit Bruttolohn, Beitragsgrenze und konkreten Euro-Beispielen.", section: { heading: "So berechnen Sie Ihren eigenen Krankenkassenbeitrag", paragraphs: ["Für regulär beschäftigte Arbeitnehmer mit allgemeinem GKV-Beitragssatz gilt als vereinfachte Rechnung: beitragspflichtiges Monatsentgelt (maximal 5.812,50 € im Jahr 2026) × (14,6 % + kassenindividueller Zusatzbeitrag) ÷ 2.", "Bei 2.000 € beitragspflichtigem Monatslohn und dem durchschnittlichen Zusatzbeitrag von 2,9 % ergibt das 175 € Arbeitnehmeranteil. Beträgt der Zusatzbeitrag Ihrer Kasse stattdessen 3,5 %, sind es 181 €. Pflegeversicherung kommt separat hinzu.", "Diese Standardrechnung gilt nicht unverändert für Midijobs, studentische oder freiwillige Versicherungen und private Krankenversicherung. Prüfen Sie bei Sonderfällen die konkrete Einstufung Ihrer Krankenkasse."] } },
  es: { title: "Cuánto cuesta el seguro médico público en Alemania en 2026", description: "Calcula tu aportación al seguro público alemán: 14,6 % más cuota adicional, límite de cotización y ejemplos de descuentos salariales.", section: { heading: "Cómo calcular tu propia cuota del seguro médico", paragraphs: ["Para un asalariado ordinario sujeto al tipo general de la GKV: salario mensual cotizable (máximo 5.812,50 € en 2026) × (14,6 % + cuota adicional de tu aseguradora) ÷ 2.", "Con 2.000 € de salario cotizable y la cuota adicional media del 2,9 %, tu parte es 175 €. Si tu aseguradora aplica el 3,5 %, serían 181 €. El seguro de dependencia se calcula por separado.", "Esta fórmula estándar no se aplica sin cambios a los midijobs, seguros de estudiante, seguros voluntarios o privados. Confirma tu categoría con la aseguradora."] } },
  en: { title: "German public health insurance cost 2026: employee contributions", description: "Calculate your 2026 GKV employee contribution using the 14.6% general rate, fund-specific additional rate, contribution ceiling and salary examples.", section: { heading: "Calculate your own health insurance contribution", paragraphs: ["For a standard employee subject to the general GKV rate: monthly contributory pay (capped at €5,812.50 in 2026) × (14.6% + your fund's additional rate) ÷ 2.", "With €2,000 contributory pay and the average additional rate of 2.9%, your employee share is €175. With a 3.5% additional rate it is €181. Long-term care insurance is separate.", "This standard calculation does not apply unchanged to Midijobs, student insurance, voluntary insurance or private health insurance. Confirm your classification with your fund."] } }
};
function apply(guide: Guide, e: Enhancement): Guide {
  return { ...guide, title: e.title, description: e.description, updated: "2026-11-24", sections: [...guide.sections, e.section], sources: e.source && !guide.sources.some(s => s.url === e.source?.url) ? [...guide.sources, e.source] : guide.sources };
}
export function enhanceGeneralGuide(guide: Guide, originalSlug: string, locale: Lang): Guide {
  return originalSlug === "internet-germany" ? apply(guide, internet[locale]) : originalSlug === "german-tax-id" ? apply(guide, tax[locale]) : guide;
}
export function enhanceExactGuide(guide: Guide, key: string, locale: string): Guide {
  return key === "health" && (locale === "en" || locale === "es" || locale === "de") ? apply(guide, health[locale]) : guide;
}
