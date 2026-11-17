import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { JsonLd } from "@/components/json-ld";
import { AnmeldungFinder } from "@/components/anmeldung-finder";
import {
  ApartmentAffordabilityCalculator, ArrivalChecklist,
  CityComparison, CostOfLivingCalculator, DocumentChecklist,
  RentalScamChecker,
} from "@/components/practical-tools";
import { DepositRuleChecker } from "@/components/deposit-rule-checker";
import { SalaryCalculator } from "@/components/salary-calculator";
import { EmploymentTypeTool } from "@/components/employment-type-tool";
import { sectionPath, toolPath, matchTool, toolSlugs, type SiteLocale, type ToolKey } from "@/lib/localized-paths";
import { toolKeys, toolText, toolIndexCopy } from "@/lib/localized-tool-copy";
import { absoluteUrl, siteConfig } from "@/lib/site";

const locales: SiteLocale[] = ["es", "en", "de"];

export function toolStaticParams(locale: SiteLocale) {
  return toolKeys.map((key) => ({ slug: toolSlugs[key][locale] }));
}

function hreflangFor(key: ToolKey) {
  return Object.fromEntries(locales.map((locale) => [locale, absoluteUrl(toolPath(locale, key))]));
}

export function toolsIndexMetadata(locale: SiteLocale): Metadata {
  const t = toolIndexCopy[locale];
  const langs = Object.fromEntries(locales.map((lang) => [lang, absoluteUrl(sectionPath(lang, "tools"))]));
  return {
    title: t.tools,
    description: t.intro,
    alternates: { canonical: absoluteUrl(sectionPath(locale, "tools")), languages: langs },
    robots: { index: true, follow: true },
    openGraph: { title: t.tools, description: t.intro, locale },
  };
}

export function toolMetadata(locale: SiteLocale, slug: string): Metadata {
  const key = matchTool(locale, slug);
  if (!key) return {};
  const t = toolText[locale][key];
  const url = absoluteUrl(toolPath(locale, key));
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: url, languages: hreflangFor(key) },
    robots: { index: true, follow: true },
    openGraph: { title: t.title, description: t.description, url, locale },
  };
}

export function LocalizedToolsIndex({ locale }: { locale: SiteLocale }) {
  const t = toolIndexCopy[locale];
  return <div lang={locale} data-no-translate>
    <section className="page-hero"><div className="shell">
      <Breadcrumbs items={[{ label: t.home, href: "/" + locale }, { label: t.tools }]}/>
      <div className="page-hero-grid"><div className="page-hero-copy">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1>{t.tools}</h1><p>{t.intro}</p>
      </div><div className="page-stat"><span>{t.tools}</span><strong>{toolKeys.length}</strong><small>GermanyBase</small></div></div>
    </div></section>
    <section className="section shell"><div className="tools-grid">
      {toolKeys.map((key) => {
        const item = toolText[locale][key];
        return <Link href={toolPath(locale, key)} className="tool-card" key={key}>
          <span>{item.eyebrow}</span><h2>{item.title}</h2><p>{item.description}</p>
          <em>{t.open} <Icon name="arrow" size={16}/></em>
        </Link>;
      })}
    </div></section>
  </div>;
}

function Interactive({ locale, tool }: { locale: SiteLocale; tool: ToolKey }) {
  switch (tool) {
    case "anmeldung": return <AnmeldungFinder initialCity="mannheim" initialLocale={locale} />;
    case "costs": return <CostOfLivingCalculator />;
    case "compare": return <CityComparison />;
    case "documents": return <DocumentChecklist />;
    case "scams": return <><RentalScamChecker /><DepositRuleChecker /></>;
    case "arrival": return <ArrivalChecklist />;
    case "apartment": return <ApartmentAffordabilityCalculator />;
    case "salary": return <SalaryCalculator />;
    case "employment": return <EmploymentTypeTool />;
  }
}

export function LocalizedToolPage({ locale, slug }: { locale: SiteLocale; slug: string }) {
  const key = matchTool(locale, slug);
  if (!key) notFound();
  const t = toolText[locale][key];
  const common = toolIndexCopy[locale];
  const url = absoluteUrl(toolPath(locale, key));
  return <div lang={locale}>
    <section className="page-hero"><div className="shell">
      <Breadcrumbs items={[
        { label: common.home, href: "/" + locale },
        { label: common.tools, href: sectionPath(locale, "tools") },
        { label: t.title },
      ]}/>
      <div className="page-hero-copy" data-no-translate>
        <span className="eyebrow">{t.eyebrow}</span><h1>{t.title}</h1><p>{t.description}</p>
      </div>
    </div></section>
    <section className="section shell">
      <Interactive locale={locale} tool={key}/>
      <p className="calculator-source-link" data-no-translate>{common.source}</p>
    </section>
    <JsonLd data={{
      "@context": "https://schema.org", "@type": "SoftwareApplication",
      name: t.title, description: t.description, inLanguage: locale,
      applicationCategory: "WebApplication", operatingSystem: "Web",
      url, publisher: { "@type": "Organization", name: siteConfig.name },
      offers: { "@type": "Offer", price: 0, priceCurrency: "EUR" },
    }}/>
  </div>;
}
