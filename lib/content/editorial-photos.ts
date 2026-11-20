import type { PracticalGuideKey } from "@/lib/content/guides/practical-systems-localized";
import type { ExactGuideKey } from "@/lib/exact-guide-slugs";
import type { HubId, OtherPageId, ToolId } from "@/lib/locale-paths";
import photos from "./editorial-photos.json";

export type EditorialPhoto = {
  src: string;
  width: number;
  height: number;
  alt: Record<string, string> & { en: string };
  source: string;
  author: string;
  license: string;
  licenseUrl: string;
  cropped: boolean;
};

export const editorialPhotos = photos satisfies Record<string, EditorialPhoto>;
type PhotoId = keyof typeof editorialPhotos;

const generalGuidePhotos: Record<string, PhotoId | undefined> = {
  "child-benefits-germany": "families",
  "elterngeld-germany": "newborn",
  "elterngeld-reform-2027": "newborn",
  "primary-school-childcare-germany": "classroom",
  "moving-to-germany": "moving",
  "first-30-days-germany": "moving",
  "anmeldung-germany": "documents",
  wohnungsgeberbestaetigung: "contract",
  "german-tax-id": "tax",
  "german-documents-explained": "documents",
  "newcomer-faq-germany": "moving",
  "finding-housing-germany": "housing",
  "renting-in-germany": "keys",
  "schufa-germany": "banking",
  "working-in-germany": "work",
  "jobs-without-german": "work",
  "minijob-germany": "contract",
  "werkstudent-germany": "student",
  "german-health-insurance": "health",
  "german-bank-account": "banking",
  deutschlandticket: "transport",
  "cost-of-living-germany": "grocery",
  "german-sim-cards": "mobile",
  "internet-germany": "internet",
  "german-supermarkets": "grocery",
  "best-cities-germany": "hamburg",
};

export function generalGuidePhoto(slug: string) {
  const id = generalGuidePhotos[slug];
  return editorialPhotos[id ?? "documents"];
}

export const exactGuidePhotos = {
  minimumWage: "salary",
  minijob: "work",
  midijob: "salary",
  deutschlandticket: "transport",
  rundfunk: "radio",
  anmeldung: "documents",
  health: "health",
  allowance: "tax",
  kindergeld: "families",
  deposit: "keys",
  leave: "holiday",
  hours: "contract",
} satisfies Record<ExactGuideKey, PhotoId>;

export const practicalGuidePhotos = {
  sickLeave: "health",
  doctor: "doctor",
  payslip: "salary",
} satisfies Record<PracticalGuideKey, PhotoId>;

export const hubPhotos = {
  "moving-to-germany": "moving",
  work: "work",
  housing: "housing",
  bureaucracy: "registration",
  money: "salary",
  healthcare: "health",
  transport: "transport",
  "daily-life": "grocery",
  students: "student",
  workers: "contract",
  families: "families",
  freelancers: "tax",
  "eu-citizens": "passport",
  "non-eu-citizens": "passport",
  about: "berlin",
  "editorial-policy": "documents",
  "how-we-research": "work",
  "corrections-policy": "documents",
  "affiliate-disclosure": "contract",
  "advertiser-disclosure": "contract",
  "privacy-policy": "documents",
  "cookie-policy": "work",
  terms: "contract",
  contact: "work",
} satisfies Record<HubId, PhotoId>;

export const toolPhotos = {
  "anmeldung-finder": "registration",
  "cost-of-living": "grocery",
  "compare-cities": "frankfurt",
  "document-checklist": "documents",
  "rental-scam-checker": "keys",
  "first-30-days": "moving",
  "apartment-affordability": "housing",
  "salary-calculator": "salary",
  "employment-types": "contract",
  "rental-deposit": "keys",
} satisfies Record<ToolId, PhotoId>;

export const resourcePhotos = {
  plan: "moving",
  visa: "passport",
  glossary: "documents",
  authorities: "registration",
  emergency: "doctor",
  "data-status": "documents",
  "costs-deadlines": "tax",
  "explore-germany": "dresden",
} satisfies Record<OtherPageId, PhotoId>;
