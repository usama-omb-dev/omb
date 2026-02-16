import { ServiceData } from "@/app/ServicesData";
import Contact from "@/components/section/Contact";
import CaseStudy from "@/components/section/Service/CaseStudy";
import Difference from "@/components/section/Service/Difference";
import OurWork from "@/components/section/Service/OurWork";
import ServicesHero from "@/components/section/Service/ServicesHero";
import WhatWeDo from "@/components/section/Service/WhatWeDo";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ service_id: string }>;
}) {
  const { service_id } = await params;
  const data = ServiceData.find((item) => item.url === service_id);

  if (!data) notFound();

  return (
    <>
      {"heroData" in data && data.heroData && (
        <ServicesHero data={data.heroData} />
      )}
      {data.whatWeDo.showSection && <WhatWeDo data={data.whatWeDo} />}
      {data.difference.showSection && <Difference data={data.difference} />}
      {data.ourWork.showSection && <OurWork data={data.ourWork} />}
      {data.caseStudies?.showSection && (
        <CaseStudy data={data.caseStudies.slides} />
      )}
      <Contact />
    </>
  );
}
