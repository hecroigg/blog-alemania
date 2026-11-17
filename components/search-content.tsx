"use client";

import Link from "next/link";
import type { Guide } from "@/lib/types";
import { sectionPath, type SiteLocale } from "@/lib/locale-paths";

export type SearchGuide = Pick<Guide, "slug" | "title" | "description" | "category" | "eyebrow" | "summary" | "takeaways" | "sections" | "faqs"> & { href: string };

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().trim();
}
function guideStrings(guide: SearchGuide) {
  return [
    guide.title, guide.description, guide.category, guide.eyebrow, guide.summary,
    ...guide.takeaways,
    ...guide.sections.flatMap((section) => [
      section.heading, ...section.paragraphs, ...(section.bullets || []),
      ...(section.resources || []).flatMap((resource) => [resource.label, resource.note]),
      section.callout?.title || "", section.callout?.text || "",
    ]),
    ...guide.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].filter(Boolean);
}
const ui = {
  en: {
    label: "Search guides", placeholder: "Try Anmeldung, taxes or health insurance",
    search: "Search", count: (n: number, query: string) => `${n} result${n === 1 ? "" : "s"} for “${query}”`,
    empty: (query: string) => `No guides found for “${query}”. Try a broader term.`,
  },
  es: {
    label: "Buscar guías", placeholder: "Prueba con Anmeldung, impuestos o seguro médico",
    search: "Buscar", count: (n: number, query: string) => `${n} resultado${n === 1 ? "" : "s"} para «${query}»`,
    empty: (query: string) => `No se han encontrado guías para «${query}». Prueba con un término más general.`,
  },
  de: {
    label: "Ratgeber suchen", placeholder: "Zum Beispiel Anmeldung, Steuern oder Krankenversicherung",
    search: "Suchen", count: (n: number, query: string) => `${n} Treffer für „${query}“`,
    empty: (query: string) => `Keine Ratgeber für „${query}“ gefunden. Versuchen Sie einen allgemeineren Begriff.`,
  },
} as const;

export function SearchContent({ guides, initialQuery, locale }: { guides: SearchGuide[]; initialQuery: string; locale: SiteLocale }) {
  const c=ui[locale];
  const query = normalize(initialQuery);
  const results = query ? guides.filter((guide) => normalize(guideStrings(guide).join(" ")).includes(query)) : [];
  return <div lang={locale} data-no-translate>
    <form className="search-form" action={sectionPath(locale, "search")}>
      <label className="sr-only" htmlFor="q">{c.label}</label>
      <input id="q" name="q" type="search" defaultValue={initialQuery} placeholder={c.placeholder}/>
      <button className="button button-primary" type="submit">{c.search}</button>
    </form>
    {query && <p>{results.length ? c.count(results.length, initialQuery) : c.empty(initialQuery)}</p>}
    <div className="search-results">{results.map((guide) =>
      <Link className="search-result" key={guide.href} href={guide.href}>
        <small>{guide.eyebrow}</small><strong>{guide.title}</strong><span>{guide.description}</span>
      </Link>
    )}</div>
  </div>;
}
