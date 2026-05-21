import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export type PageSeoEntry = { title?: string; description?: string };

/** Full SEO titles from PageSeo must bypass the layout `title.template`. */
export function resolvePageTitle(
  seoTitle: string | undefined,
  fallback: string,
): NonNullable<Metadata["title"]> {
  if (seoTitle) return { absolute: seoTitle };
  return fallback;
}
export type MessagesJson = {
  Metadata?: { title?: string; description?: string };
  PageSeo?: {
    about?: PageSeoEntry;
    contact?: PageSeoEntry;
    careers?: PageSeoEntry;
    caseStudyListing?: PageSeoEntry;
    services?: Record<string, PageSeoEntry>;
  };
  Nav?: {
    home?: string;
    about?: string;
    services?: string;
    blogs?: string;
    caseStudies?: string;
    career?: string;
  };
  PageTitles?: {
    contact?: string;
    components?: string;
    caseStudy?: string;
    caseStudiesListing?: string;
    privacy?: string;
  };
};

export async function loadMessagesJson(
  locale: string,
): Promise<MessagesJson> {
  const safe =
    locale === "nl" || locale === "en" ? locale : routing.defaultLocale;
  return (await import(`../messages/${safe}.json`)).default as MessagesJson;
}
