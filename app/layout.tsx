import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/analytics";
import { CookieBanner } from "@/components/cookie-banner";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Living Germany — Practical guides for life in Germany", template: "%s | Living Germany" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { type: "website", locale: "en_GB", siteName: siteConfig.name, title: "Living Germany", description: siteConfig.description, url: absoluteUrl("/") },
  twitter: { card: "summary", title: "Living Germany", description: siteConfig.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#fbfcff", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, url: siteConfig.url, description: siteConfig.description };
  const website = { "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: siteConfig.url, inLanguage: "en", potentialAction: { "@type": "SearchAction", target: `${absoluteUrl("/search")}?q={search_term_string}`, "query-input": "required name=search_term_string" } };
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><Header/><main id="main-content">{children}</main><Footer/><CookieBanner/><Analytics/><JsonLd data={[organization, website]}/></body></html>;
}
