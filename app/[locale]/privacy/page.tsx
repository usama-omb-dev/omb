import { loadMessagesJson } from "@/lib/load-messages";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await loadMessagesJson(locale);
  return { title: messages.PageTitles?.privacy ?? "Privacy" };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("PrivacyPage");

  return (
    <main className="bg-background pb-16 sm:pb-20">
      <div className="container mx-auto max-w-3xl px-4 py-16 sm:py-20 lg:py-24">
        <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl">
          {t("heading")}
        </h1>
        <div className="mt-8 space-y-6 text-pretty text-sm leading-relaxed text-black/80 sm:text-body">
          <p>{t("intro")}</p>
          <p>{t("body")}</p>
        </div>
      </div>
    </main>
  );
}
