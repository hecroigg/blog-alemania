import { LocalizedCitiesIndex, citiesIndexMetadata } from "@/components/localized-cities";

export const metadata = citiesIndexMetadata("es");
export default function Page() { return <LocalizedCitiesIndex locale="es" />; }
