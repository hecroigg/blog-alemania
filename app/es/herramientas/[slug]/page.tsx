import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedToolPage, toolMetadata } from "@/components/localized-functional-pages";
import { toolFromSlug, toolIds, toolUrl } from "@/lib/locale-paths";
type Props = {params:Promise<{slug:string}>;searchParams:Promise<{city?:string}>};
const locale="es" as const;
export function generateStaticParams(){
 return toolIds.map((id)=>({slug:toolUrl(locale,id).split("/").at(-1)!}));
}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const slug=(await params).slug;
 const id=toolFromSlug(locale,slug);
 return id ? toolMetadata(locale,id) : {};
}
export default async function Page({params,searchParams}:Props){
 const slug=(await params).slug;
 const id=toolFromSlug(locale,slug);
 if(!id) notFound();
 return <LocalizedToolPage locale={locale} id={id} query={await searchParams}/>;
}
