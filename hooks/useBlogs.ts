import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/lib/api";

export function useBlogs() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: () => fetchAPI("/posts?_embed&per_page=100"),
  });
}

export function useBlogBySlug(slug: string) {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const data = await fetchAPI(`/posts?slug=${slug}&_embed`);
      return data[0];
    },
    enabled: !!slug,
  });
}
