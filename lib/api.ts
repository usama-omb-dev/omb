import type { WpLang } from "@/lib/wp-lang";

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
