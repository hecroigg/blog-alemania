"use client";

import Link from "next/link";
import { auxiliaryPath, guidePath, isSiteLocale } from "@/lib/localized-paths";
import { useLanguage } from "@/components/language-provider";
import type { Guide } from "@/lib/types";

type SearchGuide = Pick<Guide, "slug" | "title" | "description" | "category" | "eyebrow" | "summary" | "takeaways" | "sections" | "faqs">;

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().trim();
}

function guideStrings(guide: SearchGuide) {
  return [
    guide.title, guide.description, guide.category, guide.eyebrow, guide.summary,
    ...guide.takeaways,
    ...guide.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets || []), ...(section.resources || []).flatMap((resource) => [resource.label, resource.note]), section.callout?.title || "", section.callout?.text || ""]),
    ...guide.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].filter(Boolean);
}

export function SearchContent({ guides, initialQuery }: { guides: SearchGuide[]; initialQuery: string }) {
  const { locale, translations, translate } = useLanguage();
  const routeLocale = isSiteLocale(locale) ? locale : "en";
  const query = normalize(initialQuery);
  const results = query ? guides.filter((guide) => {
    const source = guideStrings(guide);
    const localized = locale === "en" ? [] : source.map((text) => translations?.[text] || "");
    return normalize([...source, ...localized].join(" ")).includes(query);
  }) : [];

  return <>
    <form className="search-form" action={auxiliaryPath(routeLocale, "search")}>
      <label className="sr-only" htmlFor="q">{translate("Search guides")}</label>
      <input id="q" name="q" type="search" defaultValue={initialQuery} placeholder={translate("Try “Anmeldung”, “registro” or “health insurance”")}/>
      <button className="button button-primary" type="submit">{translate("Search")}</button>
    </form>
    {query && <p>{results.length ? `${results.length} · ${translate("Search results for")} “${initialQuery}”` : `${translate("No guides found for")} “${initialQuery}”. ${translate("Try a broader term.")}`}</p>}
    <div className="search-results">{results.map((guide) => <Link className="search-result" key={guide.slug} href={guidePath(routeLocale, guide.slug)}><small>{guide.eyebrow}</small><strong>{guide.title}</strong><span>{guide.description}</span></Link>)}</div>
  </>;
}
