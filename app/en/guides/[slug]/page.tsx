import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { LocalizedExactGuidePage, exactGuideStaticParams, localizedExactGuideMetadata } from "@/components/localized-exact-guide-page";
import { localizedPracticalGuideMetadata, practicalGuideStaticParams } from "@/components/localized-practical-guide-page";
import { practicalGuideKeyFromSlug, practicalGuidePath } from "@/lib/content/guides/practical-systems-localized";

type Props = { params: Promise<{ slug: string }> };
const locale = "en" as const;

export function generateStaticParams() {
  return [...exactGuideStaticParams(locale), ...practicalGuideStaticParams(locale)];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug=(await params).slug;
  return localizedPracticalGuideMetadata(locale,slug) || localizedExactGuideMetadata(locale,slug);
}

export default async function Page({ params }: Props) {
  const slug=(await params).slug;
  const practicalKey=practicalGuideKeyFromSlug(locale,slug);
  // English practical guides already exist at /guides/<slug>; avoid a second indexable copy.
  if (practicalKey) permanentRedirect(practicalGuidePath(locale,practicalKey));
  return <LocalizedExactGuidePage locale={locale} slug={slug}/>;
}
