import { applicationLink as link, guideSources, type AuthoredGuide } from "./authored-guide";

const deadline = "https://finanzamt-bw.fv-bwl.de/site/pbs-bw-mlr-root/node/5279475/Lde/index.html";
const taxOffice = "https://finanzamt-bw.fv-bwl.de/site/pbs-bw-mlr-root/node/5262710/Lde/index.html";
const forms = "https://www.elster.de/eportal/formulare-leistungen/alleformulare";
const registration = "https://www.elster.de/eportal/helpGlobal?themaGlobal=help_registrierung";
const appendix = "https://www.elster.de/eportal/helpGlobal?themaGlobal=help_est_ufa_12_2022";

export const taxReturn2022 = {
  slugs: { es: "declaracion-renta-alemania-2022-plazo", en: "germany-2022-tax-return-deadline", de: "steuererklaerung-2022-frist-freiwillig" },
  category: "money",
  updated: "2026-11-25",
  readingMinutes: 4,
  related: ["german-tax-id", "german-bank-account", "cost-of-living-germany"],
  copy: {
    es: {
      title: "Renta alemana de 2022: plazo voluntario hasta el 31/12/2026",
      description: "Si trabajaste en Alemania en 2022, comprueba si puedes presentar voluntariamente hasta el 31 de diciembre de 2026. Pasos en ELSTER y documentos.",
      eyebrow: "Impuestos en Alemania · Plazo de fin de año",
      summary: "Si no tenías obligación de presentar la declaración del impuesto sobre la renta en Alemania, la del ejercicio 2022 puede presentarse voluntariamente hasta el 31 de diciembre de 2026. El Finanzamt debe recibirla dentro de plazo. Presentarla puede dar lugar a una devolución si pagaste de más.",
      takeaways: ["Selecciona el ejercicio 2022 en ELSTER, aunque estés presentando en 2026.", "Busca el certificado anual de retenciones de 2022: Lohnsteuerbescheinigung.", "Si tenías obligación de declarar o ya recibiste un requerimiento, comprueba tu plazo con el Finanzamt."],
      sections: [
        { heading: "A quién le puede interesar presentar la renta de 2022", paragraphs: ["Por ejemplo, imagina que trabajaste en Alemania de septiembre a diciembre de 2022 y cobraste una nómina con retención. Si no tenías obligación de declarar, puede merecer la pena revisar si las retenciones superaron el impuesto anual. El resultado depende del conjunto de tus ingresos y de las deducciones aplicables.", "Si llegaste o te fuiste de Alemania ese año, comprueba cómo encajan los ingresos de otro país antes de usar este ejemplo. La residencia fiscal y la situación de tus ingresos pueden cambiar el formulario o la obligación de declarar."], resources: [link("Cuándo se aplica la declaración voluntaria", deadline, "Explicación de la administración tributaria de Baden-Württemberg.")] },
        { heading: "Cómo presentar la declaración de 2022 en ELSTER", paragraphs: ["En Mein ELSTER, abre «Einkommensteuer» y elige el formulario que corresponda a tu situación. Para personas con obligación tributaria ilimitada, el formulario general es ESt 1 A. Elige el ejercicio 2022. Si tuviste ingresos del trabajo por cuenta ajena, revisa la Anlage N.", "Ten a mano tu Steuer-ID, el certificado salarial de 2022, tu IBAN y los justificantes de gastos que vayas a declarar. Envía la declaración y guarda el justificante de transmisión de ELSTER."], resources: [link("Abrir los formularios de Mein ELSTER", forms, "Apartado «Einkommensteuer». Selecciona 2022."), link("Instrucciones de la Anlage N de 2022", appendix, "Datos de la nómina anual y gastos deducibles.")] },
        { heading: "Qué hacer si todavía no tienes una cuenta de ELSTER", paragraphs: ["Empieza el registro con margen. Si eliges la verificación por carta, ELSTER envía los datos de activación por correo electrónico y por correo postal a la dirección registrada. Consulta si puedes verificarte en línea.", "Si te queda poco tiempo o te has mudado fuera de Alemania, pregunta al Finanzamt o a un asesor fiscal por una vía de presentación válida que llegue dentro de plazo."], resources: [link("Ayuda oficial para crear la cuenta", registration, "Opciones de registro y verificación.")] },
      ],
      faqs: [
        { question: "¿Puedo presentar la declaración voluntaria de 2022 en enero de 2027?", answer: "El plazo ordinario termina el 31 de diciembre de 2026. Si te afecta una situación especial, confírmala con el Finanzamt." },
        { question: "¿Este plazo se aplica también a la declaración obligatoria?", answer: "La fecha del 31 de diciembre de 2026 indicada aquí corresponde a la declaración voluntaria de 2022. Si tenías obligación de declarar, consulta el plazo de tu caso." },
        { question: "¿Necesito una Steuer-ID nueva si ya no vivo en Alemania?", answer: "La Steuer-ID personal permanece aunque te mudes. Busca la que ya tenías en tu documentación fiscal y comprueba tu situación fiscal para elegir el formulario adecuado." },
      ],
      sources: guideSources([["Finanzamt Baden-Württemberg · declaración voluntaria", deadline], ["Finanzamt Baden-Württemberg · años que todavía puedes presentar", taxOffice], ["ELSTER · formularios", forms], ["ELSTER · Anlage N 2022", appendix], ["ELSTER · registro", registration]]),
    },
    en: {
      title: "German 2022 tax return: voluntary filing deadline is 31 December 2026",
      description: "Worked in Germany in 2022? Check the 31 December 2026 deadline for voluntary filing, what to gather and how to submit through ELSTER.",
      eyebrow: "Taxes in Germany · Year-end deadline",
      summary: "If you were not required to file a German income tax return, you can generally submit a voluntary return for 2022 until 31 December 2026. It must reach your tax office by the deadline. You might receive a refund if too much tax was withheld.",
      takeaways: ["Select tax year 2022 in ELSTER, even though you are filing in 2026.", "Find your annual 2022 wage tax certificate (Lohnsteuerbescheinigung).", "If you were required to file or received a notice, check your own deadline with the Finanzamt."],
      sections: [
        { heading: "Who might benefit from filing a 2022 German tax return?", paragraphs: ["Suppose you worked in Germany from September to December 2022 and your payslips show wage tax withheld. If filing was optional, it may be worth checking whether deductions and your total annual income give you a lower final tax bill than the amount withheld.", "If you moved into or out of Germany that year, check how to report foreign income before applying this example. Your tax residence and income can affect which form you need and whether filing is mandatory."], resources: [link("Check the official rules for voluntary filing", deadline, "Guidance from Baden-Württemberg’s tax administration.")] },
        { heading: "File the 2022 return in Mein ELSTER", paragraphs: ["Open «Einkommensteuer» and choose the form that matches your tax status. The standard form for unlimited tax liability is ESt 1 A. Select tax year 2022. If you were employed, review Anlage N for wage income.", "Gather your German tax ID, 2022 wage tax certificate, IBAN and evidence for any expenses you intend to claim. Submit the return and save your transmission receipt."], resources: [link("Open the Mein ELSTER forms", forms, "Choose Einkommensteuer and tax year 2022."), link("2022 Anlage N instructions", appendix, "Wage tax certificate figures and employment expenses.")] },
        { heading: "What if you have not registered for ELSTER yet?", paragraphs: ["Allow time for registration. If you choose postal identification, ELSTER sends activation information separately by email and by letter to your registered address. See whether you can verify your identity online.", "If the deadline is close or you have moved abroad, contact your Finanzamt or a tax adviser to ask which filing methods can get the return there in time."], resources: [link("Official ELSTER registration help", registration, "Check the available identification methods.")] },
      ],
      faqs: [
        { question: "Can I file a voluntary 2022 return in January 2027?", answer: "The ordinary deadline is 31 December 2026. Ask the Finanzamt if there are special circumstances in your case." },
        { question: "Does this deadline cover mandatory filing?", answer: "The 31 December 2026 deadline here concerns voluntary filing for 2022. If you were required to file, check your own timeline with the Finanzamt." },
        { question: "Do I need a new German tax ID if I moved abroad?", answer: "Your personal German tax ID stays the same after you move. Look for it in your tax records and confirm which form applies to your tax status." },
      ],
      sources: guideSources([["Baden-Württemberg tax administration · voluntary filing", deadline], ["Baden-Württemberg tax administration · open tax years", taxOffice], ["ELSTER · income tax forms", forms], ["ELSTER · 2022 Anlage N", appendix], ["ELSTER · registration", registration]]),
    },
    de: {
      title: "Steuererklärung 2022 freiwillig abgeben: Frist 31. Dezember 2026",
      description: "Die Frist für die freiwillige Steuererklärung 2022 endet am 31.12.2026. Welche Unterlagen Sie brauchen und wie Sie die Erklärung in ELSTER abgeben.",
      eyebrow: "Steuern in Deutschland · Frist zum Jahresende",
      summary: "Wenn Sie für 2022 nicht zur Abgabe verpflichtet waren, können Sie Ihre Einkommensteuererklärung für dieses Jahr grundsätzlich bis zum 31. Dezember 2026 freiwillig einreichen. Sie muss bis dahin beim Finanzamt eingehen. Eine Erstattung ist möglich, wenn zu viel Steuer einbehalten wurde.",
      takeaways: ["In ELSTER das Steuerjahr 2022 wählen, auch wenn Sie 2026 abgeben.", "Lohnsteuerbescheinigung 2022 und persönliche Steuer-ID bereithalten.", "Wer abgabepflichtig war oder ein Schreiben erhalten hat, klärt die individuelle Frist mit dem Finanzamt."],
      sections: [
        { heading: "Wann sich eine Antragsveranlagung für 2022 lohnen kann", paragraphs: ["Beispiel: Sie haben von September bis Dezember 2022 in Deutschland gearbeitet und Ihr Arbeitgeber hat Lohnsteuer einbehalten. Wenn Sie nicht abgabepflichtig waren, können Sie prüfen, ob die einbehaltene Steuer über der tatsächlichen Jahressteuer liegt. Das hängt von den gesamten Einkünften und den abzugsfähigen Ausgaben ab.", "Bei einem Zu- oder Wegzug im Jahr 2022 klären Sie, wie ausländische Einkünfte zu behandeln sind. Die steuerliche Ansässigkeit und Ihre Einkünfte können für die Formularwahl und die Abgabepflicht entscheidend sein."], resources: [link("Wann eine Antragsveranlagung möglich ist", deadline, "Hinweise der Finanzämter Baden-Württemberg.")] },
        { heading: "Steuererklärung 2022 in Mein ELSTER einreichen", paragraphs: ["Öffnen Sie «Einkommensteuer» und wählen Sie das Formular für Ihren Fall. Für unbeschränkt Steuerpflichtige ist das grundsätzlich ESt 1 A. Stellen Sie das Steuerjahr 2022 ein. Arbeitslohn gehört in die Anlage N.", "Halten Sie Steuer-ID, Lohnsteuerbescheinigung 2022, IBAN und die Nachweise für geltend gemachte Ausgaben bereit. Senden Sie die Erklärung ab und speichern Sie das Übertragungsprotokoll."], resources: [link("Mein ELSTER · alle Formulare", forms, "Unter Einkommensteuer das Jahr 2022 wählen."), link("Anleitung zur Anlage N 2022", appendix, "Angaben zum Arbeitslohn und zu Werbungskosten.")] },
        { heading: "Was tun ohne ELSTER-Zugang?", paragraphs: ["Planen Sie Zeit für die Registrierung ein. Bei der Identitätsprüfung per Brief kommen die Aktivierungsdaten getrennt per E-Mail und an die hinterlegte Postanschrift. Prüfen Sie, ob die Online-Identifizierung für Sie verfügbar ist.", "Wenn die Frist nahe ist oder Sie inzwischen im Ausland wohnen, fragen Sie beim zuständigen Finanzamt oder bei einer Steuerberatung nach einer zulässigen fristgerechten Abgabe."], resources: [link("ELSTER-Hilfe zur Registrierung", registration, "Verfügbare Wege zur Identitätsprüfung.")] },
      ],
      faqs: [
        { question: "Kann ich die freiwillige Steuererklärung 2022 noch im Januar 2027 abgeben?", answer: "Die reguläre Frist für die freiwillige Abgabe endet am 31. Dezember 2026. Bei einem Sonderfall fragen Sie beim Finanzamt nach." },
        { question: "Gilt der 31. Dezember 2026 auch bei Pflichtveranlagung?", answer: "Das hier genannte Datum betrifft die freiwillige Erklärung für 2022. Wenn Sie zur Abgabe verpflichtet waren, klären Sie Ihre individuelle Frist mit dem Finanzamt." },
        { question: "Brauche ich nach einem Umzug ins Ausland eine neue Steuer-ID?", answer: "Die persönliche Steuer-ID bleibt bei einem Umzug gleich. Suchen Sie in Ihren Steuerunterlagen und prüfen Sie, welches Formular für Ihre steuerliche Situation passt." },
      ],
      sources: guideSources([["Finanzämter Baden-Württemberg · Antragsveranlagung", deadline], ["Finanzämter Baden-Württemberg · offene Steuerjahre", taxOffice], ["ELSTER · Einkommensteuerformulare", forms], ["ELSTER · Anlage N 2022", appendix], ["ELSTER · Registrierung", registration]]),
    },
  },
} satisfies AuthoredGuide;
