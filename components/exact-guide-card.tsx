import Link from "next/link";
import { Icon } from "@/components/icon";
import type { Guide } from "@/lib/types";

export function ExactGuideCard({ guide, href }: { guide: Guide; href: string }) {
  return <article className="guide-card exact-guide-card">
    <div className="guide-card-top"><span className="guide-category">{guide.eyebrow}</span><span>{guide.readingMinutes} min</span></div>
    <h2><Link href={href}>{guide.title}</Link></h2>
    <p>{guide.description}</p>
    <Link className="text-link" href={href}><span>{guide.takeaways[0]}</span><Icon name="arrow" size={17}/></Link>
  </article>;
}
