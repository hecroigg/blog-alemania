import type { VerifiedSource } from "@/lib/platform-data";

export function SourceStamp({ source }: { source: VerifiedSource }) {
  return <div className="source-stamp">
    <span>{source.type}</span>
    <strong><a href={source.url} target="_blank" rel="noreferrer">{source.name}</a></strong>
    <small>{source.geography} · Last checked {source.lastVerified}</small>
  </div>;
}

export function SafetyNotice() {
  return <aside className="safety-notice">
    <strong>Important</strong>
    <p>Rules may depend on nationality and individual circumstances. Always verify important immigration, tax, legal and insurance requirements with the relevant German authority.</p>
  </aside>;
}
