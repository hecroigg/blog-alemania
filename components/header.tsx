import Link from "next/link";
import { Icon } from "@/components/icon";
import { siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label={`${siteConfig.name} home`}>
          <span className="brand-mark" aria-hidden="true"><span>G</span></span>
          <span>{siteConfig.name}</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {siteConfig.mainNavigation.slice(0, 6).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          <details className="nav-more">
            <summary>More</summary>
            <div className="nav-popover">
              {siteConfig.mainNavigation.slice(6).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
              <Link href="/tools">Tools</Link>
              <Link href="/guides">All guides</Link>
            </div>
          </details>
        </nav>
        <div className="header-actions">
          <Link href="/search" className="icon-button" aria-label="Search"><Icon name="search" /></Link>
          <span className="language-pill" title="Spanish architecture is prepared; content is coming later">EN</span>
          <details className="mobile-menu">
            <summary aria-label="Open menu"><Icon name="menu" /></summary>
            <nav aria-label="Mobile navigation">
              {siteConfig.mainNavigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
              <Link href="/guides">All guides</Link>
              <Link href="/tools">Tools</Link>
              <Link href="/about">About</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
