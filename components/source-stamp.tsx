import type { VerifiedSource } from "@/lib/platform-data";

export function SourceStamp({ source }: { source: VerifiedSource }) {
  return <div className="source-stamp">
    <span>{source.type}</span>
    <strong><a href={source.url} target="_blank" rel="noreferrer">{source.name}</a></strong>
    <small>{source.geography} · Last checked {source.lastVerified}</small>
  </div>;
}

export function SafetyNotice() {
  return <aside className="safety-notice trust-block">
    <strong>Use this as your practical starting point</strong>
    <p>We explain the usual route and link the source. Your nationality, city or personal situation can change the answer, so check time-sensitive legal, tax, immigration and insurance details with the responsible authority.</p>
  </aside>;
}
