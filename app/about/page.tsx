import MarketingTeam from "@/components/section/Service/MarketingTeam";
import OurGoal from "@/components/section/Service/OurGoal";
import ServicesHero from "@/components/section/Service/ServicesHero";

const page = () => {
  const heroData = {
    pillTitle: "About",
    mainTitle: (
      <>
        Revolutionizing <span className="text-primary">B2B</span> Marketing
        since 2018
      </>
    ),
    heroImage: "/omb-family.png",
    details:
      "Marketing does not need more noise. It needs direction. Since 2018, we have been helping B2B brands escape guesswork and turn marketing into something that actually delivers. No vague promises, no safe play. Just clear choices and measurable results.",
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
};

export default page;
