#!/usr/bin/env node
/**
 * Read-only production SEO smoke test.
 * Verifies crawlable HTML and sitemap signals after the Cloudflare deployment.
 * Does not claim that Google has indexed a URL.
 */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

const base = "https://germanybase.de";
const samples = [
  "/en", "/es", "/de",
  "/de/ratgeber/internetanschluss-deutschland",
  "/de/ratgeber/krankenversicherung-kosten-deutschland-2026",
  "/es/guias/steuer-id-alemania",
  "/es/guias/dias-vacaciones-pagadas-alemania",
  "/en/guides/deutschlandticket-price-rules-2026",
  "/es/guias/mercadillos-navidad-mannheim-heidelberg-francfort-2026",
  "/en/guides/deutschlandticket-2027",
  "/de/ratgeber/steuererklaerung-2022-frist-freiwillig",
  "/en/guides/midijob-germany-2026",
  "/es/guias/midijob-alemania-2026",
  "/de/ratgeber/midijob-deutschland-2026",
  "/en/tools/cost-of-living",
  "/es/herramientas/calculadora-salario",
  "/de/werkzeuge/gehaltsrechner",
  "/es/ciudades/berlin",
  "/de/staedte/berlin",
  "/en/cities/munich",
  "/es/trabajo",
  "/de/arbeit",
  "/en/guides",
  "/es/guias",
  "/de/ratgeber",
];
const request = (path) => execFileSync("curl", [
  "-fsSL", "--compressed", "--retry", "3", "--retry-delay", "3",
  "--max-time", "20", base + path,
], { encoding: "utf8", maxBuffer: 12 * 1024 * 1024 });

function xmlDecode(value) {
  return value.replaceAll("&amp;", "&").replaceAll("&quot;", '"')
    .replaceAll("&lt;", "<").replaceAll("&gt;", ">");
}
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([a-zA-Z:-]+)\s*=\s*["']([^"']*)["']/g)]
    .map(([, name, value]) => [name.toLowerCase(), xmlDecode(value)]));
}

console.log("Checking production sitemap...");
const sitemap = request("/sitemap.xml");
assert.match(sitemap, /<urlset\b/, "Sitemap should be a valid URL set");
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => {
  const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
  assert.ok(loc, "Each sitemap entry needs a loc");
  const alternates = [...block.matchAll(/<xhtml:link\b[^>]*\/?>/g)].map((match) => attributes(match[0]));
  return { loc: xmlDecode(loc), alternates };
});

assert.ok(entries.length >= 100, "Unexpectedly small sitemap: inspect missing URLs");
assert.equal(new Set(entries.map((entry) => entry.loc)).size, entries.length, "Duplicate sitemap URLs");
const known = new Set(entries.map((entry) => entry.loc));

for (const entry of entries) {
  const url = new URL(entry.loc);
  assert.equal(url.origin, base, "Only canonical GermanyBase URLs belong in this sitemap");
  assert.ok(/^\/(en|es|de)(\/|$)/.test(url.pathname), "Unlocalized URL in sitemap: " + entry.loc);
  assert.ok(!url.search && !url.hash && !url.pathname.includes(":"), "Unexpected sitemap URL: " + entry.loc);

  for (const locale of ["en", "es", "de"]) {
    const alternate = entry.alternates.find((link) => link.hreflang === locale && link.rel === "alternate");
    assert.ok(alternate, "Missing " + locale + " hreflang in sitemap: " + entry.loc);
    assert.ok(known.has(alternate.href), "Alternate missing from sitemap: " + alternate.href);
  }
}
console.log(entries.length + " canonical URL entries with ES, EN and DE equivalents.");

for (const path of samples) {
  const html = request(path);
  const language = path.split("/")[1];
  assert.match(html, new RegExp('<html\\b[^>]*\\blang="' + language + '"'),
    "Incorrect HTML language: " + path);
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  assert.ok(head, "Missing crawlable HTML head: " + path);
  const links = [...head.matchAll(/<link\b[^>]*>/g)].map((m) => attributes(m[0]));
  const canonical = links.filter((tag) => tag.rel === "canonical");
  assert.equal(canonical.length, 1, "Expected exactly one canonical: " + path);
  assert.equal(canonical[0].href, base + path, "Wrong canonical: " + path);
  assert.ok(known.has(base + path), "Canonical page missing from sitemap: " + path);

  for (const locale of ["en", "es", "de"]) {
    assert.ok(links.some((link) => link.rel === "alternate" && link.hreflang === locale),
      "Missing head hreflang " + locale + ": " + path);
  }
  assert.match(html, /<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>/, "Missing crawlable H1: " + path);
  assert.match(html, /<main\b/, "Missing main page content: " + path);
  assert.ok(!/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html),
    "A sitemap page must not be noindex: " + path);
  if (path.split("/").length > 3) {
    assert.ok(html.includes("BreadcrumbList"), "Missing breadcrumb structured data: " + path);
  }
  console.log("PASS " + path);
}
console.log("SEO crawl smoke test completed. Indexing and rankings still depend on Google.");

// Historic Search Console URLs must redirect directly, never become duplicate pages.
const legacyPairs = [
  ["/de/guides/krankenversicherung-kosten-deutschland-2026", "/de/ratgeber/krankenversicherung-kosten-deutschland-2026"],
  ["/de/guides/kindergeld-deutschland-2026", "/de/ratgeber/kindergeld-deutschland-2026"],
  ["/de/guides/midijob-deutschland-2026", "/de/ratgeber/midijob-deutschland-2026"],
  ["/es/guides/dias-vacaciones-pagadas-alemania", "/es/guias/dias-vacaciones-pagadas-alemania"],
  ["/guides/best-cities-germany", "/en/guides/best-cities-germany"],
  ["/guides/finding-doctor-germany", "/en/guides/finding-doctor-germany"],
];
for (const [oldPath, newPath] of legacyPairs) {
  const result = execFileSync("curl", ["-sS", "--max-time", "20", "-o", "/dev/null", "-w", "%{http_code} %{redirect_url}", base + oldPath], { encoding: "utf8" });
  const [code, destination] = result.trim().split(" ");
  assert.ok(code === "301" || code === "308", "Expected permanent redirect: " + oldPath + " got " + result);
  assert.equal(destination, base + newPath, "Wrong redirect target: " + oldPath);
  assert.ok(!known.has(base + oldPath), "Legacy URL in sitemap: " + oldPath);
  assert.ok(known.has(base + newPath), "Redirect target missing from sitemap: " + newPath);
}
