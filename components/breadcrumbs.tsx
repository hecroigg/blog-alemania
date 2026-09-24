import Link from "next/link";
import { Icon } from "@/components/icon";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return <nav className="breadcrumbs" aria-label="Breadcrumb"><ol>{items.map((item, index) => <li key={`${item.label}-${index}`}>{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}{index < items.length - 1 && <Icon name="arrow" size={14} />}</li>)}</ol></nav>;
}
