import PageHero from "@/components/section/PageHero";
import OurGoal from "@/components/section/Service/OurGoal";
import WhyOmb from "@/components/section/Careers/WhyOmb";
import LifeAtOmb from "@/components/section/Careers/LifeAtOmb";
import HiringProcess from "@/components/section/Careers/HiringProcess";
import Contact from "@/components/section/Contact";
import { withCanonical } from "@/lib/canonical";
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
  const seo = messages.PageSeo?.careers;
  return {
    title: seo?.title ?? messages.Nav?.career ?? "Careers",
    description: seo?.description,
    ...withCanonical(locale, ["careers"]),
  };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Careers");

  const titleHtml = `${t("heroTitleLine1")} <span class="text-primary block">${t("heroTitleLine2")}</span>`;

  return (
    <main>
      <PageHero
        translationNamespace="CareerPageHero"
        contentFromCms={{
          eyebrow: t("heroPill"),
          titleHtml,
          descriptionHtml: `<p>${t("heroDescription")}</p>`,
        }}
        tightBottom
      />
      <OurGoal showMilestones={false} />
      <WhyOmb />
      <LifeAtOmb />
      <HiringProcess />
      <Contact headline={t("contactHeadline")} />
    </main>
  );
}
