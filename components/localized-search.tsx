import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SearchContent, type SearchGuide } from "@/components/search-content";
import { exactGuides } from "@/lib/content/exact-guides";
import { getLocalizedExactGuide } from "@/lib/content/localized-exact-guides";
import {
  generalEnglishGuides, localizedGeneralGuide, localizedGeneralPath,
} from "@/lib/content/localized-general-guides";
import {
  getLocalizedPracticalGuide, practicalGuidePath, type PracticalGuideKey,
} from "@/lib/content/guides/practical-systems-localized";
import { exactGuidePath } from "@/lib/exact-guide-routes";
import { sectionPath, type SiteLocale } from "@/lib/locale-paths";
import { absoluteUrl } from "@/lib/site";
const c = {
  en: { home: "Home", search: "Search", title: "Search GermanyBase guides", intro: "Find clear, practical answers about life in Germany." },
  es: { home: "Inicio", search: "Buscar", title: "Buscar guías de GermanyBase", intro: "Encuentra respuestas prácticas para vivir en Alemania." },
  de: { home: "Startseite", search: "Suche", title: "GermanyBase-Ratgeber durchsuchen", intro: "Praktische Informationen für das Leben in Deutschland finden." },
} as const;
export function searchPageMetadata(locale: SiteLocale): Metadata {
  return {
    title: c[locale].title, description: c[locale].intro,
    alternates: { canonical: absoluteUrl(sectionPath(locale, "search")) },
    robots: { index: false, follow: true },
  };
}
export function LocalizedSearchPage({locale,q}:{locale:SiteLocale;q:string}) {
  const copy=c[locale];
  const practicalKeys:PracticalGuideKey[]=["sickLeave","doctor","payslip"];
  const data:SearchGuide[]=[
    ...generalEnglishGuides.map((item)=>({
      ...localizedGeneralGuide(item,locale),
      href:localizedGeneralPath(locale,item.slug)!,
    })),
    ...exactGuides.map((item)=>({
      ...getLocalizedExactGuide(locale,item.key),
      href:exactGuidePath(locale,item.key),
    })),
    ...practicalKeys.map((key)=>({
      ...getLocalizedPracticalGuide(locale,key),
      href:practicalGuidePath(locale,key),
    })),
  ];
  return <section className="shell search-page" lang={locale} data-no-translate>
    <Breadcrumbs items={[{label:copy.home,href:"/"+locale},{label:copy.search}]}/>
    <span className="eyebrow">{copy.search}</span>
    <h1>{copy.title}</h1>
    <p>{copy.intro}</p>
    <SearchContent guides={data} initialQuery={q} locale={locale}/>
  </section>;
}
