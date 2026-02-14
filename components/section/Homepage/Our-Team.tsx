"use client";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { ArrowRight } from "@/components/ui/icons";
import Pill from "@/components/ui/pill";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const OurTeam = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<null | HTMLDivElement>(null);
  const titleRef = useRef<null | HTMLDivElement>(null);

  const cards = [
    { title: "Design" },
    { title: "Development" },
    { title: "Branding" },
    { title: "Marketing" },
    { title: "UI/UX" },
    { title: "SEO" },
    { title: "Content" },
    { title: "Strategy" },
  ];

  const setCardRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useGSAP(
    () => {
      if (window.innerWidth <= 1023) return;
      if (!cardsRef.current.length || containerRef.current == null) return;

      const images = containerRef.current.querySelectorAll("img");

      let loaded = 0;

      images.forEach((img) => {
        if (img.complete) {
          loaded++;
        } else {
          img.addEventListener("load", () => {
            loaded++;
            if (loaded === images.length) {
              ScrollTrigger.refresh();
            }
          });
        }
      });

      setTimeout(() => ScrollTrigger.refresh(), 300);

      const windowWidth = window.innerWidth;
      let cardGap = 220;
      if (windowWidth < 1280 && windowWidth > 1023) {
        cardGap = 160;
      }

      cardsRef.current.map((item, index) => {
        gsap.to(item, {
          x: () =>
            (index + 1) % 2 == 0
              ? index + 1 > 2 && index + 1 < 7
                ? cardGap * 2
                : cardGap
              : index + 1 > 2 && index + 1 < 7
                ? -cardGap * 2
                : -cardGap,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom top",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: cardsRef },
  );

  useGSAP(
    () => {
      if (containerRef.current == null) return;
      gsap.to(titleRef.current, {
        x: "15%",
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "200% top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section className="lg:py-37.5 py-20 overflow-hidden">
      <div className="flex flex-col lg:gap-38 gap-10">
        <div className="container">
          <div className="flex lg:items-center items-stretch lg:flex-row flex-col xl:gap-27.5 lg:gap-20 gap-6">
            <div className="lg:max-w-110">
              <Pill iconColor="#3838F9" className="text-primary">
                Meet the team
              </Pill>
              <h3 className="text-2xl font-medium leading-none">
                Your own team of world class B2B{" "}
                <span className="text-primary">marketing experts.</span>
              </h3>
            </div>
            <p className="text-body md:max-w-134">
              Quality has no postcode. We build teams with the best specialists,
              no matter where they are. Remote work allows us to use top talent,
              with Rubin, owner of OMB, as your dedicated project manager.
            </p>
          </div>
          <div className="lg:hidden flex flex-wrap justify-center items-center gap-2 mt-6">
            {cards.map((card, index) => {
              return (
                <div
                  key={index}
                  className="bg-primary flex justify-center items-center rounded-4xl py-2 px-5 pt-3"
                >
                  <h6 className="xl:text-md text-body leading-none text-white font-semibold font-nexa">
                    {card.title}
                  </h6>
                </div>
              );
            })}
          </div>
        </div>
        <div
          ref={containerRef}
          className="relative grid grid-cols-1 place-items-center"
        >
          <div className=" lg:flex hidden flex-col lg:gap-48 z-30 pointer-events-none lg:col-start-1 lg:row-start-1">
            <div className="grid grid-cols-2">
              {cards.map((card, index) => {
                if (index <= 3)
                  return (
                    <div
                      key={index}
                      ref={setCardRef}
                      className="bg-primary flex justify-center items-center 2xl:w-50.5 xl:w-48 w-44 xl:h-48 h-44 2xl:h-50.5 rounded-[0.3125rem]"
                    >
                      <h6 className="xl:text-md text-body text-white font-semibold font-nexa">
                        {card.title}
                      </h6>
                    </div>
                  );
              })}
            </div>
            <div className="grid grid-cols-2">
              {cards.map((card, index) => {
                if (index > 3)
                  return (
                    <div
                      key={index}
                      ref={setCardRef}
                      className="bg-primary flex justify-center items-center 2xl:w-50.5 xl:w-48 w-44 xl:h-48 h-44 2xl:h-50.5 rounded-[0.3125rem]"
                    >
                      <h6 className="xl:text-md text-body text-white font-semibold font-nexa">
                        {card.title}
                      </h6>
                    </div>
                  );
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 grid-rows-1 col-start-1 row-start-1 place-items-center group w-fit relative isolate">
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -z-10 opacity-10 flex justify-center items-center pointer-events-none">
              <div
                ref={titleRef}
                className="flex justify-center items-center gap-8 flex-nowrap text-nowrap"
              >
                {[...Array(15)].map((_item, index) => (
                  <h3
                    key={index + 1}
                    className="font-nexa font-bold lg:text-[8.375rem] text-8xl"
                  >
                    online marketing bakery
                  </h3>
                ))}
              </div>
            </div>
            <Image
              alt="Jasmin"
              width={395}
              height={485}
              src={"/jasmin.png"}
              className="col-start-1 row-start-1 xl:translate-x-0 lg:translate-x-[47%] translate-x-[0%] xl:group-hover:translate-x-[47%] xl:rotate-0 lg:rotate-6 xl:group-hover:rotate-6 -z-10 transition-transform duration-700 lg:inline-block hidden"
            />
            <Image
              alt="John"
              width={395}
              height={485}
              src={"/john.png"}
              className="col-start-1 row-start-1 xl:translate-x-0 -translate-x-[47%] xl:group-hover:-translate-x-[47%] xl:rotate-0 -rotate-6 xl:group-hover:-rotate-6 -z-10 transition-transform duration-700 lg:inline-block hidden"
            />
            <Image
              alt="Rubin"
              width={426}
              height={524}
              src={"/rubin.png"}
              className="col-start-1 row-start-1"
            />
            <AnimatedButton
              size={"icon"}
              className="xl:opacity-0 xl:group-hover:opacity-100 xl:group-hover:translate-y-1/2 xl:translate-y-0 translate-y-1/2 duration-700 col-start-1 row-start-1 self-end"
              trailingContent={
                <span className="bg-primary size-12.75 overflow-hidden flex items-center rounded-[0.3125rem]">
                  <div className="flex justify-around min-w-25.5 -translate-x-1/2 transition-all group-hover:translate-x-0">
                    <ArrowRight color="white" />
                    <ArrowRight color="white" />
                  </div>
                </span>
              }
            >
              Meet the team!
            </AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
