import { LocalizedSearchPage, searchPageMetadata } from "@/components/localized-search";
export const metadata=searchPageMetadata("es");
type Props={searchParams:Promise<{q?:string}>};
export default async function Page({searchParams}:Props){
 const {q=""}=await searchParams;
 return <LocalizedSearchPage locale="es" q={q}/>;
}
