import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ExactGuideCard } from "@/components/exact-guide-card";
import { exactGuideUi, getLocalizedExactGuides } from "@/lib/content/localized-exact-guides";
import { exactGuidePath } from "@/lib/exact-guide-routes";
import { isSearchLocale, searchLocales, type Locale } from "@/lib/platform-data";
import { absoluteUrl } from "@/lib/site";

export function localizedGuidesMetadata(locale: Locale): Metadata {
  const ui = exactGuideUi[locale];
  const canonical = absoluteUrl(`/${locale}/guides`);
  return { title: ui.libraryTitle, description: ui.libraryIntro, alternates: { canonical, languages: Object.fromEntries(searchLocales.map((item) => [item, absoluteUrl(`/${item}/guides`)])) }, robots: isSearchLocale(locale) ? undefined : { index: false, follow: true }, openGraph: { title: ui.libraryTitle, description: ui.libraryIntro, url: canonical, locale } };
}

export function LocalizedGuidesIndex({ locale }: { locale: Locale }) {
  const ui = exactGuideUi[locale];
  const guides = getLocalizedExactGuides(locale);
  return <div lang={locale}>
    <section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: ui.home, href: "/" }, { label: ui.guides }]}/><div className="page-hero-grid"><div className="page-hero-copy"><span className="eyebrow">{ui.library}</span><h1>{ui.libraryTitle}</h1><p>{ui.libraryIntro}</p></div><div className="page-stat"><span>{ui.published}</span><strong>{guides.length}</strong><small>{ui.topics}</small></div></div></div></section>
    <section className="section shell"><div className="guide-grid">{guides.map((guide) => <ExactGuideCard key={guide.slug} guide={guide} href={exactGuidePath(locale, guide.key)}/>)}</div></section>
  </div>;
}
