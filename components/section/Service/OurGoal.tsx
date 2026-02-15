"use client";
import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import Pill from "@/components/ui/pill";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "@/components/ui/icons";

interface Milestone {
  year: number;
  title: string;
  imgUrl: string;
  card: boolean;
  rotate?: `${number}deg`;
}

const OurGoal = () => {
  const swiperWrapperRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const milestoneData: Milestone[] = [
    {
      year: 2018,
      title: "Rubin started the Onine Marketing Bakery in Roermond.",
      imgUrl: "/young-rubin.png",
      card: true,
      rotate: "0deg",
    },
    {
      year: 2019,
      title: "Grew the OMB team to 4 members.",
      imgUrl: "/grew-team.png",
      card: false,
    },
    {
      year: 2019,
      title: "Moved to our first big office with the team!",
      imgUrl: "/new-office.png",
      card: true,
      rotate: "4deg",
    },
    {
      year: 2019,
      title: "Word started getting around",
      imgUrl: "/getting-known.png",
      card: false,
    },
  ];

  useEffect(() => {
    const wrapper = swiperWrapperRef.current;
    const cursor = cursorRef.current;

    if (!wrapper || !cursor) return;

    let isInside = false;
    let lastX = 0;
    let rotation = 0;

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
    });

    let mouseX = 0;
    let mouseY = 0;

    const moveCursor = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isInside) return;

      const deltaX = e.clientX - lastX;
      lastX = e.clientX;

      rotation = deltaX * 5;
      rotation = gsap.utils.clamp(-20, 25, rotation);

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        rotate: rotation,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const enter = () => {
      isInside = true;
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const leave = () => {
      isInside = false;
      gsap.to(cursor, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      });
    };

    const handleScroll = () => {
      if (!wrapper) return;

      const bounds = wrapper.getBoundingClientRect();

      const isMouseInside =
        mouseX >= bounds.left &&
        mouseX <= bounds.right &&
        mouseY >= bounds.top &&
        mouseY <= bounds.bottom;

      if (isMouseInside) {
        isInside = true;
        gsap.set(cursor, {
          x: mouseX,
          y: mouseY,
        });

        gsap.to(cursor, {
          scale: 1,
          opacity: 1,
          duration: 0.2,
        });
      } else {
        isInside = false;

        gsap.to(cursor, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
        });
      }
    };

    wrapper.addEventListener("pointerenter", enter);
    wrapper.addEventListener("pointerleave", leave);
    window.addEventListener("pointermove", moveCursor);
    window.addEventListener("scroll", handleScroll);

    return () => {
      wrapper.removeEventListener("pointerenter", enter);
      wrapper.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="sm:py-35 py-10 relative isolate overflow-hidden">
      <div className="container">
        <div className="flex md:flex-row flex-col items-start md:gap-5 gap-3">
          <div className="lg:max-w-50 max-w-40 w-full">
            <Pill iconColor="#3838F9">Who we are</Pill>
          </div>
          <div className="flex-1 flex flex-col gap-10">
            <h5 className="lg:text-2xl sm:text-xl text-md font-medium text-black/40 leading-none">
              <span className="text-black">A B2B marketing agency</span> built
              for companies that are done playing it safe.{" "}
              <span className="text-black">Since 2018,</span> we have been
              helping brands turn marketing from a cost into a growth engine.
              Not by following trends or copying competitors, but by{" "}
              <span className="text-black">
                making clear choices and standing behind them.
              </span>
            </h5>
            <div className="relative flex justify-between items-start flex-1 gap-4 sm:flex-row flex-col pb-4 sm:pb-0">
              <AnimatedButton
                size={"icon"}
                trailingContent={<AnimatedArrowIcon />}
              >
                Work at OMB!
              </AnimatedButton>
              <Image
                src={"/omb-small-fam.png"}
                alt="omb-favicon"
                width={206}
                height={218}
              />
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-start md:gap-5 gap-3">
          <div className="lg:max-w-50 max-w-40 w-full">
            <Pill iconColor="#3838F9">Our milestones</Pill>
          </div>
          <div className="max-w-136.5 flex flex-col gap-5">
            <h5 className="lg:text-2xl sm:text-xl text-md font-medium  leading-none">
              On a mission to become the world’s #1 B2B{" "}
              <span className="text-primary">marketing agency</span>
            </h5>
            <p className="sm:text-body text-xsm">
              We did not get here by following the crowd. From day one, OMB was
              built around one belief: marketing should perform, or it should
              change. Every milestone marks a decision to raise the bar,
              challenge the obvious, and keep pushing forward.
            </p>
          </div>
        </div>
        <div
          ref={swiperWrapperRef}
          className="sm:mt-20 mt-10 relative cursor-none"
        >
          <div
            ref={cursorRef}
            className="lg:block hidden fixed top-0 left-0 z-9999 pointer-events-none opacity-0 scale-0"
          >
            <div className=" w-44.25 h-44.25 rounded-full bg-linear-to-t from-[#212193] to-[#3838F9] text-white flex items-center justify-center text-body font-bold gap-2.5 uppercase">
              Sleuren <ArrowRight />
            </div>
          </div>

          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            modules={[Navigation, Autoplay]}
            className="overflow-visible!"
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 0,
              },
              1536: {
                slidesPerView: 3.5,
                spaceBetween: 0,
              },
            }}
          >
            {milestoneData.map((item, index) => (
              <SwiperSlide key={index + 1} className="overflow-visible!">
                <div className="xl:min-h-115.75 flex flex-col justify-between items-center relative">
                  <h4 className="text-5xl text-black/20 leading-none relative sm:pb-48.5 pb-34">
                    {item.year}
                    <span className="absolute -z-10 w-7 h-7 rounded-full  left-1/2 -translate-x-1/2 top-24 bg-linear-to-t from-[#212193] to-[#3838F9] before:absolute before:top-[calc(100%+20px)] before:left-1/2 before:w-px before:h-37.5 before:bg-black/40" />
                  </h4>
                  {index === milestoneData.length - 1 ? null : (
                    <div className="absolute -z-10 top-2/5 right-0 translate-x-1/2">
                      <Image
                        alt="Grid Lines"
                        src={"/grid-lines.png"}
                        width={245}
                        height={196}
                      />
                    </div>
                  )}
                  <div
                    className={`flex flex-col ${item.rotate ? `rotate-[${item.rotate}]` : ""} ${item.card ? "bg-white p-5 rounded-[0.3125rem] shadow-[0px_10px_20px_rgba(0,0,0,0.05)] gap-7.5" : "gap-3.5 text-center"}`}
                    style={{
                      transform: item.rotate
                        ? `rotate(${item.rotate})`
                        : undefined,
                    }}
                  >
                    <Image
                      src={item.imgUrl}
                      alt={item.year.toString()}
                      width={item.card ? 261 : 302}
                      height={item.card ? 242 : 340}
                      className={`${item.card ? "rounded-[0.625rem]" : ""}`}
                    />
                    <h6 className="text-md max-w-65.25 leading-none">
                      {item.title}
                    </h6>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Image
        src={"/omb-favicon.png"}
        alt="omb-favicon"
        width={360}
        height={509}
        className="absolute top-0 right-0 opacity-5 -z-10"
      />
    </section>
  );
};

export default OurGoal;
