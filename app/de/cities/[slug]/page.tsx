import { notFound, permanentRedirect } from "next/navigation";
import { cityFromSlug, cityUrl } from "@/lib/locale-paths";
type Props = { params: Promise<{ slug: string }> };

/** Resolve earlier English and translated city aliases without losing the destination. */
export default async function LegacyCity({ params }: Props) {
  const { slug } = await params;
  const id = cityFromSlug("de", slug) || cityFromSlug("en", slug);
  const destination = id && cityUrl("de", id);
  if (destination) permanentRedirect(destination);
  notFound();
}
