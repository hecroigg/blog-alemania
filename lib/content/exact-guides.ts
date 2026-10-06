import type { Guide } from "@/lib/types";
import { exactGuideSlugs, type ExactGuideKey } from "@/lib/exact-guide-slugs";

export { exactGuideSlugs, type ExactGuideKey } from "@/lib/exact-guide-slugs";

const sources = {
  minimumWage: { name: "Federal Ministry of Labour — statutory minimum wage", url: "https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Mindestlohn/Informationen-zum-Mindestlohn/informationen-zum-mindestlohn-deutsch.html", note: "Official rate from 1 January 2026" },
  midijob: { name: "German Pension Insurance — transition zone", url: "https://www.deutsche-rentenversicherung.de/DRV/DE/Experten/Arbeitgeber-und-Steuerberater/Gleitzone-Uebergangsbereich/uebergangsbereich_gleitzone.html", note: "Official 2026 thresholds and contribution treatment" },
  ticket: { name: "German Federal Government — Deutschlandticket", url: "https://www.bundesregierung.de/breg-de/bundesregierung/bundeskanzleramt/deutschlandticket-2134074", note: "Official price and scope for 2026" },
  rundfunk: { name: "ARD ZDF Deutschlandradio Beitragsservice", url: "https://www.rundfunkbeitrag.de/zahlung", note: "Current contribution and payment rhythm" },
  anmeldung: { name: "Federal Registration Act §17", url: "https://www.gesetze-im-internet.de/bmg/__17.html", note: "Statutory registration deadline" },
  health: { name: "Federal Ministry of Health — GKV contributions", url: "https://www.bundesgesundheitsministerium.de/beitraege/seite", note: "2026 rates and contribution ceilings" },
  tax: { name: "Federal Ministry of Finance — tax changes for 2026", url: "https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Themen/Steuern/das-aendert-sich-2026.html", note: "2026 basic allowance and family figures" },
  child: { name: "Federal Employment Agency — Kindergeld 2026", url: "https://www.arbeitsagentur.de/news/kindergeld-steigt-2026", note: "Official monthly amount from January 2026" },
  deposit: { name: "German Civil Code §551", url: "https://www.gesetze-im-internet.de/bgb/__551.html", note: "Deposit cap, instalments and safeguarding rule" },
  leave: { name: "Federal Leave Act §3", url: "https://www.gesetze-im-internet.de/burlg/__3.html", note: "Statutory minimum annual leave" },
  hours: { name: "Working Time Act §3", url: "https://www.gesetze-im-internet.de/arbzg/__3.html", note: "Daily working-time limits" },
  notice: { name: "German Civil Code §622", url: "https://www.gesetze-im-internet.de/bgb/__622.html", note: "Statutory employment notice periods" },
};

function guide(key: ExactGuideKey, value: Omit<Guide, "slug" | "updated" | "related">): Guide & { key: ExactGuideKey } {
  return { key, slug: exactGuideSlugs[key].en, updated: "2026-10-06", related: [], ...value };
}

export const exactGuides = [
  guide("minimumWage", {
    title: "Minimum wage in Germany in 2026: €13.90 explained",
    description: "Germany's exact 2026 minimum wage, with monthly gross-pay examples for 10, 20, 30 and 40 hours per week.",
    category: "work", eyebrow: "2026 salary reference", readingMinutes: 6,
    summary: "From 1 January 2026, the nationwide statutory minimum wage is €13.90 gross per hour. Here is what that produces on a real payslip before tax and social insurance.",
    takeaways: ["The statutory floor is €13.90 gross per hour from 1 January 2026.", "At 40 hours a week, the mathematical monthly average is about €2,409.33 gross.", "The rate also normally applies to Minijobs and foreign workers employed in Germany."],
    sections: [
      { heading: "Turn the hourly rate into monthly pay", paragraphs: ["Monthly salary is not calculated by multiplying a weekly schedule by four. A useful annual average is hourly rate × weekly hours × 52 ÷ 12. At €13.90, that gives about €602.33 for 10 hours a week, €1,204.67 for 20 hours, €1,807.00 for 30 hours and €2,409.33 for 40 hours.", "These are gross figures. Payroll tax and social-insurance deductions depend on the employment type, tax class, health fund and personal circumstances."], bullets: ["10 hours/week: about €602.33 gross/month", "20 hours/week: about €1,204.67 gross/month", "30 hours/week: about €1,807.00 gross/month", "40 hours/week: about €2,409.33 gross/month"] },
      { heading: "Check an offer without guesswork", paragraphs: ["Divide the stated gross pay by the paid hours. A 40-hour job offering €2,300 gross a month works out at roughly €13.27 an hour on the annual-average method, below the 2026 statutory floor unless a lawful exception applies.", "Unpaid preparation, closing work or mandatory meetings can reduce the effective hourly rate. Keep a simple record of start, finish and break times if the payslip looks wrong."], callout: { title: "Worked example", text: "€2,500 gross per month at 40 hours a week equals about €14.42 gross per hour: €2,500 × 12 ÷ 52 ÷ 40." } },
      { heading: "Who is covered", paragraphs: ["The statutory rate covers most employees working in Germany, including part-time staff, Minijob workers, seasonal workers and foreign employees. The law contains limited exceptions, including some apprentices and certain internships.", "A collective agreement or contract may set a higher floor. The statutory minimum is the baseline, not a typical salary for skilled work."], bullets: ["Compare gross pay, not the amount arriving in the bank.", "Count every paid hour shown in the contract.", "Use the higher rate if a binding collective agreement applies."] },
    ],
    faqs: [{ question: "What is the minimum wage per month in 2026?", answer: "There is no single monthly figure because contracts use different hours. At 40 hours a week, €13.90 an hour averages about €2,409.33 gross per month." }, { question: "Is €13.90 net or gross?", answer: "Gross. Tax and employee social-insurance contributions are deducted afterwards." }],
    sources: [sources.minimumWage], featured: true,
  }),
  guide("minijob", {
    title: "Minijob in Germany in 2026: the €603 limit",
    description: "The exact 2026 Minijob ceiling, maximum hours at minimum wage and practical examples for irregular earnings.",
    category: "work", eyebrow: "2026 employment reference", readingMinutes: 6,
    summary: "A Minijob can average up to €603 gross per month in 2026. At the €13.90 minimum wage, that is about 43.38 hours a month.",
    takeaways: ["The regular monthly earnings limit is €603 in 2026.", "The annual planning ceiling is €7,236 when the job runs for twelve months.", "At minimum wage, the monthly hour budget is about 43.38 hours."],
    sections: [
      { heading: "The numbers employers should put in writing", paragraphs: ["The Minijob limit follows the statutory minimum wage. For 2026 it is €603 a month on average, or €7,236 across twelve months. A worker paid exactly €13.90 can therefore work around 43 hours and 23 minutes per month before reaching €603.", "If the hourly wage is €15, the matching monthly maximum is 40.2 hours. At €18, it is 33.5 hours. Higher hourly pay does not remove Minijob status; it reduces the hours available under the earnings ceiling."], bullets: ["€13.90/hour: about 43.38 hours/month", "€15/hour: 40.2 hours/month", "€18/hour: 33.5 hours/month"] },
      { heading: "What lands in the bank", paragraphs: ["For a standard commercial Minijob, the employer pays flat-rate contributions. The employee is generally subject to pension insurance, with a 3.6% employee share when the employer pays the usual 15%, unless the employee validly opts out.", "On €603, a 3.6% pension share is €21.71, leaving €581.29 before any other individual deduction. With a valid pension exemption, the gross and paid amount can both be €603 in a common flat-tax setup."], callout: { title: "Useful distinction", text: "€603.00 is still a Minijob. Regular pay from €603.01 enters the Midijob transition zone." } },
      { heading: "Rights do not disappear in a Minijob", paragraphs: ["Minijob workers are employees. They accrue paid holiday, continue to receive pay when ill under the applicable rules and are protected by the minimum wage.", "Ask for a written record of the hourly rate, expected hours, holiday calculation and who pays any flat tax. That one page prevents most disputes."], bullets: ["Track hours every month.", "Add all regular jobs when assessing the limit.", "Keep payslips and the pension-insurance choice."] },
    ],
    faqs: [{ question: "Can I earn exactly €603?", answer: "Yes. In 2026, regular monthly earnings up to and including €603 can fall within a Minijob." }, { question: "How many hours can I work at minimum wage?", answer: "About 43.38 hours per month at €13.90 an hour." }],
    sources: [sources.minimumWage, sources.midijob], featured: true,
  }),
  guide("midijob", {
    title: "Midijob in Germany in 2026: €603.01 to €2,000",
    description: "The exact 2026 Midijob range, how reduced employee contributions work and examples at €700, €1,200 and €2,000.",
    category: "work", eyebrow: "2026 employment reference", readingMinutes: 7,
    summary: "A regular monthly salary from €603.01 to €2,000 is in the 2026 transition zone. The employee contribution rises gradually instead of jumping to the full rate at €603.01.",
    takeaways: ["The 2026 Midijob range is €603.01–€2,000 gross per month.", "The employee social-insurance share begins near zero and rises gradually.", "Pension entitlements are based on actual earnings despite the reduced employee contribution."],
    sections: [
      { heading: "Where the transition zone starts and ends", paragraphs: ["The first cent above the Minijob ceiling matters: €603.01 enters the transition zone, while €2,000 is still inside it. At €2,000.01, the normal contribution calculation applies.", "Multiple insured jobs are generally added together for this test. Vocational training is not treated as a Midijob under this transition-zone rule."], bullets: ["Minijob: up to €603.00", "Midijob: €603.01–€2,000.00", "Regular contribution calculation: above €2,000.00"] },
      { heading: "Concrete contribution examples", paragraphs: ["German Pension Insurance publishes 2026 examples for the pension component. At €700 gross, the employee pension share is €12.91; at €1,200 it is €79.49; at €1,600 it is €132.74; and at €2,000 it reaches €186.00.", "Those figures are only the pension line, not the complete deduction from net salary. Health, long-term care, unemployment insurance and possibly wage tax are separate."], callout: { title: "Why the net pay changes smoothly", text: "At the lower edge, the employee contribution starts at €0 and rises with earnings; the employer contribution starts higher and moves toward the normal split." } },
      { heading: "What to check on the payslip", paragraphs: ["Look for the gross monthly pay, each social-insurance branch and the Midijob calculation marker. Payroll software applies the official formula; you should not see a sudden full employee burden simply because salary moved from €603.00 to €603.01.", "If there are two jobs, give both employers the information they request. The combined regular earnings can change the classification."], bullets: ["Confirm the regular monthly gross amount.", "Check whether another insured job is included.", "Compare the pension line with the transition-zone treatment."] },
    ],
    faqs: [{ question: "Is €2,000 still a Midijob?", answer: "Yes. The 2026 transition zone includes regular monthly earnings up to and including €2,000." }, { question: "Is a Midijob tax-free?", answer: "No. Midijob describes social-insurance treatment, not a general income-tax exemption." }],
    sources: [sources.midijob], featured: true,
  }),
  guide("deutschlandticket", {
    title: "Deutschlandticket in 2026: €63 price and real limits",
    description: "The exact 2026 Deutschlandticket price, yearly cost, covered transport and the trips that still need another ticket.",
    category: "transport", eyebrow: "2026 transport reference", readingMinutes: 6,
    summary: "The Deutschlandticket costs €63 per month from January 2026: €756 for twelve months. It covers participating local and regional transport, not normal ICE, IC or EC journeys.",
    takeaways: ["The exact 2026 subscription price is €63 per month.", "Twelve uninterrupted months cost €756.", "The core scope is local and regional public transport throughout Germany."],
    sections: [
      { heading: "What €63 buys", paragraphs: ["The ticket is personal and valid nationwide on participating buses, trams, U-Bahn, S-Bahn and regional services such as RB and RE. It is sold as a subscription rather than a one-off calendar-month ticket.", "It normally does not cover long-distance ICE, IC or EC trains. A regional train and an IC can leave from the same platform, so check the train category rather than assuming the route is covered."], bullets: ["Monthly price: €63", "Annual cost at 12 months: €756", "Typical included services: bus, tram, U-Bahn, S-Bahn, RB and RE"] },
      { heading: "When it pays for itself", paragraphs: ["If a city monthly pass costs more than €63 and the same local journeys are included, the Deutschlandticket is already the cheaper base product. For occasional travel, divide €63 by the local single fare. At €3.50 a ride, break-even is 18 rides a month.", "The calculation changes if an employer subsidises a Jobticket or a university offers the Deutschlandsemesterticket. Compare the amount actually deducted from your salary or semester fee."], callout: { title: "Simple break-even test", text: "Monthly price ÷ single fare = rides to break even. €63 ÷ €3.50 = 18 rides." } },
      { heading: "Subscription details that cost money", paragraphs: ["Buy from an operator whose cancellation date and app you understand. The national product is the same, but customer service, payment methods and cancellation workflow can differ.", "Children, bicycles and other adults are not automatically included nationwide. Local add-ons depend on the operator or transport association."], bullets: ["Save the cancellation confirmation.", "Check the first valid month before paying.", "Buy separate long-distance tickets for ICE, IC and EC travel."] },
    ],
    faqs: [{ question: "How much is the Deutschlandticket in 2026?", answer: "€63 per month from January 2026." }, { question: "Can I use ICE trains?", answer: "Normally no. The ticket is designed for participating local and regional public transport." }],
    sources: [sources.ticket], featured: true,
  }),
  guide("rundfunk", {
    title: "Rundfunkbeitrag in 2026: €18.36 per home",
    description: "The exact Rundfunkbeitrag amount, quarterly payment, flat-share split and worked examples for one to four residents.",
    category: "bureaucracy", eyebrow: "2026 household cost", readingMinutes: 5,
    summary: "The Rundfunkbeitrag is €18.36 per month for a dwelling, not per resident. The standard three-month payment is €55.08.",
    takeaways: ["One dwelling normally pays €18.36 a month in total.", "The standard three-month amount is €55.08.", "Four flatmates sharing equally pay €4.59 each per month."],
    sections: [
      { heading: "Calculate the real cost in a shared home", paragraphs: ["The contribution follows the dwelling. One registered payer covers the home and the other residents provide that person's contribution number when responding to the Beitragsservice.", "Split equally, two residents pay €9.18 each per month, three pay €6.12 and four pay €4.59. The authority still collects from the registered payer, so the private split is for the household to organise."], bullets: ["1 resident: €18.36 each/month", "2 residents: €9.18 each/month", "3 residents: €6.12 each/month", "4 residents: €4.59 each/month"] },
      { heading: "Payment dates and totals", paragraphs: ["The statutory payment rhythm collects €55.08 for three months. Twelve months total €220.32. The amount is due in the middle of the three-month period unless another permitted payment rhythm is arranged.", "The charge does not depend on owning a television, radio or computer. It is attached to the dwelling."], callout: { title: "Annual budget", text: "€18.36 × 12 = €220.32 per dwelling each year at the current rate." } },
      { heading: "Moving in and moving out", paragraphs: ["If somebody already pays for the flat, do not create a second household payment. Use the existing contribution number when the service contacts you.", "When moving, update the dwelling details. Exemptions or reductions are status-based and require the relevant evidence; they do not happen automatically because income is low."], bullets: ["Ask the flatmate who is the registered payer.", "Keep the contribution number with your household records.", "Report a move instead of opening a duplicate account."] },
    ],
    faqs: [{ question: "Is €18.36 charged per person?", answer: "No. In the standard case it is charged once per dwelling, regardless of the number of residents." }, { question: "How much is paid every three months?", answer: "€55.08." }],
    sources: [sources.rundfunk], featured: true,
  }),
  guide("anmeldung", {
    title: "Anmeldung: the 14-day deadline and document list",
    description: "The exact Anmeldung deadline, a practical document list and what the two-week rule means after moving into a German home.",
    category: "bureaucracy", eyebrow: "Registration checklist", readingMinutes: 6,
    summary: "The standard federal rule is clear: register within two weeks after moving into a dwelling. The clock starts on the move-in date, not the date you signed the lease.",
    takeaways: ["The statutory deadline is two weeks after moving in.", "The move-in date is the key date for the standard rule.", "The Wohnungsgeberbestätigung is normally central evidence of the move."],
    sections: [
      { heading: "Count the deadline correctly", paragraphs: ["If you move in on 3 March, the standard two-week period runs from that move-in event; it is not delayed because your rental contract began earlier or your name reached the mailbox later.", "Appointments and procedures are municipal, but the 14-day duty comes from federal law. Save proof that you tried to book promptly if the local authority has no appointment within the period."], bullets: ["Move-in: 3 March", "Fourteen-day point: 17 March", "Relevant event: occupying the dwelling"] },
      { heading: "Bring a complete file", paragraphs: ["A practical base file is a valid passport or identity card, the completed municipal registration form where required and the Wohnungsgeberbestätigung signed by the housing provider. Families may need civil-status documents, especially when relationships are not clear from the identity documents.", "A tenancy contract alone is not the same as the Wohnungsgeberbestätigung. Ask the landlord or authorised housing provider for the correct confirmation."], callout: { title: "Core file", text: "Identity document + registration form if required locally + Wohnungsgeberbestätigung. Add family documents when relevant." } },
      { heading: "What registration unlocks", paragraphs: ["After Anmeldung, the registration address feeds other administrative processes. A tax identification number is normally issued after first registration when one does not already exist.", "Keep the Meldebestätigung. Banks, employers and authorities may ask for evidence of the registered address."], bullets: ["Check every name and the address spelling before leaving.", "Store the Meldebestätigung as a permanent record.", "Use Ummeldung for a later move within Germany."] },
    ],
    faqs: [{ question: "Is the deadline 14 working days?", answer: "No. The law says two weeks, not fourteen working days." }, { question: "Does the lease replace the Wohnungsgeberbestätigung?", answer: "No. They are different documents; the housing-provider confirmation is normally required for Anmeldung." }],
    sources: [sources.anmeldung], featured: true,
  }),
  guide("health", {
    title: "German public health insurance cost in 2026",
    description: "Exact 2026 GKV rates, contribution ceilings and salary examples showing the employee health-insurance deduction.",
    category: "healthcare", eyebrow: "2026 insurance figures", readingMinutes: 7,
    summary: "The general GKV rate is 14.6% in 2026, plus a fund-specific additional contribution. The official average additional rate is 2.9%, making 17.5% before the usual employer split.",
    takeaways: ["General GKV rate: 14.6%.", "Official average additional rate for 2026: 2.9%.", "Contributions are capped at €5,812.50 of monthly income."],
    sections: [
      { heading: "Translate percentages into euros", paragraphs: ["Using the official average additional rate, health insurance totals 17.5% of contributory salary. A standard employee and employer generally share that equally, so the employee planning share is 8.75%.", "At €3,000 gross, 8.75% is €262.50 a month. At €4,000 it is €350.00. At the €5,812.50 contribution ceiling it is €508.59. Your actual fund can charge an additional rate above or below the 2.9% average."], bullets: ["€3,000 gross: about €262.50 employee GKV share", "€4,000 gross: about €350.00", "At €5,812.50 ceiling: about €508.59"] },
      { heading: "Do not mix health and long-term care insurance", paragraphs: ["Pflegeversicherung is a separate payslip line. Its base rate is 3.6%; childless members subject to the surcharge face 4.2%. The split also differs in Saxony.", "This means 8.75% is not the complete health-and-care deduction. It is only the employee half of the 14.6% general GKV rate plus the 2.9% average additional rate."], callout: { title: "2026 ceilings", text: "GKV/Pflegeversicherung contribution ceiling: €5,812.50 per month or €69,750 per year. Insurance-compulsion threshold: €6,450 per month or €77,400 per year." } },
      { heading: "Read an offer and payslip", paragraphs: ["Ask which Krankenkasse rate payroll used. The additional contribution belongs to the chosen fund, so two people on the same gross salary can have slightly different deductions.", "The contribution ceiling means salary above €5,812.50 a month does not increase the statutory health contribution indefinitely. Eligibility to remain compulsory in GKV uses the separate €77,400 annual threshold for 2026."], bullets: ["Identify the Krankenkasse.", "Check its exact Zusatzbeitrag.", "Keep health and Pflegeversicherung lines separate."] },
    ],
    faqs: [{ question: "Is the public health rate exactly 17.5%?", answer: "17.5% combines the 14.6% general rate with the official 2.9% average additional rate. Each Krankenkasse sets its actual additional rate." }, { question: "Does the employee pay all of it?", answer: "Normally no. Employer and employee generally split the general and additional GKV contributions equally." }],
    sources: [sources.health], featured: true,
  }),
  guide("allowance", {
    title: "Germany's tax-free basic allowance in 2026: €12,348",
    description: "What the exact 2026 Grundfreibetrag means, why it is not a gross-salary threshold and worked annual examples.",
    category: "money", eyebrow: "2026 tax reference", readingMinutes: 6,
    summary: "The 2026 Grundfreibetrag is €12,348 for a single assessment. It protects that amount of taxable income, not the same amount of gross salary.",
    takeaways: ["2026 basic allowance: €12,348.", "The monthly mathematical equivalent is €1,029, but tax is assessed annually.", "Taxable income and gross salary are different figures."],
    sections: [
      { heading: "Use the threshold correctly", paragraphs: ["The allowance sits inside the income-tax calculation. If taxable income is €12,348, income tax under the basic tariff is €0. At €15,000, tax is calculated on the statutory tariff; it is not a flat tax on the entire amount.", "Gross employment salary is reduced through deductible items and payroll rules before taxable income is established. You cannot compare a gross offer directly with €12,348 and predict the final tax."], bullets: ["Annual allowance: €12,348", "Mathematical monthly equivalent: €1,029", "2025 comparison: €12,096"] },
      { heading: "A realistic payroll example", paragraphs: ["A person earning €1,200 gross for twelve months receives €14,400 gross annually. That does not mean €2,052 is automatically the taxable amount or the tax bill. Social contributions and deductible amounts change the calculation.", "Wage tax withheld during the year is a prepayment method. An income-tax return reconciles the annual position when a return is filed or required."], callout: { title: "Do not call it a salary exemption", text: "The €12,348 figure applies to taxable income. It is not a promise that every worker earning €12,348 gross receives the same net result." } },
      { heading: "Other exact 2026 family figures", paragraphs: ["The child tax allowance plus the care, education and training allowance totals €9,756 per child for both parents in 2026. The tax office compares the tax effect with paid Kindergeld through the statutory assessment.", "For day-to-day budgeting, Kindergeld is the cash figure: €259 per eligible child and month in 2026."], bullets: ["Basic allowance: €12,348", "Combined child allowances: €9,756 per child", "Kindergeld: €259 per eligible child/month"] },
    ],
    faqs: [{ question: "Is €12,348 the amount I can earn gross without tax?", answer: "Not exactly. The figure applies to taxable income, which is calculated differently from gross salary." }, { question: "Is the allowance monthly?", answer: "It is an annual tax figure. €1,029 is only its mathematical monthly equivalent." }],
    sources: [sources.tax], featured: true,
  }),
  guide("kindergeld", {
    title: "Kindergeld in 2026: €259 per child each month",
    description: "The exact 2026 Kindergeld amount, annual totals for one to four children and the six-month retroactive limit.",
    category: "money", eyebrow: "2026 family budget", readingMinutes: 5,
    summary: "Kindergeld is €259 per eligible child per month from January 2026. That is €3,108 a year for one child.",
    takeaways: ["Monthly amount: €259 per eligible child.", "Annual amount: €3,108 per child.", "Retroactive payment is generally limited to six months."],
    sections: [
      { heading: "Budget the exact household amount", paragraphs: ["The amount is the same for each eligible child. One child brings €259 a month, two bring €518, three bring €777 and four bring €1,036.", "Over a full year, those totals are €3,108, €6,216, €9,324 and €12,432 respectively."], bullets: ["1 child: €259/month · €3,108/year", "2 children: €518/month · €6,216/year", "3 children: €777/month · €9,324/year", "4 children: €1,036/month · €12,432/year"] },
      { heading: "Apply before months are lost", paragraphs: ["The Federal Employment Agency states that retroactive Kindergeld payment is limited to six months. If eligibility began earlier, delaying the application can therefore cost real money.", "Existing recipients did not need a new application for the 2026 increase; the payment moved automatically from €255 to €259."], callout: { title: "Six-month example", text: "Six retroactive months for one eligible child equal €1,554. Waiting longer does not extend the general payment limit." } },
      { heading: "Cross-border families", paragraphs: ["EU, EEA and Swiss cases can involve coordination between countries. The €259 German amount is exact, but which country pays first and whether a difference is payable depends on where the parents work and where the child lives.", "Keep birth certificates, residence evidence, tax IDs and employment records together. Those documents are commonly needed to establish the correct entitlement."], bullets: ["Record the month eligibility began.", "Submit all requested family and work evidence.", "Keep the Familienkasse decision and payment schedule."] },
    ],
    faqs: [{ question: "How much is Kindergeld for two children in 2026?", answer: "€518 per month, or €6,216 for twelve months, if both children are eligible." }, { question: "How far back can it be paid?", answer: "The Federal Employment Agency states a six-month limit for retroactive payment." }],
    sources: [sources.child], featured: true,
  }),
  guide("deposit", {
    title: "Rental deposit in Germany: the three-month rule",
    description: "The legal Mietkaution cap, three-instalment right and examples using €700, €900 and €1,200 cold rent.",
    category: "housing", eyebrow: "Rental contract numbers", readingMinutes: 6,
    summary: "For a residential cash deposit, the legal cap is three months of rent excluding separately stated operating costs. A tenant may pay it in three equal monthly instalments.",
    takeaways: ["Maximum cash deposit: three times the monthly Kaltmiete used by §551 BGB.", "The tenant can pay in three equal monthly instalments.", "The landlord must keep the cash deposit separate from their own assets."],
    sections: [
      { heading: "Calculate the cap from cold rent", paragraphs: ["Use the base rent without operating-cost advances or flat charges. If Kaltmiete is €700, the cap is €2,100. At €900 it is €2,700; at €1,200 it is €3,600.", "Do not multiply Warmmiete by three. If a listing shows €900 cold rent plus €250 Nebenkosten, the cash-deposit cap is €2,700, not €3,450."], bullets: ["€700 Kaltmiete → maximum €2,100", "€900 Kaltmiete → maximum €2,700", "€1,200 Kaltmiete → maximum €3,600"] },
      { heading: "Use the instalment right", paragraphs: ["A tenant providing a cash deposit may pay it in three equal monthly instalments. The first is due at the start of the tenancy; the next two are due with the following rent payments.", "For a €2,700 deposit, that is €900 at the start, €900 with the second rent payment and €900 with the third."], callout: { title: "Worked move-in budget", text: "€900 cold rent + €250 costs + first €900 deposit instalment = €2,050 at the start, before furniture and utilities." } },
      { heading: "Protect the money", paragraphs: ["The landlord must hold a cash deposit separately from personal assets under the statutory rule. The tenant is entitled to the proceeds from the protected deposit arrangement.", "Never transfer a deposit simply because somebody sent a key photo. Verify the landlord, contract and property first; fraud protection is separate from the legal deposit cap."], bullets: ["Make the transfer traceable.", "Keep the signed lease and payment proof.", "Record the condition of the flat at handover."] },
    ],
    faqs: [{ question: "Is the cap three months of Warmmiete?", answer: "No. The statutory calculation excludes operating costs shown as a flat amount or advance payment." }, { question: "Can I insist on three instalments?", answer: "For a cash deposit, §551 BGB gives the tenant the right to three equal monthly instalments." }],
    sources: [sources.deposit], featured: true,
  }),
  guide("leave", {
    title: "Paid holiday in Germany: 20 days on a five-day week",
    description: "Germany's statutory holiday minimum converted for five- and six-day schedules, with part-time examples.",
    category: "work", eyebrow: "Employment rights", readingMinutes: 6,
    summary: "The statute states 24 working days based on a six-day working week. For a normal five-day week, that equals 20 paid holiday days a year.",
    takeaways: ["Six-day schedule: at least 24 days.", "Five-day schedule: at least 20 days.", "The full statutory entitlement is first acquired after six months."],
    sections: [
      { heading: "Convert the legal minimum to your schedule", paragraphs: ["The minimum represents four weeks of leave. Multiply the number of regular working days each week by four: five days gives 20, four days gives 16 and three days gives 12.", "The number of hours per day does not drive this conversion. Someone working five short days still needs 20 leave days to receive four full weeks away from work."], bullets: ["6 workdays/week → 24 leave days", "5 workdays/week → 20 leave days", "4 workdays/week → 16 leave days", "3 workdays/week → 12 leave days"] },
      { heading: "Compare the contract with the floor", paragraphs: ["Many contracts offer 25 to 30 days on a five-day week, which is above the statutory minimum. Read whether the contract distinguishes statutory leave from additional contractual leave, because carry-over or expiry terms may differ.", "Public holidays that fall on a normal working day are not deducted as holiday days."], callout: { title: "Offer comparison", text: "30 days on a five-day week gives six weeks of paid leave. 20 days gives the statutory four-week minimum." } },
      { heading: "Starting or leaving during the year", paragraphs: ["The full statutory entitlement is first acquired after six months. Before that, or in some departure situations, partial leave can accrue at one twelfth of the annual entitlement for each full month.", "For a 20-day annual entitlement, one twelfth is 1.67 days per full month; statutory rounding rules apply to qualifying fractions."], bullets: ["Check the weekly working-day pattern.", "Separate statutory and extra contractual days.", "Ask for a written balance when leaving."] },
    ],
    faqs: [{ question: "Why does the law say 24 days?", answer: "The statute uses a six-day working week. The equivalent minimum for a five-day week is 20 days." }, { question: "Is 30 days mandatory?", answer: "No. It is common in some contracts but is above the statutory minimum for a five-day week." }],
    sources: [sources.leave], featured: true,
  }),
  guide("hours", {
    title: "Working hours and notice periods in Germany",
    description: "Exact daily working-time limits, the six-month averaging rule and statutory notice periods during and after Probezeit.",
    category: "work", eyebrow: "Contract reference", readingMinutes: 7,
    summary: "The standard daily ceiling is eight working hours. It can reach ten only when the average returns to eight within six calendar months or 24 weeks.",
    takeaways: ["Standard limit: eight working hours per working day.", "Extension: up to ten hours with the statutory average restored.", "During an agreed Probezeit of up to six months, the statutory notice period can be two weeks."],
    sections: [
      { heading: "Read the eight-hour rule correctly", paragraphs: ["The Working Time Act uses working days from Monday to Saturday, not only a typical office schedule. Eight hours across six working days corresponds to a legal reference of 48 hours a week.", "A ten-hour day is possible only with compensation: the average must return to eight hours per working day over six calendar months or 24 weeks. Collective and sector exceptions can modify details."], bullets: ["Standard day: 8 working hours", "Temporary maximum: 10 working hours", "Averaging window: 6 calendar months or 24 weeks"] },
      { heading: "Separate work from breaks", paragraphs: ["Working time normally excludes statutory rest breaks. A schedule from 09:00 to 17:30 with a 30-minute unpaid break contains eight working hours, not eight and a half.", "For more than six and up to nine working hours, the statutory break total is at least 30 minutes; for more than nine hours it is at least 45 minutes. The normal uninterrupted rest period after work is 11 hours."], callout: { title: "Schedule example", text: "09:00–19:00 with a 45-minute break contains 9 hours 15 minutes of work. It is above nine hours and must fit the compensation rule." } },
      { heading: "Know the statutory notice baseline", paragraphs: ["During an agreed Probezeit, for no longer than six months, the statutory notice period can be two weeks. After that, the employee baseline is four weeks to the fifteenth or the end of a calendar month.", "Longer employer notice periods rise with service: one month after two years, two months after five, three after eight, four after ten, five after twelve, six after fifteen and seven months after twenty years, each to month-end. Collective agreements can set different rules."], bullets: ["Probezeit up to 6 months: 2 weeks", "Employee baseline afterwards: 4 weeks to the 15th or month-end", "Employer after 2 years: 1 month to month-end", "Employer after 5 years: 2 months to month-end"] },
    ],
    faqs: [{ question: "Can my normal day be ten hours?", answer: "Ten hours can be used only when the statutory average is brought back to eight hours within the permitted balancing period, unless a lawful exception applies." }, { question: "Is Probezeit always six months?", answer: "No. It must be agreed, and the special two-week statutory notice rule applies for at most six months." }],
    sources: [sources.hours, sources.notice], featured: true,
  }),
] satisfies Array<Guide & { key: ExactGuideKey }>;

export const exactGuideByKey = new Map(exactGuides.map((item) => [item.key, item]));
