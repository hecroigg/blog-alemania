import { LocalizedHome, localizedHomeMetadata } from "@/components/localized-home";

export const metadata = localizedHomeMetadata("de");

export default function Page() {
  return <LocalizedHome locale="de" />;
}
