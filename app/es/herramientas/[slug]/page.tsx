import type { Metadata } from "next";
import { LocalizedToolPage, toolMetadata, toolStaticParams } from "@/components/localized-tools";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return toolStaticParams("es"); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return toolMetadata("es", (await params).slug);
}
export default async function Page({ params }: Props) {
  return <LocalizedToolPage locale="es" slug={(await params).slug} />;
}
