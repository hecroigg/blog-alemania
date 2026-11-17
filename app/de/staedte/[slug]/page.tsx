import type { Metadata } from "next";
import { LocalizedCityPage, cityDetailMetadata, cityStaticParams } from "@/components/localized-cities";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return cityStaticParams("de"); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return cityDetailMetadata("de", (await params).slug);
}
export default async function Page({ params }: Props) {
  return <LocalizedCityPage locale="de" slug={(await params).slug} />;
}
