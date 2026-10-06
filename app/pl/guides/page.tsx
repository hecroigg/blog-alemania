import { LocalizedGuidesIndex, localizedGuidesMetadata } from "@/components/localized-guides-index";

export const metadata = localizedGuidesMetadata("pl");
export default function Page() { return <LocalizedGuidesIndex locale="pl"/>; }
