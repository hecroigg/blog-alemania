import type { Metadata } from "next";
import { LocalizedToolPage, toolMetadata, toolStaticParams } from "@/components/localized-tools";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return toolStaticParams("de"); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return toolMetadata("de", (await params).slug);
}
export default async function Page({ params }: Props) {
  return <LocalizedToolPage locale="de" slug={(await params).slug} />;
}
