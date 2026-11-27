import { euros } from "@/lib/budget-scenarios";
import { guideUrl, toolUrl, type SiteLocale } from "@/lib/locale-paths";
import { applicationLink as link, guideSources, type AuthoredGuide } from "./authored-guide";
import { deutschlandticket2027 } from "./deutschlandticket-2027";

const minimum = "https://www.bundesregierung.de/breg-de/suche/mindestlohn-faq-1688186";
const minijob = "https://www.minijob-zentrale.de/SharedDocs/Downloads/DE/Rundschreiben/Geringfuegigkeitsrichtlinien-2026.pdf?__blob=publicationFile";
const social = "https://www.bundesregierung.de/breg-de/aktuelles/beitragsbemessungsgrenzen-2027-2454638";
const gkv = "https://www.bundesgesundheitsministerium.de/presse/pressemitteilungen/zusatzbeitragssatz-gkv-2027-festgelegt";
const taxReform = "https://www.bundesregierung.de/breg-de/service/fragen-und-antworten/entlastungen-fuer-deutschland-2386028";
const transport = "https://www.bahn.de/faq/pk/angebot/regionale-angebote/deutschland-ticket";
const sources = guideSources([
  ["Bundesregierung · Mindestlohn", minimum],
  ["Minijob-Zentrale · Geringfügigkeits-Richtlinien", minijob],
  ["Bundesregierung · Rechengrößen der Sozialversicherung", social],
  ["Bundesgesundheitsministerium · Zusatzbeitragssatz", gkv],
  ["Deutsche Bahn · Deutschlandticket", transport],
  ["Bundesregierung · Entwurf Einkommensteuerreformgesetz 2027", taxReform],
]);

function changes(locale: SiteLocale, caption: string, name: string, labels: string[]) {
  const amounts = [[13.90, 14.60], [603, 633], [63, 66.80], [5812.50, 6375], [77400, 84150], [8450, 8850]];
  return { caption, columns: [name, "2026", "2027"], rows: labels.map((label, index) => [
    label, ...amounts[index].map((amount) => euros(locale, amount, index === 0 || !Number.isInteger(amount) ? 2 : 0)),
  ]) };
}

const ticketPath = (locale: SiteLocale) => guideUrl(locale, deutschlandticket2027.slugs[locale]);

export const january2027 = {
  slugs: { es: "cambios-alemania-enero-2027", en: "germany-changes-january-2027", de: "aenderungen-januar-2027-deutschland" },
  category: "money",
  updated: "2026-11-27",
  readingMinutes: 5,
  related: ["deutschlandticket-2027", "minijob-germany", "german-health-insurance", "child-benefits-germany"],
  copy: {
    es: {
      title: "Cambios en Alemania en enero de 2027: salario mínimo, Minijob y abono",
      description: "Desde el 1 de enero de 2027: salario mínimo de 14,60 €, Minijob hasta 633 € y Deutschlandticket de 66,80 €. Consulta cambios en cotizaciones y ejemplos.",
      eyebrow: "Cambios confirmados · Enero de 2027",
      summary: "El 1 de enero de 2027, el salario mínimo general en Alemania sube a 14,60 € brutos por hora, el límite del Minijob pasa a 633 € al mes y el Deutschlandticket estándar cuesta 66,80 €. También suben varios topes de la seguridad social.",
      takeaways: ["Si cobras por horas, revisa la tarifa y las horas que aparecen en tu primera nómina de 2027.", "Con un Minijob, compara tus ingresos brutos regulares con el nuevo límite de 633 €.", "Consulta con el operador de tu Deutschlandticket si debes aceptar la subida."],
      sections: [
        { heading: "Qué cambia el 1 de enero de 2027", paragraphs: ["Esta tabla recoge los cambios publicados por los organismos competentes y Deutsche Bahn. Los topes de cotización indican hasta qué salario se calculan las aportaciones. El umbral del seguro médico obligatorio cumple otra función: delimita cuándo puede cambiar la obligación de estar en el sistema público."], table: changes("es", "Importes en vigor en 2026 y desde enero de 2027", "Concepto", ["Salario mínimo bruto por hora", "Límite mensual del Minijob", "Deutschlandticket estándar al mes", "Tope mensual de cotización sanitaria", "Umbral anual de seguro médico obligatorio", "Tope mensual de cotización de pensiones"]) },
        { heading: "Qué significa cobrar 14,60 € la hora", paragraphs: ["Si trabajas 40 horas semanales al salario mínimo general, el equivalente mensual medio pasa de unos 2.409,33 € a 2.530,67 € brutos. Para calcularlo, multiplica la tarifa por 40 y por 52 y divide entre 12. La nómina real puede variar con las horas pagadas en cada mes y con los convenios sectoriales.", "Si vas a cobrar 620 € brutos al mes de forma regular, superarías el límite ordinario de Minijob de 2026, pero quedarías dentro del límite de 2027. Si cobras regularmente entre 633,01 € y 2.000 € al mes, comprueba si tu empleo entra en la franja habitual del Midijob."], resources: [link("Salario mínimo general y excepciones", minimum, "Preguntas frecuentes del Gobierno federal."), link("Compara un Minijob y un Midijob", toolUrl("es", "employment-types"), "Usa el comparador para entender el tipo de cotización.")] },
        { heading: "Cotizaciones y seguro médico en la nómina de enero", paragraphs: ["La base máxima mensual del seguro público pasa de 5.812,50 € a 6.375 €. Con 6.000 € brutos al mes, esa base sería de hasta 5.812,50 € en 2026 y llegaría a 6.000 € en 2027, si te corresponde cotizar en el sistema público. El Ministerio de Sanidad fijó en el 2,9 % la referencia media del recargo para 2027. Tu caja puede aplicar otra tasa."], resources: [link("Topes de la seguridad social de 2027", social, "Incluye la diferencia entre los dos límites de salud."), link("Recargo medio del seguro público", gkv, "Compara la referencia con el recargo de tu caja.")] },
        { heading: "¿Suben el Kindergeld y el mínimo exento en 2027?", paragraphs: ["A 27 de noviembre de 2026, el Gobierno federal propone subir el Kindergeld de 259 € a 267 € por hijo y mes, y el Grundfreibetrag de 12.348 € a 12.564 € anuales para una persona. El proyecto sigue en el Parlamento. Hasta que se apruebe, presupuesta con la cuantía vigente y revisa el texto definitivo antes de cambiar tus cálculos.", "Si se aprueba la propuesta, dos hijos pasarían de 518 € a 534 € al mes, 16 € más. Los 12.564 € del Grundfreibetrag propuesto se refieren a la renta imponible anual, que se calcula a partir de los ingresos y las deducciones aplicables."], resources: [link("Consultar el estado de la reforma fiscal", taxReform, "Resumen y estado del proyecto en el Gobierno federal.")] },
        { heading: "Qué hacer con el Deutschlandticket", paragraphs: ["El abono estándar sube 3,80 € al mes. Deutsche Bahn pide a sus abonados que acepten el cambio antes de que acabe el 30 de noviembre de 2026. Si compraste el abono a otro operador, sigue el aviso de tu emisor."], resources: [link("Cómo confirmar o reactivar tu Deutschlandticket", ticketPath("es"), "Pasos en DB Navigator y el portal de abonos.")] },
      ],
      faqs: [{ question: "¿Cuál es el límite del Minijob en 2027?", answer: "Desde enero, 633 € brutos al mes como límite regular, frente a 603 € en 2026." }, { question: "¿Cobraré exactamente 121,33 € más al mes si trabajo 40 horas semanales?", answer: "El aumento de 0,70 € por hora equivale a unos 121,33 € brutos mensuales como promedio de 52 semanas. El neto y el importe de un mes concreto dependen de la nómina y de las horas remuneradas." }],
      sources,
    },
    en: {
      title: "What Changes in Germany in January 2027? Pay, Minijobs and Travel",
      description: "Germany’s 2027 changes in one place: €14.60 minimum wage, €633 Minijob limit, €66.80 Deutschlandticket and new social-insurance thresholds.",
      eyebrow: "Confirmed changes · January 2027",
      summary: "On 1 January 2027, Germany’s general minimum wage rises to €14.60 gross an hour, the Minijob threshold rises to €633 a month and the standard Deutschlandticket costs €66.80. Several social-insurance thresholds also rise.",
      takeaways: ["If you are paid by the hour, check the rate and hours on your first 2027 payslip.", "If you have a Minijob, compare your regular gross pay with the new monthly limit of €633.", "Ask your Deutschlandticket provider whether you have to accept the new price."],
      sections: [
        { heading: "January 2027 changes at a glance", paragraphs: ["The table uses changes published by the responsible authorities and Deutsche Bahn. A contribution ceiling caps the earnings used to calculate contributions. The compulsory health-insurance threshold serves a different purpose: it is relevant to whether an employee can leave compulsory public coverage."], table: changes("en", "Rates in 2026 and from January 2027", "Measure", ["Minimum gross hourly wage", "Monthly Minijob threshold", "Standard monthly Deutschlandticket", "Monthly health contribution ceiling", "Annual compulsory health-insurance threshold", "Monthly pension contribution ceiling"]) },
        { heading: "What €14.60 an hour means for your payslip", paragraphs: ["At 40 hours per week on the general minimum wage, the average monthly equivalent rises from about €2,409.33 to €2,530.67 gross. Multiply the hourly rate by 40 and by 52, then divide by 12. The actual payslip depends on the hours paid that month and any sector-specific rates.", "Regular pay of €620 a month exceeds the ordinary 2026 Minijob limit but falls within the 2027 threshold. Regular monthly pay from €633.01 to €2,000 is in the usual Midijob range, subject to the rules for your job."], resources: [link("Federal minimum wage and exceptions", minimum, "Federal government FAQ."), link("Compare Minijob and Midijob contributions", toolUrl("en", "employment-types"), "Find out how the employment categories differ.")] },
        { heading: "Health and pension thresholds on your January payslip", paragraphs: ["The monthly statutory health contribution ceiling rises from €5,812.50 to €6,375. At €6,000 gross per month, someone paying statutory contributions could have a contribution base of up to €5,812.50 in 2026 and €6,000 in 2027. The Health Ministry set the 2027 average supplementary contribution reference at 2.9%. Your insurer can charge a different rate."], resources: [link("2027 social-insurance thresholds", social, "Check the two different health-insurance thresholds."), link("Average health-insurance supplementary contribution", gkv, "Compare it with your insurer’s rate.")] },
        { heading: "Will Kindergeld and the basic tax allowance rise in 2027?", paragraphs: ["As of 27 November 2026, the federal government proposes raising monthly Kindergeld from €259 to €267 per child and the annual basic personal allowance (Grundfreibetrag) from €12,348 to €12,564 for a single assessment. The bill is still before Parliament. Use the current amounts for planning and check the final legislation before changing your calculations.", "If the proposal passes, a family with two eligible children would go from €518 to €534 per month, an increase of €16. The proposed €12,564 allowance applies to annual taxable income after applicable deductions."], resources: [link("Check the status of the proposed tax reform", taxReform, "Federal government summary and parliamentary status.")] },
        { heading: "Do you need to confirm the new Deutschlandticket price?", paragraphs: ["A standard subscription costs €3.80 more per month. Deutsche Bahn asks its subscribers to accept the change by the end of 30 November 2026. If another operator sold you the ticket, follow the instructions from that provider."], resources: [link("Confirm or reactivate your Deutschlandticket", ticketPath("en"), "Steps for DB Navigator and the subscription portal.")] },
      ],
      faqs: [{ question: "What is the 2027 Minijob income limit?", answer: "Regular gross pay can be up to €633 per month from January, up from €603 in 2026." }, { question: "Will I get exactly €121.33 more per month for a 40-hour week?", answer: "The €0.70 hourly increase averages about €121.33 more gross per month over 52 weeks. Actual monthly take-home pay depends on deductions and paid hours." }],
      sources,
    },
    de: {
      title: "Änderungen im Januar 2027: Mindestlohn, Minijob und Deutschlandticket",
      description: "Was ändert sich zum 1. Januar 2027? 14,60 € Mindestlohn, 633 € Minijob-Grenze, 66,80 € fürs Deutschlandticket und höhere Beitragsgrenzen.",
      eyebrow: "Bestätigte Änderungen · Januar 2027",
      summary: "Zum 1. Januar 2027 steigt der gesetzliche Mindestlohn auf 14,60 € brutto pro Stunde, die Minijob-Grenze auf 633 € im Monat und der Preis für das reguläre Deutschlandticket auf 66,80 €. Auch mehrere Grenzwerte in der Sozialversicherung steigen.",
      takeaways: ["Bei Stundenlohn lohnt ein Blick auf Stundensatz und vergütete Stunden auf der ersten Abrechnung 2027.", "Im Minijob vergleichst du deinen regelmäßigen Bruttoverdienst mit der neuen Grenze von 633 €.", "Prüfe beim Aussteller deines Deutschlandtickets, ob du der Preisänderung zustimmen musst."],
      sections: [
        { heading: "Was ändert sich zum 1. Januar 2027?", paragraphs: ["Die Tabelle beruht auf den Angaben der zuständigen Stellen und der Deutschen Bahn. Die Beitragsbemessungsgrenze deckelt den Arbeitslohn, auf den Beiträge berechnet werden. Ob Beschäftigte gesetzlich pflichtversichert bleiben, hängt dagegen von der Versicherungspflichtgrenze und den übrigen Voraussetzungen ab."], table: changes("de", "Beträge 2026 und ab Januar 2027", "Bereich", ["Bruttomindestlohn pro Stunde", "Minijob-Grenze im Monat", "Reguläres Deutschlandticket im Monat", "Beitragsbemessungsgrenze Krankenversicherung im Monat", "Versicherungspflichtgrenze im Jahr", "Beitragsbemessungsgrenze Rentenversicherung im Monat"]) },
        { heading: "Was 14,60 € Mindestlohn bei 40 Stunden bedeuten", paragraphs: ["Wer 40 Stunden pro Woche zum allgemeinen Mindestlohn arbeitet, kommt rechnerisch auf rund 2.530,67 € brutto im Monatsdurchschnitt statt 2.409,33 €. Rechnung: Stundenlohn mal 40 mal 52 geteilt durch zwölf. Monatliche Abrechnungen können je nach vergüteten Stunden und Branchenmindestlohn abweichen.", "620 € regelmäßiger Monatsverdienst liegen über der Minijob-Grenze 2026, aber innerhalb der Grenze 2027. Zwischen 633,01 € und 2.000 € regelmäßiger Monatsvergütung liegt grundsätzlich der Übergangsbereich für Midijobs."], resources: [link("Mindestlohn und Ausnahmen", minimum, "Fragen und Antworten der Bundesregierung."), link("Minijob und Midijob vergleichen", toolUrl("de", "employment-types"), "Unterschiede bei Beschäftigungsarten und Abgaben.")] },
        { heading: "Neue Beitragsgrenzen ab Januar 2027", paragraphs: ["Die Beitragsbemessungsgrenze der gesetzlichen Krankenversicherung steigt von 5.812,50 € auf 6.375 € monatlich. Bei 6.000 € brutto liegt die Beitragsbasis für gesetzlich Versicherte damit beispielhaft bei bis zu 5.812,50 € im Jahr 2026 und 6.000 € im Jahr 2027. Das Gesundheitsministerium hat den durchschnittlichen Zusatzbeitragssatz 2027 auf 2,9 % festgelegt. Der Satz deiner Kasse kann davon abweichen."], resources: [link("Rechengrößen der Sozialversicherung 2027", social, "Beitragsbemessungs- und Versicherungspflichtgrenze im Überblick."), link("Durchschnittlicher Zusatzbeitragssatz", gkv, "Vergleiche den Wert mit dem Satz deiner Krankenkasse.")] },
        { heading: "Steigen Kindergeld und Grundfreibetrag 2027?", paragraphs: ["Stand 27. November 2026 plant die Bundesregierung, das monatliche Kindergeld von 259 € auf 267 € je Kind und den Grundfreibetrag bei Einzelveranlagung von 12.348 € auf 12.564 € im Jahr anzuheben. Der Entwurf ist noch im parlamentarischen Verfahren. Plane zunächst mit den geltenden Werten und prüfe vor einer neuen Berechnung die endgültige Fassung.", "Bei zwei anspruchsberechtigten Kindern ergäbe der Entwurf 534 € statt 518 € im Monat, also 16 € mehr. Der geplante Grundfreibetrag von 12.564 € bezieht sich auf das zu versteuernde Jahreseinkommen."], resources: [link("Stand der Einkommensteuerreform prüfen", taxReform, "Überblick der Bundesregierung zum Entwurf und zum Verfahren.")] },
        { heading: "Deutschlandticket: Wem muss ich zustimmen?", paragraphs: ["Das reguläre Ticket wird 3,80 € im Monat teurer. Bei einem Abo der Deutschen Bahn musst du laut DB bis zum Ende des 30. November 2026 zustimmen. Bei einem anderen Anbieter gelten dessen Hinweise."], resources: [link("Deutschlandticket bestätigen oder reaktivieren", ticketPath("de"), "Schritte für DB Navigator und Aboportal.")] },
      ],
      faqs: [{ question: "Wie hoch ist die Minijob-Grenze 2027?", answer: "Ab Januar liegt die Grenze für den regelmäßigen Monatsverdienst bei 633 € brutto. 2026 liegt sie bei 603 €." }, { question: "Kommen bei einer 40-Stunden-Woche genau 121,33 € mehr aufs Konto?", answer: "70 Cent mehr pro Stunde ergeben über 52 Wochen rechnerisch etwa 121,33 € brutto zusätzlich im Monatsdurchschnitt. Das Nettogehalt hängt von den Abzügen und vergüteten Stunden ab." }],
      sources,
    },
  },
} satisfies AuthoredGuide;
