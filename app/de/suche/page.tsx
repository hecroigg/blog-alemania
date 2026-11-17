import { LocalizedSearchPage, searchPageMetadata } from "@/components/localized-search";
export const metadata=searchPageMetadata("de");
type Props={searchParams:Promise<{q?:string}>};
export default async function Page({searchParams}:Props){
 const {q=""}=await searchParams;
 return <LocalizedSearchPage locale="de" q={q}/>;
}
