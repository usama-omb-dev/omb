"use client";
import { Button } from "@/components/ui/button";
import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { ArrowRight } from "@/components/ui/icons";
import Pill from "@/components/ui/pill";
import TextReveal from "@/components/ui/TextReveal";
// import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const imgRef = useRef<null | HTMLImageElement>(null);
  const mainRef = useRef<null | HTMLDivElement>(null);
  // useGSAP(
  //   () => {
  //     if (imgRef.current == null || mainRef.current == null) return;
  //     gsap.to(imgRef.current, {
  //       y: 200,
  //       scrollTrigger: {
  //         trigger: mainRef.current,
  //         start: "top top",
  //         end: "200% bottom",
  //         scrub: true,
  //       },
  //     });
  //   },
  //   { scope: imgRef },
  // );
  return (
    // <section
    //   ref={mainRef}
    //   className="relative isolate min-h-screen flex flex-col justify-end pb-16 pt-34 overflow-hidden"
    // >
    //   <div
    //     className="absolute -top-1/6 -left-1/7 w-1/2 2xl:blur-none blur-xl h-[120%] bg-cover bg-no-repeat -z-10 animate-rays"
    //     style={{ backgroundImage: "url(/hero-rays.png)" }}
    //   />
    //   <Image
    //     ref={imgRef}
    //     alt="Hero Image"
    //     width={1440}
    //     height={1024}
    //     src={"/hero-img.png"}
    //     className="w-screen h-full absolute top-0 left-0 object-cover -z-20 pointer-events-none"
    //   />
    //   <div className="container">
    //     <div className="grid lg:grid-cols-5 items-end lg:gap-0 gap-8">
    //       <div className=" sm:col-span-3 xl:pr-40 sm:pr-20 flex flex-col xl:gap-7.5 gap-3 items-start">
    //         <Pill className="text-white">B2B Marketing Agency</Pill>
    //         <h1 className="xl:text-4xl sm:text-3xl text-2xl text-white leading-none">
    //           <TextReveal>
    //             We build brands people keep coming back for.
    //           </TextReveal>
    //         </h1>
    //         <p className="sm:text-body text-xsm text-white">
    //           {`Together we bake campaigns that make your audience hungry. We help
    //           you take a position customers choose and competitors lose sleep
    //           over.`}
    //         </p>

    //         <AnimatedButton
    //           size={"icon"}
    //           trailingContent={<AnimatedArrowIcon />}
    //         >
    //           Dat smaakt naar meer
    //         </AnimatedButton>
    //       </div>
    //       <div className=" sm:col-span-2">
    //         <div className="bg-white p-2.5 rounded-[0.3125rem] flex items-center xl:gap-6 gap-3 max-w-fit">
    //           <div className="flex flex-col justify-between sm:gap-12 gap-4">
    //             <h4 className="sm:text-lg text-body font-medium sm:leading-7 leading-none max-w-46.5">
    //               {`68% increase in conversion rates with the new design.`}
    //             </h4>
    //             <Image
    //               alt="Mockup"
    //               width={138}
    //               height={34}
    //               src={"/stobe-logo.png"}
    //             />
    //           </div>
    //           <div className="relative group">
    //             <Image
    //               alt="Mockup"
    //               width={196}
    //               height={206}
    //               src={"/hero_laptop-mockup.png"}
    //             />
    //             <Button className=" max-w-10 w-10 h-10 rounded-[0.3125rem] absolute bottom-2.5 right-2.5 p-5">
    //               <span className="-rotate-45 group-hover:rotate-0 transition-transform">
    //                 <ArrowRight color="#000" />
    //               </span>
    //             </Button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="p-3">
      <div
        style={{ backgroundImage: "url(/gradient-bg-hero.png)" }}
        className="bg-cover bg-no-repeat bg-center"
      >
        <div className="container md:pt-[166px] pt-[100px] pb-[70px]">
          <div className="flex lg:flex-row flex-col 2xl:gap-42 lg:gap-3 gap-5 ">
            <div className=" flex flex-col xl:gap-5 gap-3 items-start">
              <Pill iconColor="#3838F9" className="text-primary">
                B2B Marketing Agency
              </Pill>
              <h1 className="xl:text-4xl sm:text-[3.25rem] text-2xl font-medium text-black leading-none">
                <TextReveal>
                  We build Brands People keep Coming Back For.
                </TextReveal>
              </h1>
              <p className="sm:text-body text-xsm text-black mt-2.5">
                {`Together we bake campaigns that make your audience hungry. We help
               you take a position customers choose and competitors lose sleep
               over.`}
              </p>

              <AnimatedButton
                className="mt-2.5"
                size={"icon"}
                trailingContent={<AnimatedArrowIcon />}
              >
                Dat smaakt naar meer
              </AnimatedButton>
              <div className="flex sm:flex-row sm:gap-0 gap-2 flex-col items-center md:mt-7.5">
                <div className="flex">
                  <Image
                    src="/avatar-1.png"
                    alt="Avatar 1"
                    width={56}
                    height={56}
                  />
                  <Image
                    src="/avatar-2.png"
                    alt="Avatar 2"
                    width={56}
                    height={56}
                    className="-translate-x-[16px]"
                  />
                  <Image
                    src="/avatar-3.png"
                    alt="Avatar 3"
                    width={56}
                    height={56}
                    className="-translate-x-[32px]"
                  />
                  <Image
                    src="/avatar-4.png"
                    alt="Avatar 4"
                    width={56}
                    height={56}
                    className="-translate-x-[48px]"
                  />
                </div>
                <div className="flex flex-col sm:-translate-x-[38px]">
                  <div className="flex gap-1">
                    <Image
                      src="/star.svg"
                      alt="Avatar 1"
                      width={18}
                      height={18}
                    />
                    <Image
                      src="/star.svg"
                      alt="Avatar 1"
                      width={18}
                      height={18}
                    />
                    <Image
                      src="/star.svg"
                      alt="Avatar 1"
                      width={18}
                      height={18}
                    />
                    <Image
                      src="/star.svg"
                      alt="Avatar 1"
                      width={18}
                      height={18}
                    />
                    <Image
                      src="/star.svg"
                      alt="Avatar 1"
                      width={18}
                      height={18}
                    />
                    <h6 className="font-bold text-base ml-1.5">4.8/5</h6>
                  </div>
                  <span className="text-body text-black">
                    Trusted 1000+ Businesses
                  </span>
                </div>
              </div>
            </div>
            <div className="max-w-[521px] w-full relative isolate ">
              <Image
                src="/hero-image.png"
                alt="Hero Image"
                width={1440}
                height={1024}
                className="md:min-h-auto min-h-[450px] w-full object-cover rounded-[10px] overflow-hidden"
              />
              <div className="bg-white rounded-[5px] sm:p-6 p-4 flex flex-col xl:gap-8 gap-4 md:max-w-[368px] absolute md:bottom-[70px] md:left-unset left-5 md:right-unset right-5 bottom-5 xl:-translate-x-1/2 lg:-translate-x-1/3 md:translate-x-[98%]">
                <p className="text-xsm text-black">
                  Rubin and his team are all top performers in their field. We
                  have been working together for two years now and are still
                  amazed by their daily flexibility, speed and quality.
                </p>
                <div className="flex items-center gap-2">
                  <Image
                    src="/vincent.png"
                    alt="Avatar 1"
                    width={34}
                    height={34}
                  />
                  <div className="flex flex-col">
                    <h6 className="font-medium leading-tight text-base">
                      Vincent De Geyndt
                    </h6>
                    <span className="text-[12px] text-primary leading-tight">
                      SalesUp
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
