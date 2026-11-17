import { notFound, permanentRedirect } from "next/navigation";
import { categoryMap, categories } from "@/lib/content/categories";
import { audienceMap, audiences } from "@/lib/content/audiences";
import { trustPageMap, trustPages } from "@/lib/content/trust";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...categories, ...audiences, ...trustPages].map((item) => ({ slug: item.slug }));
}

export default async function LegacyHub({ params }: Props) {
  const raw = (await params).slug;
  const slug = raw.split(":")[0];
  if (categoryMap.has(slug) || audienceMap.has(slug) || trustPageMap.has(slug)) {
    permanentRedirect("/en/" + slug);
  }
  notFound();
}
