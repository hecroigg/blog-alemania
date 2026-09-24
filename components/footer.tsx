import Link from "next/link";
import { audiences } from "@/lib/content/audiences";
import { siteConfig } from "@/lib/site";

const trustLinks = [
  ["About", "/about"], ["Editorial policy", "/editorial-policy"], ["How we research", "/how-we-research"],
  ["Corrections", "/corrections-policy"], ["Affiliate disclosure", "/affiliate-disclosure"],
  ["Advertiser disclosure", "/advertiser-disclosure"], ["Privacy", "/privacy-policy"], ["Cookies", "/cookie-policy"], ["Terms", "/terms"],
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand"><span className="brand-mark"><span>G</span></span><span>{siteConfig.name}</span></Link>
          <p>Independent, practical guidance for building a life in Germany.</p>
          <p className="disclaimer">We are not a government body. Information does not replace legal, tax, medical, immigration, or financial advice.</p>
        </div>
        <div><h2>Explore</h2>{siteConfig.mainNavigation.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>
        <div><h2>For you</h2>{audiences.map((item) => <Link key={item.slug} href={`/${item.slug}`}>{item.name}</Link>)}<Link href="/tools">Tools</Link></div>
        <div><h2>Trust</h2>{trustLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}</span><span>Made to clarify, not complicate.</span></div>
    </footer>
  );
}
