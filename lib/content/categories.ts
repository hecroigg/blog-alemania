import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "moving-to-germany",
    name: "Moving to Germany",
    shortName: "Move",
    description: "Plan the move, arrive prepared, and handle your first weeks with confidence.",
    intro:
      "Moving countries creates dozens of interdependent tasks. This hub puts them in a sensible order, separates universal steps from visa-specific ones, and points you to the official authority when the answer depends on your nationality or circumstances.",
    icon: "building",
    color: "blue",
    featuredTopics: ["Arrival planning", "First 30 days", "Documents", "Cost of living"],
  },
  {
    slug: "work",
    name: "Working in Germany",
    shortName: "Work",
    description: "Understand job searches, contracts, salary, workplace rights, and common job types.",
    intro:
      "Learn how the German labour market works before you sign. Our guides explain the vocabulary, documents, and decisions behind finding a role, reading a contract, and understanding your payslip.",
    icon: "briefcase",
    color: "coral",
    featuredTopics: ["Job search", "Contracts", "Salary", "Minijob & Werkstudent"],
  },
  {
    slug: "housing",
    name: "Housing",
    shortName: "Housing",
    description: "Find a home, understand German rental terms, and avoid common application mistakes.",
    intro:
      "Germany's rental market has its own language and paperwork. Start here for a realistic application plan, explanations of warm and cold rent, deposits, SCHUFA, utilities, and tenant basics.",
    icon: "home",
    color: "gold",
    featuredTopics: ["Finding a home", "Rental contracts", "SCHUFA", "Utilities"],
  },
  {
    slug: "bureaucracy",
    name: "Bureaucracy",
    shortName: "Bureaucracy",
    description: "Plain-English help with Anmeldung, identification numbers, permits, and official letters.",
    intro:
      "German administration becomes easier when you know which office owns each process and which document unlocks the next step. These guides translate the system without pretending that one answer fits every municipality.",
    icon: "document",
    color: "violet",
    featuredTopics: ["Anmeldung", "Tax ID", "Residence", "Official documents"],
  },
  {
    slug: "money",
    name: "Money & taxes",
    shortName: "Money",
    description: "Banking, taxes, everyday payments, and financial basics—explained without sales pressure.",
    intro:
      "Set up the financial essentials and understand the terms you will encounter at work and at home. Our information is independent and educational; it is not personal financial or tax advice.",
    icon: "wallet",
    color: "mint",
    featuredTopics: ["Bank accounts", "Tax basics", "Cost of living", "SCHUFA"],
  },
  {
    slug: "healthcare",
    name: "Healthcare & insurance",
    shortName: "Healthcare",
    description: "Navigate health cover, doctors, pharmacies, and useful insurance vocabulary.",
    intro:
      "Health insurance is a core part of living in Germany. We explain the structure, the questions to ask, and where to confirm eligibility—without offering medical advice or oversimplifying personal coverage decisions.",
    icon: "health",
    color: "red",
    featuredTopics: ["Health insurance", "Public vs private", "Finding a doctor", "Emergencies"],
  },
  {
    slug: "transport",
    name: "Transport",
    shortName: "Transport",
    description: "Use local transit and long-distance rail, and understand tickets before you travel.",
    intro:
      "From local transport associations to Deutsche Bahn, Germany has an extensive but layered network. These guides explain the ticket types and terminology, with links to operators for current conditions and prices.",
    icon: "train",
    color: "sky",
    featuredTopics: ["Deutschlandticket", "Deutsche Bahn", "Local transport", "Driving"],
  },
  {
    slug: "daily-life",
    name: "Daily life",
    shortName: "Daily life",
    description: "Practical help for shopping, connectivity, recycling, language, and local habits.",
    intro:
      "Small systems shape everyday life: Pfand deposits, Sunday opening rules, mobile plans, bins, payments, and appointments. Learn the patterns once and spend less energy decoding them later.",
    icon: "sun",
    color: "orange",
    featuredTopics: ["SIM cards", "Home internet", "Supermarkets", "Everyday etiquette"],
  },
];

export const categoryMap = new Map(categories.map((category) => [category.slug, category]));
