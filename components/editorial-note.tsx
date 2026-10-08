import Link from "next/link";
import { defaultEditorialNote, editorialNotes } from "@/lib/editorial-notes";

export function EditorialNote({ slug, updated, sourceCount }: { slug: string; updated: string; sourceCount: number }) {
  const note = editorialNotes[slug] || defaultEditorialNote;
  return <aside className="editorial-note">
    <div className="editorial-note-head">
      <span>GermanyBase practical note</span>
      <small>Reviewed {updated} · {sourceCount} primary/official source{sourceCount === 1 ? "" : "s"}</small>
    </div>
    <h2>{note.heading}</h2>
    <p>{note.text}</p>
    <ul>{note.checks.map((item) => <li key={item}>{item}</li>)}</ul>
    <p className="editorial-note-method">How we work: we combine practical checks from Germany with the responsible official source, and we separate general guidance from rules that depend on your city or personal status. <Link href="/how-we-research">Read our research method</Link>.</p>
  </aside>;
}
