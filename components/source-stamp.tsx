import type { VerifiedSource } from "@/lib/platform-data";
import type { SiteLocale } from "@/lib/locale-paths";

const copy={
  en:{checked:"Last checked",title:"Use this as your practical starting point",description:"We explain the usual route and link the source. Your nationality, city or personal situation can change the answer, so check time-sensitive legal, tax, immigration and insurance details with the responsible authority."},
  es:{checked:"Última comprobación",title:"Utiliza esta información como punto de partida",description:"Explicamos el procedimiento habitual y enlazamos a la fuente original. Tu nacionalidad, ciudad o situación personal pueden cambiar la respuesta. Verifica los datos legales, fiscales, migratorios y de seguros con el organismo competente."},
  de:{checked:"Zuletzt geprüft",title:"Eine praktische Orientierung für Ihre nächsten Schritte",description:"Wir erklären den üblichen Ablauf und verlinken die Quellen. Staatsangehörigkeit, Stadt und persönliche Umstände können zu anderen Ergebnissen führen. Prüfen Sie zeitabhängige Rechts-, Steuer-, Aufenthalts- und Versicherungsfragen bei der zuständigen Stelle."},
} as const;
export function SourceStamp({source,locale="en"}:{source:VerifiedSource;locale?:SiteLocale}) {
 const t=copy[locale];
 return <div className="source-stamp" lang={locale} data-no-translate>
   <span>{source.type}</span>
   <strong><a href={source.url} target="_blank" rel="noreferrer">{source.name}</a></strong>
   <small>{source.geography} · {t.checked} {source.lastVerified}</small>
 </div>;
}
export function SafetyNotice({locale="en"}:{locale?:SiteLocale}) {
 const t=copy[locale];
 return <aside className="safety-notice trust-block" lang={locale} data-no-translate>
   <strong>{t.title}</strong><p>{t.description}</p>
 </aside>;
}
