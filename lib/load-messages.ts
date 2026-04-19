import { routing } from "@/i18n/routing";

export type MessagesJson = {
  Metadata?: { title?: string; description?: string };
  Nav?: {
    home?: string;
    about?: string;
    services?: string;
    blogs?: string;
    career?: string;
  };
  PageTitles?: {
    contact?: string;
    components?: string;
    caseStudy?: string;
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
