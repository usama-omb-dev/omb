import { loadMessagesJson } from "@/lib/load-messages";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await loadMessagesJson(locale);
  return { title: messages.PageTitles?.components ?? "UI playground" };
}

export default function ComponentsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
