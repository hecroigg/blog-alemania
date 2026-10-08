import de from "@/lib/translations/de.json";
import es from "@/lib/translations/es.json";
import fr from "@/lib/translations/fr.json";
import it from "@/lib/translations/it.json";
import pl from "@/lib/translations/pl.json";
import pt from "@/lib/translations/pt.json";
import uk from "@/lib/translations/uk.json";
import { exactGuideByKey, exactGuideSlugs, exactGuides, type ExactGuideKey } from "@/lib/content/exact-guides";
import type { Guide } from "@/lib/types";
import type { Locale } from "@/lib/platform-data";

type Catalog = Record<string, string>;
const catalogs: Record<Exclude<Locale, "en">, Catalog> = { de, es, fr, it, pl, pt, uk };

function text(locale: Locale, value: string) {
  if (locale === "en") return value;
  return catalogs[locale][value] || value;
}

export function getLocalizedExactGuide(locale: Locale, key: ExactGuideKey): Guide & { key: ExactGuideKey } {
  const item = exactGuideByKey.get(key);
  if (!item) throw new Error(`Unknown exact guide: ${key}`);
  return {
    ...item,
    slug: exactGuideSlugs[key][locale],
    title: text(locale, item.title),
    description: text(locale, item.description),
    eyebrow: text(locale, item.eyebrow),
    summary: text(locale, item.summary),
    takeaways: item.takeaways.map((value) => text(locale, value)),
    sections: item.sections.map((section) => ({
      ...section,
      heading: text(locale, section.heading),
      paragraphs: section.paragraphs.map((value) => text(locale, value)),
      bullets: section.bullets?.map((value) => text(locale, value)),
      resources: section.resources?.map((resource) => ({ ...resource, note: text(locale, resource.note) })),
      callout: section.callout ? { ...section.callout, title: text(locale, section.callout.title), text: text(locale, section.callout.text) } : undefined,
    })),
    faqs: item.faqs.map((faq) => ({ question: text(locale, faq.question), answer: text(locale, faq.answer) })),
    sources: item.sources.map((source) => ({ ...source, name: text(locale, source.name), note: source.note ? text(locale, source.note) : undefined })),
    key,
  };
}

export function getLocalizedExactGuides(locale: Locale) {
  return exactGuides.map((item) => getLocalizedExactGuide(locale, item.key));
}

export const exactGuideUi: Record<Locale, {
  home: string; guides: string; library: string; libraryTitle: string; libraryIntro: string;
  published: string; topics: string; read: string; updated: string; onPage: string;
  first: string; questions: string; sources: string; otherLanguages: string; official: string;
}> = {
  en: { home: "Home", guides: "Guides", library: "Exact figures for Germany", libraryTitle: "Germany in numbers: practical 2026 guides", libraryIntro: "Fifteen practical references covering pay, deductions, deadlines, healthcare, payslips, tickets, rent and family benefits.", published: "Published references", topics: "15 verified guides", read: "minute read", updated: "Last updated", onPage: "On this page", first: "The numbers to remember", questions: "Common questions", sources: "Official and primary sources", otherLanguages: "Read this guide in another language", official: "Official 2026 source" },
  es: { home: "Inicio", guides: "Guías", library: "Cifras exactas de Alemania", libraryTitle: "Alemania en cifras: guías prácticas de 2026", libraryIntro: "Quince guías prácticas sobre salarios, deducciones, plazos, salud, nóminas, transporte, alquiler y ayudas familiares.", published: "Referencias publicadas", topics: "15 guías verificadas", read: "min de lectura", updated: "Actualizado", onPage: "En esta página", first: "Las cifras que debes recordar", questions: "Preguntas frecuentes", sources: "Fuentes oficiales y primarias", otherLanguages: "Lee esta guía en otro idioma", official: "Fuente oficial de 2026" },
  de: { home: "Startseite", guides: "Ratgeber", library: "Konkrete Zahlen für Deutschland", libraryTitle: "Deutschland in Zahlen: praktische Ratgeber 2026", libraryIntro: "Fünfzehn praktische Ratgeber zu Lohn, Abzügen, Fristen, Gesundheit, Gehaltsabrechnung, Tickets, Miete und Familienleistungen.", published: "Veröffentlichte Ratgeber", topics: "15 geprüfte Ratgeber", read: "Min. Lesezeit", updated: "Aktualisiert", onPage: "Auf dieser Seite", first: "Die wichtigsten Zahlen", questions: "Häufige Fragen", sources: "Offizielle und primäre Quellen", otherLanguages: "Diesen Ratgeber in einer anderen Sprache lesen", official: "Offizielle Quelle 2026" },
  fr: { home: "Accueil", guides: "Guides", library: "Chiffres précis pour l’Allemagne", libraryTitle: "L’Allemagne en chiffres : guides pratiques 2026", libraryIntro: "Quinze guides pratiques sur salaires, cotisations, délais, santé, fiches de paie, transports, loyer et prestations familiales.", published: "Guides publiés", topics: "15 guides vérifiés", read: "min de lecture", updated: "Mis à jour", onPage: "Sur cette page", first: "Les chiffres à retenir", questions: "Questions fréquentes", sources: "Sources officielles et primaires", otherLanguages: "Lire ce guide dans une autre langue", official: "Source officielle 2026" },
  it: { home: "Home", guides: "Guide", library: "Cifre precise per la Germania", libraryTitle: "La Germania in cifre: guide pratiche 2026", libraryIntro: "Dodici riferimenti sintetici con i numeri che servono davvero: stipendi, contributi, scadenze, trasporti, affitto e aiuti familiari.", published: "Guide pubblicate", topics: "12 argomenti verificati", read: "min di lettura", updated: "Aggiornato", onPage: "In questa pagina", first: "I numeri da ricordare", questions: "Domande frequenti", sources: "Fonti ufficiali e primarie", otherLanguages: "Leggi questa guida in un’altra lingua", official: "Fonte ufficiale 2026" },
  pt: { home: "Início", guides: "Guias", library: "Números exatos da Alemanha", libraryTitle: "Alemanha em números: guias práticos de 2026", libraryIntro: "Doze referências concisas com os valores que realmente importam: salários, descontos, prazos, transportes, renda e apoios familiares.", published: "Guias publicados", topics: "12 temas verificados", read: "min de leitura", updated: "Atualizado", onPage: "Nesta página", first: "Os números a reter", questions: "Perguntas frequentes", sources: "Fontes oficiais e primárias", otherLanguages: "Leia este guia noutro idioma", official: "Fonte oficial de 2026" },
  pl: { home: "Strona główna", guides: "Poradniki", library: "Konkretne liczby dla Niemiec", libraryTitle: "Niemcy w liczbach: praktyczne poradniki 2026", libraryIntro: "Dwanaście zwięzłych opracowań z liczbami, których naprawdę potrzebujesz: płace, składki, terminy, bilety, najem i świadczenia rodzinne.", published: "Opublikowane poradniki", topics: "12 zweryfikowanych tematów", read: "min czytania", updated: "Aktualizacja", onPage: "Na tej stronie", first: "Najważniejsze liczby", questions: "Częste pytania", sources: "Źródła oficjalne i pierwotne", otherLanguages: "Przeczytaj poradnik w innym języku", official: "Oficjalne źródło 2026" },
  uk: { home: "Головна", guides: "Матеріали", library: "Точні цифри про Німеччину", libraryTitle: "Німеччина в цифрах: практичні матеріали 2026", libraryIntro: "Дванадцять стислих довідників із потрібними цифрами: зарплати, внески, строки, транспорт, оренда та сімейні виплати.", published: "Опубліковані матеріали", topics: "12 перевірених тем", read: "хв читання", updated: "Оновлено", onPage: "На цій сторінці", first: "Цифри, які варто пам’ятати", questions: "Поширені запитання", sources: "Офіційні та первинні джерела", otherLanguages: "Читати іншою мовою", official: "Офіційне джерело 2026" },
};
