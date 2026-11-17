import { permanentRedirect } from "next/navigation";
type Props = { params: Promise<{ slug: string }> };
export default async function LegacyPage({ params }: Props) {
  permanentRedirect("/es/guias/" + encodeURIComponent((await params).slug));
}
