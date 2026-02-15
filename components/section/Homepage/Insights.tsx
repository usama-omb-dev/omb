"use client";
import { Button } from "@/components/ui/button";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { ArrowRight } from "@/components/ui/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

import { useRef } from "react";
import Image from "next/image";
import Counter from "@/components/ui/counter";
import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";

const Insights = () => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const slidesData = [
    {
      logo: "/stobe-logo.png",
      description:
        "Custom Shopify store, SEO strategy and Meta ads framework. The result? 300 percent growth in traffic and 20 percent higher conversion. This is how you turn a store into a sales machine.",
      stats: [
        { label: "Site Traffic", value: 300, suffix: "%" },
        { label: "Conversion Rate", value: 20, suffix: "%" },
      ],
    },
    {
      logo: "/stobe-logo.png",
      description:
        "Custom Shopify store, SEO strategy and Meta ads framework. The result? 300 percent growth in traffic and 20 percent higher conversion. This is how you turn a store into a sales machine.",
      stats: [
        { label: "Site Traffic", value: 300, suffix: "%" },
        { label: "Conversion Rate", value: 20, suffix: "%" },
      ],
    },
    {
      logo: "/stobe-logo.png",
      description:
        "Custom Shopify store, SEO strategy and Meta ads framework. The result? 300 percent growth in traffic and 20 percent higher conversion. This is how you turn a store into a sales machine.",
      stats: [
        { label: "Site Traffic", value: 300, suffix: "%" },
        { label: "Conversion Rate", value: 20, suffix: "%" },
      ],
    },
    {
      logo: "/stobe-logo.png",
      description:
        "Custom Shopify store, SEO strategy and Meta ads framework. The result? 300 percent growth in traffic and 20 percent higher conversion. This is how you turn a store into a sales machine.",
      stats: [
        { label: "Site Traffic", value: 300, suffix: "%" },
        { label: "Conversion Rate", value: 20, suffix: "%" },
      ],
    },
    {
      logo: "/stobe-logo.png",
      description:
        "Custom Shopify store, SEO strategy and Meta ads framework. The result? 300 percent growth in traffic and 20 percent higher conversion. This is how you turn a store into a sales machine.",
      stats: [
        { label: "Site Traffic", value: 300, suffix: "%" },
        { label: "Conversion Rate", value: 20, suffix: "%" },
      ],
    },
    {
      logo: "/stobe-logo.png",
      description:
        "Custom Shopify store, SEO strategy and Meta ads framework. The result? 300 percent growth in traffic and 20 percent higher conversion. This is how you turn a store into a sales machine.",
      stats: [
        { label: "Site Traffic", value: 300, suffix: "%" },
        { label: "Conversion Rate", value: 20, suffix: "%" },
      ],
    },
    {
      logo: "/stobe-logo.png",
      description:
        "Custom Shopify store, SEO strategy and Meta ads framework. The result? 300 percent growth in traffic and 20 percent higher conversion. This is how you turn a store into a sales machine.",
      stats: [
        { label: "Site Traffic", value: 300, suffix: "%" },
        { label: "Conversion Rate", value: 20, suffix: "%" },
      ],
    },
    {
      logo: "/stobe-logo.png",
      description:
        "Custom Shopify store, SEO strategy and Meta ads framework. The result? 300 percent growth in traffic and 20 percent higher conversion. This is how you turn a store into a sales machine.",
      stats: [
        { label: "Site Traffic", value: 300, suffix: "%" },
        { label: "Conversion Rate", value: 20, suffix: "%" },
      ],
    },
    {
      logo: "/stobe-logo.png",
      description:
        "Custom Shopify store, SEO strategy and Meta ads framework. The result? 300 percent growth in traffic and 20 percent higher conversion. This is how you turn a store into a sales machine.",
      stats: [
        { label: "Site Traffic", value: 300, suffix: "%" },
        { label: "Conversion Rate", value: 20, suffix: "%" },
      ],
    },
    {
      logo: "/stobe-logo.png",
      description:
        "Custom Shopify store, SEO strategy and Meta ads framework. The result? 300 percent growth in traffic and 20 percent higher conversion. This is how you turn a store into a sales machine.",
      stats: [
        { label: "Site Traffic", value: 300, suffix: "%" },
        { label: "Conversion Rate", value: 20, suffix: "%" },
      ],
    },
    {
      logo: "/stobe-logo.png",
      description:
        "Custom Shopify store, SEO strategy and Meta ads framework. The result? 300 percent growth in traffic and 20 percent higher conversion. This is how you turn a store into a sales machine.",
      stats: [
        { label: "Site Traffic", value: 300, suffix: "%" },
        { label: "Conversion Rate", value: 20, suffix: "%" },
      ],
    },
  ];

  return (
    <section className="xl:pt-50 sm:pt-20 pt-10 overflow-hidden">
      <div className="container flex flex-col lg:gap-20 gap-10">
        <div className="flex lg:flex-row flex-col justify-between xl:gap-34 sm:gap-10 gap-5">
          <h3 className="sm:text-2xl text-lg font-medium leading-none lg:max-w-152.25">
            <span className="text-primary">68 percent increase</span> in
            conversion rates with the new design.
          </h3>
          <div className="lg:max-w-79 flex flex-col items-start sm:gap-7.5 gap-4">
            <p className="sm:text-body text-sm">
              If everything was going great, you would not be here right now.
              Our clients understand that. They hire us for expertise and accept
              the discussion that comes with it. Because politely continuing
              what does not work will cost you dearly.
            </p>
            <AnimatedButton
              size={"icon"}
              trailingContent={<AnimatedArrowIcon />}
            >
              View our results
            </AnimatedButton>
          </div>
          <div className="flex gap-3.5">
            <Button
              ref={prevRef}
              className="rounded-[0.3125rem] max-w-12.75 w-12.75 h-12.75 bg-foreground disabled:bg-foreground/20 [&>svg]:rotate-180"
            >
              <ArrowRight color="white" />
            </Button>
            <Button
              ref={nextRef}
              className="rounded-[0.3125rem] max-w-12.75 w-12.75 h-12.75 bg-foreground disabled:bg-foreground/20"
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
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            // onSlideChange={(swiper) => {
            //   prevRef.current!.disabled = swiper.isBeginning;
            //   nextRef.current!.disabled = swiper.isEnd;
            // }}
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
              <SwiperSlide key={index}>
                <div className="bg-white lg:p-7.5 p-4 lg:pb-5 rounded-[0.3125rem] xl:min-h-115.75 lg:gap-8 gap-4 flex flex-col justify-between items-start">
                  <Image
                    alt="Stobe Logo"
                    width={138}
                    height={34}
                    src={slide.logo}
                  />

                  <p className="lg:text-body text-sm">{slide.description}</p>

                  <div className="w-full flex lg:flex-row flex-col justify-between lg:items-center items-stretch gap-3.5">
                    {slide.stats.map((stat, statIndex) => (
                      <div
                        key={statIndex}
                        className="flex-1 p-2.5 bg-secondary rounded-[0.3125rem] flex flex-col items-start lg:gap-5 gap-2"
                      >
                        <h6 className="text-xsm leading-none">{stat.label}</h6>
                        <Counter suffix={stat.suffix}>{stat.value}</Counter>
                      </div>
                    ))}
                  </div>
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
