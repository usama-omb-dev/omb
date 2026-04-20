import MarketingTeam from "@/components/section/Service/MarketingTeam";
import OurGoal from "@/components/section/Service/OurGoal";
import PageHero from "@/components/section/PageHero";
import { loadMessagesJson } from "@/lib/load-messages";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await loadMessagesJson(locale);
  return { title: messages.Nav?.about ?? "About" };
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
