import type { WpLang } from "@/lib/wp-lang";
import { filterRestItemsByPolylangPermalink } from "@/lib/wp-lang";

const BASE_URL = "https://backend.onlinemarketingbakery.nl/wp-json/wp/v2";

/** Ensures Polylang `lang` is set on REST query strings. */
export function withWpLang(endpoint: string, lang: WpLang): string {
  const qIndex = endpoint.indexOf("?");
  const path = qIndex === -1 ? endpoint : endpoint.slice(0, qIndex);
  const query = qIndex === -1 ? "" : endpoint.slice(qIndex + 1);
  const params = new URLSearchParams(query);
  params.set("lang", lang);
  return `${path}?${params.toString()}`;
}

export async function fetchAPI(endpoint: string, lang: WpLang = "en") {
  const url = `${BASE_URL}${withWpLang(endpoint, lang)}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}

/**
 * Total published posts for a Polylang `lang` (from `X-WP-Total`, `per_page=1` only to read headers).
 */
export async function fetchPostCount(
  lang: WpLang,
  revalidateSeconds = 300,
): Promise<number> {
  const path = withWpLang("/posts?per_page=1&status=publish", lang);
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, { next: { revalidate: revalidateSeconds } });

  if (!res.ok) {
    throw new Error("API Error");
  }

  const total = res.headers.get("x-wp-total");
  if (total == null || total === "") {
    return 0;
  }
  const n = parseInt(total, 10);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Total published case studies for a Polylang `lang` (from `X-WP-Total`).
 */
export async function fetchCaseStudyCount(
  lang: WpLang,
  revalidateSeconds = 300,
): Promise<number> {
  /** `lang` is not applied reliably on this CPT; count after permalink filter. */
  const path = withWpLang("/case-study?per_page=100&status=publish", lang);
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, { next: { revalidate: revalidateSeconds } });

  if (!res.ok) {
    throw new Error("API Error");
  }

  const items: unknown = await res.json();
  if (!Array.isArray(items)) return 0;
  return filterRestItemsByPolylangPermalink(
    items as { link?: string }[],
    lang,
  ).length;
}
