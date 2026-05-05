import { fetchAPI } from "@/lib/api";
import type { WpLang } from "@/lib/wp-lang";
import {
  filterRestItemsByPolylangPermalink,
  localeToWpLang,
} from "@/lib/wp-lang";

type WpPostRow = { id: number; slug: string; link?: string };

async function fetchPostsList(lang: WpLang): Promise<WpPostRow[]> {
  const data = await fetchAPI(
    "/posts?per_page=100&_fields=id,slug,link",
    lang,
  );
  if (!Array.isArray(data)) return [];
  const rows = data as WpPostRow[];
  const filtered = filterRestItemsByPolylangPermalink(rows, lang);
  return filtered.length > 0 ? filtered : rows;
}

/**
 * Maps a blog detail slug to its Polylang sibling in another locale (same approach as services).
 */
export async function getTranslatedBlogSlug(
  currentSlug: string,
  fromLocale: string,
  toLocale: string,
): Promise<string | null> {
  const from = localeToWpLang(fromLocale);
  const to = localeToWpLang(toLocale);
  if (from === to) return currentSlug;

  const [fromList, toList] = await Promise.all([
    fetchPostsList(from),
    fetchPostsList(to),
  ]);

  const byId = (a: WpPostRow, b: WpPostRow) => a.id - b.id;
  fromList.sort(byId);
  toList.sort(byId);

  const idx = fromList.findIndex((s) => s.slug === currentSlug);
  if (idx === -1 || idx >= toList.length) return null;

  return toList[idx].slug;
}

const BLOG_DETAIL = /^\/blogs\/([^/]+)\/?$/;

export function parseBlogDetailSlug(pathname: string | null): string | null {
  if (!pathname) return null;
  const m = pathname.match(BLOG_DETAIL);
  return m?.[1] ?? null;
}
