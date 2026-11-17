import { LocalizedToolsIndex, toolsIndexMetadata } from "@/components/localized-tools";
export const metadata = toolsIndexMetadata("en");
export default function Page() { return <LocalizedToolsIndex locale="en" />; }
