"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ReactNode, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Counter = ({
  prefix,
  suffix,
  className,
  children,
}: {
  prefix?: string;
  suffix?: string;
  className?: string;
  children: ReactNode;
}) => {
  const counterRef = useRef<null | HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!counterRef.current) return;

      const target = Number(children); // convert children to number
      const obj = { value: 0 };

      gsap.to(obj, {
        value: target,
        duration: 3,
        ease: "power1.in",
        scrollTrigger: {
          trigger: counterRef.current,
          start: "top 80%",
        },
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.floor(obj.value).toString();
          }
        },
      });
    },
    { scope: counterRef },
  );

  return (
    <div className={`text-xl font-bold leading-none ${className}`}>
      {prefix}
      <span ref={counterRef}>0</span>
      {suffix}
    </div>
  );
};

export default Counter;
