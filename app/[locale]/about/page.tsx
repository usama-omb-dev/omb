import MarketingTeam from "@/components/section/Service/MarketingTeam";
import OurGoal from "@/components/section/Service/OurGoal";
import PageHero from "@/components/section/PageHero";
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
  const seo = messages.PageSeo?.about;
  return {
    title: seo?.title ?? messages.Nav?.about ?? "About",
    description: seo?.description,
    ...withCanonical(locale, ["about"]),
  };
}

export default async function AboutPage() {
  return (
    <>
      <PageHero
        translationNamespace="AboutPageHero"
        showEyebrow
        tightBottom
      />
      <OurGoal showMilestones={false} />
      <MarketingTeam />
    </>
  );
}
