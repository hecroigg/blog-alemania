export const siteConfig = {
  name: "Living Germany",
  shortName: "LG",
  description:
    "Independent, practical guides for moving to Germany and building your life here.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://livinggermany.example",
  email: "hello@livinggermany.example",
  defaultLocale: "en",
  locales: ["en", "es"] as const,
  social: {},
  mainNavigation: [
    { label: "Move", href: "/moving-to-germany" },
    { label: "Work", href: "/work" },
    { label: "Housing", href: "/housing" },
    { label: "Bureaucracy", href: "/bureaucracy" },
    { label: "Money", href: "/money" },
    { label: "Healthcare", href: "/healthcare" },
    { label: "Transport", href: "/transport" },
    { label: "Daily life", href: "/daily-life" },
    { label: "Cities", href: "/cities" },
  ],
} as const;

export function absoluteUrl(path = "") {
  return new URL(path, siteConfig.url).toString();
}
