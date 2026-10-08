import type { Guide } from "@/lib/types";

export const practicalSystemsGuides: Guide[] = [
  {
    slug: "sick-leave-germany",
    title: "Sick leave in Germany in 2026: eAU, deadlines and continued pay",
    description: "How Krankmeldung and the electronic sick note work in Germany in 2026, when to tell your employer, when a medical certificate is needed, and what the six-week pay rule means.",
    category: "work",
    eyebrow: "Workplace practical guide",
    updated: "2026-10-08",
    readingMinutes: 9,
    summary: "If you are too ill to work in Germany, two separate duties matter: tell your employer immediately, and obtain medical confirmation when the rules require it. For most employees with statutory health insurance, the medical certificate is now handled through the eAU system rather than handed to the employer on paper.",
    takeaways: [
      "You must inform your employer about the incapacity to work and its expected duration without undue delay.",
      "Under the current statutory rule, a medical certificate is normally required when the incapacity lasts longer than three calendar days, but an employer can require it earlier.",
      "For most employees with statutory health insurance, the practice sends the eAU to the health insurer and the employer retrieves the relevant data electronically.",
      "Continued remuneration by the employer can generally run for up to six weeks when the statutory conditions are met.",
      "As of 8 October 2026, the announced political plan to require a certificate from day one has not yet replaced the existing rule."
    ],
    sections: [
      {
        heading: "Step 1: tell the employer first",
        paragraphs: [
          "A sick note does not replace the basic notification to your employer. Section 5 of the Continued Remuneration Act requires employees to report that they are unable to work and how long they expect the absence to last without undue delay. In practice, follow the notification channel your employer has set: manager, HR system, phone, app or email.",
          "Do not wait for the doctor's appointment before reporting the absence. The employer needs to know that you will not be working even when the medical confirmation will arrive later through the electronic process."
        ],
        bullets: [
          "Report the absence as soon as you know you cannot work.",
          "State the expected duration if you can.",
          "Follow any stricter internal rule in your contract or workplace policy."
        ],
        callout: {
          title: "Current rule in October 2026",
          text: "The federal government has announced plans to tighten the certificate rule, but its own July 2026 guidance states that the existing rules remain in force until those measures are implemented.",
          tone: "note"
        }
      },
      {
        heading: "Step 2: know when medical confirmation is required",
        paragraphs: [
          "Under the current statutory baseline, if the incapacity lasts longer than three calendar days, medical confirmation must normally exist by the next working day. The employer is allowed to require medical confirmation earlier, including from the first day.",
          "That means two people at different employers can face different practical deadlines even though the same federal law applies. Check your employment contract, collective agreement and employer policy rather than assuming the three-day baseline always gives you three days without documentation."
        ],
        bullets: [
          "Statutory baseline: longer than three calendar days triggers the medical-confirmation requirement.",
          "Employer rule: an earlier certificate can be required.",
          "If the illness lasts longer than originally certified, a follow-up medical determination is needed."
        ]
      },
      {
        heading: "How the eAU works for statutory health insurance",
        paragraphs: [
          "For employees covered by a statutory health insurer, the paper handover to the employer has largely been replaced by the electronic Arbeitsunfähigkeitsbescheinigung (eAU). The medical practice transmits the incapacity data to the health insurer, and the employer retrieves the relevant information electronically.",
          "The eAU removes the normal delivery task, not the duty to tell the employer that you are sick. Keep the information or printout provided for your own records, especially if dates later need to be checked.",
          "Paper or different procedures can still matter in exceptions, including some cases involving private insurance, doctors outside statutory contracted care, or employment in private households."
        ],
        resources: [
          { label: "GKV-Spitzenverband — eAU", url: "https://www.gkv-spitzenverband.de/krankenversicherung/digitalisierung/eau_1/s_eau.jsp", note: "Official statutory health-insurance overview of the electronic sick-note process." }
        ]
      },
      {
        heading: "What the six-week continued-pay rule actually means",
        paragraphs: [
          "Section 3 of the Continued Remuneration Act provides continued remuneration by the employer for up to six weeks when an employee is unable to work because of illness without being at fault and the statutory conditions are met.",
          "Do not read 'six weeks' as a promise that every absence automatically creates six fresh weeks of employer-paid sick leave. Repeated incapacity caused by the same illness and special employment situations can affect the calculation. For a long or repeated absence, confirm the individual position with your employer and health insurer."
        ],
        callout: {
          title: "Why this matters",
          text: "The first practical question is who pays you during the absence. For many employees the employer covers the initial statutory period; after that, statutory health-insurance sickness benefit may become relevant if its conditions are met.",
          tone: "success"
        }
      },
      {
        heading: "Telephone and video sick notes in 2026",
        paragraphs: [
          "Telephone certification for certain mild illnesses still exists as of 8 October 2026. The federal government has announced an intention to abolish telephone sick notes, but its current guidance says the existing rules remain in place until implementation.",
          "A political announcement and a rule already in force are not the same thing. Because this topic is actively changing, check the federal guidance or your medical practice if the way you can obtain an AU matters for you."
        ],
        resources: [
          { label: "Federal Government — telephone sick notes", url: "https://www.bundesregierung.de/breg-de/bundesregierung/bundeskanzleramt/telefonische-krankschreibung-1800026", note: "Current government status and the distinction between announced changes and rules already in force." }
        ]
      },
      {
        heading: "A simple sick-day checklist",
        paragraphs: [
          "For an ordinary employee, a good sequence is: notify the employer, check whether a day-one certificate is required, contact a medical practice when necessary, keep your own record of the certified dates, and inform the employer again if the expected return date changes.",
          "If you are abroad, privately insured, in a household Minijob or dealing with a work accident, do not assume the standard eAU workflow applies unchanged."
        ],
        bullets: [
          "Notify employer.",
          "Check certificate deadline.",
          "Get the incapacity medically determined when required.",
          "Keep your own record of dates.",
          "Report extensions promptly."
        ]
      }
    ],
    faqs: [
      { question: "Do I still have to tell my employer if the doctor sends an eAU?", answer: "Yes. The eAU changes how the medical data reaches the employer; it does not remove your duty to report the incapacity and expected duration to the employer." },
      { question: "Do I always get three days before I need a sick note?", answer: "No. The current statutory baseline is linked to an incapacity lasting longer than three calendar days, but an employer can require medical confirmation earlier, including from day one." },
      { question: "Is a certificate from the first day already mandatory for everyone in October 2026?", answer: "No. A tighter rule has been politically announced, but the federal government states that the existing rules remain in force until implementation." },
      { question: "Does Germany still allow telephone sick notes?", answer: "Yes in qualifying cases as of 8 October 2026. The government has announced plans to abolish the option, so this is a point to re-check before relying on it later." }
    ],
    sources: [
      { name: "Continued Remuneration Act — §5 notification and proof duties", url: "https://www.gesetze-im-internet.de/entgfg/__5.html", note: "Current statutory notification and medical-confirmation rules." },
      { name: "Continued Remuneration Act — §3 continued pay", url: "https://www.gesetze-im-internet.de/entgfg/__3.html", note: "Statutory basis for up to six weeks of continued remuneration." },
      { name: "GKV-Spitzenverband — electronic sick note (eAU)", url: "https://www.gkv-spitzenverband.de/krankenversicherung/digitalisierung/eau_1/s_eau.jsp", note: "How the electronic exchange between practice, insurer and employer works." },
      { name: "Federal Government — telephone sick notes", url: "https://www.bundesregierung.de/breg-de/bundesregierung/bundeskanzleramt/telefonische-krankschreibung-1800026", note: "Status of the current rule and announced 2026 changes." }
    ],
    related: ["working-in-germany", "german-health-insurance", "minijob-germany", "werkstudent-germany"],
    featured: true
  },
  {
    slug: "finding-doctor-germany",
    title: "How to find a doctor in Germany: Hausarzt, 116117 and urgent care",
    description: "A practical guide to finding a Hausarzt or specialist in Germany, using 116117, understanding when a referral code may be needed, and choosing between a normal practice, 116117 and 112.",
    category: "healthcare",
    eyebrow: "Healthcare practical guide",
    updated: "2026-10-08",
    readingMinutes: 8,
    summary: "The German healthcare system is easier to navigate once you separate three needs: a regular doctor for normal care, the 116117 patient service for practice search, appointments and urgent out-of-hours care, and 112 for life-threatening emergencies.",
    takeaways: [
      "A Hausarzt is usually the most useful first contact for everyday medical problems and ongoing care.",
      "The official 116117 service provides a doctor search and, for people with statutory health insurance, an appointment service.",
      "For Hausarzt appointments through 116117, no referral and no Vermittlungscode are required.",
      "116117 is for urgent but non-life-threatening care outside normal practice hours; 112 is for life-threatening emergencies.",
      "The 116117 search can filter practices by specialty and additional criteria such as languages."
    ],
    sections: [
      {
        heading: "Start by finding a Hausarzt",
        paragraphs: [
          "A Hausarzt is a general practitioner or family doctor and is usually the best first point of contact for ordinary illness, recurring problems, vaccinations, basic checks and referrals when specialist care is needed.",
          "Germany does not assign every newcomer one permanent GP automatically. You normally find a practice yourself and ask whether it is accepting new patients. Availability can vary significantly by city, so it is useful to identify more than one nearby practice before you urgently need care."
        ],
        bullets: [
          "Search close to home, university or work.",
          "Check whether the practice accepts your insurance type.",
          "Ask whether it is accepting new patients.",
          "Save opening hours and the practice's preferred booking method."
        ]
      },
      {
        heading: "Use the official 116117 doctor search",
        paragraphs: [
          "The 116117 patient service is operated within Germany's statutory medical-care system. Its Arzt- und Psychotherapeutensuche lets you search for practices near a location and filter by specialty and other criteria.",
          "This is useful when a generic map search gives you many practices but does not make it clear which ones participate in statutory outpatient care. The 116117 search is also a practical way to look for practices that list foreign-language access."
        ],
        resources: [
          { label: "116117 doctor and psychotherapist search", url: "https://arztsuche.116117.de/", note: "Official practice search operated by the KBV/associated statutory medical organisations." }
        ]
      },
      {
        heading: "When the 116117 appointment service helps",
        paragraphs: [
          "People with statutory health insurance can use the 116117 appointment service to book participating appointments online or by phone. The service rules depend on the type of doctor.",
          "According to the KBV, no referral and no Vermittlungscode are required for appointments with a Hausarzt, ophthalmologist, gynaecologist or paediatrician, or for an initial psychotherapeutic consultation. For many other specialist appointments, a referral code can be required when you use the appointment-service route.",
          "A code requirement for the 116117 appointment service is not the same thing as saying you can never contact that specialist practice directly. It describes how the formal appointment-service pathway works."
        ],
        resources: [
          { label: "KBV — 116117 patient service", url: "https://www.kbv.de/positionen/dossiers/notfallversorgung/patientenservice-116117", note: "Explains appointment booking, doctor search and when a referral code is not required." }
        ]
      },
      {
        heading: "Know the difference between 116117 and 112",
        paragraphs: [
          "116117 is the medical on-call service for problems that would normally be treated by a practice but cannot reasonably wait until the next regular consultation time. It is available nationwide without an area code.",
          "112 is the emergency number for life-threatening situations. Severe breathing difficulty, unconsciousness, major uncontrolled bleeding and comparable emergencies belong with emergency services, not an appointment booking system.",
          "If you are unsure whether a non-life-threatening problem can wait, the 116117 patient navigator can help point you toward the appropriate level of care. It does not provide a diagnosis."
        ],
        callout: {
          title: "Simple rule",
          text: "Normal problem that can wait: regular practice. Urgent problem when practices are closed: 116117. Life-threatening emergency: 112.",
          tone: "warning"
        },
        resources: [
          { label: "116117 — medical on-call service", url: "https://www.116117.de/de/aerztlicher-bereitschaftsdienst.php", note: "Official explanation of out-of-hours care and the 116117 versus 112 distinction." }
        ]
      },
      {
        heading: "What to prepare before the appointment",
        paragraphs: [
          "Bring your health-insurance card or insurance details where applicable, a list of medication you take, and relevant previous documents if the problem has already been investigated elsewhere. If language is a concern, ask the practice in advance which languages are available rather than assuming English will be offered.",
          "For an ongoing condition, try to keep the same Hausarzt once you find a practice that works for you. A doctor who knows your history can coordinate referrals and follow-up more efficiently than a different walk-in contact each time."
        ],
        bullets: [
          "Insurance card/details.",
          "Medication list and allergies.",
          "Relevant letters, reports or test results.",
          "A short list of the questions you need answered."
        ]
      },
      {
        heading: "A practical plan for a newcomer",
        paragraphs: [
          "Do not wait until you are ill to learn the system. Once your health coverage is active, find two nearby Hausarzt practices, save 116117 and 112 in your phone, and check how your insurer handles routine services.",
          "That small setup gives you a clear route for normal care, urgent out-of-hours problems and genuine emergencies without having to decode the system when you are already unwell."
        ]
      }
    ],
    faqs: [
      { question: "Do I need a referral to see a Hausarzt?", answer: "No. A Hausarzt is itself a primary-care doctor. The 116117 appointment service does not require a referral or Vermittlungscode for Hausarzt appointments." },
      { question: "Can 116117 find an English-speaking doctor?", answer: "The official doctor search includes additional filters, and practice data can include foreign-language information. Availability still depends on the local practices." },
      { question: "Is 116117 an emergency number?", answer: "It is for urgent, non-life-threatening medical care and appointment/navigation services. For a life-threatening emergency, call 112." },
      { question: "Can privately insured people use 116117?", answer: "The out-of-hours medical service is available irrespective of statutory or private insurance, while the formal 116117 appointment-service pathway described for booking practice appointments is aimed at people with statutory health insurance." }
    ],
    sources: [
      { name: "116117 — patient service", url: "https://www.116117.de/", note: "Official doctor search, appointment and navigation service." },
      { name: "KBV — the 116117 patient service", url: "https://www.kbv.de/positionen/dossiers/notfallversorgung/patientenservice-116117", note: "Rules for appointment booking and referral-code exceptions." },
      { name: "116117 — medical on-call service", url: "https://www.116117.de/de/aerztlicher-bereitschaftsdienst.php", note: "Official explanation of urgent out-of-hours care and 112." }
    ],
    related: ["german-health-insurance", "first-30-days-germany", "newcomer-faq-germany"],
    featured: true
  },
  {
    slug: "german-payslip-explained",
    title: "German payslip explained: Brutto, Netto, tax and deductions",
    description: "How to read a German Lohnabrechnung or Gehaltsabrechnung, what employers must show, what common tax and social-insurance lines mean, and why net pay can change from month to month.",
    category: "work",
    eyebrow: "Salary practical guide",
    updated: "2026-10-08",
    readingMinutes: 9,
    summary: "A German payslip is easier to read if you separate it into four layers: gross pay, taxable/payroll information, social-insurance deductions and the final payment. The exact layout varies by payroll provider, but the legal statement must identify the pay period and composition of remuneration.",
    takeaways: [
      "Section 108 of the Trade Regulation Act requires a remuneration statement in text form when pay is made, subject to an exception when the relevant information has not changed since the last proper statement.",
      "The statement must identify the accounting period and composition of pay, including relevant supplements, allowances and deductions.",
      "Brutto is not the amount transferred to your bank; Netto is reached after payroll tax and applicable employee contributions.",
      "Lohnsteuer is calculated through the payroll system using annualised wage-tax rules and the employee's electronic tax characteristics.",
      "A bonus, unpaid absence, changed tax data or one-off payment can make one month's net amount differ from another."
    ],
    sections: [
      {
        heading: "The four blocks to find on any German payslip",
        paragraphs: [
          "Payroll layouts differ, but you can usually understand a statement by finding four blocks: your personal/payroll data, gross remuneration, deductions, and the final transfer amount.",
          "Do not start by scanning individual abbreviations. First confirm that the pay period, gross amount and net/payment amount match what you expected. Then work through the lines that explain the difference."
        ],
        bullets: [
          "Payroll period and employee data.",
          "Gross salary and any bonuses or supplements.",
          "Tax and social-insurance deductions.",
          "Net amount and amount actually paid."
        ]
      },
      {
        heading: "What the employer must provide",
        paragraphs: [
          "Section 108 GewO requires the employee to receive a remuneration statement in text form when wages are paid. It must at least show the accounting period and the composition of remuneration.",
          "The law specifically points to information such as the type and amount of supplements, allowances and other remuneration, as well as the type and amount of deductions, advance payments and payments on account. If the relevant information has not changed compared with the last proper statement, the duty to issue a new statement can fall away."
        ],
        resources: [
          { label: "§108 GewO — remuneration statement", url: "https://www.gesetze-im-internet.de/gewo/__108.html", note: "Federal legal requirement for the content of the pay statement." }
        ]
      },
      {
        heading: "Brutto: what belongs before deductions",
        paragraphs: [
          "Your contractual base salary normally starts the calculation. Depending on the job, gross remuneration can also contain overtime, shift supplements, bonuses, commissions, holiday or Christmas payments, benefits and corrections from an earlier payroll period.",
          "A higher gross payment does not always translate proportionally into a higher net payment because payroll tax is calculated using annualised rules and some deductions have thresholds or ceilings."
        ],
        callout: {
          title: "Useful check",
          text: "If your gross amount is wrong, investigate that first. Tax calculations can be perfectly correct and still produce the wrong final payment when the underlying hours, bonus or salary input is wrong.",
          tone: "note"
        }
      },
      {
        heading: "Lohnsteuer, Kirchensteuer and Solidaritätszuschlag",
        paragraphs: [
          "Lohnsteuer is wage tax withheld by the employer. The Federal Ministry of Finance explains that current salary is converted to an annual wage for the wage-tax calculation and that individual payroll characteristics such as tax class and allowances are taken into account through the electronic system.",
          "Kirchensteuer appears only where the employee is subject to church tax. The Solidaritätszuschlag is not a flat deduction that every employee necessarily pays; whether it appears depends on the applicable tax calculation.",
          "If you change tax class or another electronic wage-tax characteristic, the result can appear on a later payroll run once the updated data is available to the employer."
        ],
        resources: [
          { label: "Federal Ministry of Finance — Lohnsteuer", url: "https://www.bundesfinanzministerium.de/Web/DE/Themen/Steuern/Steuerarten/Lohnsteuer/lohnsteuer.html", note: "Official wage-tax information and 2026 payroll-tax resources." },
          { label: "2026 wage-tax calculation rule (§39b EStG)", url: "https://ao.bundesfinanzministerium.de/lsth/2026/A-Einkommensteuergesetz/VI-Steuererhebung-36-47/2-Steuerabzug-vom-Arbeitslohn-Lohnsteuer-38-42g/Paragraf-39b/inhalt.html", note: "Official 2026 wage-tax handbook explaining annualisation of current salary." }
        ]
      },
      {
        heading: "The social-insurance abbreviations",
        paragraphs: [
          "For employees subject to German social insurance, the common payroll families are health insurance (KV), pension insurance (RV), unemployment insurance (AV) and long-term care insurance (PV). The exact employee amount depends on the rules that apply to the job and the relevant assessment bases.",
          "A Minijob, Midijob, Werkstudent job or regular employment relationship can therefore produce very different deduction patterns even when the monthly gross amounts look similar."
        ],
        bullets: [
          "KV — Krankenversicherung (health insurance).",
          "RV — Rentenversicherung (pension insurance).",
          "AV — Arbeitslosenversicherung (unemployment insurance).",
          "PV — Pflegeversicherung (long-term care insurance)."
        ]
      },
      {
        heading: "Why the amount paid can differ from the displayed Netto",
        paragraphs: [
          "Many payroll statements distinguish calculated net remuneration from the final amount transferred. Reimbursements, benefits, salary advances, garnishments or other settlement items can sit between those two figures.",
          "If the bank transfer does not equal the first net figure you see, look for an Auszahlungsbetrag or a similarly labelled final-payment line before assuming the payroll is wrong."
        ]
      },
      {
        heading: "A five-minute payslip check",
        paragraphs: [
          "Check the pay period, contractual gross salary, recorded variable pay, tax characteristics, insurance status and final payment. Compare unusual changes with the previous month rather than trying to decode every payroll code at once.",
          "If something still looks wrong, ask payroll or HR which input changed. For a tax issue, the Finanzamt or a tax professional may be the appropriate next step; for insurance status, ask the relevant health insurer."
        ],
        bullets: [
          "Is the gross salary correct?",
          "Are overtime, bonuses and absences reflected correctly?",
          "Does the tax class/status look right?",
          "Do the insurance deductions match your employment type?",
          "Does the final transfer match your bank account?"
        ]
      }
    ],
    faqs: [
      { question: "Does my employer have to give me a payslip every month?", answer: "The law requires a remuneration statement in text form when pay is made, but the obligation can fall away when the relevant information has not changed since the last proper statement." },
      { question: "Why is my net salary different this month?", answer: "Common reasons include bonuses, overtime, unpaid absence, changed tax characteristics, payroll corrections or other one-off remuneration. Compare the gross and deduction lines with the previous statement." },
      { question: "What is the difference between Netto and Auszahlungsbetrag?", answer: "Netto is the result after the main payroll deductions. The final payment can still be adjusted by other settlement items, so the amount transferred can be shown separately as Auszahlungsbetrag." },
      { question: "Can I calculate German net salary from one fixed percentage?", answer: "Not reliably. Wage tax uses annualised payroll rules and individual tax characteristics, while social-insurance treatment depends on the employment setup and applicable thresholds." }
    ],
    sources: [
      { name: "Trade Regulation Act — §108 remuneration statement", url: "https://www.gesetze-im-internet.de/gewo/__108.html", note: "Legal minimum information for a German pay statement." },
      { name: "Federal Ministry of Finance — wage tax", url: "https://www.bundesfinanzministerium.de/Web/DE/Themen/Steuern/Steuerarten/Lohnsteuer/lohnsteuer.html", note: "Official wage-tax portal and 2026 resources." },
      { name: "Official Wage Tax Handbook 2026 — §39b EStG", url: "https://ao.bundesfinanzministerium.de/lsth/2026/A-Einkommensteuergesetz/VI-Steuererhebung-36-47/2-Steuerabzug-vom-Arbeitslohn-Lohnsteuer-38-42g/Paragraf-39b/inhalt.html", note: "How current wages are annualised for payroll wage-tax calculation." }
    ],
    related: ["working-in-germany", "minijob-germany", "werkstudent-germany", "german-tax-id"],
    featured: true
  }
];
