import { applicationLink as link, guideSources, type AuthoredGuide } from "./authored-guide";

const mannheim = "https://www.mannheim.de/de/nachrichten/drei-weihnachtsmaerkte-in-der-mannheimer-innenstadt-2026";
const heidelberg = "https://www.heidelberg-marketing.de/veranstaltungen/heidelberger-weihnachtsmarkt";
const rink = "https://www.heidelberg-marketing.de/veranstaltungen/heidelberger-eisbahn";
const frankfurt = "https://www.visitfrankfurt.travel/en/experience/festival-and-events/frankfurt-christmas-market";
const trains = "https://www.bahn.de/";
const coveredTrains = "https://www.bahn.de/faq/deutschlandticket-verkehrsmittel-deutschland";

export const christmasMarkets = {
  slugs: {
    es: "mercadillos-navidad-mannheim-heidelberg-francfort-2026",
    en: "christmas-markets-mannheim-heidelberg-frankfurt-2026",
    de: "weihnachtsmaerkte-mannheim-heidelberg-frankfurt-2026",
  },
  category: "daily-life",
  updated: "2026-11-25",
  readingMinutes: 5,
  related: ["deutschlandticket-2027", "deutschlandticket", "best-cities-germany"],
  copy: {
    es: {
      title: "Mercadillos de Navidad 2026 en Mannheim, Heidelberg y Fráncfort",
      description: "Fechas y horarios oficiales de los tres mercadillos, ruta en tren para un fin de semana y qué sigue abierto en Heidelberg después del 22 de diciembre.",
      eyebrow: "Navidad en Alemania · Rutas en tren",
      summary: "Los mercados principales de Mannheim, Heidelberg y Fráncfort abrieron el 23 de noviembre de 2026. Mannheim cierra el 23 de diciembre, Heidelberg y Fráncfort el 22. En Heidelberg quedan opciones después de Navidad: el Winterwäldchen hasta el 1 de enero y la pista de hielo hasta el 6 de enero, con horarios especiales.",
      takeaways: ["Mannheim: tres mercados céntricos del 23 de noviembre al 23 de diciembre, de 11:00 a 21:00.", "Heidelberg: del 23 de noviembre al 22 de diciembre, de 11:00 a 21:00. Los sábados, hasta las 22:00.", "Fráncfort: del 23 de noviembre al 22 de diciembre. De lunes a sábado, 10:00–21:00. Domingos, 11:00–21:00."],
      sections: [
        { heading: "Mannheim · Wasserturm, Kapuzinerplanken y Paradeplatz", paragraphs: ["Empieza junto al Wasserturm, en Friedrichsplatz, para ver la pirámide y el carrusel. Sigue hacia Kapuzinerplanken si buscas artesanía y termina en el Märchenwald de Paradeplatz si vas con niños.", "Si sales de trabajar a las 18:00, los tres recintos siguen abiertos hasta las 21:00. Con poco tiempo, el Wasserturm es la parada más práctica para empezar desde Mannheim Hbf."], resources: [link("Programa de los tres mercados de Mannheim", mannheim, "Ubicaciones, horarios y actividades por recinto.")] },
        { heading: "Heidelberg · Qué abre después del 22 de diciembre", paragraphs: ["Recorre el casco antiguo desde Bismarckplatz por Universitätsplatz y Marktplatz hasta Kornmarkt y Karlsplatz. Si vas en tren, comprueba qué conexión te deja mejor en Bismarckplatz o en Heidelberg-Altstadt según dónde quieras empezar.", "El Winterwäldchen de Kornmarkt se prolonga hasta el 1 de enero de 2027. La pista del Karlsplatz abre hasta el 6 de enero. Cierra el día 24 y el 25 y 26 abre de 12:00 a 22:00. La entrada a una sesión cuesta 7 € para adultos y 5 € para niños. Consulta el alquiler de patines por separado."], resources: [link("Horario del mercadillo de Heidelberg", heidelberg, "Plazas del casco antiguo y fechas ampliadas."), link("Pista de hielo de Karlsplatz", rink, "Consulta sesiones, precios y horarios festivos.")] },
        { heading: "Fráncfort · Ruta a pie de Hauptwache al Mainkai", paragraphs: ["Desde Hauptwache, baja por Paulsplatz y Römerberg hasta el río. El mercado infantil está en el Mainkai. Si buscas el mercado rosa, desvíate hacia Friedrich-Stoltze-Platz.", "Para una visita corta, combina Römerberg y Mainkai. Si vas desde fuera, introduce Frankfurt (Main) Hbf y elige después la conexión a Hauptwache o al casco antiguo. La estación central de Fráncfort y la del aeropuerto son distintas."], resources: [link("Mercadillo de Fráncfort · Turismo oficial", frankfurt, "Mapa, horarios y cómo llegar.")] },
        { heading: "Cómo visitar dos mercadillos en un día con el Deutschlandticket", paragraphs: ["Un plan fácil desde Mannheim es visitar Heidelberg por la tarde y volver al Wasserturm antes de las 21:00. Si haces la ruta en sábado y quieres quedarte hasta las 22:00, deja Heidelberg para el final y comprueba antes el tren de regreso.", "En DB Navigator, selecciona transporte local para buscar S-Bahn, RB o RE. El Deutschlandticket cubre los servicios regionales participantes. Si el planificador te ofrece ICE, IC o EC, comprueba las excepciones publicadas o compra otro billete. Busca siempre la ida y la vuelta para tu fecha exacta."], resources: [link("Consulta la ida y la vuelta en Deutsche Bahn", trains, "Activa el filtro de transporte local si viajas con Deutschlandticket.")] },
      ],
      faqs: [
        { question: "¿Qué mercadillo puedo visitar el 23 de diciembre de 2026?", answer: "Los tres recintos principales de Mannheim siguen abiertos el 23 de diciembre, de 11:00 a 21:00. Los mercados principales de Heidelberg y Fráncfort terminan el día 22." },
        { question: "¿Hay mercado de Navidad en Heidelberg el 25 de diciembre?", answer: "El mercado principal ya ha cerrado. Consulta el horario festivo del Winterwäldchen. La pista del Karlsplatz tiene confirmado el horario de 12:00 a 22:00 para el 25 y 26." },
        { question: "¿Qué ciudad elegir si solo tengo una tarde?", answer: "Mannheim permite recorrer tres recintos céntricos. Elige Heidelberg para combinar el casco antiguo y el patinaje, o Fráncfort si prefieres una ruta continua entre Römerberg y el río." },
      ],
      sources: guideSources([["Ayuntamiento de Mannheim", mannheim], ["Heidelberg Marketing · mercado", heidelberg], ["Heidelberg Marketing · pista de hielo", rink], ["Turismo de Fráncfort", frankfurt], ["Deutsche Bahn · trenes cubiertos", coveredTrains]]),
    },
    en: {
      title: "Christmas markets 2026: Mannheim, Heidelberg and Frankfurt",
      description: "Official Christmas market dates and opening hours for Mannheim, Heidelberg and Frankfurt, a regional train itinerary and what stays open after Christmas.",
      eyebrow: "Christmas in Germany · Regional rail",
      summary: "Mannheim, Heidelberg and Frankfurt opened their main Christmas markets on 23 November 2026. Mannheim runs through 23 December. Heidelberg and Frankfurt finish on 22 December. Heidelberg’s Winterwäldchen runs until 1 January and its ice rink until 6 January, with holiday hours.",
      takeaways: ["Mannheim: three city-centre markets, 23 November–23 December, 11am–9pm daily.", "Heidelberg: 23 November–22 December. Sunday to Friday 11am–9pm, Saturday until 10pm.", "Frankfurt: 23 November–22 December. Monday to Saturday 10am–9pm, Sunday 11am–9pm."],
      sections: [
        { heading: "Mannheim Christmas market dates and locations", paragraphs: ["Start at the Water Tower (Wasserturm) on Friedrichsplatz for the Christmas pyramid and carousel. Head to Kapuzinerplanken to see the craft stalls, then on to the Märchenwald on Paradeplatz if you are visiting with children.", "All three sites close at 9pm. If you only have time for one after arriving at Mannheim central station, head to the Water Tower first."], resources: [link("Mannheim’s three Christmas markets", mannheim, "The city’s programme and opening times.")] },
        { heading: "Heidelberg at Christmas and after 22 December", paragraphs: ["Walk from Bismarckplatz through Universitätsplatz and Marktplatz to Kornmarkt and Karlsplatz. If arriving by train, check whether a connection to Bismarckplatz or Heidelberg-Altstadt is better for your starting point.", "The Winterwäldchen at Kornmarkt runs until 1 January 2027. The Karlsplatz ice rink runs until 6 January and closes on 24 December. On 25 and 26 December it opens from noon to 10pm. Admission per session is €7 for adults and €5 for children. Check skate hire separately."], resources: [link("Heidelberg Christmas market", heidelberg, "Dates for each venue in the old town."), link("Karlsplatz ice rink", rink, "Session times, ticket prices and holiday changes.")] },
        { heading: "Frankfurt Christmas market from Hauptwache to the river", paragraphs: ["Walk from Hauptwache via Paulsplatz and Römerberg to Mainkai. The children’s market is by the river, and Rosa Weihnacht is on Friedrich-Stoltze-Platz.", "If time is short, choose Römerberg and the riverside. From outside the city, plan to Frankfurt (Main) Hbf and check your onward connection to Hauptwache or the old town. Frankfurt Airport has separate stations."], resources: [link("Visit Frankfurt’s Christmas market guide", frankfurt, "Official hours, arrival information and programme.")] },
        { heading: "Mannheim and Heidelberg on the same day by regional train", paragraphs: ["From Mannheim, visit Heidelberg in the afternoon and return to the Water Tower before 9pm. On Saturday you can reverse the order to use Heidelberg’s extra hour, as long as you have checked the train back.", "Use the local-transport filter in DB Navigator for S-Bahn, RB or RE services. The Deutschlandticket covers participating local and regional trains. Treat ICE, IC and EC as separate-ticket services unless your specific connection shows an exception. Look up both journeys for the day you travel."], resources: [link("Search your outbound and return trains", trains, "Choose local transport if using the Deutschlandticket.")] },
      ],
      faqs: [
        { question: "Which Christmas market is open on 23 December 2026?", answer: "Mannheim’s three main markets are open on 23 December from 11am to 9pm. Heidelberg and Frankfurt’s main markets end on 22 December." },
        { question: "Is Heidelberg Christmas market open on Christmas Day?", answer: "The main market has closed by Christmas Day. Check the Winterwäldchen’s holiday hours. The Karlsplatz rink is scheduled to open from noon to 10pm on both 25 and 26 December." },
        { question: "Which city is best if I only have one evening?", answer: "Pick Mannheim for three venues within the centre, Heidelberg for the old town and skating, or Frankfurt for a single walk from the main square down to the river." },
      ],
      sources: guideSources([["City of Mannheim", mannheim], ["Heidelberg Marketing · market", heidelberg], ["Heidelberg Marketing · ice rink", rink], ["Visit Frankfurt", frankfurt], ["Deutsche Bahn · covered services", coveredTrains]]),
    },
    de: {
      title: "Weihnachtsmärkte 2026: Mannheim, Heidelberg und Frankfurt",
      description: "Öffnungszeiten und Termine für Mannheim, Heidelberg und Frankfurt. Mit Anreise per Bahn und den Heidelberger Angeboten nach Weihnachten.",
      eyebrow: "Advent · Unterwegs mit der Bahn",
      summary: "Die großen Weihnachtsmärkte in Mannheim, Heidelberg und Frankfurt haben am 23. November 2026 eröffnet. Mannheim hat bis 23. Dezember geöffnet, Heidelberg und Frankfurt bis 22. Dezember. In Heidelberg laufen das Winterwäldchen bis 1. Januar und die Eisbahn bis 6. Januar weiter, mit Sonderzeiten an den Feiertagen.",
      takeaways: ["Mannheim: drei Märkte vom 23. November bis 23. Dezember, täglich 11–21 Uhr.", "Heidelberg: 23. November bis 22. Dezember, Sonntag bis Freitag 11–21 Uhr, Samstag bis 22 Uhr.", "Frankfurt: 23. November bis 22. Dezember, Montag bis Samstag 10–21 Uhr, Sonntag 11–21 Uhr."],
      sections: [
        { heading: "Mannheim: Wasserturm, Kapuzinerplanken und Paradeplatz", paragraphs: ["Am Wasserturm auf dem Friedrichsplatz beginnt der Rundgang mit Weihnachtspyramide und Karussell. Auf den Kapuzinerplanken liegt der Schwerpunkt auf Kunsthandwerk. Für Kinder lohnt sich der Märchenwald auf dem Paradeplatz.", "Alle drei Märkte schließen um 21 Uhr. Wer nach Feierabend am Hauptbahnhof ankommt und wenig Zeit hat, kann am Wasserturm beginnen."], resources: [link("Programm der drei Mannheimer Weihnachtsmärkte", mannheim, "Termine, Standorte und Angebot der einzelnen Märkte.")] },
        { heading: "Heidelberg: Winterwäldchen und Eisbahn nach dem 22. Dezember", paragraphs: ["Die Altstadtroute führt vom Bismarckplatz über Universitätsplatz und Marktplatz zum Kornmarkt und Karlsplatz. Wer mit dem Zug anreist, kann je nach Startpunkt die Weiterfahrt zum Bismarckplatz oder nach Heidelberg-Altstadt prüfen.", "Das Winterwäldchen auf dem Kornmarkt läuft bis 1. Januar 2027. Die Eisbahn am Karlsplatz bleibt bis 6. Januar. Am 24. Dezember ist sie geschlossen, am 25. und 26. Dezember von 12 bis 22 Uhr geöffnet. Eine Laufzeit kostet 7 € für Erwachsene und 5 € für Kinder. Prüfen Sie die Leihgebühr separat."], resources: [link("Heidelberger Weihnachtsmarkt", heidelberg, "Altstadtplätze und verlängerte Laufzeiten."), link("Eisbahn auf dem Karlsplatz", rink, "Laufzeiten, Eintritt und Feiertagszeiten.")] },
        { heading: "Frankfurt: von der Hauptwache zum Römerberg und Mainkai", paragraphs: ["Gehen Sie von der Hauptwache über den Paulsplatz und Römerberg zum Mainkai. Am Fluss liegt der Kinder-Weihnachtsmarkt. Die Rosa Weihnacht finden Sie auf dem Friedrich-Stoltze-Platz.", "Für einen kurzen Besuch reichen Römerberg und Mainufer. Bei der Anreise per Bahn wählen Sie Frankfurt (Main) Hbf und prüfen die Weiterfahrt zur Hauptwache oder in die Altstadt. Der Flughafen hat eigene Bahnhöfe."], resources: [link("Frankfurter Weihnachtsmarkt bei Visit Frankfurt", frankfurt, "Offizielle Termine, Programm und Anreise.")] },
        { heading: "Mannheim und Heidelberg an einem Tag mit dem Deutschlandticket", paragraphs: ["Wer in Mannheim startet, kann nachmittags nach Heidelberg fahren und vor 21 Uhr am Wasserturm zurück sein. Samstags lohnt sich die umgekehrte Reihenfolge, wenn Sie Heidelbergs längere Öffnungszeit nutzen wollen und die Rückfahrt passt.", "Filtern Sie im DB Navigator nach Nahverkehr, wenn Sie mit dem Deutschlandticket fahren. Das Ticket gilt im teilnehmenden Nahverkehr, etwa in S-Bahn, RB oder RE. Für ICE, IC und EC brauchen Sie in der Regel eine separate Fahrkarte. Prüfen Sie Hin- und Rückfahrt für Ihren konkreten Besuchstag."], resources: [link("Hin- und Rückfahrt bei der Deutschen Bahn suchen", trains, "Passende Nahverkehrsverbindungen für den Besuchstag.")] },
      ],
      faqs: [
        { question: "Welcher Weihnachtsmarkt ist am 23. Dezember 2026 noch offen?", answer: "Die drei Mannheimer Weihnachtsmärkte haben am 23. Dezember von 11 bis 21 Uhr geöffnet. Die Hauptmärkte in Heidelberg und Frankfurt enden am 22. Dezember." },
        { question: "Was hat in Heidelberg am ersten Weihnachtsfeiertag geöffnet?", answer: "Der Hauptmarkt ist dann beendet. Prüfen Sie die Feiertagszeiten des Winterwäldchens. Die Eisbahn am Karlsplatz ist am 25. und 26. Dezember von 12 bis 22 Uhr geöffnet." },
        { question: "Welche Stadt eignet sich für einen kurzen Besuch?", answer: "Mannheim bietet drei zentrale Märkte. Heidelberg eignet sich für Altstadt und Schlittschuhlaufen, Frankfurt für einen zusammenhängenden Spaziergang bis ans Mainufer." },
      ],
      sources: guideSources([["Stadt Mannheim", mannheim], ["Heidelberg Marketing · Weihnachtsmarkt", heidelberg], ["Heidelberg Marketing · Eisbahn", rink], ["Visit Frankfurt", frankfurt], ["Deutsche Bahn · Geltungsbereich", coveredTrains]]),
    },
  },
} satisfies AuthoredGuide;
