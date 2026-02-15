"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import AnimatedSplit, {
  AnimatedSplitHandle,
} from "@/components/ui/button/AnimatedSplit";
import { useRef } from "react";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
// import AnimatedButton from "@/components/ui/AnimatedButton";

export default function page() {
  const textRef = useRef<AnimatedSplitHandle>(null);
  const textRef1 = useRef<AnimatedSplitHandle>(null);
  const textRef2 = useRef<AnimatedSplitHandle>(null);

  return (
    <>
      <div className="container bg-white h-screen flex justify-center items-start flex-col">
        <h1 className="text-5xl">text-5xl - 84px</h1>
        <h2 className="text-4xl italic">text-4xl - 74px</h2>
        <h3 className="text-3xl">text-3xl - 64px</h3>
        <h4 className="text-2xl">text-2xl - 44px</h4>
        <h5 className="text-xl">text-xl - 32px</h5>
        <h6 className="text-lg">text-lg - 28px</h6>
        <h6 className="text-md">text-md - 24px</h6>
        <h6 className="text-sm">text-sm - 16px</h6>
        <h6 className="text-xsm">text-xsm - 14px</h6>
        <p className="text-body">text-body - 18px</p>
        <div className="bg-primary p-8">
          <p className="text-body text-muted">Paragraph</p>
        </div>
        <div className="bg-secondary p-8">
          <p className="text-body text-muted">Paragraph</p>
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
            className=""
          >
            Primary Action
          </AnimatedButton>
        </div>
      </div>
      <Button
        size="icon"
        className="bg-gray-500 group relative"
        onMouseEnter={() => textRef2.current?.play()}
        onMouseLeave={() => textRef2.current?.reverse()}
        onFocus={() => textRef2.current?.play()}
        onBlur={() => textRef2.current?.reverse()}
      >
        <AnimatedSplit ref={textRef2}>Dat smaakt naar meer</AnimatedSplit>

        <span className="bg-primary size-12.75 overflow-hidden flex items-center rounded-[0.3125rem]">
          <div className="flex justify-around min-w-25.5 -translate-x-1/2 transition-all group-hover:translate-x-0">
            <ArrowRight color="white" />
            <ArrowRight color="white" />
          </div>
        </span>
      </Button>
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
        className="title"
      >
        Primary Action
      </AnimatedButton>
    </>
  );
}
