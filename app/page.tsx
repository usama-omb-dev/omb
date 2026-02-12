import Hero from "@/components/section/Homepage/Hero";
import Insights from "@/components/section/Homepage/Insights";
import OurTeam from "@/components/section/Homepage/Our-Team";
import Qualities from "@/components/section/Homepage/Qualities";
import Services from "@/components/section/Homepage/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <Insights />
      <Services />
      <Qualities />
      <OurTeam />
      <section className="min-h-screen"></section>
    </>
  );
}
