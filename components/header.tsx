"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/icon";
import { LanguageSelector } from "@/components/language-selector";
import { useLanguage } from "@/components/language-provider";
import { siteConfig } from "@/lib/site";

export function Header() {
  const { copy } = useLanguage();
  const moreRef = useRef<HTMLDetailsElement>(null);
  const mobileRef = useRef<HTMLDetailsElement>(null);
  const labelFor = (href: string, fallback: string) => copy.navigation[href] || fallback;
  useEffect(() => {
    const closeMenus = (event: PointerEvent) => {
      const target = event.target as Node;
      if (moreRef.current?.open && !moreRef.current.contains(target)) moreRef.current.open = false;
      if (mobileRef.current?.open && !mobileRef.current.contains(target)) mobileRef.current.open = false;
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (moreRef.current) moreRef.current.open = false;
        if (mobileRef.current) mobileRef.current.open = false;
      }
    };
    document.addEventListener("pointerdown", closeMenus);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenus);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);
  const closeAll = () => {
    if (moreRef.current) moreRef.current.open = false;
    if (mobileRef.current) mobileRef.current.open = false;
  };
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
          <details className="nav-more" ref={moreRef}>
            <summary>{copy.more}</summary>
            <div className="nav-popover">
              {siteConfig.mainNavigation.filter((item) => item.href !== "/plan" && item.href !== "/visas-residence").slice(4).map((item) => <Link onClick={closeAll} key={item.href} href={item.href}>{labelFor(item.href, item.label)}</Link>)}
              <Link onClick={closeAll} href="/guides">{copy.guides}</Link>
            </div>
          </details>
        </nav>
        <div className="header-actions">
          <Link href="/search" className="icon-button" aria-label={copy.search}><Icon name="search" /></Link>
          <LanguageSelector/>
          <details className="mobile-menu" ref={mobileRef}>
            <summary aria-label={copy.menu}><Icon name="menu" /></summary>
            <nav aria-label="Mobile navigation">
              <Link onClick={closeAll} href="/plan">{copy.plan}</Link>
              <Link onClick={closeAll} href="/visas-residence">{copy.visa}</Link>
              {siteConfig.mainNavigation.filter((item) => item.href !== "/plan" && item.href !== "/visas-residence").map((item) => <Link onClick={closeAll} key={item.href} href={item.href}>{labelFor(item.href, item.label)}</Link>)}
              <Link onClick={closeAll} href="/guides">{copy.guides}</Link>
              <Link onClick={closeAll} href="/about">{copy.about}</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
