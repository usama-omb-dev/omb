import BlogsListingHero from "@/components/section/Blogs/BlogsListingHero";
import BlogsList from "@/components/section/Blogs/Blogs-List";
import { fetchPostCount } from "@/lib/api";
import { loadMessagesJson } from "@/lib/load-messages";
import { localeToWpLang } from "@/lib/wp-lang";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await loadMessagesJson(locale);
  return { title: messages.Nav?.blogs ?? "Blog" };
}

export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const publishedPostCount = await fetchPostCount(localeToWpLang(locale));

  return (
    <>
      <BlogsListingHero publishedPostCount={publishedPostCount} />
      <BlogsList />
    </>
  );
}
