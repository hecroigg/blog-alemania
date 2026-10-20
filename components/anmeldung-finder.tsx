"use client";

import { useState } from "react";
import { registrationCities, type RegistrationLocale } from "@/lib/content/city-registration";

const text = {
  en: {
    lang:"Language", city:"Where will you live?", case:"Where are you moving from?", category:"Which residence?", abroad:"From another country", domestic:"From within Germany", main:"Main or only residence", secondary:"Secondary residence", title:"Your route, not a generic checklist", official:"Open the official city instructions", normal:"Most residents who have moved into a registrable dwelling should register within two weeks; statutory exceptions exist. The deadline runs from moving in, not signing the lease.",docs:"Prepare these before choosing an appointment", documents:["Valid identity document for each person", "Signed Wohnungsgeberbestätigung (housing-provider confirmation)", "Actual move-in date and new address", "Previous registration details if requested", "Any additional family or residence-permit records required by the city"],first:"If arriving from abroad, do not assume an online process intended for moves within Germany is available to you.",within:"If moving within Germany, the municipality of the new dwelling handles registration. Your previous German address is normally updated through the new registration.",second:"Secondary residences can have different registration procedures and local rules. Check the official city page before using a main-home online process.",extra:"Your city-specific detail", verify:"Checked against the linked municipal source on 20 October 2026. The city can change its booking options, eligibility and documents. This finder is orientation, not a legal eligibility decision.", tip:"Useful next steps", steps:["Confirm that the landlord permits registration at your real address.", "Open the official link and check appointments or digital eligibility.", "Keep your Meldebestätigung after registration."], disclaimer:"No data is sent to GermanyBase: your selections are processed in this browser only.", cityLink:"Local city guide" },
  es: {
    lang:"Idioma",city:"¿Dónde vivirás?",case:"¿Desde dónde te mudas?",category:"¿Qué tipo de domicilio?",abroad:"Desde otro país",domestic:"Desde Alemania",main:"Principal o único",secondary:"Secundario",title:"Tu trámite, sin listas genéricas",official:"Abrir instrucciones oficiales del ayuntamiento",normal:"En general, quien se muda a una vivienda registrable debe empadronarse en un plazo de dos semanas, con excepciones legales. El plazo suele contarse desde la entrada real, no desde la firma del contrato.",docs:"Prepara esto antes de pedir cita",documents:["Documento de identidad válido para cada persona","Wohnungsgeberbestätigung firmada por el arrendador o responsable de la vivienda","Fecha de entrada efectiva y dirección nueva","Datos de residencia anteriores si se requieren","Documentación familiar o migratoria adicional que exija la ciudad"],first:"Si llegas del extranjero, no presupongas que puedes utilizar el trámite digital pensado para mudanzas dentro de Alemania.",within:"Si cambias de casa dentro de Alemania, te registra el municipio de la vivienda nueva. Generalmente la baja anterior se comunica mediante la nueva inscripción.",second:"Los domicilios secundarios pueden requerir otros trámites y obligaciones locales. No utilices sin comprobar el procedimiento digital de domicilio principal.",extra:"Detalle específico de tu ciudad",verify:"Información contrastada con la fuente municipal enlazada el 20 de octubre de 2026. El ayuntamiento puede cambiar citas, requisitos y documentación. Esta herramienta es orientativa, no determina tu situación legal.",tip:"Próximos pasos útiles",steps:["Confirma que podrás registrar tu dirección real con el arrendador.","Entra en el enlace oficial y revisa las citas o requisitos digitales.","Guarda la Meldebestätigung después de completar el trámite."],disclaimer:"No se envían datos a GermanyBase: las selecciones solo se procesan en tu navegador.",cityLink:"Guía de la ciudad" },
  de: {
    lang:"Sprache",city:"In welcher Stadt wohnst du?",case:"Woher ziehst du zu?",category:"Welche Wohnungsart?",abroad:"Aus dem Ausland",domestic:"Innerhalb Deutschlands",main:"Haupt- oder alleinige Wohnung",secondary:"Nebenwohnung",title:"Dein Meldeweg statt einer allgemeinen Liste",official:"Offizielle Informationen der Stadt öffnen",normal:"Im Regelfall ist eine meldepflichtige Wohnung innerhalb von zwei Wochen nach dem Einzug anzumelden; gesetzliche Ausnahmen sind möglich. Maßgeblich ist der tatsächliche Einzug, nicht die Vertragsunterschrift.",docs:"Vor dem Termin vorbereiten",documents:["Gültiges Ausweisdokument für jede Person","Unterschriebene Wohnungsgeberbestätigung","Tatsächliches Einzugsdatum und neue Adresse","Daten der bisherigen Wohnung, soweit verlangt","Ggf. weitere Familien- oder Aufenthaltsdokumente laut Stadt"],first:"Bei Zuzug aus dem Ausland ist eine Online-Anmeldung für innerdeutsche Umzüge nicht automatisch nutzbar.",within:"Bei einem Umzug innerhalb Deutschlands ist die Meldebehörde am neuen Wohnort zuständig. Die bisherige deutsche Gemeinde wird normalerweise über die Anmeldung informiert.",second:"Für Nebenwohnungen können eigene Verfahren und kommunale Regeln gelten. Nicht einfach das Online-Verfahren für Hauptwohnungen verwenden.",extra:"Besonderheiten dieser Stadt",verify:"Am 20. Oktober 2026 mit der verlinkten städtischen Quelle abgeglichen. Termine, Voraussetzungen und Unterlagen können sich ändern. Das Tool ist eine Orientierung und keine behördliche Entscheidung.",tip:"Nächste Schritte",steps:["Mit dem Wohnungsgeber klären, ob die tatsächliche Adresse anmeldbar ist.","Offizielle Seite öffnen und Termine bzw. digitale Voraussetzungen prüfen.","Die Meldebestätigung nach der Anmeldung aufbewahren."],disclaimer:"Deine Auswahl bleibt im Browser und wird nicht an GermanyBase gesendet.",cityLink:"Stadtführer" }
} as const;

export function AnmeldungFinder({ initialCity = "mannheim" }: { initialCity?: string }) {
  const [locale,setLocale] = useState<RegistrationLocale>("en");
  const [city,setCity] = useState(registrationCities.some(item=>item.slug===initialCity) ? initialCity : "mannheim");
  const [from,setFrom] = useState<"abroad"|"domestic">("abroad");
  const [residence,setResidence] = useState<"main"|"secondary">("main");
  const ui = text[locale];
  const selected=registrationCities.find(item=>item.slug===city) || registrationCities[0];
  return (
    <div className="registration-finder">
      <div className="registration-finder-controls">
        <fieldset className="registration-lang" aria-label={ui.lang}>
          <legend>{ui.lang}</legend>
          {(["en","es","de"] as RegistrationLocale[]).map(item => <button key={item} type="button" lang={item} aria-pressed={item===locale} onClick={()=>setLocale(item)}>{({en:"English",es:"Español",de:"Deutsch"} as const)[item]}</button>)}
        </fieldset>
        <label>{ui.city}
          <select value={city} onChange={event=>setCity(event.target.value)}>
            {registrationCities.map(item=><option key={item.slug} value={item.slug}>{item.name}</option>)}
          </select>
        </label>
        <label>{ui.case}
          <select value={from} onChange={event=>setFrom(event.target.value as "abroad"|"domestic")}>
            <option value="abroad">{ui.abroad}</option>
            <option value="domestic">{ui.domestic}</option>
          </select>
        </label>
        <label>{ui.category}
          <select value={residence} onChange={event=>setResidence(event.target.value as "main"|"secondary")}>
            <option value="main">{ui.main}</option>
            <option value="secondary">{ui.secondary}</option>
          </select>
        </label>
      </div>
      <div className="registration-finder-result" aria-live="polite" lang={locale}>
        <span className="eyebrow">{selected.name} · Anmeldung</span>
        <h2>{ui.title}</h2>
        <p>{ui.normal}</p>
        <div className="registration-info"><strong>{from==="abroad"?ui.abroad:ui.domestic}</strong><p>{from==="abroad"?ui.first:ui.within}</p></div>
        {residence==="secondary" && <div className="registration-info"><strong>{ui.secondary}</strong><p>{ui.second}</p></div>}
        <h3>{ui.extra}</h3>
        <p>{selected.note[locale]}</p>
        <a className="button button-primary" href={selected.officialUrl} target="_blank" rel="noopener noreferrer">{ui.official} ↗</a>
        <a className="registration-city-link" href={"/cities/"+selected.slug}>{ui.cityLink}: {selected.name} →</a>
        <h3>{ui.docs}</h3>
        <ul>{ui.documents.map(item=><li key={item}>{item}</li>)}</ul>
        <h3>{ui.tip}</h3>
        <ol>{ui.steps.map(item=><li key={item}>{item}</li>)}</ol>
        <p className="registration-caveat">{ui.verify}</p>
        <p className="registration-caveat">{ui.disclaimer}</p>
      </div>
    </div>
  );
}
