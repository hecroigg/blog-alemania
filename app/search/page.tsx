import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { guides } from "@/lib/content/guides";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Search", description: "Search Living Germany's practical guides.", alternates: { canonical: absoluteUrl("/search") }, robots: { index: false, follow: true } };
type Props = { searchParams: Promise<{ q?: string }> };
export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams; const query = q.trim().toLowerCase();
  const results = query ? guides.filter((guide) => [guide.title, guide.description, guide.category, guide.summary, ...guide.takeaways].join(" ").toLowerCase().includes(query)) : [];
  return <section className="shell search-page"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]}/><span className="eyebrow">Site search</span><h1>Find a practical answer</h1><form className="search-form" action="/search"><label className="sr-only" htmlFor="q">Search guides</label><input id="q" name="q" type="search" defaultValue={q} placeholder="Try “Anmeldung” or “health insurance”"/><button className="button button-primary" type="submit">Search</button></form>{query && <p>{results.length ? `${results.length} result${results.length === 1 ? "" : "s"} for “${q}”` : `No guides found for “${q}”. Try a broader term.`}</p>}<div className="search-results">{results.map((guide) => <Link className="search-result" key={guide.slug} href={`/guides/${guide.slug}`}><small>{guide.eyebrow}</small><strong>{guide.title}</strong><span>{guide.description}</span></Link>)}</div></section>;
}
