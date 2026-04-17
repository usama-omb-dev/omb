import BlogHero from "@/components/section/Blogs/Blog-Hero";
import BlogsList from "@/components/section/Blogs/Blogs-List";
import { loadMessagesJson } from "@/lib/load-messages";
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

const page = () => {
  return (
    <>
      <BlogHero />
      <BlogsList />
    </>
  );
};

export default page;
