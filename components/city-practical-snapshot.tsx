"use client";

import { useLanguage } from "@/components/language-provider";
import type { CityProfile } from "@/lib/platform-data";

export function CityPracticalSnapshot({ cityName, profile }: { cityName: string; profile: CityProfile }) {
  const { translate } = useLanguage();
  return <section className="city-snapshot" aria-label={translate("{city} practical snapshot", { city: cityName })}>
    <article><span>{translate("Housing", undefined, true)}</span><strong>{translate(`${profile.housingPressure} housing pressure`, undefined, true)}</strong></article>
    <article><span>{translate("Transport", undefined, true)}</span><strong>{translate(profile.transport, undefined, true)}</strong></article>
    <article><span>{translate("Work", undefined, true)}</span><strong>{profile.sectors.map((sector, index) => <span className="inline-translation" key={sector}>{index ? " · " : ""}{translate(sector, undefined, index === 0)}</span>)}</strong></article>
    <article><span>{translate("Study", undefined, true)}</span><strong>{translate(profile.universities, undefined, true)}</strong></article>
  </section>;
}
