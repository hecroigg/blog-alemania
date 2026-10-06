import { LocalizedGuidesIndex, localizedGuidesMetadata } from "@/components/localized-guides-index";

export const metadata = localizedGuidesMetadata("uk");
export default function Page() { return <LocalizedGuidesIndex locale="uk"/>; }
