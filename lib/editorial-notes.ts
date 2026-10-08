export type EditorialNote = {
  heading: string;
  text: string;
  checks: string[];
};

export const editorialNotes: Record<string, EditorialNote> = {
  "sick-leave-germany": {
    heading: "Separate notification from the medical certificate",
    text: "The most common misunderstanding is assuming the eAU tells the employer everything automatically. It does not: the employee still has to report the absence, while the medical data follows through the electronic process where applicable.",
    checks: ["Tell the employer promptly.", "Check whether your employer requires medical confirmation from day one.", "Re-check the rule if the planned 2026 reform is implemented later."],
  },
  "finding-doctor-germany": {
    heading: "Set up your healthcare route before you need it",
    text: "Finding one nearby Hausarzt while you are healthy is much easier than decoding the system when you are ill. Keep normal care, urgent out-of-hours care and emergencies as three separate routes.",
    checks: ["Save one or two nearby Hausarzt practices.", "Save 116117 for urgent non-life-threatening care and appointment help.", "Use 112 for life-threatening emergencies."],
  },
  "german-payslip-explained": {
    heading: "Check inputs before questioning the tax calculation",
    text: "A payroll statement can look complicated while the underlying problem is simple: wrong hours, missing bonus, changed tax data or a correction from another month. Start with gross pay and the final transfer, then trace the deductions between them.",
    checks: ["Compare gross pay with the contract and hours worked.", "Compare changed lines with the previous month.", "Ask payroll which input changed before assuming a tax error."],
  },
  "moving-to-germany": {
    heading: "Start with dependencies, not shopping",
    text: "The easiest way to waste time before a move is to arrange optional services before the documents that unlock everything else. Secure registrable housing, health-insurance status and the documents needed for Anmeldung first; then deal with phone plans, subscriptions and other extras.",
    checks: ["Can the accommodation issue a Wohnungsgeberbestätigung?", "Do you know which health-insurance route applies to you?", "Have you saved originals and digital copies of the documents you will need after arrival?"],
  },
  "first-30-days-germany": {
    heading: "Treat the first month as a sequence",
    text: "Many German admin tasks depend on an earlier one. A practical order is housing → Anmeldung → identifiers and insurance → banking and recurring services. Doing them in that order avoids chasing documents that cannot yet exist.",
    checks: ["Book time-sensitive appointments early.", "Keep every confirmation letter until all identifiers have arrived.", "Use the exact name and address format consistently across registrations."],
  },
  "anmeldung-germany": {
    heading: "The bottleneck is often the landlord document",
    text: "Before focusing on the appointment, confirm that your accommodation can actually be registered and that you will receive a Wohnungsgeberbestätigung. Without the correct housing confirmation, an appointment alone does not solve the registration problem.",
    checks: ["Confirm registration is allowed before paying long-term housing costs.", "Check your municipality's current appointment or walk-in process.", "Bring the original documents requested by the local Bürgeramt."],
  },
  "finding-housing-germany": {
    heading: "Compare real monthly cost, not the headline rent",
    text: "A listing's Kaltmiete is not the amount that leaves your account each month. Compare Warmmiete, expected electricity/internet, deposit timing and transport cost together. That gives a much more useful housing budget.",
    checks: ["Use Warmmiete for monthly comparisons.", "Never transfer a deposit before verifying the property and contract.", "Check whether Anmeldung is possible at the address."],
  },
  "renting-in-germany": {
    heading: "Read the handover details as carefully as the rent",
    text: "The contract matters, but so does the Übergabeprotokoll. Record meter readings, keys, visible damage and the condition of the flat at handover. Those details are what you may need months later when the deposit is returned.",
    checks: ["Photograph existing damage at move-in.", "Keep proof of every deposit payment.", "Store the signed contract and handover protocol together."],
  },
  "werkstudent-germany": {
    heading: "Do not reduce the rule to '20 hours = allowed'",
    text: "The 20-hour framework is mainly about student social-insurance status, and exceptions can depend on when the hours are worked and how long the situation lasts. Compare your actual semester schedule and contract with the current insurer guidance instead of relying on a one-line rule.",
    checks: ["Check weekly hours during lecture periods.", "Ask the health insurer when an exception may affect status.", "Compare gross pay with the deductions shown on the payslip."],
  },
  "german-health-insurance": {
    heading: "Choose the insurance route before comparing extras",
    text: "For newcomers, the important question is first which system and status apply—not which insurer has the nicest app. Employment, student status, family insurance and previous coverage can change the route.",
    checks: ["Confirm whether public insurance is compulsory, optional or not applicable.", "Check when coverage starts.", "Keep the membership confirmation needed by employers or universities."],
  },
  "german-bank-account": {
    heading: "A German IBAN is useful, but not every task depends on it",
    text: "Separate what truly requires a local account from what can wait. Salary, rent and direct debits are the main practical reasons to set banking up early; do not delay urgent registration or insurance tasks just because the account is not ready yet.",
    checks: ["Compare account fees after any free period.", "Check cash-withdrawal conditions.", "Keep enough liquidity outside the new account during the first weeks."],
  },
  "deutschlandticket": {
    heading: "The ticket is powerful, but it is not an all-trains pass",
    text: "The Deutschlandticket is designed for participating local and regional transport. Before a longer trip, check the specific train category: an itinerary that includes ICE, IC or EC normally needs a separate ticket for that segment.",
    checks: ["Check whether the subscription renews automatically.", "Use the operator's live journey planner before long trips.", "Compare student or employer variants if you are eligible."],
  },
  "cost-of-living-germany": {
    heading: "Your rent dominates the result",
    text: "National averages are useful for orientation, but a realistic budget starts with the Warmmiete of the city and flat you would actually choose. Then add food, transport, insurance, phone/internet and a buffer for one-off setup costs.",
    checks: ["Use a real current housing listing as the rent input.", "Separate recurring costs from move-in costs.", "Keep a buffer for deposits, furniture and first-month admin expenses."],
  },
};

export const defaultEditorialNote: EditorialNote = {
  heading: "Check the live source before acting",
  text: "GermanyBase turns official rules into a practical route, but appointments, prices, eligibility and local procedures can change. Use the guide to understand the process, then confirm the time-sensitive detail with the linked authority.",
  checks: ["Prefer the responsible authority over an old forum post.", "Check the page's review date.", "Treat city-specific procedures as local, not national rules."],
};
