import { notFound, permanentRedirect } from "next/navigation";
import { generalGuideFromSlug, localizedGeneralPath } from "@/lib/content/localized-general-guides";
import { practicalGuideKeyFromSlug, practicalGuidePath } from "@/lib/content/guides/practical-systems-localized";
import { findExactGuideRoute, exactGuidePath } from "@/lib/exact-guide-routes";

type Props = { params: Promise<{ slug: string }> };
const locale = "de" as const;

/** Preserve older /de/guides/* URLs even when the article slug has changed. */
export default async function LegacyGuide({ params }: Props) {
  const { slug } = await params;
  const general = generalGuideFromSlug(locale, slug) || generalGuideFromSlug("en", slug);
  if (general) permanentRedirect(localizedGeneralPath(locale, general.slug)!);

  const practical = practicalGuideKeyFromSlug(locale, slug) || practicalGuideKeyFromSlug("en", slug);
  if (practical) permanentRedirect(practicalGuidePath(locale, practical));

  const exact = findExactGuideRoute(locale, slug) || findExactGuideRoute("en", slug);
  if (exact) permanentRedirect(exactGuidePath(locale, exact.key));
  notFound();
}
