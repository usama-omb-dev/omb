"use client";
import { Button } from "@/components/ui/button";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { ArrowRight } from "@/components/ui/icons";
import Pill from "@/components/ui/pill";
import TextReveal from "@/components/ui/TextReveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const imgRef = useRef<null | HTMLImageElement>(null);
  const mainRef = useRef<null | HTMLDivElement>(null);
  useGSAP(
    () => {
      if (imgRef.current == null || mainRef.current == null) return;
      gsap.to(imgRef.current, {
        y: 200,
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "200% bottom",
          scrub: true,
        },
      });
    },
    { scope: imgRef },
  );
  return (
    <section
      ref={mainRef}
      className="relative isolate h-screen flex flex-col justify-end pb-16 overflow-hidden"
    >
      <div
        className="absolute -top-1/6 -left-1/7 w-1/2 h-[120%] bg-cover bg-no-repeat -z-10 animate-rays"
        style={{ backgroundImage: "url(/hero-rays.png)" }}
      />
      <Image
        ref={imgRef}
        alt="Hero Image"
        width={1440}
        height={1024}
        src={"/hero-img.png"}
        className="w-screen h-full absolute top-0 left-0 object-cover -z-20 pointer-events-none"
      />
      <div className="container">
        <div className="grid grid-cols-5 items-end">
          <div className=" col-span-3 pr-40 flex flex-col gap-7.5 items-start">
            <Pill className="text-white">B2B Marketing Agency</Pill>
            <h1 className="text-4xl text-white">
              <TextReveal>
                We build brands people keep coming back for.
              </TextReveal>
            </h1>
            <p className="text-body text-white">
              {`Together we bake campaigns that make your audience hungry. We help
              you take a position customers choose and competitors lose sleep
              over.`}
            </p>

            <AnimatedButton
              size={"icon"}
              trailingContent={
                <span className="bg-primary size-12.75 overflow-hidden flex items-center rounded-[0.3125rem]">
                  <div className="flex justify-around min-w-25.5 -translate-x-1/2 transition-all group-hover:translate-x-0">
                    <ArrowRight color="white" />
                    <ArrowRight color="white" />
                  </div>
                </span>
              }
            >
              Dat smaakt naar meer
            </AnimatedButton>
          </div>
          <div className=" col-span-2">
            <div className="bg-white p-2.5 rounded-[0.3125rem] flex items-center gap-6 max-w-fit">
              <div className="flex flex-col justify-between gap-12">
                <h4 className="text-lg font-medium leading-7 max-w-46.5">
                  {`68% increase in conversion rates with the new design.`}
                </h4>
                <Image
                  alt="Mockup"
                  width={138}
                  height={34}
                  src={"/stobe-logo.png"}
                />
              </div>
              <div className="relative group">
                <Image
                  alt="Mockup"
                  width={196}
                  height={206}
                  src={"/hero_laptop-mockup.png"}
                />
                <Button className=" max-w-10 w-10 h-10 rounded-[0.3125rem] absolute bottom-2.5 right-2.5 p-5">
                  <span className="-rotate-45 group-hover:rotate-0 transition-transform">
                    <ArrowRight color="#000" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
