"use client";
import { useState } from "react";
import type { Locale } from "@/lib/platform-data";
import { minimumHolidayDays } from "@/lib/holiday-days";
const copy: Record<Locale,{title:string;lead:string;label:string;result:string;weeks:string;warning:string;source:string;detail:string}> = {
  "en": {
    "title": "Calculate your statutory paid holiday",
    "lead": "For an adult employee with a regular working week, Germany's statutory annual minimum is four weeks. Select the number of days you usually work per week.",
    "label": "Regular workdays per week",
    "result": "Minimum paid holiday days per full year",
    "weeks": "Equivalent to four weeks of leave",
    "warning": "This assumes a full annual entitlement for an adult with a regular weekly pattern. In the first six months or for an incomplete year, special rules apply; minors, severe disability and collective agreements can give additional rights. This does not deduct public holidays.",
    "source": "Official law §3 BUrlG",
    "detail": "German Employment Ministry guidance"
  },
  "es": {
    "title": "Calcula tus vacaciones pagadas mínimas en Alemania",
    "lead": "Para una persona adulta con una semana laboral regular, el mínimo anual legal equivale a cuatro semanas. Selecciona cuántos días trabajas normalmente cada semana.",
    "label": "Días habituales de trabajo por semana",
    "result": "Días mínimos de vacaciones pagadas por año completo",
    "weeks": "Equivalen a cuatro semanas libres",
    "warning": "Se supone un derecho anual completo para una persona adulta. Durante los seis primeros meses y en años incompletos hay reglas específicas; menores, discapacidad grave y convenios pueden dar más días. No se descuentan festivos.",
    "source": "Ley oficial §3 BUrlG",
    "detail": "Información del Ministerio de Trabajo alemán"
  },
  "de": {
    "title": "Gesetzlichen Mindesturlaub berechnen",
    "lead": "Für erwachsene Beschäftigte mit regelmäßiger Arbeitswoche beträgt der gesetzliche Mindesturlaub vier Wochen pro Jahr. Wähle deine üblichen Arbeitstage pro Woche.",
    "label": "Regelmäßige Arbeitstage pro Woche",
    "result": "Gesetzliche Mindesturlaubstage pro vollem Jahr",
    "weeks": "Entspricht vier Wochen Erholungsurlaub",
    "warning": "Gilt für einen vollen Jahresanspruch erwachsener Beschäftigter mit regelmäßigem Wochenplan. In der Wartezeit und bei einem angebrochenen Jahr gelten Sonderregeln; Jugendliche, Schwerbehinderte und Tarifverträge können zusätzliche Rechte haben. Feiertage sind nicht abzuziehen.",
    "source": "Gesetz §3 BUrlG",
    "detail": "BMAS-Informationen zum Urlaub"
  },
  "fr": {
    "title": "Calculer le congé payé minimum en Allemagne",
    "lead": "Pour un salarié adulte à horaire régulier, le minimum légal annuel correspond à quatre semaines de congés. Choisissez le nombre de jours travaillés par semaine.",
    "label": "Jours de travail habituels par semaine",
    "result": "Jours de congé minimum pour une année complète",
    "weeks": "Équivalent à quatre semaines de repos",
    "warning": "Suppose une année complète pour un adulte au rythme de travail régulier. Les six premiers mois, les années incomplètes, les mineurs, le handicap et les conventions collectives ont des règles particulières. Les jours fériés ne sont pas déduits.",
    "source": "Texte légal §3 BUrlG",
    "detail": "Informations du ministère allemand du Travail"
  },
  "it": {
    "title": "Calcola le ferie retribuite minime in Germania",
    "lead": "Per un lavoratore adulto con una settimana regolare, il minimo legale annuo equivale a quattro settimane.",
    "label": "Giorni lavorati a settimana",
    "result": "Giorni minimi di ferie per anno completo",
    "weeks": "Quattro settimane di ferie",
    "warning": "Vale per un adulto con un anno completo e un orario regolare. Primo semestre, minori, disabilità e contratti collettivi possono prevedere regole diverse. I festivi non vengono sottratti.",
    "source": "Legge §3 BUrlG",
    "detail": "Ministero del Lavoro tedesco"
  },
  "pt": {
    "title": "Calcula as férias pagas mínimas na Alemanha",
    "lead": "Para um adulto com semana de trabalho regular, o mínimo legal anual corresponde a quatro semanas.",
    "label": "Dias de trabalho por semana",
    "result": "Dias mínimos de férias num ano completo",
    "weeks": "Equivale a quatro semanas",
    "warning": "Aplica-se a um adulto com ano completo e horário regular. O primeiro semestre, menores, deficiência e contratos coletivos podem alterar direitos. Feriados não são descontados.",
    "source": "Lei §3 BUrlG",
    "detail": "Ministério do Trabalho alemão"
  },
  "pl": {
    "title": "Oblicz minimalny płatny urlop w Niemczech",
    "lead": "Przy regularnym tygodniu pracy dorosły pracownik ma ustawowe minimum odpowiadające czterem tygodniom urlopu.",
    "label": "Dni pracy w tygodniu",
    "result": "Minimalna liczba dni urlopu za pełny rok",
    "weeks": "Odpowiada czterem tygodniom",
    "warning": "Dotyczy pełnego roku i dorosłych z regularnym grafikiem. Początkowe miesiące, niepełnoletni, niepełnosprawność i układy zbiorowe podlegają szczególnym zasadom. Świąt nie odejmuje się.",
    "source": "Ustawa §3 BUrlG",
    "detail": "Niemieckie ministerstwo pracy"
  },
  "uk": {
    "title": "Розрахуйте мінімальну оплачувану відпустку в Німеччині",
    "lead": "Для повнолітніх працівників зі сталим графіком законодавчий мінімум становить чотири тижні на рік.",
    "label": "Робочі дні на тиждень",
    "result": "Мінімальна кількість днів за повний рік",
    "weeks": "Еквівалент чотирьох тижнів",
    "warning": "Для дорослих зі сталим графіком і повним роком роботи. Початкові місяці, неповнолітні, інвалідність і колективні угоди мають окремі правила. Свята не віднімаються.",
    "source": "Закон §3 BUrlG",
    "detail": "Міністерство праці Німеччини"
  }
};
export function HolidayMinimumCalculator({locale}:{locale:Locale}) {
 const [days,setDays]=useState(5);
 const t=copy[locale];
 return <section aria-labelledby="holiday-calculator-title" className="holiday-mini-calculator" data-no-translate>
  <h2 id="holiday-calculator-title">{t.title}</h2>
  <p>{t.lead}</p>
  <label htmlFor="holiday-week-days">{t.label}</label>
  <select id="holiday-week-days" value={days} onChange={e=>setDays(Number(e.target.value))}>
   {[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n}</option>)}
  </select>
  <div className="holiday-mini-result" aria-live="polite">
    <small>{t.result}</small><strong>{minimumHolidayDays(days)}</strong><span>{t.weeks}</span>
  </div>
  <p className="holiday-mini-warning">{t.warning}</p>
  <p className="holiday-mini-sources"><a href="https://www.gesetze-im-internet.de/burlg/__3.html" target="_blank" rel="noopener noreferrer">{t.source}</a> · <a href="https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Teilzeit-flexible-Arbeitszeit/Teilzeit/Fragen-und-Antworten-Brueckenteilzeit/faq-brueckenteilzeit.html" target="_blank" rel="noopener noreferrer">{t.detail}</a></p>
 </section>;
}
