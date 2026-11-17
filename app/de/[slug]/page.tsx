import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { LocalizedHubPage, localizedHubMetadata } from "@/components/localized-hub-page";
import { LocalizedOtherPage, otherMetadata } from "@/components/localized-functional-pages";
import {
  hubIds, hubUrl, hubFromSlug, anyHubFromSlug,
  otherPages, otherUrl, otherFromSlug, anyOtherFromSlug, type OtherPageId
} from "@/lib/locale-paths";
const locale = "de" as const;
type Props = {params:Promise<{slug:string}>};
export function generateStaticParams(){
 const hub = hubIds.map((id)=>({slug:hubUrl(locale,id)!.split("/").at(-1)!}));
 const other = (Object.keys(otherPages) as OtherPageId[]).map((id)=>({slug:otherUrl(locale,id).split("/").at(-1)!}));
 return [...hub,...other];
}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const slug=(await params).slug;
 const hub=hubFromSlug(locale,slug),other=otherFromSlug(locale,slug);
 return hub ? localizedHubMetadata(locale,hub) : other ? otherMetadata(locale,other) : {};
}
export default async function Page({params}:Props){
 const slug=(await params).slug;
 const hub=hubFromSlug(locale,slug),other=otherFromSlug(locale,slug);
 if(hub) return <LocalizedHubPage locale={locale} slug={hub}/>;
 if(other) return <LocalizedOtherPage locale={locale} id={other}/>;
 const legacyHub=anyHubFromSlug(locale,slug),legacyOther=anyOtherFromSlug(locale,slug);
 if(legacyHub) permanentRedirect(hubUrl(locale,legacyHub)!);
 if(legacyOther) permanentRedirect(otherUrl(locale,legacyOther));
 notFound();
}
