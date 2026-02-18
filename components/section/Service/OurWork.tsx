"use client";
import Image from "next/image";
import TextReveal from "@/components/ui/TextReveal";
import { OurWorkSection } from "@/app/ServicesDataInterfaces";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import React, { useEffect, useState } from "react";
import CaseStudyCard from "./CaseStudyCard";

const OurWork = ({
  data,
  pageName,
}: {
  data: OurWorkSection;
  pageName: string;
}) => {
  const {
    pillTitle,
    ourWorkTitle,
    workBookingButton,
    workSlider,
    featuredCaseStudy,
  } = data;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    handleChange(media);

    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <section className="sm:pb-10 pb-4">
      <div className="container flex flex-col gap-14.5">
        <div className="flex flex-col gap-14.5 sm:rounded-4xl rounded-[1.25rem] bg-linear-to-t from-[#212193] to-[#3838F9] xl:p-14.75 lg:p-10 sm:p-6 p-4 relative isolate overflow-hidden">
          <div className="flex sm:flex-row flex-col sm:items-end items-start justify-between gap-4">
            <div className="max-w-199.25">
              <Image
                src={"/glitchy-overlay.png"}
                alt="Overlay"
                width={1306}
                height={822}
                className="absolute -z-20 top-0 left-0 w-full h-full opacity-80"
              />
              <div className="flex flex-col lg:gap-7.5 gap-4">
                <Image
                  src={"/omb-logo.png"}
                  alt="Logo"
                  width={65}
                  height={92}
                />
                <div>
                  <h5 className="text-white sm:text-md text-body font-medium">
                    <TextReveal>{pillTitle}</TextReveal>
                  </h5>
                  <h2 className="text-white xl:text-5xl lg:text-3xl sm:text-2xl text-xl leading-none">
                    <TextReveal>{ourWorkTitle}</TextReveal>
                  </h2>
                </div>
              </div>
            </div>
            {!!workBookingButton && (
              <AnimatedButton
                size={"icon"}
                className=""
                trailingContent={<AnimatedArrowIcon />}
                href={workBookingButton.btnUrl}
              >
                {workBookingButton.btnLabel}
              </AnimatedButton>
            )}
          </div>
          {workSlider &&
            Object.values(workSlider).some(
              (arr) => Array.isArray(arr) && arr.length > 0,
            ) && (
              <div className="bg-primary lg:px-5 px-3 overflow-hidden rounded-[0.625rem] outline-[6px] outline-white pointer-events-none">
                <div className="flex sm:flex-row flex-col lg:gap-4.5 gap-2">
                  {Object.entries(workSlider).map(([key, slides], index) => (
                    <Swiper
                      key={key}
                      className="xl:h-154.25 lg:h-120 h-60 [&_.swiper-wrapper]:ease-linear! sm:flex-1 min-w-0 w-full"
                      direction="vertical"
                      loop={true}
                      modules={[Autoplay]}
                      slidesPerView={1}
                      spaceBetween={14}
                      autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                        reverseDirection: isMobile
                          ? false
                          : (index + 1) % 2 === 0,
                      }}
                      speed={5500}
                      allowTouchMove={false}
                      breakpoints={{
                        640: {
                          slidesPerView: 2,
                          spaceBetween: 14,
                        },
                        1280: {
                          slidesPerView: 2,
                          spaceBetween: 18,
                        },
                      }}
                    >
                      {slides.map((slide: string, slideIndex: number) => (
                        <SwiperSlide
                          key={slideIndex + index}
                          className="text-white"
                        >
                          <Image
                            src={slide}
                            alt={slide.split(".")[0]}
                            width={263}
                            height={263}
                            className="w-full h-full object-cover rounded-[5px] border-[6px] border-white/20"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ))}
                </div>
              </div>
            )}
          {featuredCaseStudy &&
            pageName !== "Profitable websites" &&
            featuredCaseStudy?.length > 0 &&
            featuredCaseStudy.map((item, index) => (
              <React.Fragment key={index + 1}>
                <CaseStudyCard data={item} />
              </React.Fragment>
            ))}
        </div>
        <div className="flex flex-col gap-4">
          {featuredCaseStudy &&
            pageName == "Profitable websites" &&
            featuredCaseStudy?.length > 0 &&
            featuredCaseStudy.map((item, index) => (
              <React.Fragment key={index + 1}>
                <CaseStudyCard data={item} />
              </React.Fragment>
            ))}
        </div>
      </div>
    </section>
  );
};

export default OurWork;
