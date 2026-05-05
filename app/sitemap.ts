import type { MetadataRoute } from "next";
import { WP_JSON_BASE_URL, withWpLang } from "@/lib/api";
import { getSiteUrl, localeCanonicalPath } from "@/lib/canonical";
import { routing } from "@/i18n/routing";
import {
  filterRestItemsByPolylangPermalink,
  type WpLang,
} from "@/lib/wp-lang";

const REVALIDATE_SECONDS = 3600;

type WpListRow = { slug?: string; modified?: string; link?: string };

async function fetchPublishedSlugsByLang(
  resource: "/posts" | "/case-study" | "/services",
  lang: WpLang,
): Promise<Array<{ slug: string; lastModified?: Date }>> {
  const collected: Array<{ slug: string; lastModified?: Date }> = [];
  let page = 1;
  let totalPages = 1;

  try {
    while (page <= totalPages) {
      const qs = `${resource}?per_page=100&page=${page}&status=publish&_fields=slug,modified,link`;
      const url = `${WP_JSON_BASE_URL}${withWpLang(qs, lang)}`;
      const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
      if (!res.ok) break;

      totalPages = Math.max(
        1,
        parseInt(res.headers.get("x-wp-total-pages") ?? "1", 10),
      );

      const items = (await res.json()) as unknown;
      if (!Array.isArray(items)) break;

      let rows = items as WpListRow[];
      const filtered = filterRestItemsByPolylangPermalink(rows, lang);
      rows = filtered.length > 0 ? filtered : rows;

      for (const row of rows) {
        if (row.slug) {
          collected.push({
            slug: row.slug,
            lastModified: row.modified ? new Date(row.modified) : undefined,
          });
        }
      }

      page += 1;
    }
  } catch {
    /* static routes still ship */
  }

  return collected;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getSiteUrl();
  const seen = new Set<string>();
  const out: MetadataRoute.Sitemap = [];

  const push = (entry: MetadataRoute.Sitemap[number]) => {
    if (seen.has(entry.url)) return;
    seen.add(entry.url);
    out.push(entry);
  };

  const staticRoutes: Array<{
    segments: string[];
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    {
      segments: [],
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      segments: ["about"],
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      segments: ["blogs"],
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      segments: ["careers"],
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      segments: ["case-study"],
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      segments: ["contact"],
      changeFrequency: "yearly",
      priority: 0.75,
    },
    {
      segments: ["privacy"],
      changeFrequency: "yearly",
      priority: 0.35,
    },
    {
      segments: ["services"],
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  for (const locale of routing.locales) {
    for (const route of staticRoutes) {
      push({
        url: `${origin}${localeCanonicalPath(locale, route.segments)}`,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }
  }

  const [
    postsNl,
    postsEn,
    casesNl,
    casesEn,
    servicesNl,
    servicesEn,
  ] = await Promise.all([
    fetchPublishedSlugsByLang("/posts", "nl"),
    fetchPublishedSlugsByLang("/posts", "en"),
    fetchPublishedSlugsByLang("/case-study", "nl"),
    fetchPublishedSlugsByLang("/case-study", "en"),
    fetchPublishedSlugsByLang("/services", "nl"),
    fetchPublishedSlugsByLang("/services", "en"),
  ]);

  for (const { slug, lastModified } of postsNl) {
    push({
      url: `${origin}${localeCanonicalPath("nl", ["blogs", slug])}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.65,
    });
  }
  for (const { slug, lastModified } of postsEn) {
    push({
      url: `${origin}${localeCanonicalPath("en", ["blogs", slug])}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.65,
    });
  }

  for (const { slug, lastModified } of casesNl) {
    push({
      url: `${origin}${localeCanonicalPath("nl", ["case-study", slug])}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }
  for (const { slug, lastModified } of casesEn) {
    push({
      url: `${origin}${localeCanonicalPath("en", ["case-study", slug])}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  for (const { slug, lastModified } of servicesNl) {
    push({
      url: `${origin}${localeCanonicalPath("nl", ["services", slug])}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  for (const { slug, lastModified } of servicesEn) {
    push({
      url: `${origin}${localeCanonicalPath("en", ["services", slug])}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return out;
}
