import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/lib/api";
import { localeToWpLang } from "@/lib/wp-lang";

export function useBlogs() {
  const locale = useLocale();
  const lang = localeToWpLang(locale);
  return useQuery({
    queryKey: ["blogs", lang],
    queryFn: () => fetchAPI("/posts?_embed&per_page=100", lang),
  });
}

export function useBlogBySlug(slug: string) {
  const locale = useLocale();
  const lang = localeToWpLang(locale);
  return useQuery({
    queryKey: ["blog", slug, lang],
    queryFn: async () => {
      const data = await fetchAPI(
        `/posts?slug=${encodeURIComponent(slug)}&_embed`,
        lang,
      );
      return data[0];
    },
    enabled: !!slug,
  });
}
