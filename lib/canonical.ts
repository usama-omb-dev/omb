import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

const DEFAULT_SITE_URL = "https://www.onlinemarketingbakery.com";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/+$/, "");
  return DEFAULT_SITE_URL;
}

/** Path for `alternates.canonical`, resolved against `metadataBase` on the site origin. */
export function localeCanonicalPath(
  locale: string,
  segments: string[] = [],
): string {
  if (segments.length === 0) return `/${locale}`;
  return `/${locale}/${segments.join("/")}`;
}

export function withCanonical(
  locale: string,
  segments: string[] = [],
): Pick<Metadata, "alternates"> {
  const canonical = localeCanonicalPath(locale, segments);
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((loc) => [loc, localeCanonicalPath(loc, segments)]),
  );
  languages["x-default"] = localeCanonicalPath(
    routing.defaultLocale,
    segments,
  );

  return {
    alternates: {
      canonical,
      languages,
    },
  };
}
