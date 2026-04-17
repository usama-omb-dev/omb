"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import { useTranslations } from "next-intl";

type LifeSlide = {
  imgUrl: string;
};

const BASE_SLIDES: LifeSlide[] = [
  { imgUrl: "/life-omb/life-omb-1.png" },
  { imgUrl: "/life-omb/life-omb-2.png" },
  { imgUrl: "/life-omb/life-omb-3.png" },
  { imgUrl: "/life-omb/life-omb-4.png" },
  { imgUrl: "/life-omb/life-omb-5.png" },
  { imgUrl: "/life-omb/life-omb-6.png" },
];

/** Repeat slides so loop + high slidesPerView stays seamless (marquee-style). */
const MARQUEE_COPIES = 3;

const LifeAtOmb = () => {
  const t = useTranslations("LifeAtOmb");
  const lifeAtOmbData: LifeSlide[] = Array.from(
    { length: MARQUEE_COPIES },
    () => BASE_SLIDES,
  ).flat();

  return (
    <section className="sm:py-35 py-10 relative isolate overflow-hidden">
      <div className="container flex flex-col">
        <div className="flex flex-col gap-5 mx-auto text-center mb-11">
          <h2 className="sm:text-2xl text-xl font-semibold leading-none">
            {t("title")}
          </h2>
          <p className="sm:text-body text-sm">{t("description")}</p>
        </div>
        <div>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1.15}
            spaceBetween={16}
            loop
            loopAdditionalSlides={BASE_SLIDES.length}
            speed={8000}
            allowTouchMove={false}
            simulateTouch={false}
            className="overflow-visible! [&_.swiper-wrapper]:ease-linear!"
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 14,
              },
              1536: {
                slidesPerView: 4.5,
                spaceBetween: 16,
              },
            }}
          >
            {lifeAtOmbData.map((item, index) => (
              <SwiperSlide
                key={`${item.imgUrl}-${index}`}
                className="overflow-visible! even:[&_.translateCard]:translate-y-[44px]"
              >
                <div className="rounded-[10px] overflow-hidden translateCard">
                  <Image
                    src={item.imgUrl}
                    alt={t("galleryImageAlt", { n: index + 1 })}
                    width={316}
                    height={414}
                    className="w-full h-full object-cover aspect-316/414"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
          <AnimatedButton
           className="mt-20 self-center"
                size={"icon"}
                trailingContent={<AnimatedArrowIcon />}
              >
    {t("cta")}
              </AnimatedButton>
      </div>
    </section>
  );
};

export default LifeAtOmb;
