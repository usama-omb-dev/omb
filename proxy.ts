import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { isNlRegionCountry } from "./lib/wp-lang";

const intlMiddleware = createMiddleware(routing);

const LOCALE_COOKIE = "NEXT_LOCALE";

function pathnameHasLocalePrefix(pathname: string): boolean {
  return routing.locales.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`),
  );
}

/** First language in Accept-Language (e.g. nl-NL;q=0.9 → nl). */
function acceptLanguagePrimary(request: NextRequest): string | null {
  const raw = request.headers.get("accept-language");
  if (!raw) return null;
  const first = raw.split(",")[0]?.trim().split(";")[0]?.trim().toLowerCase();
  if (!first) return null;
  return first.split("-")[0] ?? null;
}

/**
 * NL/BE by IP (Vercel), or — when IP country is missing (e.g. `next dev`) —
 * browser primary language `nl` so local / non-Vercel tests can still get Dutch.
 */
function shouldDefaultToDutch(request: NextRequest): boolean {
  const country = request.headers.get("x-vercel-ip-country");
  if (isNlRegionCountry(country)) return true;
  if (country) return false;
  return acceptLanguagePrimary(request) === "nl";
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
   * NL/BE (or Dutch Accept-Language when IP geo is unavailable) without a
   * locale cookie → prefer `/nl/...`.
   *
   * With `localePrefix: "always"`, the default locale is `/en/...`, so we also
   * rewrite `/en` and `/en/...` → Dutch. Choosing EN in the header sets
   * NEXT_LOCALE and skips this block.
   */
  if (shouldDefaultToDutch(request) && !cookieLocale) {
    const targetPath = nlRedirectPath(pathname);
    if (targetPath && targetPath !== pathname) {
      return NextResponse.redirect(new URL(targetPath, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
