"use client";
import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import Pill from "@/components/ui/pill";
import ServiceCard from "@/components/ui/service-card";
import { useServices } from "@/hooks/useServices";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

interface ServiceCardItem {
  title: string;
  href: string;
  imgUrl?: string;
}

const Services = () => {
  const t = useTranslations("HomeServices");
  const { data: service, isLoading } = useServices();

  const servicesList = useMemo((): ServiceCardItem[] => {
    if (isLoading || !Array.isArray(service)) return [];
    return service.map((item: {
      slug: string;
      title?: { rendered?: string };
      _embedded?: { "wp:featuredmedia"?: Array<{ source_url?: string }> };
    }) => ({
      title: item.title?.rendered ?? item.slug,
      href: `/services/${item.slug}`,
      imgUrl: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
    }));
  }, [service, isLoading]);

  return (
    <section
      id="home-services"
      className="lg:py-37.5 sm:py-20 py-10 scroll-mt-24"
    >
      <div className="container flex flex-col lg:gap-28 gap-8">
        <div className="flex lg:flex-row flex-col gap-6 items-start justify-between">
          <Pill iconColor="#3838F9" className="text-primary">
            {t("pill")}
          </Pill>
          <div className="lg:max-w-132 flex flex-col gap-5">
            <h3 className="sm:text-2xl text-xl font-semibold leading-none">
              {t("title")}{" "}
              <span className="text-primary">{t("titleAccent")}</span>
            </h3>
            <p className="sm:text-body text-sm">{t("description")}</p>
          </div>
          <AnimatedButton
            href="/#home-services"
            size={"icon"}
            trailingContent={<AnimatedArrowIcon />}
          >
            {t("cta")}
          </AnimatedButton>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-2 sm:gap-3.5 gap-2 sm:auto-rows-[1fr]">
          <div className="lg:row-span-3 sm:row-span-2 sm:col-span-1 col-span-2 lg:col-span-1">
            <Image
              alt={t("heroImageAlt")}
              width={1440}
              height={613}
              src={"/service-hero_img.png"}
              className=""
            />
          </div>
          {servicesList.map((item: ServiceCardItem, index: number) => (
            <ServiceCard key={index + 1} cardDetails={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
