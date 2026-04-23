import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/lib/api";
import {
  filterRestItemsByPolylangPermalink,
  localeToWpLang,
} from "@/lib/wp-lang";

export function useServices() {
  const locale = useLocale();
  const lang = localeToWpLang(locale);
  return useQuery({
    queryKey: ["services", lang],
    queryFn: async () => {
      try {
        const data = await fetchAPI("/services?_embed&per_page=100", lang);
        if (!Array.isArray(data)) return [];
        const filtered = filterRestItemsByPolylangPermalink(data, lang);
        /** If every item is filtered out (REST `lang` + `link` mismatch), show unfiltered list. */
        return filtered.length > 0 ? filtered : data;
      } catch {
        return [];
      }
    },
  });
}

export function useServiceBySlug(slug: string) {
  const locale = useLocale();
  const lang = localeToWpLang(locale);
  return useQuery({
    queryKey: ["service", slug, lang],
    queryFn: async () => {
      const data = await fetchAPI(`/services?slug=${encodeURIComponent(slug)}&_embed`, lang);
      return data[0];
    },
    enabled: !!slug,
  });
}
