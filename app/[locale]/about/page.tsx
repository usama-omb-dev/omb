import MarketingTeam from "@/components/section/Service/MarketingTeam";
import OurGoal from "@/components/section/Service/OurGoal";
import ServicesHero from "@/components/section/Service/ServicesHero";
import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations("AboutPage");
  const heroData = {
    pillTitle: t("heroPill"),
    mainTitle: (
      <>
        {t("heroTitleBefore")}{" "}
        <span className="text-primary">{t("heroTitleAccent")}</span>{" "}
        {t("heroTitleAfter")}
      </>
    ),
    heroImage: "/omb-family.png",
    details: t("heroDetails"),
    leftSmallImage: "/about-left-hero.png",
    rightSmallImage: "/about-right-hero.png",
  };

  return (
    <>
      <ServicesHero data={heroData} />
      <OurGoal />
      <MarketingTeam />
    </>
  );
}
