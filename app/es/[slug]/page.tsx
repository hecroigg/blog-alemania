import type { Metadata } from "next";
import { LocalizedHubPage, localizedHubMetadata, localizedHubStaticParams } from "@/components/localized-hub-page";
import { LocalizedAuxiliaryPage, auxiliaryMetadata, auxiliaryKeys } from "@/components/localized-auxiliary-page";
import { auxiliarySlugs, matchAuxiliary } from "@/lib/localized-paths";

const locale = "es" as const;
type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ q?: string }> };

export function generateStaticParams() {
  return [...localizedHubStaticParams(locale), ...auxiliaryKeys.map((key) => ({ slug: auxiliarySlugs[key][locale] }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  return matchAuxiliary(locale, slug) ? auxiliaryMetadata(locale, slug) : localizedHubMetadata(locale, slug);
}

export default async function Page({ params, searchParams }: Props) {
  const slug = (await params).slug;
  if (matchAuxiliary(locale, slug)) {
    return <LocalizedAuxiliaryPage locale={locale} slug={slug} q={(await searchParams).q}/>;
  }
  return <LocalizedHubPage locale={locale} slug={slug}/>;
}
