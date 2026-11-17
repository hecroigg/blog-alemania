import { permanentRedirect } from "next/navigation";
type Props = { params: Promise<{ slug: string }> };
export default async function LegacyPage({ params }: Props) {
  permanentRedirect("/de/ratgeber/" + encodeURIComponent((await params).slug));
}
