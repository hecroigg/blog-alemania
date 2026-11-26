export const moveExamples = [
  { coldRent: 400, rent: 550, setup: 350, reserve: 1100 },
  { coldRent: 650, rent: 850, setup: 550, reserve: 1400 },
];

export function moveBudget(coldRent: number, rent: number, setup: number, reserve: number) {
  const deposit = 3 * coldRent;
  const base = rent + setup + reserve;
  return { deposit, full: base + deposit, first: base + coldRent };
}

export const cityBudgetDefaults = { income: 1800, expenses: 600, reserve: 200 };
export const cityRentExamples = [
  { city: "Leipzig", id: "leipzig", rent: 700 },
  { city: "Mannheim", id: "mannheim", rent: 850 },
  { city: "Berlin", id: "berlin", rent: 1050 },
  { city: "München", id: "munich", rent: 1200 },
];

export function cityBudget(income: number, rent: number, expenses: number, reserve: number) {
  const maxRent = income - expenses - reserve;
  return { maxRent, remainder: maxRent - rent };
}

export function euros(locale: string, value: number, digits = 0) {
  return new Intl.NumberFormat(`${locale}-DE`, {
    style: "currency",
    currency: "EUR",
    useGrouping: "always",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}
