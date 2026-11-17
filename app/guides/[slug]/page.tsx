import { notFound, permanentRedirect } from "next/navigation";
import { guides } from "@/lib/content/guides";
import { localizedGeneralPath } from "@/lib/content/localized-general-guides";
import { practicalGuideKeyFromSlug, practicalGuidePath } from "@/lib/content/guides/practical-systems-localized";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export default async function LegacyGuide({ params }: Props) {
  const rawSlug = (await params).slug;
  const slug = rawSlug.split(":")[0];
  const practical = practicalGuideKeyFromSlug("en", slug);
  if (practical) permanentRedirect(practicalGuidePath("en", practical));
  const localized = localizedGeneralPath("en", slug);
  if (localized) permanentRedirect(localized);
  notFound();
}
