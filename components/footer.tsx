"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { sectionPath, hubPath, type HubKey } from "@/lib/localized-paths";
import { siteConfig } from "@/lib/site";

type Lang = "en" | "es" | "de";
const pages = {
  en: {
    intro: "Independent practical guidance for life in Germany.",
    disclaimer: "We are not a government body. Information does not replace legal, tax, medical, immigration or financial advice.",
    explore: "Explore", people: "For you", trust: "Trust", bottom: "Made to clarify, not complicate.",
    sections: ["Moving", "Work", "Housing", "Paperwork", "Healthcare", "Money", "Transport", "Daily life"],
    audience: ["Students", "Workers", "Families", "Freelancers", "EU citizens", "Non-EU citizens"],
    legal: ["About us", "Editorial policy", "How we research", "Corrections", "Affiliate disclosure", "Advertising disclosure", "Privacy", "Cookies", "Terms", "Contact"],
    guides: "All guides", cities: "Cities",
  },
  es: {
    intro: "Información práctica e independiente para vivir en Alemania.",
    disclaimer: "No somos un organismo público. Esta información no sustituye el asesoramiento jurídico, fiscal, médico, migratorio o financiero.",
    explore: "Explorar", people: "Para ti", trust: "Transparencia", bottom: "Información clara para decidir mejor.",
    sections: ["Mudanza", "Trabajo", "Vivienda", "Trámites", "Salud", "Dinero", "Transporte", "Vida diaria"],
    audience: ["Estudiantes", "Trabajadores", "Familias", "Autónomos", "Ciudadanos de la UE", "Ciudadanos no comunitarios"],
    legal: ["Quiénes somos", "Política editorial", "Cómo investigamos", "Correcciones", "Afiliación", "Publicidad", "Privacidad", "Cookies", "Condiciones", "Contacto"],
    guides: "Todas las guías", cities: "Ciudades",
  },
  de: {
    intro: "Unabhängige, praktische Informationen für das Leben in Deutschland.",
    disclaimer: "Wir sind keine Behörde. Diese Informationen ersetzen keine Rechts-, Steuer-, medizinische, Einwanderungs- oder Finanzberatung.",
    explore: "Entdecken", people: "Für Sie", trust: "Transparenz", bottom: "Klarheit statt Komplexität.",
    sections: ["Umzug", "Arbeit", "Wohnen", "Behörden", "Gesundheit", "Finanzen", "Verkehr", "Alltag"],
    audience: ["Studierende", "Arbeitnehmende", "Familien", "Selbstständige", "EU-Bürger", "Nicht-EU-Bürger"],
    legal: ["Über uns", "Redaktionelle Leitlinien", "Unsere Recherche", "Korrekturen", "Affiliate-Hinweise", "Werbehinweise", "Datenschutz", "Cookies", "Nutzungsbedingungen", "Kontakt"],
    guides: "Alle Ratgeber", cities: "Städte",
  },
} as const;

const sectionSlugs = ["moving-to-germany", "work", "housing", "bureaucracy", "healthcare", "money", "transport", "daily-life"] as const;
const audienceSlugs = ["students", "workers", "families", "freelancers", "eu-citizens", "non-eu-citizens"] as const;
const legalSlugs = ["about", "editorial-policy", "how-we-research", "corrections-policy", "affiliate-disclosure", "advertiser-disclosure", "privacy-policy", "cookie-policy", "terms", "contact"] as const;

export function Footer() {
  const pathname = usePathname();
  const section = pathname.split("/").filter(Boolean)[0];
  const locale: Lang = section === "es" || section === "de" ? section : "en";
  const copy = pages[locale];
  const prefix = "/" + locale;
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link href={prefix} className="brand">
            <Image className="brand-logo footer-brand-logo" src="/germanybase-logo.png" alt={siteConfig.name} width={300} height={100} />
          </Link>
          <p>{copy.intro}</p><p className="disclaimer">{copy.disclaimer}</p>
        </div>
        <div>
          <h2>{copy.explore}</h2>
          {sectionSlugs.map((slug, index) => <Link href={hubPath(locale, slug as HubKey)} key={slug}>{copy.sections[index]}</Link>)}
          <Link href={sectionPath(locale, "guides")}>{copy.guides}</Link>
          <Link href={sectionPath(locale, "cities")}>{copy.cities}</Link>
        </div>
        <div>
          <h2>{copy.people}</h2>
          {audienceSlugs.map((slug, index) => <Link href={prefix + "/" + slug} key={slug}>{copy.audience[index]}</Link>)}
        </div>
        <div>
          <h2>{copy.trust}</h2>
          {legalSlugs.map((slug, index) => <Link href={prefix + "/" + slug} key={slug}>{copy.legal[index]}</Link>)}
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        <span>{copy.bottom}</span>
      </div>
    </footer>
  );
}
