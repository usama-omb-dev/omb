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

  const country = request.headers.get("x-vercel-ip-country");
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  /**
   * First visits from NL/BE without an explicit locale cookie are sent to the
   * Dutch locale prefix. Skip when the URL already has `/en/...` or `/nl/...`.
   * Users can switch to EN via the header switcher (sets cookie).
   */
  if (
    isNlRegionCountry(country) &&
    !cookieLocale &&
    !pathnameHasLocalePrefix(pathname)
  ) {
    const targetPath = pathname === "/" ? "/nl" : `/nl${pathname}`;
    return NextResponse.redirect(new URL(targetPath, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
