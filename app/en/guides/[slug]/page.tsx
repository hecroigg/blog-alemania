import type { Metadata } from "next";
import { LocalizedExactGuidePage, exactGuideStaticParams, localizedExactGuideMetadata } from "@/components/localized-exact-guide-page";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return exactGuideStaticParams("en"); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { return localizedExactGuideMetadata("en", (await params).slug); }
export default async function Page({ params }: Props) { return <LocalizedExactGuidePage locale="en" slug={(await params).slug}/>; }
