import type { Metadata } from "next";
import { LocalizedHubPage, localizedHubMetadata, localizedHubStaticParams } from "@/components/localized-hub-page";

const locale = "de" as const;
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return localizedHubStaticParams("de"); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return localizedHubMetadata(locale, (await params).slug);
}

export default async function Page({ params }: Props) {
  return <LocalizedHubPage locale={locale} slug={(await params).slug} />;
}
