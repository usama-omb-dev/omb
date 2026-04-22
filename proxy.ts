import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getIsoCountryFromRequest } from "./lib/request-country";
import { isNlRegionCountry } from "./lib/wp-lang";

const intlMiddleware = createMiddleware(routing);

const LOCALE_COOKIE = "NEXT_LOCALE";

function pathnameHasLocalePrefix(pathname: string): boolean {
  return routing.locales.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`),
  );
}

function nlRedirectPath(pathname: string): string | null {
  if (!pathnameHasLocalePrefix(pathname)) {
    if (pathname === "/") return "/nl";
    return `/nl${pathname}`;
  }
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const suffix = pathname === "/en" ? "" : pathname.slice("/en".length);
    return suffix ? `/nl${suffix}` : "/nl";
  }
  return null;
}

function enRedirectPath(pathname: string): string | null {
  if (!pathnameHasLocalePrefix(pathname)) {
    if (pathname === "/") return "/en";
    return `/en${pathname}`;
  }
  if (pathname === "/nl" || pathname.startsWith("/nl/")) {
    const suffix = pathname === "/nl" ? "" : pathname.slice("/nl".length);
    return suffix ? `/en${suffix}` : "/en";
  }
  return null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel")
  ) {
    return intlMiddleware(request);
  }

  if (pathname.includes(".") && !pathname.startsWith("/.well-known")) {
    return intlMiddleware(request);
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  /**
   * No explicit locale cookie: pick locale from edge geo (see `getIsoCountryFromRequest`).
   * - Netherlands & Belgium → `/nl/...`
   * - Known other country → `/en/...`
   * - Unknown country (no header, e.g. local dev) → `/nl/...` (default)
   *
   * On self-hosted Ploi, set a country header at Nginx (GeoIP2) or use Cloudflare (`CF-IPCountry`).
   * Optional env: `NL_REDIRECT_COUNTRY_HEADER` = single header name your proxy sends.
   *
   * Header switcher sets NEXT_LOCALE and skips this block.
   */
  if (!cookieLocale) {
    const country = getIsoCountryFromRequest(request);
    const preferEn =
      country !== null && !isNlRegionCountry(country);

    const targetPath = preferEn
      ? enRedirectPath(pathname)
      : nlRedirectPath(pathname);

    if (targetPath && targetPath !== pathname) {
      return NextResponse.redirect(new URL(targetPath, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
