import Link from "next/link";
import { CategoryCard, CityCard, GuideCard } from "@/components/cards";
import { Icon } from "@/components/icon";
import { JsonLd } from "@/components/json-ld";
import { Newsletter } from "@/components/newsletter";
import { audiences } from "@/lib/content/audiences";
import { categories } from "@/lib/content/categories";
import { cities } from "@/lib/content/cities";
import { guides } from "@/lib/content/guides";

const arrivalSteps = [
  ["01", "Find registrable accommodation", "Confirm the provider can issue the move-in confirmation."],
  ["02", "Register your address", "Follow your municipality's current Anmeldung process."],
  ["03", "Confirm health insurance", "Choose the route that matches your work, study, or family status."],
  ["04", "Secure your identifiers", "Store registration and Tax ID documents safely."],
  ["05", "Set up everyday systems", "Banking, mobile, transport, post, and essential accounts."],
];

export default function Home() {
  const popular = guides.filter((guide) => guide.featured).slice(0, 6);
  const latest = [...guides].slice(-4).reverse();
  return <>
    <section className="hero"><div className="shell hero-grid"><div className="hero-copy"><span className="eyebrow hero-eyebrow"><span/> Independent practical guidance</span><h1>Living in Germany,<br/><em>made clear.</em></h1><p>Everything you need to move, work, and build your life in Germany—explained with context, official sources, and no sales pressure.</p><div className="hero-actions"><Link className="button button-primary button-large" href="/guides/first-30-days-germany">Start here <Icon name="arrow"/></Link><Link className="button button-secondary button-large" href="/guides">Explore guides</Link></div><div className="trust-line"><span><Icon name="shield"/> Independent</span><span><Icon name="check"/> Source-led</span><span><Icon name="clock"/> Updated clearly</span></div></div><div className="hero-map" aria-label="A five-step path from planning to feeling at home"><div className="map-label top">BEFORE</div><div className="map-route"><span className="route-point p1"><b>1</b><small>Plan</small></span><span className="route-point p2"><b>2</b><small>Move</small></span><span className="route-point p3"><b>3</b><small>Register</small></span><span className="route-point p4"><b>4</b><small>Set up</small></span><span className="route-point p5 active"><b><Icon name="home"/></b><small>Home</small></span></div><div className="map-label bottom">AFTER</div><div className="hero-note"><span>THE PRACTICAL ROUTE</span><strong>From “where do I begin?”<br/>to “I know what comes next.”</strong></div></div></div></section>

    <section className="section shell"><div className="section-heading"><div><span className="eyebrow">Find your answer</span><h2>The systems behind everyday life</h2></div><p>Start with the topic in front of you. Each hub connects the decisions, documents, and next steps around it.</p></div><div className="category-grid">{categories.map((category) => <CategoryCard key={category.slug} category={category}/>)}</div></section>

    <section className="arrival-section"><div className="shell arrival-grid"><div className="arrival-intro"><span className="eyebrow eyebrow-light">New to Germany?</span><h2>Your first weeks, in a sensible order.</h2><p>Not every task is equally urgent. This route puts legal, health, housing, and identity dependencies before optional contracts.</p><Link className="button button-light" href="/guides/first-30-days-germany">Open the full checklist <Icon name="arrow"/></Link></div><ol className="arrival-list">{arrivalSteps.map(([number, title, text]) => <li key={number}><span>{number}</span><div><strong>{title}</strong><p>{text}</p></div></li>)}</ol></div></section>

    <section className="section shell"><div className="section-heading"><div><span className="eyebrow">Popular guides</span><h2>Start with what matters most</h2></div><Link className="text-link" href="/guides">View all guides <Icon name="arrow" size={16}/></Link></div><div className="guide-grid">{popular.map((guide) => <GuideCard key={guide.slug} guide={guide}/>)}</div></section>

    <section className="section section-soft"><div className="shell"><div className="section-heading"><div><span className="eyebrow">Explore by city</span><h2>Where you live changes the answer</h2></div><p>Compare housing, transport, work, and local administration through a city-specific lens.</p></div><div className="city-grid">{cities.filter((city) => city.featured).map((city) => <CityCard key={city.slug} city={city}/>)}</div><div className="center-action"><Link className="button button-secondary" href="/cities">Explore all cities <Icon name="arrow"/></Link></div></div></section>

    <section className="section shell"><div className="split-heading"><div><span className="eyebrow">Built around you</span><h2>Different routes. One clear starting point.</h2></div><div className="audience-links">{audiences.map((audience) => <Link key={audience.slug} href={`/${audience.slug}`}><span>{audience.name}</span><Icon name="arrow"/></Link>)}</div></div></section>

    <section className="section shell"><div className="section-heading"><div><span className="eyebrow">Tools & calculators</span><h2>Make the next decision concrete</h2></div><p>Careful, transparent tools are being prepared. No invented tax or salary estimates.</p></div><div className="tool-preview"><div><Icon name="check"/><strong>Moving checklist</strong><span>Plan and track your own arrival sequence.</span></div><div><Icon name="wallet"/><strong>Cost-of-living planner</strong><span>Build a budget from your real inputs.</span></div><div><Icon name="home"/><strong>Rent affordability</strong><span>Compare total housing scenarios.</span></div><Link href="/tools">See the roadmap <Icon name="arrow"/></Link></div></section>

    <section className="section shell latest-section"><div className="section-heading"><div><span className="eyebrow">Latest guides</span><h2>Recently added</h2></div></div><div className="latest-list">{latest.map((guide, index) => <div key={guide.slug}><span>{String(index + 1).padStart(2, "0")}</span><GuideCard guide={guide} compact/></div>)}</div></section>

    <div className="shell newsletter-wrap"><Newsletter/></div>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: "Popular guides to living in Germany", itemListElement: popular.map((guide, index) => ({ "@type": "ListItem", position: index + 1, url: `/guides/${guide.slug}`, name: guide.title })) }}/>
  </>;
}
