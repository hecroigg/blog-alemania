import Link from "next/link";
import { Icon } from "@/components/icon";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site";

export type Crumb = { label: string; href?: string };

/**
 * Visible crawlable anchors and matching BreadcrumbList structured data.
 * The current page can omit its URL as recommended by Google.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && item.href.startsWith("/") && !item.href.startsWith("//")
        ? { item: absoluteUrl(item.href) }
        : {}),
    })),
  };
  return <>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>{items.map((item, index) => (
        <li key={item.label + "-" + index}>
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          {index < items.length - 1 && <Icon name="arrow" size={14}/>}
        </li>
      ))}</ol>
    </nav>
    {items.length >= 2 && <JsonLd data={schema}/>}
  </>;
}
