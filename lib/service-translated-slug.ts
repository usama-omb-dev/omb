import { fetchAPI } from "@/lib/api";
import type { WpLang } from "@/lib/wp-lang";
import {
  filterRestItemsByPolylangPermalink,
  localeToWpLang,
} from "@/lib/wp-lang";

type WpServiceRow = { id: number; slug: string; link?: string };

async function fetchServicesList(lang: WpLang): Promise<WpServiceRow[]> {
  const data = await fetchAPI(
    "/services?per_page=100&_fields=id,slug,link",
    lang,
  );
  if (!Array.isArray(data)) return [];
  const rows = data as WpServiceRow[];
  const filtered = filterRestItemsByPolylangPermalink(rows, lang);
  return filtered.length > 0 ? filtered : rows;
}

/**
 * Maps a service detail slug to its Polylang sibling in another locale.
 * WordPress does not expose translation IDs on this REST API; pairs are derived by
 * aligning both language lists sorted by post id (stable for the current CPT set).
 */
export async function getTranslatedServiceSlug(
  currentSlug: string,
  fromLocale: string,
  toLocale: string,
): Promise<string | null> {
  const from = localeToWpLang(fromLocale);
  const to = localeToWpLang(toLocale);
  if (from === to) return currentSlug;

  const [fromList, toList] = await Promise.all([
    fetchServicesList(from),
    fetchServicesList(to),
  ]);

  const byId = (a: WpServiceRow, b: WpServiceRow) => a.id - b.id;
  fromList.sort(byId);
  toList.sort(byId);

  const idx = fromList.findIndex((s) => s.slug === currentSlug);
  if (idx === -1 || idx >= toList.length) return null;

  return toList[idx].slug;
}

const SERVICE_DETAIL = /^\/services\/([^/]+)\/?$/;

export function parseServiceDetailSlug(
  pathname: string | null,
): string | null {
  if (!pathname) return null;
  const m = pathname.match(SERVICE_DETAIL);
  return m?.[1] ?? null;
}
