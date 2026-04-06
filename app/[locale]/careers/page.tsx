import ServicesHero from "@/components/section/Service/ServicesHero";
import { HeroDataSection } from "@/app/ServicesDataInterfaces";
import OurGoal from "@/components/section/Service/OurGoal";
import WhyOmb from "@/components/section/Careers/WhyOmb";
import LifeAtOmb from "@/components/section/Careers/LifeAtOmb";
import HiringProcess from "@/components/section/Careers/HiringProcess";
import OurEmployees from "@/components/section/Careers/OurEmployees";
import Contact from "@/components/section/Contact";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Careers");

  const heroData: HeroDataSection = {
    pillTitle: t("heroPill"),
    mainTitle: (
      <>
        {t("heroTitleLine1")}{" "}
        <span className="text-primary block">{t("heroTitleLine2")}</span>
      </>
    ),
    heroImage: "/career-page-hero.png",
  };

  return (
    <main>
      <ServicesHero data={heroData} />
      <OurGoal showMilestones={false} />
      <WhyOmb />
      <LifeAtOmb />
      <HiringProcess />
      <OurEmployees />
      <Contact headline={t("contactHeadline")} />
    </main>
  );
}
