import Image from "next/image";
import AnimatedButton from "../ui/button/AnimatedButton";
import { ArrowRight } from "../ui/icons";

const BakeResult = () => {
  return (
    <section className="pt-37.5">
      <div className="bg-[#00001D] pt-25 pb-35 rounded-tl-[3.75rem] rounded-tr-[3.75rem] relative isolate overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat -z-10 animate-footer-rays"
          style={{ backgroundImage: "url(/footer-rays.png)" }}
        />
        <div className="container flex flex-col gap-11">
          <h3 className="text-4xl text-white leading-none font-medium text-center">
            We bake results that{" "}
            <span className="block italic">taste like more</span>
          </h3>
          <div className="grid grid-cols-1 grid-rows-1 col-start-1 row-start-1 place-items-center w-fit relative isolate mx-auto">
            <Image
              alt="John"
              width={310}
              height={375}
              src={"/happy-john.png"}
              className="rounded-[0.625rem] col-start-1 row-start-1 -z-10 -rotate-[3.78deg]"
            />
            <Image
              alt="Rubin"
              width={310}
              height={375}
              src={"/happy-rubin.png"}
              className="rounded-[0.625rem] col-start-1 row-start-1 rotate-[3.78deg]"
            />
            <AnimatedButton
              size={"icon"}
              className=" translate-y-1/2 duration-700 col-start-1 row-start-1 self-end"
              trailingContent={
                <span className="bg-primary size-12.75 overflow-hidden flex items-center rounded-[0.3125rem]">
                  <div className="flex justify-around min-w-25.5 -translate-x-1/2 transition-all group-hover:translate-x-0">
                    <ArrowRight color="white" />
                    <ArrowRight color="white" />
                  </div>
                </span>
              }
            >
              Let’s talk!
            </AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BakeResult;
