import type { Metadata } from "next";
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import PlanPage from "@/app/plan/page";
import VisasPage from "@/app/visas-residence/page";
import CostsPage from "@/app/costs-deadlines/page";
import AuthoritiesPage from "@/app/authorities/page";
import EmergencyPage from "@/app/emergency/page";
import DataPage from "@/app/data-status/page";
import GlossaryPage from "@/app/glossary/page";
import ExplorePage from "@/app/explore-germany/page";
import { SearchContent } from "@/components/search-content";
import { generalEnglishGuides, localizedGeneralGuide } from "@/lib/content/localized-general-guides";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { guideMap } from "@/lib/content/guides";
import { localizedGeneralPath } from "@/lib/content/localized-general-guides";
import {
  auxiliaryPath, auxiliarySlugs, matchAuxiliary, sectionPath, cityPath,
  toolPath, matchTool, matchHub, hubPath,
  type AuxiliaryKey, type SiteLocale,
} from "@/lib/localized-paths";
import { absoluteUrl } from "@/lib/site";
import esCatalog from "@/lib/translations/es.json";
import deCatalog from "@/lib/translations/de.json";

const catalogs: Record<"es" | "de", Record<string, string>> = {
  es: esCatalog as Record<string, string>, de: deCatalog as Record<string, string>,
};

const descriptions: Record<AuxiliaryKey, { title: string; description: string }> = {
  plan: { title: "Plan your move to Germany", description: "Build a personalised route for moving to Germany based on nationality, purpose, destination, housing and insurance status." },
  visas: { title: "Visas and residence in Germany", description: "Start with citizenship group and purpose to understand the correct official route for moving to Germany." },
  costs: { title: "Germany costs, taxes and deadlines — verified 2026 figures", description: "Official 2026 figures for the Deutschlandticket, BahnCard, Anmeldung, Rundfunkbeitrag, visa fees, tax thresholds, insurance and minimum wage." },
  authorities: { title: "Where do I have to go in Germany?", description: "Find the right German authority for address registration, immigration, tax, work, health insurance and university matters." },
  emergency: { title: "Emergency and important numbers in Germany", description: "Verified emergency, police and urgent medical contacts in Germany, with clear guidance on when to use each service." },
  data: { title: "Data status and update log", description: "See the source, verification date, geography and status of changing values used by GermanyBase tools." },
  glossary: { title: "German bureaucracy glossary", description: "Plain-language explanations of essential German immigration, registration, tax and insurance terms." },
  explore: { title: "Explore Germany", description: "Explore Germany's 16 federal states and practical city profiles for moving, work, study and daily life." },
  search: { title: "Search", description: "Search GermanyBase's practical guides and tools." },
};

const languages = ["en", "es", "de"] as const;
const t = (locale: SiteLocale, value: string) => {
  if (locale === "en") return value;
  const trimmed = value.trim();
  const translated = catalogs[locale][trimmed];
  if (!translated) return value;
  return value.slice(0, value.indexOf(trimmed)) + translated + value.slice(value.indexOf(trimmed) + trimmed.length);
};

function localLink(locale: SiteLocale, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const [pathname, query] = href.split(/(?=[?#])/);
  const suffix = query || "";
  const parts = pathname.split("/").filter(Boolean);
  if (!parts.length) return "/" + locale + suffix;

  if (parts[0] === "guides") {
    if (!parts[1]) return sectionPath(locale, "guides") + suffix;
    const guide = guideMap.get(parts[1]);
    return guide ? localizedGeneralPath(locale, guide.slug)! + suffix : sectionPath(locale, "guides") + suffix;
  }
  if (parts[0] === "cities") {
    return (parts[1] ? cityPath(locale, parts[1]) : sectionPath(locale, "cities")) + suffix;
  }
  if (parts[0] === "tools") {
    const tool = parts[1] ? matchTool("en", parts[1]) : null;
    return (tool ? toolPath(locale, tool) : sectionPath(locale, "tools")) + suffix;
  }
  if (parts[0] === "trabajo") {
    if (parts[1] === "calculadora-salario") return toolPath(locale, "salary") + suffix;
    if (parts[1] === "tipos-de-empleo") return toolPath(locale, "employment") + suffix;
  }
  const aux = matchAuxiliary("en", parts[0]);
  if (aux) return auxiliaryPath(locale, aux) + suffix;
  const hub = matchHub("en", parts[0]);
  if (hub) return hubPath(locale, hub) + suffix;
  return href;
}

type LocalProps = {
  children?: ReactNode;
  href?: string;
  title?: string;
  placeholder?: string;
  "aria-label"?: string;
  items?: Array<{ label: string; href?: string }>;
};
function translateTree(node: ReactNode, locale: SiteLocale): ReactNode {
  if (typeof node === "string") return t(locale, node);
  if (Array.isArray(node)) return node.map((item) => translateTree(item, locale));
  if (!isValidElement<LocalProps>(node)) return node;
  const props: Partial<LocalProps> = {};
  if (node.props.children !== undefined)
    props.children = Children.map(node.props.children, (item) => translateTree(item, locale));
  if (node.props.href) props.href = localLink(locale, node.props.href);
  if (node.props.title) props.title = t(locale, node.props.title);
  if (node.props.placeholder) props.placeholder = t(locale, node.props.placeholder);
  if (node.props["aria-label"]) props["aria-label"] = t(locale, node.props["aria-label"]);
  if (node.props.items) props.items = node.props.items.map((item) => ({
    ...item, label: t(locale, item.label),
    ...(item.href ? { href: localLink(locale, item.href) } : {}),
  }));
  return cloneElement(node as ReactElement<LocalProps>, props);
}

export const auxiliaryKeys = Object.keys(auxiliarySlugs) as AuxiliaryKey[];

export function auxiliaryMetadata(locale: SiteLocale, slug: string): Metadata {
  const key = matchAuxiliary(locale, slug);
  if (!key) return {};
  const info = descriptions[key];
  const url = absoluteUrl(auxiliaryPath(locale, key));
  return {
    title: t(locale, info.title).trim(), description: t(locale, info.description).trim(),
    alternates: {
      canonical: url,
      ...(key === "search" ? {} : {
        languages: Object.fromEntries(languages.map((lang) => [lang, absoluteUrl(auxiliaryPath(lang, key))])),
      }),
    },
    robots: key === "search" ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { title: t(locale, info.title).trim(), description: t(locale, info.description).trim(), url, locale },
  };
}

export async function LocalizedAuxiliaryPage({ locale, slug, q }: { locale: SiteLocale; slug: string; q?: string }) {
  const key = matchAuxiliary(locale, slug);
  if (!key) return null;
  let page: ReactNode;
  switch (key) {
    case "plan": page = PlanPage(); break;
    case "visas": page = VisasPage(); break;
    case "costs": page = CostsPage(); break;
    case "authorities": page = AuthoritiesPage(); break;
    case "emergency": page = EmergencyPage(); break;
    case "data": page = DataPage(); break;
    case "glossary": page = GlossaryPage(); break;
    case "explore": page = ExplorePage(); break;
    case "search": {
      const title = t(locale, "Find a practical answer");
      page = <section className="shell search-page">
        <Breadcrumbs items={[{ label: t(locale, "Home"), href: "/" + locale }, { label: t(locale, "Search") }]}/>
        <span className="eyebrow">{t(locale, "Site search")}</span><h1>{title}</h1>
        <SearchContent guides={generalEnglishGuides.map((guide) => localizedGeneralGuide(guide, locale))} initialQuery={q || ""}/>
      </section>;
      break;
    }
  }
  return <div lang={locale} data-no-translate>{translateTree(page, locale)}</div>;
}
