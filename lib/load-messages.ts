import { routing } from "@/i18n/routing";

export type PageSeoEntry = { title?: string; description?: string };

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
