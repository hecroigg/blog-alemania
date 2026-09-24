import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SearchContent } from "@/components/search-content";
import { guides } from "@/lib/content/guides";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Search", description: "Search Living Germany's practical guides.", alternates: { canonical: absoluteUrl("/search") }, robots: { index: false, follow: true } };
type Props = { searchParams: Promise<{ q?: string }> };
export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  return <section className="shell search-page"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]}/><span className="eyebrow">Site search</span><h1>Find a practical answer</h1><SearchContent guides={guides} initialQuery={q}/></section>;
}
