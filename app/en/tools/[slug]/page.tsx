import type { Metadata } from "next";
import { LocalizedToolPage, toolMetadata, toolStaticParams } from "@/components/localized-tools";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return toolStaticParams("en"); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return toolMetadata("en", (await params).slug);
}
export default async function Page({ params }: Props) {
  return <LocalizedToolPage locale="en" slug={(await params).slug} />;
}
