import Link from "next/link";

export default function NotFound() { return <section className="shell trust-page"><span className="eyebrow">404</span><h1>This page is not part of the route.</h1><p className="lead">The guide may have moved, or the address may be incomplete.</p><p style={{ marginTop: "2rem" }}><Link className="button button-primary" href="/">Return home</Link> <Link className="button button-secondary" href="/search">Search guides</Link></p></section>; }
