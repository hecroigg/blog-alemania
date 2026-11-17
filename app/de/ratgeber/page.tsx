import { LocalizedGuidesIndex, localizedGuidesMetadata } from "@/components/localized-guides-index";

export const metadata = localizedGuidesMetadata("de");
export default function Page() { return <LocalizedGuidesIndex locale="de"/>; }
