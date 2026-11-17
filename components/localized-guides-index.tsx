import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ExactGuideCard } from "@/components/exact-guide-card";
import { exactGuideUi, getLocalizedExactGuides } from "@/lib/content/localized-exact-guides";
import { exactGuidePath } from "@/lib/exact-guide-routes";
import { getLocalizedPracticalGuide, practicalGuidePath, type PracticalGuideKey } from "@/lib/content/guides/practical-systems-localized";
import {
  generalEnglishGuides, localizedGeneralGuide, localizedGeneralPath,
  type EditorialLocale,
} from "@/lib/content/localized-general-guides";
import { isSearchLocale, searchLocales, type Locale } from "@/lib/platform-data";
import { absoluteUrl } from "@/lib/site";

export function localizedGuidesMetadata(locale: Locale): Metadata {
  const ui = exactGuideUi[locale];
  const canonical = absoluteUrl("/" + locale + "/guides");
  const languages = Object.fromEntries(
    searchLocales.map((item) => [item, absoluteUrl("/" + item + "/guides")])
  );
  return {
    title: ui.libraryTitle,
    description: ui.libraryIntro,
    alternates: { canonical, languages },
    robots: isSearchLocale(locale) ? undefined : { index: false, follow: true },
    openGraph: { title: ui.libraryTitle, description: ui.libraryIntro, url: canonical, locale },
  };
}

export function LocalizedGuidesIndex({ locale }: { locale: Locale }) {
  const ui = exactGuideUi[locale];
  const exact = getLocalizedExactGuides(locale);
  const practicalKeys: PracticalGuideKey[] = ["sickLeave", "doctor", "payslip"];
  const practical = isSearchLocale(locale) ? practicalKeys.map((key) => ({
    key, guide: getLocalizedPracticalGuide(locale as "en" | "es" | "de" | "fr", key),
  })) : [];
  const normal = isSearchLocale(locale) ? generalEnglishGuides.map((guide) => ({
    guide: localizedGeneralGuide(guide, locale as EditorialLocale),
    href: localizedGeneralPath(locale as EditorialLocale, guide.slug)!,
  })) : [];
  const total = exact.length + practical.length + normal.length;
  const labels = {
    en: { normal: "Step-by-step guides", reference: "Rules and exact figures" },
    es: { normal: "Guías paso a paso", reference: "Normas y cifras concretas" },
    de: { normal: "Schritt-für-Schritt-Ratgeber", reference: "Gesetze und konkrete Zahlen" },
  };
  const c = labels[(isSearchLocale(locale) ? locale : "en") as EditorialLocale];
  return <div lang={locale} data-no-translate>
    <section className="page-hero">
      <div className="shell">
        <Breadcrumbs items={[{ label: ui.home, href: "/" + locale }, { label: ui.guides }]}/>
        <div className="page-hero-grid">
          <div className="page-hero-copy">
            <span className="eyebrow">{ui.library}</span>
            <h1>{ui.libraryTitle}</h1><p>{ui.libraryIntro}</p>
          </div>
          <div className="page-stat">
            <span>{ui.published}</span><strong>{total}</strong><small>{ui.topics}</small>
          </div>
        </div>
      </div>
    </section>
    {normal.length > 0 && <section className="section shell">
      <div className="section-heading"><div><h2>{c.normal}</h2></div></div>
      <div className="guide-grid">{normal.map((item) =>
        <ExactGuideCard key={item.href} guide={item.guide} href={item.href} />
      )}</div>
    </section>}
    <section className="section shell">
      <div className="section-heading"><div><h2>{c.reference}</h2></div></div>
      <div className="guide-grid">
        {practical.map(({ key, guide }) =>
          <ExactGuideCard key={guide.slug} guide={guide} href={practicalGuidePath(locale as "en" | "es" | "de" | "fr", key)}/>
        )}
        {exact.map((guide) =>
          <ExactGuideCard key={guide.slug} guide={guide} href={exactGuidePath(locale, guide.key)}/>
        )}
      </div>
    </section>
  </div>;
}
