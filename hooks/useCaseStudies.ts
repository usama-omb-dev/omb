import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/lib/api";
import { filterRestItemsByPolylangPermalink, localeToWpLang } from "@/lib/wp-lang";

export function useCaseStudies() {
  const locale = useLocale();
  const lang = localeToWpLang(locale);
  return useQuery({
    queryKey: ["case-studies", lang],
    queryFn: async () => {
      const data = await fetchAPI("/case-study?_embed&per_page=100", lang);
      if (!Array.isArray(data)) return data;
      return filterRestItemsByPolylangPermalink(data, lang);
    },
  });
}
