import type { Metadata } from "next";
import { LocalizedExactGuidePage, exactGuideStaticParams, localizedExactGuideMetadata } from "@/components/localized-exact-guide-page";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return exactGuideStaticParams("es"); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { return localizedExactGuideMetadata("es", (await params).slug); }
export default async function Page({ params }: Props) { return <LocalizedExactGuidePage locale="es" slug={(await params).slug}/>; }
