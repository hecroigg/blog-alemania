"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cityProfiles } from "@/lib/platform-data";
import { useLanguage } from "@/components/language-provider";
import { cityUrl } from "@/lib/locale-paths";
import { localizedCityName } from "@/lib/city-labels";

const housingOptions = ["All", "Moderate", "High", "Very high"] as const;
const sectorOptions = ["All", ...Array.from(new Set(cityProfiles.flatMap((city) => city.sectors))).sort()] as const;

export function GermanyCityExplorer() {
  const { locale, translate }=useLanguage();
  const lang=locale==="es"||locale==="de"?locale:"en";
  const [housing, setHousing] = useState<(typeof housingOptions)[number]>("All");
  const [sector, setSector] = useState("All");
  const [query, setQuery] = useState("");
  const results = useMemo(() => cityProfiles.filter((city) => {
    const matchesHousing = housing === "All" || city.housingPressure === housing;
    const matchesSector = sector === "All" || city.sectors.includes(sector);
    const term = query.trim().toLowerCase();
    const matchesQuery = !term || [city.name, city.state, city.transport, city.universities, ...city.sectors].join(" ").toLowerCase().includes(term);
    return matchesHousing && matchesSector && matchesQuery;
  }), [housing, sector, query]);

  return <div className="city-explorer-tool">
    <div className="explorer-filters">
      <label className="form-field"><span>{translate("Search city, state, transport or sector",undefined,true)}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={translate("For example: technology, tram, Bavaria")}/></label>
      <label className="form-field"><span>{translate("Housing pressure",undefined,true)}</span><select value={housing} onChange={(event) => setHousing(event.target.value as (typeof housingOptions)[number])}>{housingOptions.map((item) => <option key={item} value={item}>{translate(item,undefined,true)}</option>)}</select></label>
      <label className="form-field"><span>{translate("Employment sector",undefined,true)}</span><select value={sector} onChange={(event) => setSector(event.target.value)}>{sectorOptions.map((item) => <option key={item} value={item}>{translate(item,undefined,true)}</option>)}</select></label>
    </div>
    <div className="explorer-summary"><strong>{results.length} {translate("cities match")}</strong><span>{translate("These are planning filters, not a quality ranking. Open a city for local housing, work, study and Anmeldung links.")}</span></div>
    <div className="explore-city-grid explorer-results">{results.map((city) => <Link href={cityUrl(lang,city.slug)!} key={city.slug}><span>{translate(city.state,undefined,true)}</span><strong>{localizedCityName(lang,city.slug,city.name)}</strong><small className={`pressure pressure-${city.housingPressure.toLowerCase().replace(" ", "-")}`}>{translate(city.housingPressure,undefined,true)} {translate("housing pressure")}</small><small>{translate(city.transport,undefined,true)}</small><small>{city.sectors.map(x=>translate(x)).join(" · ")}</small><em>{translate("Open city guide",undefined,true)} →</em></Link>)}</div>
    {results.length === 0 && <div className="empty-results"><strong>{translate("No city matches every filter.")}</strong><p>{translate("Try removing one filter. A city can still work well when your exact job, university or housing offer changes the trade-off.")}</p></div>}
  </div>;
}
