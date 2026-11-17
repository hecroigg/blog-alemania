import { permanentRedirect } from "next/navigation";
type Props = { params: Promise<{ slug: string }> };
export default async function LegacyGuide({ params }: Props) {
  permanentRedirect("/es/guias/" + (await params).slug);
}
