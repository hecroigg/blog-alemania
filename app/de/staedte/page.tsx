import { LocalizedCitiesIndex, citiesIndexMetadata } from "@/components/localized-cities";

export const metadata = citiesIndexMetadata("de");
export default function Page() { return <LocalizedCitiesIndex locale="de" />; }
