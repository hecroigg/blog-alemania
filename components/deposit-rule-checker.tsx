"use client";
import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { checkResidentialDeposit } from "@/lib/rental-deposit";
const copy={
 en:{title:"Is this German rental deposit reasonable?",intro:"For an ordinary residential lease, §551 BGB limits a cash deposit to three months of cold rent (excluding separately charged utilities). You can pay it in three equal monthly instalments, the first due at the start of the tenancy.",rent:"Monthly cold rent (€)",deposit:"Deposit requested (€)",maximum:"Ordinary deposit ceiling",first:"First of three instalments",high:"The requested sum exceeds the standard legal maximum for residential rent. Check the actual contract type before paying.",okay:"Within the usual ceiling, but this does not establish that the advertiser is genuine.",note:"This applies to ordinary residential leases only. Never pay just to view a property or to have keys sent to you; confirm the identity of the landlord.",source:"German Civil Code §551"},
 es:{title:"¿Es correcta esta fianza de alquiler en Alemania?",intro:"En un alquiler habitual de vivienda, el §551 BGB limita la fianza en dinero a tres mensualidades del alquiler frío (Kaltmiete, sin gastos separados). Puedes abonarla en tres mensualidades iguales: la primera al empezar el alquiler.",rent:"Alquiler frío mensual (€)",deposit:"Fianza solicitada (€)",maximum:"Máximo legal habitual",first:"Primer plazo de tres",high:"La cantidad supera el máximo legal habitual para vivienda. Comprueba el contrato antes de pagar.",okay:"La cantidad está dentro del máximo habitual, pero no demuestra que el anuncio sea auténtico.",note:"Solo para contratos habituales de vivienda. No pagues por visitar una casa ni por recibir llaves. Comprueba quién es el arrendador.",source:"Código Civil alemán §551"},
 de:{title:"Mietkaution in Deutschland prüfen",intro:"Bei gewöhnlichem Wohnraum beschränkt §551 BGB die Barkaution auf drei Nettokaltmieten. Sie darf in drei gleichen Monatsraten gezahlt werden, die erste zum Mietbeginn.",rent:"Monatliche Kaltmiete (€)",deposit:"Verlangte Kaution (€)",maximum:"Gesetzlicher Regelfall: Höchstbetrag",first:"Erste von drei Raten",high:"Die verlangte Summe überschreitet die übliche gesetzliche Grenze. Prüfe die Vertragsart vor einer Zahlung.",okay:"Der Betrag liegt innerhalb der üblichen Grenze, aber dies beweist nicht, dass das Angebot echt ist.",note:"Nur für gewöhnliche Wohnraummiete. Kein Geld für eine Besichtigung oder Schlüsselversand zahlen. Vermieter prüfen.",source:"Bürgerliches Gesetzbuch §551"},
 fr:{title:"Vérifier une caution de location en Allemagne",intro:"Pour un bail d'habitation ordinaire, le §551 BGB limite la caution en espèces à trois loyers hors charges. Elle peut être payée en trois mensualités égales, la première au début du bail.",rent:"Loyer hors charges par mois (€)",deposit:"Caution demandée (€)",maximum:"Plafond habituel",first:"Premier des trois paiements",high:"La somme dépasse le plafond habituel pour le logement résidentiel. Vérifiez le contrat avant de payer.",okay:"Le montant respecte le plafond habituel, sans prouver la fiabilité de l'annonce.",note:"Pour un bail résidentiel ordinaire uniquement. Ne payez pas pour visiter un logement ou recevoir des clés.",source:"Code civil allemand §551"}
} as const;
export function DepositRuleChecker(){
 const {locale}=useLanguage();
 const t=copy[locale==="es"||locale==="de"||locale==="fr"?locale:"en"];
 const [cold,setCold]=useState(750);
 const [deposit,setDeposit]=useState(1800);
 const result=checkResidentialDeposit(cold,deposit);
 const money=(v:number)=>new Intl.NumberFormat(locale==="es"?"es-ES":locale==="de"?"de-DE":locale==="fr"?"fr-FR":"en-GB",{style:"currency",currency:"EUR",maximumFractionDigits:2}).format(v);
 return <section className="rental-deposit-checker" aria-label={t.title} data-no-translate>
  <h2>{t.title}</h2><p>{t.intro}</p>
  <div className="rental-deposit-grid">
    <label>{t.rent}<input type="number" min="0" value={cold} onChange={e=>setCold(Math.max(0,Number(e.target.value)||0))}/></label>
    <label>{t.deposit}<input type="number" min="0" value={deposit} onChange={e=>setDeposit(Math.max(0,Number(e.target.value)||0))}/></label>
  </div>
  {result.valid && <div aria-live="polite">
    <div className="rental-deposit-results"><div><small>{t.maximum}</small><strong>{money(result.maximum)}</strong></div><div><small>{t.first}</small><strong>{money(result.firstInstalment)}</strong></div></div>
    <p className="rental-deposit-result-text">{result.exceeds?t.high:t.okay}</p>
  </div>}
  <p className="rental-deposit-disclaimer">{t.note}</p>
  <a href="https://www.gesetze-im-internet.de/bgb/__551.html" target="_blank" rel="noopener noreferrer">{t.source} ↗</a>
 </section>;
}
