import { permanentRedirect } from "next/navigation";

// Historical unprefixed index. Preserve link equity and send readers to
// the English-language canonical library.
export default function GuidesPage() {
  permanentRedirect("/en/guides");
}
