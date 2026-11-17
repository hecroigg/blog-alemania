import { LocalizedHome, localizedHomeMetadata } from "@/components/localized-home";

export const metadata = localizedHomeMetadata("fr");

export default function Page() {
  return <LocalizedHome locale="fr" />;
}
