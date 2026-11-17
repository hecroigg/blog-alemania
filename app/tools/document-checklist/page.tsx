import { permanentRedirect } from "next/navigation";
export default function LegacyPage() {
  permanentRedirect("/en/tools/document-checklist");
}
