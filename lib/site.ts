export const siteConfig = {
  name: "GermanyBase",
  shortName: "GB",
  description:
    "Friendly, practical guides and tools for moving to Germany and building your life here.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://blog-alemania.linkedlab-web.workers.dev",
  futureDomain: "https://germanybase.de",
  email: "hello@germanybase.de",
  defaultLocale: "en",
  locales: ["en", "es"] as const,
  social: {},
  mainNavigation: [
    { label: "Plan", href: "/plan" },
    { label: "Visas", href: "/visas-residence" },
    { label: "Move", href: "/moving-to-germany" },
    { label: "Work", href: "/work" },
    { label: "Housing", href: "/housing" },
    { label: "Bureaucracy", href: "/bureaucracy" },
    { label: "Money", href: "/money" },
    { label: "Healthcare", href: "/healthcare" },
    { label: "Transport", href: "/transport" },
    { label: "Daily life", href: "/daily-life" },
    { label: "Cities", href: "/cities" },
    { label: "Tools", href: "/tools" },
    { label: "Authorities", href: "/authorities" },
    { label: "Emergency", href: "/emergency" },
    { label: "Data status", href: "/data-status" },
  ],
} as const;

export function absoluteUrl(path = "") {
  return new URL(path, siteConfig.url).toString();
}
