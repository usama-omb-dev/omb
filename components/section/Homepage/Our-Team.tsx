"use client";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { ArrowRight } from "@/components/ui/icons";
import Pill from "@/components/ui/pill";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const OurTeam = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<null | HTMLDivElement>(null);

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
      if (cardsRef.current == null || containerRef.current == null) return;
      cardsRef.current.map((item, index) => {
        gsap.to(item, {
          x:
            (index + 1) % 2 == 0
              ? index + 1 > 2 && index + 1 < 7
                ? 440
                : 220
              : index + 1 > 2 && index + 1 < 7
                ? -440
                : -220,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            toggleActions: "play reverse play reverse",
          },
        });
      });
      console.log("cardsRef", cardsRef);
    },
    { scope: containerRef },
  );

  return (
    <section className="py-37.5">
      <div className="flex flex-col gap-38">
        <div className="container">
          <div className="flex items-center gap-27.5">
            <div className="max-w-110">
              <Pill iconColor="#3838F9" className="text-primary">
                Meet the team
              </Pill>
              <h3 className="text-2xl font-medium leading-none">
                Your own team of world class B2B{" "}
                <span className="text-primary">marketing experts.</span>
              </h3>
            </div>
            <p className="text-body max-w-134">
              Quality has no postcode. We build teams with the best specialists,
              no matter where they are. Remote work allows us to use top talent,
              with Rubin, owner of OMB, as your dedicated project manager.
            </p>
          </div>
        </div>
        <div
          ref={containerRef}
          className="relative grid grid-cols-1 place-items-center"
        >
          <div className="flex flex-col gap-48 z-30 pointer-events-none col-start-1 row-start-1">
            <div className="grid grid-cols-2">
              {cards.map((card, index) => {
                if (index <= 3)
                  return (
                    <div
                      key={index}
                      ref={setCardRef}
                      className="bg-primary flex justify-center items-center w-50.5 h-50.5 rounded-[0.3125rem]"
                    >
                      <h6 className="text-md text-white font-semibold font-nexa">
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
                      className="bg-primary flex justify-center items-center w-50.5 h-50.5 rounded-[0.3125rem]"
                    >
                      <h6 className="text-md text-white font-semibold font-nexa">
                        {card.title}
                      </h6>
                    </div>
                  );
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 grid-rows-1 col-start-1 row-start-1 place-items-center group w-fit">
            <Image
              alt="Jasmin"
              width={395}
              height={485}
              src={"/jasmin.png"}
              className="col-start-1 row-start-1 group-hover:translate-x-[47%] group-hover:rotate-6 -z-10 transition-transform duration-700"
            />
            <Image
              alt="John"
              width={395}
              height={485}
              src={"/john.png"}
              className="col-start-1 row-start-1 group-hover:-translate-x-[47%] group-hover:-rotate-6 -z-10 transition-transform duration-700"
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
              className="opacity-0 group-hover:opacity-100 group-hover:translate-y-1/2 duration-700 col-start-1 row-start-1 self-end"
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
