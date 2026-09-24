"use client";

import Link from "next/link";
import { Icon } from "@/components/icon";
import { LanguageSelector } from "@/components/language-selector";
import { useLanguage } from "@/components/language-provider";
import { siteConfig } from "@/lib/site";

export function Header() {
  const { copy } = useLanguage();
  const labelFor = (href: string, fallback: string) => copy.navigation[href] || fallback;
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label={`${siteConfig.name} home`}>
          <span className="brand-mark" aria-hidden="true"><span>G</span></span>
          <span>{siteConfig.name}</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link className="nav-primary" href="/plan">{copy.plan}</Link>
          <Link href="/visas-residence">{copy.visa}</Link>
          {siteConfig.mainNavigation.filter((item) => item.href !== "/plan" && item.href !== "/visas-residence").slice(0, 4).map((item) => <Link key={item.href} href={item.href}>{labelFor(item.href, item.label)}</Link>)}
          <details className="nav-more">
            <summary>{copy.more}</summary>
            <div className="nav-popover">
              {siteConfig.mainNavigation.filter((item) => item.href !== "/plan" && item.href !== "/visas-residence").slice(4).map((item) => <Link key={item.href} href={item.href}>{labelFor(item.href, item.label)}</Link>)}
              <Link href="/tools">{copy.tools}</Link>
              <Link href="/guides">{copy.guides}</Link>
            </div>
          </details>
        </nav>
        <div className="header-actions">
          <Link href="/search" className="icon-button" aria-label={copy.search}><Icon name="search" /></Link>
          <LanguageSelector/>
          <details className="mobile-menu">
            <summary aria-label={copy.menu}><Icon name="menu" /></summary>
            <nav aria-label="Mobile navigation">
              <Link href="/plan">{copy.plan}</Link>
              <Link href="/visas-residence">{copy.visa}</Link>
              {siteConfig.mainNavigation.filter((item) => item.href !== "/plan" && item.href !== "/visas-residence").map((item) => <Link key={item.href} href={item.href}>{labelFor(item.href, item.label)}</Link>)}
              <Link href="/guides">{copy.guides}</Link>
              <Link href="/tools">{copy.tools}</Link>
              <Link href="/about">{copy.about}</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
