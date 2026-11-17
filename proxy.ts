import { NextRequest, NextResponse } from "next/server";
import { auxiliaryPath, type AuxiliaryKey } from "@/lib/localized-paths";

/**
 * Search Console previously discovered malformed URLs such as
 * /families:1r5p0rp and /guides/anmeldung-germany:14rmo4r.
 *
 * Normalize those crawler URLs before App Router routing so they resolve to
 * the real canonical page instead of the 404 page.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const originalPath = url.pathname;

  if (originalPath === "/&") {
    url.pathname = "/";
    return NextResponse.redirect(url, 301);
  }

  const legacyPages: Record<string, AuxiliaryKey> = {
    "/plan": "plan", "/visas-residence": "visas",
    "/costs-deadlines": "costs", "/authorities": "authorities",
    "/emergency": "emergency", "/data-status": "data",
    "/glossary": "glossary", "/explore-germany": "explore",
    "/search": "search",
  };
  const legacyPage = legacyPages[originalPath];
  if (legacyPage) {
    url.pathname = auxiliaryPath("en", legacyPage);
    return NextResponse.redirect(url, 308);
  }

  const cleanPath = originalPath
    .split("/")
    .map((segment) => (segment.includes(":") ? segment.split(":")[0] : segment))
    .join("/");

  if (cleanPath !== originalPath) {
    url.pathname = cleanPath || "/";
    return NextResponse.redirect(url, 301);
  }

  const requestedLanguage = originalPath.split("/").filter(Boolean)[0];
  const pageLanguage = requestedLanguage === "es" || requestedLanguage === "de" ? requestedLanguage : "en";
  const nextHeaders = new Headers(request.headers);
  nextHeaders.set("x-germanybase-page-language", pageLanguage);
  return NextResponse.next({ request: { headers: nextHeaders } });
}

export const config = {
  matcher: "/:path*",
};
