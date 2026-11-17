import { LocalizedCitiesIndex, citiesIndexMetadata } from "@/components/localized-cities";

export const metadata = citiesIndexMetadata("en");
export default function Page() { return <LocalizedCitiesIndex locale="en" />; }
