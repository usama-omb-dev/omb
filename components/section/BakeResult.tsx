"use client";
import Image from "next/image";
import AnimatedButton from "../ui/button/AnimatedButton";
import AnimatedArrowIcon from "../ui/button/AnimatedArrowIcon";
import { usePathname } from "next/navigation";

const BakeResult = () => {
  const pathName = usePathname();
  const currentPath = pathName.split("/")[1];
  if (currentPath === "contact") return;
  return (
    <section
      className={`lg:pt-37.5 pt-10 ${currentPath === "blogs" ? "" : ""}`}
    >
      <div className="bg-[#00001D] sm:pt-25 pt-12 sm:pb-35 pb-20 sm:rounded-tl-[3.75rem] rounded-tl-[1.875rem] sm:rounded-tr-[3.75rem] rounded-tr-[1.875rem] relative isolate overflow-hidden">
        <div
          className="absolute top-0 lg:left-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10 animate-footer-rays"
          style={{ backgroundImage: "url(/footer-rays.png)" }}
        />
        <div className="container flex flex-col gap-11">
          <h3 className="lg:text-4xl sm:text-2xl text-lg text-white leading-none font-medium text-center">
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
              trailingContent={<AnimatedArrowIcon />}
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
