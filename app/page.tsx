import Contact from "@/components/section/Contact";
import Hero from "@/components/section/Homepage/Hero";
import Insights from "@/components/section/Homepage/Insights";
import OurTeam from "@/components/section/Homepage/Our-Team";
import Qualities from "@/components/section/Homepage/Qualities";
import Reviews from "@/components/section/Homepage/Reviews";
import Services from "@/components/section/Homepage/Services";
import ServicesDifference from "@/components/section/Homepage/ServicesDifference";

export default async function Home() {
  return (
    <>
      <Hero />
      <Insights />
      <Services />
      <Qualities />
      <OurTeam />
      <Reviews />
      <Contact />
      <ServicesDifference />
    </>
  );
}
