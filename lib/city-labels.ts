import type { SiteLocale } from "@/lib/locale-paths";

const cityNames: Record<string, { es: string; de: string }> = {
  berlin: { es: "Berlín", de: "Berlin" },
  munich: { es: "Múnich", de: "München" },
  hamburg: { es: "Hamburgo", de: "Hamburg" },
  frankfurt: { es: "Fráncfort", de: "Frankfurt am Main" },
  cologne: { es: "Colonia", de: "Köln" },
  dusseldorf: { es: "Düsseldorf", de: "Düsseldorf" },
  stuttgart: { es: "Stuttgart", de: "Stuttgart" },
  mannheim: { es: "Mannheim", de: "Mannheim" },
  heidelberg: { es: "Heidelberg", de: "Heidelberg" },
  freiburg: { es: "Friburgo de Brisgovia", de: "Freiburg im Breisgau" },
  karlsruhe: { es: "Karlsruhe", de: "Karlsruhe" },
  leipzig: { es: "Leipzig", de: "Leipzig" },
  dresden: { es: "Dresde", de: "Dresden" },
  nuremberg: { es: "Núremberg", de: "Nürnberg" },
  hannover: { es: "Hannover", de: "Hannover" },
  bremen: { es: "Bremen", de: "Bremen" },
};

export function localizedCityName(locale: SiteLocale, slug: string, original: string) {
  return locale === "en" ? original : cityNames[slug]?.[locale] || original;
}
