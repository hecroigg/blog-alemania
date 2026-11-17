import { permanentRedirect } from "next/navigation";
export default function LegacyPage() {
  permanentRedirect("/en/tools/first-30-days");
}
