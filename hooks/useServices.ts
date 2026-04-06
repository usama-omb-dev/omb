import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/lib/api";
import { localeToWpLang } from "@/lib/wp-lang";

export function useServices() {
  const locale = useLocale();
  const lang = localeToWpLang(locale);
  return useQuery({
    queryKey: ["services", lang],
    queryFn: () => fetchAPI("/services?_embed", lang),
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
