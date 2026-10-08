import type { Metadata } from "next";
import { LocalizedExactGuidePage, exactGuideStaticParams, localizedExactGuideMetadata } from "@/components/localized-exact-guide-page";
import { LocalizedPracticalGuidePage, localizedPracticalGuideMetadata, practicalGuideStaticParams } from "@/components/localized-practical-guide-page";
import { practicalGuideKeyFromSlug } from "@/lib/content/guides/practical-systems-localized";

type Props = { params: Promise<{ slug: string }> };
const locale = "de" as const;

export function generateStaticParams() {
  return [...exactGuideStaticParams(locale), ...practicalGuideStaticParams(locale)];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug=(await params).slug;
  return localizedPracticalGuideMetadata(locale,slug) || localizedExactGuideMetadata(locale,slug);
}

export default async function Page({ params }: Props) {
  const slug=(await params).slug;
  if (practicalGuideKeyFromSlug(locale,slug)) return <LocalizedPracticalGuidePage locale={locale} slug={slug}/>;
  return <LocalizedExactGuidePage locale={locale} slug={slug}/>;
}
