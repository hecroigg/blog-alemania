import { NextRequest, NextResponse } from "next/server";
import {
  type OtherPageId, otherPages, otherUrl, cityUrl, sectionPath, toolIds, toolUrl,
  type ToolId,
} from "@/lib/locale-paths";

/**
 * Normalize malformed crawler URLs and maintain one canonical URL per page
 * and language. The original path/query are otherwise preserved.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const original = url.pathname;
  if (original === "/&") {
    url.pathname = "/en";
    return NextResponse.redirect(url, 301);
  }
  const cleaned = original.split("/")
    .map((segment) => segment.includes(":") ? segment.split(":")[0] : segment)
    .join("/");
  if (cleaned !== original) {
    url.pathname = cleaned || "/";
    return NextResponse.redirect(url, 301);
  }

  const parts = original.split("/").filter(Boolean);
  const redirect = (path: string) => {
    url.pathname = path;
    return NextResponse.redirect(url, 301);
  };
  if (original === "/tools" || original === "/tools/") return redirect(sectionPath("en","tools"));
  if (parts[0] === "tools" && parts.length === 2 && toolIds.includes(parts[1] as ToolId)) {
    return redirect(toolUrl("en",parts[1] as ToolId));
  }
  if (original === "/trabajo/calculadora-salario") return redirect(toolUrl("es","salary-calculator"));
  if (original === "/trabajo/tipos-de-empleo") return redirect(toolUrl("es","employment-types"));
  if (original === "/search") return redirect(sectionPath("en","search"));
  const other = (Object.keys(otherPages) as OtherPageId[]).find((id)=>otherPages[id].en===original.slice(1));
  if (other) return redirect(otherUrl("en",other));

  // Non-canonical language-specific legacy paths created during the previous migration.
  if (parts[0] === "es" || parts[0] === "de") {
    const lang=parts[0];
    if (parts[1] === "guides") return redirect(sectionPath(lang,"guides") + (parts[2] ? "/" + parts[2] : ""));
    if (parts[1] === "cities") {
      return redirect(parts[2] ? cityUrl(lang,parts[2]) || sectionPath(lang,"cities") : sectionPath(lang,"cities"));
    }
  }

  const requestedLanguage = parts[0];
  const pageLanguage = requestedLanguage === "es" || requestedLanguage === "de" ? requestedLanguage : "en";
  const headers = new Headers(request.headers);
  headers.set("x-germanybase-page-language", pageLanguage);
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: "/:path*" };
