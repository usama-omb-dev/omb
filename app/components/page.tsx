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
      <div className="container bg-white">
        <h1 className="text-5xl">Hello World 1</h1>
        <h2 className="text-4xl italic">Hello World 2</h2>
        <h3 className="text-3xl">Hello World 3</h3>
        <h4 className="text-2xl">Hello World 4</h4>
        <h5 className="text-xl">Hello World 5</h5>
        <h6 className="text-lg">Hello World 6</h6>
        <h6 className="text-md">Supporting Heading</h6>
        <h6 className="text-sm">Supporting Heading 2</h6>
        <h6 className="text-xsm">Supporting Heading 3</h6>
        <p className="text-body">Paragraph</p>
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
