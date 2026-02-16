"use client";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Pill from "@/components/ui/pill";

interface HeroData {
  pillTitle?: string;
  mainTitle?: React.ReactNode;
  heroImage?: string;
  details?: string;
  leftSmallImage?: string;
  rightSmallImage?: string;
}

gsap.registerPlugin(ScrollTrigger);

const ServicesHero = ({ data }: { data: HeroData }) => {
  const {
    mainTitle,
    pillTitle,
    heroImage,
    details,
    leftSmallImage,
    rightSmallImage,
  } = data;

  const heroImgRef = useRef<null | HTMLImageElement>(null);
  const mainSection = useRef<null | HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.innerWidth <= 1280) return;
      gsap.to(heroImgRef.current, {
        width: mainSection.current?.clientWidth,
        height: mainSection.current?.clientHeight,
        borderRadius: 0,
        top: 0,
        scrollTrigger: {
          trigger: mainSection.current,
          start: "center center",
          end: "+=200%",
          pin: true,
          scrub: true,
        },
      });
    },
    { scope: heroImgRef },
  );

  return (
    <section
      ref={mainSection}
      className="min-h-screen overflow-hidden sm:py-50 pt-30 pb-7 relative"
    >
      <div className="max-w-260 mx-auto lg:px-0 px-4 flex flex-col justify-center items-center xl:gap-[444px] sm:gap-15 gap-6">
        <div className="flex flex-col justify-center items-center sm:gap-5 gap-2">
          {!!pillTitle && <Pill iconColor="#3838F9">{pillTitle}</Pill>}
          <h1 className="leading-none lg:text-5xl md:text-4xl sm:text-3xl text-xl text-center">
            {mainTitle}
          </h1>
        </div>
        {!!heroImage && (
          <Image
            ref={heroImgRef}
            unoptimized
            src={heroImage}
            alt=""
            width={646}
            height={324}
            className="rounded-[0.625rem] object-cover origin-center xl:absolute top-[475px]"
          />
        )}
        <div className="relative sm:flex-row flex-col w-full isolate -z-50 flex justify-center items-center">
          <p className="text-center sm:text-body text-xsm max-w-161.5">
            {details}
          </p>
          {!!leftSmallImage && (
            <Image
              src={leftSmallImage}
              alt=""
              width={155}
              height={155}
              className="rounded-[0.625rem] object-cover origin-center sm:absolute lg:bottom-10 -bottom-44 w-38.75 h-38.75 2xl:left-0 left-4 2xl:-translate-x-1/2 sm:-rotate-12 sm:mt-0 mt-4"
            />
          )}
          {!!rightSmallImage && (
            <Image
              src={rightSmallImage}
              alt=""
              width={155}
              height={155}
              className="rounded-[0.625rem] object-cover origin-center sm:absolute lg:bottom-10 -bottom-44 w-38.75 h-38.75 2xl:right-0 right-4 2xl:translate-x-1/2 sm:rotate-12 sm:mt-0 mt-4"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
