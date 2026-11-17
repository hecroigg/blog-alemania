import { permanentRedirect } from "next/navigation";
export default function LegacyPage() {
  permanentRedirect("/en/tools/cost-of-living");
}
