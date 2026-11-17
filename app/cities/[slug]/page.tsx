import { notFound, permanentRedirect } from "next/navigation";
import { cityMap, cities } from "@/lib/content/cities";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return cities.map((city) => ({ slug: city.slug })); }
export default async function LegacyCityPage({ params }: Props) {
  const slug = (await params).slug.split(":")[0];
  if (cityMap.has(slug)) permanentRedirect("/en/cities/" + slug);
  notFound();
}
