import { permanentRedirect } from "next/navigation";

// The original English homepage is now at its language-specific URL.
// Keep a permanent redirect for existing bookmarks and external links.
export default function LegacyHome() {
  permanentRedirect("/en");
}
