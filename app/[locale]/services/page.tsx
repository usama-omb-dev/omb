import { withCanonical } from "@/lib/canonical";
import { loadMessagesJson } from "@/lib/load-messages";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await loadMessagesJson(locale);
  return {
    title: messages.Nav?.services ?? "Services",
    ...withCanonical(locale, ["services"]),
  };
}

export default function ServicesIndexPage() {
  return <></>;
}