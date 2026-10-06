import { LocalizedGuidesIndex, localizedGuidesMetadata } from "@/components/localized-guides-index";

export const metadata = localizedGuidesMetadata("en");
export default function Page() { return <LocalizedGuidesIndex locale="en"/>; }
