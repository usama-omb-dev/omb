"use client";
import { Button } from "@/components/ui/button";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { ArrowRight } from "@/components/ui/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { useRef } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import Counter from "@/components/ui/counter";

const Insights = () => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section className="pt-50 overflow-hidden">
      <div className="container flex flex-col gap-20">
        <div className="flex justify-between gap-34">
          <h3 className="text-2xl font-medium leading-none max-w-152.25">
            <span className="text-primary">68 percent increase</span> in
            conversion rates with the new design.
          </h3>
          <div className="max-w-79 flex flex-col items-start gap-7.5">
            <p className="text-body">
              If everything was going great, you would not be here right now.
              Our clients understand that. They hire us for expertise and accept
              the discussion that comes with it. Because politely continuing
              what does not work will cost you dearly.
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
            slidesPerView={3}
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
            onSlideChange={(swiper) => {
              prevRef.current!.disabled = swiper.isBeginning;
              nextRef.current!.disabled = swiper.isEnd;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            className="mySwiper"
          >
            <SwiperSlide className="">
              <div className="bg-white p-7.5 pb-5 rounded-[0.3125rem] min-h-115.75 flex flex-col justify-between items-start">
                <Image
                  alt={"Stobe Logo"}
                  width={138}
                  height={34}
                  src={"/stobe-logo.png"}
                />
                <p className="text-body">
                  Custom Shopify store, SEO strategy and Meta ads framework. The
                  result? 300 percent growth in traffic and 20 percent higher
                  conversion. This is how you turn a store into a sales machine.
                </p>
                <div className="w-full flex justify-between items-center gap-3.5">
                  <div className="flex-1 p-2.5 bg-secondary rounded-[0.3125rem] flex flex-col items-start gap-5">
                    <h6 className="text-xsm leading-none">Site Traffic</h6>
                    <Counter prefix="" suffix="%" className="">
                      300
                    </Counter>
                  </div>
                  <div className="flex-1 p-2.5 bg-secondary rounded-[0.3125rem] flex flex-col items-start gap-5">
                    <h6 className="text-xsm leading-none">Site Traffic</h6>
                    <Counter prefix="" suffix="%" className="">
                      300
                    </Counter>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white p-7.5 pb-5 rounded-[0.3125rem] min-h-115.75 flex flex-col justify-between items-start">
                <Image
                  alt={"Stobe Logo"}
                  width={138}
                  height={34}
                  src={"/stobe-logo.png"}
                />
                <p className="text-body">
                  Custom Shopify store, SEO strategy and Meta ads framework. The
                  result? 300 percent growth in traffic and 20 percent higher
                  conversion. This is how you turn a store into a sales machine.
                </p>
                <div className="w-full flex justify-between items-center gap-3.5">
                  <div className="flex-1 p-2.5 bg-secondary rounded-[0.3125rem] flex flex-col items-start gap-5">
                    <h6 className="text-xsm leading-none">Site Traffic</h6>
                    <Counter prefix="" suffix="%" className="">
                      300
                    </Counter>
                  </div>
                  <div className="flex-1 p-2.5 bg-secondary rounded-[0.3125rem] flex flex-col items-start gap-5">
                    <h6 className="text-xsm leading-none">Site Traffic</h6>
                    <Counter prefix="" suffix="%" className="">
                      300
                    </Counter>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white p-7.5 pb-5 rounded-[0.3125rem] min-h-115.75 flex flex-col justify-between items-start">
                <Image
                  alt={"Stobe Logo"}
                  width={138}
                  height={34}
                  src={"/stobe-logo.png"}
                />
                <p className="text-body">
                  Custom Shopify store, SEO strategy and Meta ads framework. The
                  result? 300 percent growth in traffic and 20 percent higher
                  conversion. This is how you turn a store into a sales machine.
                </p>
                <div className="w-full flex justify-between items-center gap-3.5">
                  <div className="flex-1 p-2.5 bg-secondary rounded-[0.3125rem] flex flex-col items-start gap-5">
                    <h6 className="text-xsm leading-none">Site Traffic</h6>
                    <Counter prefix="" suffix="%" className="">
                      300
                    </Counter>
                  </div>
                  <div className="flex-1 p-2.5 bg-secondary rounded-[0.3125rem] flex flex-col items-start gap-5">
                    <h6 className="text-xsm leading-none">Site Traffic</h6>
                    <Counter prefix="" suffix="%" className="">
                      300
                    </Counter>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white p-7.5 pb-5 rounded-[0.3125rem] min-h-115.75 flex flex-col justify-between items-start">
                <Image
                  alt={"Stobe Logo"}
                  width={138}
                  height={34}
                  src={"/stobe-logo.png"}
                />
                <p className="text-body">
                  Custom Shopify store, SEO strategy and Meta ads framework. The
                  result? 300 percent growth in traffic and 20 percent higher
                  conversion. This is how you turn a store into a sales machine.
                </p>
                <div className="w-full flex justify-between items-center gap-3.5">
                  <div className="flex-1 p-2.5 bg-secondary rounded-[0.3125rem] flex flex-col items-start gap-5">
                    <h6 className="text-xsm leading-none">Site Traffic</h6>
                    <Counter prefix="" suffix="%" className="">
                      300
                    </Counter>
                  </div>
                  <div className="flex-1 p-2.5 bg-secondary rounded-[0.3125rem] flex flex-col items-start gap-5">
                    <h6 className="text-xsm leading-none">Site Traffic</h6>
                    <Counter prefix="" suffix="%" className="">
                      300
                    </Counter>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white p-7.5 pb-5 rounded-[0.3125rem] min-h-115.75 flex flex-col justify-between items-start">
                <Image
                  alt={"Stobe Logo"}
                  width={138}
                  height={34}
                  src={"/stobe-logo.png"}
                />
                <p className="text-body">
                  Custom Shopify store, SEO strategy and Meta ads framework. The
                  result? 300 percent growth in traffic and 20 percent higher
                  conversion. This is how you turn a store into a sales machine.
                </p>
                <div className="w-full flex justify-between items-center gap-3.5">
                  <div className="flex-1 p-2.5 bg-secondary rounded-[0.3125rem] flex flex-col items-start gap-5">
                    <h6 className="text-xsm leading-none">Site Traffic</h6>
                    <Counter prefix="" suffix="%" className="">
                      300
                    </Counter>
                  </div>
                  <div className="flex-1 p-2.5 bg-secondary rounded-[0.3125rem] flex flex-col items-start gap-5">
                    <h6 className="text-xsm leading-none">Site Traffic</h6>
                    <Counter prefix="" suffix="%" className="">
                      300
                    </Counter>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white p-7.5 pb-5 rounded-[0.3125rem] min-h-115.75 flex flex-col justify-between items-start">
                <Image
                  alt={"Stobe Logo"}
                  width={138}
                  height={34}
                  src={"/stobe-logo.png"}
                />
                <p className="text-body">
                  Custom Shopify store, SEO strategy and Meta ads framework. The
                  result? 300 percent growth in traffic and 20 percent higher
                  conversion. This is how you turn a store into a sales machine.
                </p>
                <div className="w-full flex justify-between items-center gap-3.5">
                  <div className="flex-1 p-2.5 bg-secondary rounded-[0.3125rem] flex flex-col items-start gap-5">
                    <h6 className="text-xsm leading-none">Site Traffic</h6>
                    <Counter prefix="" suffix="%" className="">
                      300
                    </Counter>
                  </div>
                  <div className="flex-1 p-2.5 bg-secondary rounded-[0.3125rem] flex flex-col items-start gap-5">
                    <h6 className="text-xsm leading-none">Site Traffic</h6>
                    <Counter prefix="" suffix="%" className="">
                      300
                    </Counter>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white p-7.5 pb-5 rounded-[0.3125rem] min-h-115.75 flex flex-col justify-between items-start">
                <Image
                  alt={"Stobe Logo"}
                  width={138}
                  height={34}
                  src={"/stobe-logo.png"}
                />
                <p className="text-body">
                  Custom Shopify store, SEO strategy and Meta ads framework. The
                  result? 300 percent growth in traffic and 20 percent higher
                  conversion. This is how you turn a store into a sales machine.
                </p>
                <div className="w-full flex justify-between items-center gap-3.5">
                  <div className="flex-1 p-2.5 bg-secondary rounded-[0.3125rem] flex flex-col items-start gap-5">
                    <h6 className="text-xsm leading-none">Site Traffic</h6>
                    <Counter prefix="" suffix="%" className="">
                      300
                    </Counter>
                  </div>
                  <div className="flex-1 p-2.5 bg-secondary rounded-[0.3125rem] flex flex-col items-start gap-5">
                    <h6 className="text-xsm leading-none">Site Traffic</h6>
                    <Counter prefix="" suffix="%" className="">
                      300
                    </Counter>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white p-7.5 pb-5 rounded-[0.3125rem] min-h-115.75 flex flex-col justify-between items-start">
                <Image
                  alt={"Stobe Logo"}
                  width={138}
                  height={34}
                  src={"/stobe-logo.png"}
                />
                <p className="text-body">
                  Custom Shopify store, SEO strategy and Meta ads framework. The
                  result? 300 percent growth in traffic and 20 percent higher
                  conversion. This is how you turn a store into a sales machine.
                </p>
                <div className="w-full flex justify-between items-center gap-3.5">
                  <div className="flex-1 p-2.5 bg-secondary rounded-[0.3125rem] flex flex-col items-start gap-5">
                    <h6 className="text-xsm leading-none">Site Traffic</h6>
                    <Counter prefix="" suffix="%" className="">
                      300
                    </Counter>
                  </div>
                  <div className="flex-1 p-2.5 bg-secondary rounded-[0.3125rem] flex flex-col items-start gap-5">
                    <h6 className="text-xsm leading-none">Site Traffic</h6>
                    <Counter prefix="" suffix="%" className="">
                      300
                    </Counter>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white p-7.5 pb-5 rounded-[0.3125rem] min-h-115.75 flex flex-col justify-between items-start">
                <Image
                  alt={"Stobe Logo"}
                  width={138}
                  height={34}
                  src={"/stobe-logo.png"}
                />
                <p className="text-body">
                  Custom Shopify store, SEO strategy and Meta ads framework. The
                  result? 300 percent growth in traffic and 20 percent higher
                  conversion. This is how you turn a store into a sales machine.
                </p>
                <div className="w-full flex justify-between items-center gap-3.5">
                  <div className="flex-1 p-2.5 bg-secondary rounded-[0.3125rem] flex flex-col items-start gap-5">
                    <h6 className="text-xsm leading-none">Site Traffic</h6>
                    <Counter prefix="" suffix="%" className="">
                      300
                    </Counter>
                  </div>
                  <div className="flex-1 p-2.5 bg-secondary rounded-[0.3125rem] flex flex-col items-start gap-5">
                    <h6 className="text-xsm leading-none">Site Traffic</h6>
                    <Counter prefix="" suffix="%" className="">
                      300
                    </Counter>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Insights;
