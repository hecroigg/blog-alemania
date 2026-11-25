import { applicationLink as link, guideSources, type AuthoredGuide } from "./authored-guide";

const db = "https://www.bahn.de/faq/pk/angebot/regionale-angebote/deutschland-ticket";
const englishDb = "https://int.bahn.de/en/faq/deutschlandticket-what-to-do";
const portal = "https://abo.bahn.de/";
const reactivate = "https://www.bahn.de/faq/kuendigung";
const student = "https://www.bahn.de/faq/deutschlandsemesterticket";
const trains = "https://www.bahn.de/faq/deutschlandticket-verkehrsmittel-deutschland";

export const deutschlandticket2027 = {
  slugs: { es: "deutschlandticket-2027-precio-confirmar-abono", en: "deutschlandticket-2027", de: "deutschlandticket-2027-preis-zustimmen" },
  category: "transport",
  updated: "2026-11-25",
  readingMinutes: 4,
  related: ["deutschlandticket", "christmas-markets-mannheim-heidelberg-frankfurt-2026", "cost-of-living-germany"],
  copy: {
    es: {
      title: "Deutschlandticket 2027: precio de 66,80 € y cómo confirmar en DB",
      description: "El Deutschlandticket sube a 66,80 € en enero de 2027. Cómo aceptar en DB Navigator, qué pasa si se te pasa el 30 de noviembre y si afecta al abono estudiante.",
      eyebrow: "Transporte en Alemania · Enero de 2027",
      summary: "El Deutschlandticket estándar cuesta 63 € al mes hasta diciembre de 2026 y 66,80 € a partir del 1 de enero de 2027. Si tienes un abono de Deutsche Bahn, la compañía pide que confirmes las nuevas condiciones antes de que termine el 30 de noviembre de 2026. Si lo compraste a otro operador, consulta su aviso.",
      takeaways: ["Sube 3,80 € al mes: doce meses al nuevo precio suman 801,60 €, frente a 756 € a la tarifa anterior.", "Para un abono vendido por DB, confirma en tu billete del móvil o en el Aboportal. Debe hacerlo el titular del contrato.", "Si DB inicia la baja, puedes reactivarlo mientras siga disponible la opción hasta el 31 de diciembre de 2026."],
      sections: [
        { heading: "Cómo aceptar la subida en DB Navigator o en el Aboportal", paragraphs: ["Entra con la cuenta de la persona que contrató el abono. Abre tu Deutschlandticket en DB Navigator o selecciónalo en el Aboportal. Busca «Vertragsänderung zustimmen», revisa el importe y las condiciones y confirma. Comprueba que el abono figure como válido para enero antes de viajar.", "Si otra persona lo compró para ti, pídele que confirme desde su cuenta. Si tu abono procede de una asociación de transporte, del operador local o de tu empresa, usa el canal que indique ese emisor."], resources: [link("Gestionar el abono en Deutsche Bahn", portal, "Portal oficial de abonos de DB."), link("Pasos y fecha de confirmación de Deutsche Bahn", db, "Preguntas frecuentes sobre el nuevo precio.")] },
        { heading: "Qué pasa si no confirmas antes del 30 de noviembre", paragraphs: ["DB indica que, si no recibe respuesta a tiempo o rechazas las nuevas condiciones, el abono termina el 31 de diciembre de 2026. Durante el proceso de baja, busca «Abo reaktivieren» en el Aboportal o en DB Navigator. DB permite reactivarlo hasta la fecha de baja registrada, el 31 de diciembre.", "Si ya terminó el abono, contrata uno nuevo para enero y verifica que el billete esté activo antes de subir al tren."], resources: [link("Cómo reactivar el Deutschlandticket", reactivate, "Qué hacer antes y después del 31 de diciembre.")] },
        { heading: "Semesterticket, Jobticket y trenes incluidos", paragraphs: ["Según DB, el encarecimiento de enero todavía no afecta al Deutschlandsemesterticket del invierno 2026/27 ni al del verano 2027. El nuevo precio entra en el cálculo para semestres que comiencen a partir del 1 de junio de 2027. Comprueba la cuota con tu universidad.", "Si tienes un Jobticket, consulta a tu empresa cuánto pagas tú tras su aportación. El abono general sigue siendo para autobús, metro, tranvía y trenes regionales participantes. ICE, IC y EC suelen requerir billete aparte."], resources: [link("Reglas del Deutschlandsemesterticket", student, "Fechas de aplicación para estudiantes."), link("Trenes admitidos por el Deutschlandticket", trains, "Comprueba el tipo de servicio antes de viajar.")] },
      ],
      faqs: [
        { question: "¿Cuál es la diferencia al pagar el abono durante doce meses?", answer: "Si comparas doce cuotas de cada tarifa, el coste pasa de 756 € a 801,60 €. Son 45,60 € más." },
        { question: "¿Puedo confirmar desde el móvil si otra persona compró mi billete?", answer: "Según DB, debe confirmar la persona que contrató el abono, incluso si tú eres quien utiliza el billete." },
        { question: "¿El 30 de noviembre también es la fecha para otros operadores?", answer: "Es la fecha que publica Deutsche Bahn para su gestión. Revisa el aviso, la app o el portal del operador que te vende el billete." },
      ],
      sources: guideSources([["Deutsche Bahn · precio, condiciones y confirmación", db], ["DB · reactivación del abono", reactivate], ["DB · Deutschlandsemesterticket", student], ["DB · trenes incluidos", trains]]),
    },
    en: {
      title: "Deutschlandticket 2027: €66.80 price and how to confirm with DB",
      description: "The Germany ticket rises to €66.80 in January 2027. See how to confirm with DB, what to do after 30 November and when student tickets change.",
      eyebrow: "Transport in Germany · January 2027",
      summary: "Germany’s standard Deutschlandticket costs €63 per month until the end of December 2026 and €66.80 from 1 January 2027. Deutsche Bahn asks existing customers to accept the new terms by 30 November 2026. If you bought through another operator, follow that provider’s instructions.",
      takeaways: ["The increase is €3.80 a month, or €45.60 over 12 months at the new rate.", "For a DB subscription, the person who ordered it can accept in the app or the DB subscription portal.", "If DB starts cancellation, look for the reactivation option while the subscription remains in its cancellation period, through 31 December."],
      sections: [
        { heading: "How to accept the new terms in DB Navigator", paragraphs: ["Log in as the person who ordered the subscription. Open your Deutschlandticket in DB Navigator or select it in the Aboportal. Look for «Vertragsänderung zustimmen», meaning accept the contract change. Check the price and terms and confirm. Make sure your ticket is valid for January before travelling.", "If someone else bought the ticket for you, they need to agree. For a ticket sold by a local operator, transport association or employer scheme, use the instructions from that issuer."], resources: [link("Manage your DB subscription", portal, "Deutsche Bahn’s official subscription portal."), link("Deutsche Bahn’s instructions in English", englishDb, "What to do if you want to keep or cancel the ticket.")] },
        { heading: "Missed the 30 November deadline? How to reactivate", paragraphs: ["DB says it will end an existing subscription on 31 December 2026 if you decline or fail to respond by its published deadline. While cancellation is pending, look for «Abo reaktivieren» in the portal or DB Navigator. It is available up to the recorded cancellation date of 31 December.", "If the subscription has already ended, buy a new ticket for January and confirm it is active before boarding."], resources: [link("DB’s subscription reactivation instructions", reactivate, "Steps before and after 31 December.")] },
        { heading: "What happens to the semester ticket and Jobticket?", paragraphs: ["DB says the January increase does not yet affect the winter 2026/27 and summer 2027 Deutschlandsemestertickets. The new price applies to semesters starting from 1 June 2027. Check the amount with your university.", "If you use a Jobticket, ask your employer how much is left after its contribution. The standard subscription still covers participating local and regional services. ICE, IC and EC normally need a separate ticket."], resources: [link("Deutschlandsemesterticket rules", student, "When the revised price reaches university subscriptions."), link("Which trains are covered?", trains, "Check your service type before travelling.")] },
      ],
      faqs: [
        { question: "How much more does the 2027 Deutschlandticket cost over 12 months?", answer: "Twelve payments at €66.80 total €801.60, compared with €756 at €63 a month. The difference is €45.60." },
        { question: "Can I accept if someone else ordered the ticket for me?", answer: "DB says the contracting customer must accept, even when a different person uses the ticket." },
        { question: "Is 30 November the deadline for every issuer?", answer: "That is DB’s published deadline. Read the message from the operator or transport authority that sold you the subscription." },
      ],
      sources: guideSources([["Deutsche Bahn · price and consent", db], ["Deutsche Bahn · English FAQ", englishDb], ["DB · reactivation", reactivate], ["DB · semester ticket", student], ["DB · valid services", trains]]),
    },
    de: {
      title: "Deutschlandticket 2027: 66,80 € und bei der DB zustimmen",
      description: "Ab Januar 2027 kostet das Deutschlandticket 66,80 €. So stimmen Sie bei der DB zu, reaktivieren das Abo und prüfen Ihr Semesterticket.",
      eyebrow: "Nahverkehr · Ab Januar 2027",
      summary: "Das reguläre Deutschlandticket kostet bis Ende Dezember 2026 monatlich 63 € und ab 1. Januar 2027 monatlich 66,80 €. Die Deutsche Bahn bittet Abonnenten bis 30. November 2026 um Zustimmung zu den neuen Bedingungen. Bei anderen Anbietern zählt die Mitteilung des jeweiligen Verkäufers.",
      takeaways: ["3,80 € mehr im Monat ergeben 45,60 € Mehrkosten bei zwölf Monatsraten.", "Bei der DB stimmt die bestellende Person im Handy-Ticket oder im Aboportal zu.", "Hat die DB die Kündigung eingeleitet, lässt sich das Abo bis zum eingetragenen Kündigungsdatum am 31. Dezember reaktivieren."],
      sections: [
        { heading: "Vertragsänderung im DB Navigator oder Aboportal bestätigen", paragraphs: ["Melden Sie sich mit dem Konto an, mit dem das Abo bestellt wurde. Öffnen Sie das Deutschlandticket im DB Navigator oder im Aboportal. Wählen Sie «Vertragsänderung zustimmen», prüfen Sie Preis und Bedingungen und bestätigen Sie. Kontrollieren Sie vor der ersten Fahrt im Januar, ob Ihr Ticket gültig ist.", "Hat jemand anderes das Ticket für Sie gekauft, muss diese Person zustimmen. Bei einem Verkehrsverbund, einem lokalen Anbieter oder einem Jobticket gelten die Hinweise des Vertragspartners."], resources: [link("Deutschlandticket im DB-Aboportal verwalten", portal, "Offizielle Abo-Verwaltung der Deutschen Bahn."), link("DB-FAQ zur Preisänderung", db, "Frist und Schritte für die Zustimmung.")] },
        { heading: "Frist am 30. November verpasst: Abo reaktivieren", paragraphs: ["Bei Ablehnung oder ausbleibender Antwort kündigt die DB das Abo laut FAQ zum 31. Dezember 2026. Solange die Kündigung eingeleitet ist, wählen Sie im DB Navigator oder im Aboportal «Abo reaktivieren». Das funktioniert bis zum eingetragenen Kündigungsdatum am 31. Dezember.", "Nach dem Ende des Abos können Sie ein neues Ticket für Januar kaufen. Prüfen Sie vor dem Einsteigen, ob das neue Ticket aktiv ist."], resources: [link("Abo bei der DB reaktivieren", reactivate, "Optionen vor und nach dem 31. Dezember.")] },
        { heading: "Semesterticket, Jobticket und Geltungsbereich", paragraphs: ["Laut DB wirkt sich die Preiserhöhung im Januar noch nicht auf das Deutschlandsemesterticket im Wintersemester 2026/27 und im Sommersemester 2027 aus. Die Änderung greift für Semester mit Beginn ab 1. Juni 2027. Die Hochschule teilt Ihnen den konkreten Beitrag mit.", "Beim Jobticket prüfen Sie den Eigenanteil nach dem Arbeitgeberzuschuss. Das reguläre Ticket gilt weiterhin im teilnehmenden Nahverkehr. Für ICE, IC und EC brauchen Sie in der Regel eine separate Fahrkarte."], resources: [link("Regeln zum Deutschlandsemesterticket", student, "Ab wann der Preis an Hochschulen angepasst wird."), link("Geltungsbereich des Deutschlandtickets", trains, "Welche Verkehrsmittel eingeschlossen sind.")] },
      ],
      faqs: [
        { question: "Wie viel mehr kosten zwölf Monate Deutschlandticket?", answer: "Zwölf Raten zu 66,80 € ergeben 801,60 €. Zwölf Raten zum alten Preis von 63 € ergeben 756 €. Die Differenz beträgt 45,60 €." },
        { question: "Wer stimmt zu, wenn jemand anderes mein Ticket bestellt hat?", answer: "Laut DB muss die Person zustimmen, die das Abonnement abgeschlossen hat." },
        { question: "Gilt der 30. November auch bei meinem Verkehrsverbund?", answer: "Die Frist wird von der Deutschen Bahn für ihre Abos genannt. Bei einem anderen Verkäufer prüfen Sie dessen Mitteilung und Aboportal." },
      ],
      sources: guideSources([["Deutsche Bahn · Preisänderung und Zustimmung", db], ["DB · Reaktivierung", reactivate], ["DB · Deutschlandsemesterticket", student], ["DB · Geltungsbereich", trains]]),
    },
  },
} satisfies AuthoredGuide;
