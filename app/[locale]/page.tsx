import Contact from "@/components/section/Contact";
import Hero from "@/components/section/Homepage/Hero";
import Insights from "@/components/section/Homepage/Insights";
import OurTeam from "@/components/section/Homepage/Our-Team";
import Qualities from "@/components/section/Homepage/Qualities";
import Reviews from "@/components/section/Homepage/Reviews";
import Services from "@/components/section/Homepage/Services";
import ServicesDifference from "@/components/section/Homepage/ServicesDifference";
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
  const siteTitle = messages.Metadata?.title ?? "OMB";
  return { title: { absolute: siteTitle } };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ContactSection");

  return (
    <>
      <Hero />
      <Insights />
      <Services />
      <Qualities />
      <OurTeam />
      <Reviews />
      <Contact
        eyebrow={t("eyebrow")}
        headline={t("headline")}
        paragraph1={t("paragraph1")}
        paragraph2={t("paragraph2")}
        bulletPoints={[
          t("bullet1"),
          t("bullet2"),
          t("bullet3"),
          t("bullet4"),
        ]}
      />
      <ServicesDifference />
    </>
  );
}
