"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cityProfiles } from "@/lib/platform-data";

const housingOptions = ["All", "Moderate", "High", "Very high"] as const;
const sectorOptions = ["All", ...Array.from(new Set(cityProfiles.flatMap((city) => city.sectors))).sort()] as const;

export function GermanyCityExplorer() {
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
      <label className="form-field"><span>Search city, state, transport or sector</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="For example: technology, tram, Bavaria"/></label>
      <label className="form-field"><span>Housing pressure</span><select value={housing} onChange={(event) => setHousing(event.target.value as (typeof housingOptions)[number])}>{housingOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="form-field"><span>Employment sector</span><select value={sector} onChange={(event) => setSector(event.target.value)}>{sectorOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
    </div>
    <div className="explorer-summary"><strong>{results.length} cities match</strong><span>These are planning filters, not a quality ranking. Open a city for local housing, work, study and Anmeldung links.</span></div>
    <div className="explore-city-grid explorer-results">{results.map((city) => <Link href={`/cities/${city.slug}`} key={city.slug}><span>{city.state}</span><strong>{city.name}</strong><small className={`pressure pressure-${city.housingPressure.toLowerCase().replace(" ", "-")}`}>{city.housingPressure} housing pressure</small><small>{city.transport}</small><small>{city.sectors.join(" · ")}</small><em>Open city guide →</em></Link>)}</div>
    {results.length === 0 && <div className="empty-results"><strong>No city matches every filter.</strong><p>Try removing one filter. A city can still work well when your exact job, university or housing offer changes the trade-off.</p></div>}
  </div>;
}
