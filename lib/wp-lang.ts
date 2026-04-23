/** Polylang `lang` query value for WordPress REST. */
export type WpLang = "en" | "nl";

export function localeToWpLang(locale: string): WpLang {
  return locale === "nl" ? "nl" : "en";
}

/**
 * On this site Polylang hides the default language in permalinks (`/case-study/...`)
 * while Dutch uses `/nl/...`. Some CPT REST lists ignore the `lang` query and return
 * all translations; `link` from the REST object still reflects the real permalink.
 */
export function wpPermalinkMatchesLang(
  link: string | null | undefined,
  lang: WpLang,
): boolean {
  if (!link) return false;
  try {
    const { pathname } = new URL(link);
    const hasNlPrefix = pathname === "/nl" || pathname.startsWith("/nl/");
    if (lang === "nl") return hasNlPrefix;
    return !hasNlPrefix;
  } catch {
    return false;
  }
}

export function filterRestItemsByPolylangPermalink<T extends { link?: string }>(
  items: T[],
  lang: WpLang,
): T[] {
  return items.filter((item) => wpPermalinkMatchesLang(item.link, lang));
}

export function isNlRegionCountry(
  country: string | null | undefined,
): boolean {
  if (!country) return false;
  return country === "NL" || country === "BE";
}
