import type { SiteLocale } from "@/lib/locale-paths";
import type { Guide, Source } from "@/lib/types";

export type FamilyGuide = {
  slugs: Record<SiteLocale, string>;
  category: string;
  readingMinutes: number;
  related: string[];
  copy: Record<SiteLocale, Omit<Guide, "slug" | "category" | "readingMinutes" | "updated" | "related" | "featured">>;
};

export function applicationLink(label: string, url: string, note: string) {
  return { label, url, note };
}

export function guideSources(sources: readonly (readonly [string, string])[]): Source[] {
  return sources.map(([name, url]) => ({ name, url }));
}
