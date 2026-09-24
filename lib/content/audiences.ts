import type { Audience } from "@/lib/types";

export const audiences: Audience[] = [
  {
    slug: "students",
    name: "Students",
    description: "A practical route through housing, health cover, student work, registration, and everyday setup.",
    priorities: ["Confirm your study and residence requirements", "Secure an address you can register", "Clarify health insurance before enrolment", "Understand student-work limits for your status"],
    guideSlugs: ["first-30-days-germany", "finding-housing-germany", "werkstudent-germany", "german-health-insurance", "german-bank-account", "german-sim-cards"],
  },
  {
    slug: "workers",
    name: "Workers",
    description: "Start with the documents, salary concepts, insurance, and housing questions that affect a new job.",
    priorities: ["Check your right to work", "Read the full employment contract", "Complete address registration", "Set up insurance and payroll details"],
    guideSlugs: ["working-in-germany", "jobs-without-german", "first-30-days-germany", "german-tax-id", "german-health-insurance", "cost-of-living-germany"],
  },
  {
    slug: "families",
    name: "Families",
    description: "Coordinate housing, registration, healthcare, childcare research, and daily mobility as one move.",
    priorities: ["Map every family member's documentation", "Research childcare or schools early", "Choose housing around daily journeys", "Confirm family health coverage"],
    guideSlugs: ["moving-to-germany", "finding-housing-germany", "renting-in-germany", "german-health-insurance", "cost-of-living-germany", "best-cities-germany"],
  },
  {
    slug: "freelancers",
    name: "Freelancers",
    description: "Find the right official path for residence, registration, tax, insurance, and invoicing.",
    priorities: ["Confirm whether your activity is freelance or commercial", "Check residence permissions before working", "Get professional tax guidance where needed", "Plan for insurance and irregular income"],
    guideSlugs: ["moving-to-germany", "anmeldung-germany", "german-tax-id", "german-health-insurance", "german-bank-account", "cost-of-living-germany"],
  },
  {
    slug: "eu-citizens",
    name: "EU citizens",
    description: "An arrival plan focused on registration, work, insurance, housing, and proof of your local setup.",
    priorities: ["Bring complete identity and civil-status documents", "Secure registrable accommodation", "Register your address locally", "Set up work, insurance, banking, and tax records"],
    guideSlugs: ["moving-to-germany", "first-30-days-germany", "anmeldung-germany", "finding-housing-germany", "german-health-insurance", "german-bank-account"],
  },
  {
    slug: "non-eu-citizens",
    name: "Non-EU citizens",
    description: "Sequence immigration, work, housing, insurance, and local registration without relying on generic advice.",
    priorities: ["Use an official visa eligibility source", "Keep permit and work conditions aligned", "Prepare originals and certified documents", "Track appointments and expiry dates"],
    guideSlugs: ["moving-to-germany", "first-30-days-germany", "working-in-germany", "anmeldung-germany", "german-health-insurance", "finding-housing-germany"],
  },
];

export const audienceMap = new Map(audiences.map((audience) => [audience.slug, audience]));
