"use client";
import { Button } from "@/components/ui/button";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { ArrowRight } from "@/components/ui/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

import { useRef, useMemo } from "react";
import Image from "next/image";
import Counter from "@/components/ui/counter";
import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import { useTranslations } from "next-intl";

export type InsightStat = {
  label: string;
  value: number;
  suffix: string;
};

export type InsightSlide = {
  logo: string;
  description: string;
  stats?: InsightStat[];
};

const Insights = () => {
  const t = useTranslations("Insights");
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const slidesData: InsightSlide[] = useMemo(
    () => [
      { logo: "/salonora.png", description: t("slideSalonora") },
      { logo: "/beeldster.png", description: t("slideBeeldster") },
      { logo: "/stobe-logo.png", description: t("slideStobe") },
      { logo: "/slimkiezen.png", description: t("slideSlimkiezen") },
      { logo: "/karakterfaculteit.png", description: t("slideKarakter") },
    ],
    [t],
  );

  return (
    <section className="xl:pt-36.5 sm:pt-20 pt-10 overflow-hidden">
      <div className="container flex flex-col lg:gap-20 gap-10">
        <div className="flex lg:flex-row flex-col justify-between xl:gap-34 sm:gap-10 gap-5">
          <h3 className="sm:text-2xl text-lg font-semibold leading-none lg:max-w-152.25">
            <span className="text-primary">{t("headlineAccent")}</span>{" "}
            {t("headlineRest")}
          </h3>
          <div className="lg:max-w-79 flex flex-col items-start sm:gap-7.5 gap-4">
            <p className="sm:text-body text-sm">{t("body")}</p>
            <AnimatedButton
              size={"icon"}
              trailingContent={<AnimatedArrowIcon />}
            >
              {t("cta")}
            </AnimatedButton>
          </div>
          <div className="flex gap-3.5">
            <Button
              ref={prevRef}
              className="justify-center rounded-full max-w-12.75 w-12.75 h-12.75 bg-foreground disabled:bg-foreground/20 [&>svg]:rotate-180"
            >
              <ArrowRight color="white" />
            </Button>
            <Button
              ref={nextRef}
              className="justify-center rounded-full max-w-12.75 w-12.75 h-12.75 bg-foreground disabled:bg-foreground/20"
            >
              <ArrowRight color="white" />
            </Button>
          </div>
        </div>
        <div className="[&>.mySwiper]:overflow-visible!">
          <Swiper
            slidesPerView={1}
            spaceBetween={14}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
            onBeforeInit={(swiper: SwiperType) => {
              const nav = swiper.params.navigation;
              if (!nav || typeof nav === "boolean") return;
              nav.prevEl = prevRef.current;
              nav.nextEl = nextRef.current;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            className="mySwiper resultSwiper"
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 14,
              },
            }}
          >
            {slidesData.map((slide, index) => (
              <SwiperSlide className="h-auto!" key={index}>
                <div className="bg-white lg:p-7.5 p-4 lg:pb-5 rounded-[0.3125rem] h-full lg:gap-8 gap-4 flex flex-col justify-between items-start">
                  <Image
                    alt={t("logoAlt")}
                    width={138}
                    height={34}
                    src={slide.logo}
                  />

                  <p className="lg:text-body text-sm">{slide.description}</p>
                  {slide.stats != null && slide.stats.length > 0 ? (
                    <div className="w-full flex lg:flex-row flex-col justify-between lg:items-center items-stretch gap-3.5">
                      {slide.stats.map((stat, statIndex) => (
                        <div
                          key={statIndex}
                          className="flex-1 p-2.5 bg-secondary rounded-[0.3125rem] flex flex-col items-start lg:gap-5 gap-2"
                        >
                          <h6 className="text-xsm leading-none">
                            {stat.label}
                          </h6>
                          <Counter suffix={stat.suffix}>{stat.value}</Counter>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Insights;
