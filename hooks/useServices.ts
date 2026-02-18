import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/lib/api";

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: () => fetchAPI("/services?_embed"),
  });
}

export function useServiceBySlug(slug: string) {
  return useQuery({
    queryKey: ["service", slug],
    queryFn: async () => {
      const data = await fetchAPI(`/services?slug=${slug}&_embed`);
      return data[0];
    },
    enabled: !!slug,
  });
}
