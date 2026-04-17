"use client";

import PageHero from "@/components/section/PageHero";
import Counter from "@/components/ui/counter";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("Hero");

  return (
    <>
      <PageHero />
      <section className="relative z-20 p-3 -mt-14 sm:-mt-28">
        <div className="container">
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 lg:gap-0 gap-6 py-[70px] px-[20px] bg-linear-to-t from-[#212193] to-[#3838F9] rounded-[10px]">
            <div className="flex flex-col items-center justify-center relative isolate">
              <Counter className="text-white md:!text-3xl !text-2xl font-medium" suffix={"+"}>{723}</Counter>
              <span className="text-white text-[20px]">{t("statProjects")}</span>
              <span className="absolute top-0  sm:block hidden right-0 w-[2px] h-full bg-gradient-to-b from-[transparent] via-white/30 to-[transparent]" />
              <span className="absolute -bottom-[16px] lg:hidden block right-0 w-full h-[2px] bg-gradient-to-l from-[transparent] via-white/30 to-[transparent]" />
            </div>
            <div className="flex flex-col items-center justify-center relative isolate">
              <Counter className="text-white md:!text-3xl !text-2xl font-medium" suffix={"+"}>{10}</Counter>
              <span className="text-white text-[20px]">{t("statYears")}</span>
              <span className="absolute -bottom-[16px] lg:hidden block right-0 w-full h-[2px] bg-gradient-to-l from-[transparent] via-white/30 to-[transparent]" />
              <span className="absolute lg:block hidden top-0  right-0 w-[2px] h-full bg-gradient-to-b from-[transparent] via-white/30 to-[transparent]" />
            </div>
            <div className="flex flex-col items-center justify-center relative isolate">
              <Counter className="text-white md:!text-3xl !text-2xl font-medium" suffix={"+"}>{500}</Counter>
              <span className="text-white text-[20px]">{t("statProducts")}</span>
              <span className="absolute top-0 right-0 w-[2px] sm:block hidden h-full bg-gradient-to-b from-[transparent] via-white/30 to-[transparent]" />
              <span className="absolute -bottom-[16px] sm:hidden block right-0 w-full h-[2px] bg-gradient-to-l from-[transparent] via-white/30 to-[transparent]" />
            </div>
            <div className="flex flex-col items-center justify-center relative isolate">
              <Counter className="text-white md:!text-3xl !text-2xl font-medium" suffix={"+"}>{100}</Counter>
              <span className="text-white text-[20px]">{t("statStartup")}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
