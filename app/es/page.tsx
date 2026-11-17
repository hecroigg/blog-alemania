import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Icon } from "@/components/icon";
import { exactGuidePath } from "@/lib/exact-guide-routes";
import type { ExactGuideKey } from "@/lib/exact-guide-slugs";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vivir y trabajar en Alemania: guía práctica en español",
  description: "Guías en español para instalarte en Alemania: Anmeldung, trabajo, seguros, alquiler y transporte. Pasos claros, herramientas y fuentes oficiales.",
  alternates: { canonical: absoluteUrl("/es") },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: absoluteUrl("/es"),
    title: "Vivir y trabajar en Alemania | GermanyBase",
    description: "Un punto de partida en español para resolver trámites, empleo y vida cotidiana en Alemania.",
    locale: "es_ES",
  },
};

type Resource = { key: ExactGuideKey; title: string; description: string };
type Cluster = { id: string; eyebrow: string; title: string; description: string; items: Resource[] };

const clusters: Cluster[] = [
  {
    id: "tramites",
    eyebrow: "01 · Trámites",
    title: "Documentación y primeros pasos",
    description: "Resuelve los trámites que pueden condicionar tu llegada. Comprueba siempre las condiciones de tu ciudad y situación personal.",
    items: [
      { key: "anmeldung", title: "Anmeldung: plazo y documentos", description: "Qué es el registro de domicilio, cómo prepararlo y qué verificar en el ayuntamiento." },
      { key: "rundfunk", title: "Rundfunkbeitrag: la tasa de radiodifusión", description: "Cómo funciona en una vivienda compartida y dónde comprobar tu caso." },
      { key: "health", title: "Seguro médico en Alemania", description: "Cómo orientarte entre situaciones de estudio, empleo y diferentes coberturas." },
    ],
  },
  {
    id: "trabajo",
    eyebrow: "02 · Trabajo",
    title: "Empleo, contratos y salario",
    description: "Empieza por identificar tu tipo de empleo. Los importes y los requisitos pueden cambiar y merecen una comprobación actualizada.",
    items: [
      { key: "minijob", title: "Minijob: límites y derechos", description: "Reglas del empleo de ingresos reducidos y aspectos que conviene revisar en el contrato." },
      { key: "midijob", title: "Midijob: en qué se diferencia", description: "Una explicación para comparar modalidades antes de aceptar una oferta." },
      { key: "leave", title: "Vacaciones pagadas", description: "Calcula el mínimo legal según tus días de trabajo por semana y revisa las excepciones." },
      { key: "minimumWage", title: "Salario mínimo", description: "Consulta el marco legal y aprende qué comprobar en una nómina o una oferta." },
    ],
  },
  {
    id: "vida-diaria",
    eyebrow: "03 · Vida diaria",
    title: "Vivienda, transporte y dinero",
    description: "Preguntas prácticas que suelen surgir al asentarte en Alemania: desde el contrato de alquiler hasta tus gastos mensuales.",
    items: [
      { key: "deposit", title: "Fianza del alquiler (Kaution)", description: "Qué revisar antes de pagar, con referencias a la normativa de arrendamientos." },
      { key: "deutschlandticket", title: "Deutschlandticket: qué incluye", description: "Cómo comprobar el precio, los transportes válidos y las condiciones del abono." },
      { key: "allowance", title: "Mínimo exento de impuestos", description: "Distingue ingresos brutos, base imponible y conceptos fiscales frecuentes." },
    ],
  },
];

const allGuides = clusters.flatMap((cluster) => cluster.items);

export default function SpanishHome() {
  return (
    <div lang="es">
      <section className="page-hero">
        <div className="shell">
          <div className="page-hero-grid">
            <div className="page-hero-copy">
              <span className="eyebrow">GermanyBase · en español</span>
              <h1>Vivir y trabajar en Alemania, paso a paso</h1>
              <p>
                Información práctica para organizar tu llegada, entender los trámites
                y tomar decisiones sobre trabajo y vivienda. Sin consejos genéricos:
                empieza por el problema que quieres resolver.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary button-large" href="#tramites">
                  Empieza por los trámites <Icon name="arrow" />
                </Link>
                <Link className="button button-secondary button-large" href="/es/guides">
                  Ver todas las guías
                </Link>
              </div>
            </div>
            <div className="page-stat">
              <span>Tu ruta en Alemania</span>
              <strong>3</strong>
              <small>Trámites · Trabajo · Vida diaria</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell section-compact" aria-labelledby="como-empezar">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Empieza por tu situación</span>
            <h2 id="como-empezar">Una guía, no cien búsquedas dispersas</h2>
          </div>
          <p>
            Si todavía estás planificando la mudanza, identifica qué documentación y
            cobertura necesitas. Si ya estás en Alemania, comienza por el trámite
            o contrato que tienes delante.
          </p>
        </div>
        <ol className="priority-list">
          <li>Elige uno de los temas que aparecen a continuación.</li>
          <li>Consulta la guía y sus enlaces al organismo responsable.</li>
          <li>Confirma los requisitos aplicables a tu ciudad, fecha y situación antes de actuar.</li>
        </ol>
      </section>

      {clusters.map((cluster) => (
        <section className="section shell section-compact" id={cluster.id} key={cluster.id} aria-labelledby={cluster.id + "-titulo"}>
          <div className="section-heading">
            <div>
              <span className="eyebrow">{cluster.eyebrow}</span>
              <h2 id={cluster.id + "-titulo"}>{cluster.title}</h2>
            </div>
            <p>{cluster.description}</p>
          </div>
          <div className="action-card-grid">
            {cluster.items.map((item) => (
              <Link className="action-card" href={exactGuidePath("es", item.key)} key={item.key}>
                <strong>{item.title}</strong>
                <small>{item.description}</small>
                <Icon name="arrow" />
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section className="section shell section-compact">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Herramientas prácticas</span>
            <h2>Compara opciones antes de decidir</h2>
          </div>
          <p>
            Puedes usar herramientas ya disponibles en GermanyBase para crear
            tu presupuesto o comparar ciudades. Revisa los supuestos antes de usar
            cualquier resultado para tomar decisiones importantes.
          </p>
        </div>
        <div className="action-card-grid">
          <Link className="action-card" href="/tools/cost-of-living">
            <strong>Calculadora de coste de vida</strong>
            <small>Estima un presupuesto mensual a partir de tus propios datos.</small>
            <Icon name="arrow" />
          </Link>
          <Link className="action-card" href="/tools/compare-cities">
            <strong>Comparador de ciudades</strong>
            <small>Explora diferencias prácticas entre localidades alemanas.</small>
            <Icon name="arrow" />
          </Link>
          <Link className="action-card" href="/trabajo/calculadora-salario">
            <strong>Calculadora de salario</strong>
            <small>Explora una estimación orientativa de salario bruto y neto.</small>
            <Icon name="arrow" />
          </Link>
        </div>
      </section>

      <section className="section shell section-compact">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Comprobar la información</span>
            <h2>Fuentes oficiales y límites de esta web</h2>
          </div>
          <p>
            GermanyBase es un proyecto independiente, no un organismo público.
            Las normas fiscales, laborales, sanitarias y de residencia pueden
            variar. Consulta las fuentes originales y busca asesoramiento
            profesional cuando corresponda.
          </p>
        </div>
        <div className="action-card-grid">
          <a className="action-card" href="https://verwaltung.bund.de/" target="_blank" rel="noopener noreferrer">
            <strong>Portal de la administración alemana</strong>
            <small>Trámites y servicios públicos.</small>
            <Icon name="external" />
          </a>
          <a className="action-card" href="https://www.make-it-in-germany.com/" target="_blank" rel="noopener noreferrer">
            <strong>Make it in Germany</strong>
            <small>Información oficial para personas que quieren trabajar y establecerse en Alemania.</small>
            <Icon name="external" />
          </a>
        </div>
        <div className="center-action">
          <Link className="button button-primary button-large" href="/es/guides">
            Explorar todas las guías en español <Icon name="arrow" />
          </Link>
        </div>
      </section>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "GermanyBase: vivir y trabajar en Alemania en español",
        url: absoluteUrl("/es"),
        inLanguage: "es-ES",
        description: "Guías prácticas en español para vivir y trabajar en Alemania.",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: allGuides.map((guide, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: guide.title,
            url: absoluteUrl(exactGuidePath("es", guide.key)),
          })),
        },
      }} />
    </div>
  );
}
