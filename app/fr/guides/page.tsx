import { LocalizedGuidesIndex, localizedGuidesMetadata } from "@/components/localized-guides-index";

export const metadata = localizedGuidesMetadata("fr");
export default function Page() { return <LocalizedGuidesIndex locale="fr"/>; }
