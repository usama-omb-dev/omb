/** Polylang `lang` query value for WordPress REST. */
export type WpLang = "en" | "nl";

export function localeToWpLang(locale: string): WpLang {
  return locale === "nl" ? "nl" : "en";
}

export function isNlRegionCountry(
  country: string | null | undefined,
): boolean {
  if (!country) return false;
  return country === "NL" || country === "BE";
}
