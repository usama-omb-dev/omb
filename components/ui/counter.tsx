"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ReactNode, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type CounterProps = {
  prefix?: string;
  suffix?: string;
  className?: string;
  children: ReactNode;
  /**
   * When true, count up shortly after mount with no ScrollTrigger (use for above-the-fold
   * home hero stats). Default false keeps scroll-based reveal for other pages.
   */
  playOnMount?: boolean;
};

const Counter = ({
  prefix,
  suffix,
  className,
  children,
  playOnMount = false,
}: CounterProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const target = Number(children);
      if (Number.isNaN(target)) return;

      const obj = { value: 0 };
      let played = false;
      let st: ScrollTrigger | undefined;
      let ro: ResizeObserver | undefined;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const applyValue = (n: number) => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.floor(n));
        }
      };

      const play = () => {
        if (played) return;
        played = true;
        st?.kill();
        st = undefined;

        if (prefersReduced) {
          applyValue(target);
          return;
        }

        gsap.to(obj, {
          value: target,
          duration: 3,
          ease: "power1.in",
          onUpdate: () => applyValue(obj.value),
        });
      };

      if (playOnMount) {
        requestAnimationFrame(() => {
          requestAnimationFrame(play);
        });
        return () => {
          gsap.killTweensOf(obj);
        };
      }

      const tryPlayIfAlreadyInView = () => {
        if (played) return;
        ScrollTrigger.refresh();
        const rect = root.getBoundingClientRect();
        const lineY = window.innerHeight * 0.8;
        if (rect.top < lineY && rect.bottom > 0) {
          play();
        }
      };

      st = ScrollTrigger.create({
        trigger: root,
        start: "top 80%",
        once: true,
        onEnter: play,
      });

      requestAnimationFrame(() => {
        requestAnimationFrame(tryPlayIfAlreadyInView);
      });
      const t0 = window.setTimeout(tryPlayIfAlreadyInView, 0);
      const t1 = window.setTimeout(tryPlayIfAlreadyInView, 350);
      window.addEventListener("load", tryPlayIfAlreadyInView);

      ro = new ResizeObserver(() => tryPlayIfAlreadyInView());
      ro.observe(root);

      return () => {
        window.removeEventListener("load", tryPlayIfAlreadyInView);
        window.clearTimeout(t0);
        window.clearTimeout(t1);
        ro?.disconnect();
        st?.kill();
        gsap.killTweensOf(obj);
      };
    },
    {
      dependencies: [children, playOnMount],
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={rootRef}
      className={`lg:text-xl text-md font-bold leading-none ${className}`}
    >
      {prefix}
      <span ref={counterRef}>0</span>
      {suffix}
    </div>
  );
};

export default Counter;
