import { permanentRedirect } from "next/navigation";
import { cityUrl } from "@/lib/locale-paths";
type Props = { params: Promise<{ slug: string }> };
export default async function Legacy({ params }: Props) {
 const slug = (await params).slug;
 permanentRedirect(cityUrl("es", slug) || "/es/ciudades");
}
