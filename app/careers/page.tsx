import ServicesHero from "@/components/section/Service/ServicesHero";
import { HeroDataSection } from "../ServicesDataInterfaces";
import OurGoal from "@/components/section/Service/OurGoal";
import WhyOmb from "@/components/section/Careers/WhyOmb";
import LifeAtOmb from "@/components/section/Careers/LifeAtOmb";
import HiringProcess from "@/components/section/Careers/HiringProcess";
import OurEmployees from "@/components/section/Careers/OurEmployees";
import Contact from "@/components/section/Contact";

const page = () => {
    const heroData: HeroDataSection = {
        pillTitle: "Personal Brand",
        mainTitle: (
          <>Join the Bakery <span className="text-primary block">That Bakes Brands</span></>
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
        <Contact headline={"Your Next Opportunity Starts Here"} />
    </main>
  )
}

export default page