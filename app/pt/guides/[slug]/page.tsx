import type { Metadata } from "next";
import { LocalizedExactGuidePage, exactGuideStaticParams, localizedExactGuideMetadata } from "@/components/localized-exact-guide-page";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return exactGuideStaticParams("pt"); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { return localizedExactGuideMetadata("pt", (await params).slug); }
export default async function Page({ params }: Props) { return <LocalizedExactGuidePage locale="pt" slug={(await params).slug}/>; }
