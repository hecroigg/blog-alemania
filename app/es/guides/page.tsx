import { LocalizedGuidesIndex, localizedGuidesMetadata } from "@/components/localized-guides-index";

export const metadata = localizedGuidesMetadata("es");
export default function Page() { return <LocalizedGuidesIndex locale="es"/>; }
