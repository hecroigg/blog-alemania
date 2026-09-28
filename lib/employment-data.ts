export const employmentFigures = {
  year: 2026,
  minimumWage: { 2026: 13.9, 2027: 14.6 },
  minijobLimit: { 2026: 603, 2027: 633 },
  midijobLower: 603.01,
  midijobUpper: 2_000,
  monthlyHoursFactor: 52 / 12,
  employeeLumpSum: 1_230,
  singleParentRelief: 4_260,
  solidarityExemption: 20_350,
  healthCareCeilingMonthly: 5_812.5,
  pensionUnemploymentCeilingMonthly: 8_450,
  rates: {
    pensionEmployee: 0.093,
    minijobPensionEmployee: 0.036,
    healthBaseTotal: 0.146,
    healthAdditionalAverageTotal: 0.029,
    careTotal: 0.036,
    careChildlessSurcharge: 0.006,
    unemploymentTotal: 0.026,
  },
  midijob: {
    employeeFactor: 1.43163922691,
    employeeOffset: 863.2784538207,
    totalFactor: 1.1459372226,
    totalOffset: 291.8744452399,
  },
} as const;

export const employmentSources = [
  {
    name: "Minijob-Zentrale — 2026 earnings limit",
    url: "https://www.minijob-zentrale.de/DE/die-minijobs/minijob-mit-verdienstgrenze/minijob-mit-verdienstgrenze_node.html",
    note: "Official Minijob threshold, earnings and contribution guidance.",
  },
  {
    name: "Federal Ministry of Labour — minimum wage",
    url: "https://www.bmas.de/DE/Service/Gesetze-und-Gesetzesvorhaben/fuenfte-mindestlohnanpassungsverordnung-milov5.html",
    note: "Official €13.90 rate for 2026 and €14.60 rate for 2027.",
  },
  {
    name: "German Pension Insurance — Midijob transition zone",
    url: "https://www.deutsche-rentenversicherung.de/DRV/DE/Experten/Arbeitgeber-und-Steuerberater/summa-summarum/Lexikon/U/uebergangsbereich",
    note: "Official 2026 limits and reduced employee contribution formula.",
  },
  {
    name: "German Pension Insurance — Werkstudent rules",
    url: "https://www.deutsche-rentenversicherung.de/DRV/DE/Experten/Arbeitgeber-und-Steuerberater/summa-summarum/Lexikon/W/werkstudentenprivileg",
    note: "Official 20-hour and 26-week framework.",
  },
  {
    name: "Federal Ministry of Health — 2026 contributions",
    url: "https://www.bundesgesundheitsministerium.de/beitraege/seite",
    note: "Official health rate, average additional rate and contribution ceiling.",
  },
  {
    name: "Federal Ministry of Health — care insurance",
    url: "https://www.bundesgesundheitsministerium.de/themen/pflege/online-ratgeber-pflege/die-pflegeversicherung/finanzierung",
    note: "Official care-insurance rates and childless surcharge.",
  },
  {
    name: "Federal Ministry of Labour — 2026 social-insurance ceilings",
    url: "https://www.bmas.de/DE/Service/Gesetze-und-Gesetzesvorhaben/sozialversicherungs-rechengroessenverordnung-2026.html",
    note: "Official monthly and annual contribution ceilings.",
  },
  {
    name: "Federal Ministry of Finance — 2026 income-tax formula",
    url: "https://ksth.bundesfinanzministerium.de/lsth/2026/A-Einkommensteuergesetz/IV-Tarif-31-34b/Paragraf-32a/inhalt.html",
    note: "Official §32a tariff formula and basic allowance.",
  },
] as const;

export type TaxClass = "I" | "II" | "III" | "IV" | "V" | "VI";
export type InsuranceType = "statutory" | "private";

export type SalaryInputs = {
  grossMonthly: number;
  weeklyHours: number;
  taxClass: TaxClass;
  state: string;
  churchTax: boolean;
  insurance: InsuranceType;
  privateMonthlyPremium: number;
  age: number;
  children: number;
  student: boolean;
  minijobPensionExempt: boolean;
};

export type SalaryResult = {
  employmentType: "Minijob" | "Midijob" | "Werkstudent" | "Regular employment";
  grossMonthly: number;
  netMonthly: number;
  grossAnnual: number;
  netAnnual: number;
  grossHourly: number;
  netHourly: number;
  taxableAnnualEstimate: number;
  contributionBaseMonthly: number;
  deductions: {
    wageTax: number;
    solidarity: number;
    churchTax: number;
    pension: number;
    health: number;
    care: number;
    unemployment: number;
  };
  belowMinimumWage: boolean;
};

function clamp(value: number, minimum = 0, maximum = Number.POSITIVE_INFINITY) {
  return Math.min(maximum, Math.max(minimum, Number.isFinite(value) ? value : 0));
}

export function incomeTax2026(taxableIncome: number) {
  const x = Math.floor(Math.max(0, taxableIncome));
  if (x <= 12_348) return 0;
  if (x <= 17_799) {
    const y = (x - 12_348) / 10_000;
    return (914.51 * y + 1_400) * y;
  }
  if (x <= 69_878) {
    const z = (x - 17_799) / 10_000;
    return (173.1 * z + 2_397) * z + 1_034.87;
  }
  if (x <= 277_825) return 0.42 * x - 11_135.63;
  return 0.45 * x - 19_470.38;
}

export function midijobEmployeeContributionBase(grossMonthly: number) {
  if (grossMonthly <= employmentFigures.minijobLimit[2026]) return 0;
  if (grossMonthly >= employmentFigures.midijobUpper) return grossMonthly;
  return clamp(
    employmentFigures.midijob.employeeFactor * grossMonthly - employmentFigures.midijob.employeeOffset,
    0,
    grossMonthly,
  );
}

function estimatedWageTax(taxableAnnual: number, taxClass: TaxClass) {
  if (taxClass === "II") return incomeTax2026(Math.max(0, taxableAnnual - employmentFigures.singleParentRelief));
  if (taxClass === "III") return 2 * incomeTax2026(taxableAnnual / 2);
  const base = incomeTax2026(taxableAnnual);
  if (taxClass === "V") return base * 1.25;
  if (taxClass === "VI") return base * 1.35;
  return base;
}

export function calculateSalary(inputs: SalaryInputs): SalaryResult {
  const grossMonthly = clamp(inputs.grossMonthly);
  const grossAnnual = grossMonthly * 12;
  const hoursMonthly = clamp(inputs.weeklyHours) * employmentFigures.monthlyHoursFactor;
  const grossHourly = hoursMonthly > 0 ? grossMonthly / hoursMonthly : 0;
  const isMinijob = grossMonthly > 0 && grossMonthly <= employmentFigures.minijobLimit[2026];
  const isMidijob = grossMonthly >= employmentFigures.midijobLower && grossMonthly <= employmentFigures.midijobUpper;
  const isWerkstudent = inputs.student && !isMinijob && inputs.weeklyHours > 0 && inputs.weeklyHours <= 20;
  const contributionBaseMonthly = isMidijob ? midijobEmployeeContributionBase(grossMonthly) : grossMonthly;

  let pension = 0;
  let health = 0;
  let care = 0;
  let unemployment = 0;
  let wageTax = 0;
  let solidarity = 0;
  let churchTax = 0;

  if (isMinijob) {
    pension = inputs.minijobPensionExempt ? 0 : grossMonthly * employmentFigures.rates.minijobPensionEmployee;
  } else {
    const pensionBase = Math.min(contributionBaseMonthly, employmentFigures.pensionUnemploymentCeilingMonthly);
    pension = pensionBase * employmentFigures.rates.pensionEmployee;

    if (!isWerkstudent) {
      unemployment = pensionBase * (employmentFigures.rates.unemploymentTotal / 2);
      if (inputs.insurance === "statutory") {
        const healthBase = Math.min(contributionBaseMonthly, employmentFigures.healthCareCeilingMonthly);
        health = healthBase * ((employmentFigures.rates.healthBaseTotal + employmentFigures.rates.healthAdditionalAverageTotal) / 2);
        const saxonyExtra = inputs.state === "Saxony" ? 0.005 : 0;
        const childlessExtra = inputs.age >= 23 && inputs.children === 0 ? employmentFigures.rates.careChildlessSurcharge : 0;
        care = healthBase * (employmentFigures.rates.careTotal / 2 + saxonyExtra + childlessExtra);
      } else {
        health = clamp(inputs.privateMonthlyPremium);
      }
    }

    const socialAnnual = (pension + health + care + unemployment) * 12;
    const taxableAnnualEstimate = Math.max(0, grossAnnual - socialAnnual - employmentFigures.employeeLumpSum);
    wageTax = estimatedWageTax(taxableAnnualEstimate, inputs.taxClass) / 12;
    const annualWageTax = wageTax * 12;
    solidarity = annualWageTax <= employmentFigures.solidarityExemption
      ? 0
      : Math.min(annualWageTax * 0.055, (annualWageTax - employmentFigures.solidarityExemption) * 0.119) / 12;
    if (inputs.churchTax) churchTax = wageTax * (["Bavaria", "Baden-Württemberg"].includes(inputs.state) ? 0.08 : 0.09);
  }

  const deductions = { wageTax, solidarity, churchTax, pension, health, care, unemployment };
  const monthlyDeductions = Object.values(deductions).reduce((sum, value) => sum + value, 0);
  const netMonthly = Math.max(0, grossMonthly - monthlyDeductions);
  const taxableAnnualEstimate = Math.max(0, grossAnnual - (pension + health + care + unemployment) * 12 - employmentFigures.employeeLumpSum);

  return {
    employmentType: isMinijob ? "Minijob" : isWerkstudent ? "Werkstudent" : isMidijob ? "Midijob" : "Regular employment",
    grossMonthly,
    netMonthly,
    grossAnnual,
    netAnnual: netMonthly * 12,
    grossHourly,
    netHourly: hoursMonthly > 0 ? netMonthly / hoursMonthly : 0,
    taxableAnnualEstimate,
    contributionBaseMonthly,
    deductions,
    belowMinimumWage: hoursMonthly > 0 && grossHourly < employmentFigures.minimumWage[2026],
  };
}
