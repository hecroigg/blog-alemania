"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icon";
import { LanguageSelector } from "@/components/language-selector";
import { useLanguage } from "@/components/language-provider";
import { siteConfig } from "@/lib/site";
import { sectionPath } from "@/lib/locale-paths";

type NavLocale = "en" | "es" | "de";

const localeNav: Record<NavLocale, {
  home: string; documents: string; work: string; life: string; guides: string; tools: string; cities: string;
  documentsId: string; workId: string; lifeId: string; label: string;
}> = {
  en: { home: "Home", documents: "Paperwork", work: "Work", life: "Daily life", guides: "All guides", tools: "Tools", cities: "Cities", documentsId: "documents", workId: "work", lifeId: "everyday", label: "Main navigation" },
  es: { home: "Inicio", documents: "Trámites", work: "Trabajo", life: "Vida diaria", guides: "Todas las guías", tools: "Herramientas", cities: "Ciudades", documentsId: "tramites", workId: "trabajo", lifeId: "vida-diaria", label: "Navegación principal" },
  de: { home: "Startseite", documents: "Behörden", work: "Arbeit", life: "Alltag", guides: "Alle Ratgeber", tools: "Werkzeuge", cities: "Städte", documentsId: "documents", workId: "work", lifeId: "everyday", label: "Hauptnavigation" },
};

export function Header() {
  const { copy } = useLanguage();
  const pathname = usePathname();
  const part = pathname.split("/").filter(Boolean)[0];
  const locale = part && Object.prototype.hasOwnProperty.call(localeNav, part) ? part as NavLocale : null;
  const localized = locale ? localeNav[locale] : null;
  const homePath = locale ? "/" + locale : "/";
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

  const languageLinks = localized && locale ? (
    <>
      <Link className="nav-primary" href={homePath}>{localized.home}</Link>
      <Link href={homePath + "#" + localized.documentsId}>{localized.documents}</Link>
      <Link href={homePath + "#" + localized.workId}>{localized.work}</Link>
      <Link href={homePath + "#" + localized.lifeId}>{localized.life}</Link>
      <Link href={sectionPath(locale as NavLocale,"guides")}>{localized.guides}</Link>
      <Link href={sectionPath(locale as NavLocale,"tools")}>{localized.tools}</Link>
      <Link href={sectionPath(locale as NavLocale,"cities")}>{localized.cities}</Link>
    </>
  ) : null;

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href={homePath} className="brand" aria-label={siteConfig.name + " home"}>
          <Image className="brand-logo" src="/germanybase-logo.png" alt={siteConfig.name} width={300} height={100} priority />
        </Link>
        <nav className="desktop-nav" aria-label={localized?.label || "Main navigation"}>
          {languageLinks || <>
            <Link className="nav-primary" href="/plan">{copy.plan}</Link>
            <Link href="/visas-residence">{copy.visa}</Link>
            {siteConfig.mainNavigation.filter((item) => item.href !== "/plan" && item.href !== "/visas-residence").slice(0, 4).map((item) =>
              <Link key={item.href} href={item.href}>{labelFor(item.href, item.label)}</Link>
            )}
            <details className="nav-more" ref={moreRef}>
              <summary>{copy.more}</summary>
              <div className="nav-popover">
                <Link onClick={closeAll} href="/es" lang="es">Guías en español</Link>
                {siteConfig.mainNavigation.filter((item) => item.href !== "/plan" && item.href !== "/visas-residence").slice(4).map((item) =>
                  <Link onClick={closeAll} key={item.href} href={item.href}>{labelFor(item.href, item.label)}</Link>
                )}
                <Link onClick={closeAll} href="/guides">{copy.guides}</Link>
              </div>
            </details>
          </>}
        </nav>
        <div className="header-actions">
          <Link href={sectionPath((locale || "en") as NavLocale,"search")} className="icon-button" aria-label={copy.search}><Icon name="search" /></Link>
          <LanguageSelector />
          <details className="mobile-menu" ref={mobileRef}>
            <summary aria-label={copy.menu}><Icon name="menu" /></summary>
            <nav aria-label={localized?.label || "Mobile navigation"}>
              {localized && locale ? <>
                <Link onClick={closeAll} href={homePath}>{localized.home}</Link>
                <Link onClick={closeAll} href={homePath + "#" + localized.documentsId}>{localized.documents}</Link>
                <Link onClick={closeAll} href={homePath + "#" + localized.workId}>{localized.work}</Link>
                <Link onClick={closeAll} href={homePath + "#" + localized.lifeId}>{localized.life}</Link>
                <Link onClick={closeAll} href={homePath + "/guides"}>{localized.guides}</Link>
              </> : <>
                <Link onClick={closeAll} href="/es" lang="es">Guías en español</Link>
                <Link onClick={closeAll} href="/plan">{copy.plan}</Link>
                <Link onClick={closeAll} href="/visas-residence">{copy.visa}</Link>
                {siteConfig.mainNavigation.filter((item) => item.href !== "/plan" && item.href !== "/visas-residence").map((item) =>
                  <Link onClick={closeAll} key={item.href} href={item.href}>{labelFor(item.href, item.label)}</Link>
                )}
                <Link onClick={closeAll} href="/guides">{copy.guides}</Link>
                <Link onClick={closeAll} href="/about">{copy.about}</Link>
              </>}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
