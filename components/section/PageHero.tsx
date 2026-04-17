"use client";

import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const GRADIENT =
  "linear-gradient(0deg, rgba(56, 56, 249, 0.44) 0%, rgba(255, 255, 255, 0) 80%)";

function HeroBadgePlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-white p-1.5 sm:size-28 sm:p-2 md:size-32 md:p-2.5 lg:size-36 lg:p-3",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          "page-hero-ring-spin pointer-events-none absolute inset-1 z-0 flex origin-center items-center justify-center sm:inset-1.5 md:inset-2",
        )}
      >
        <Image
          src="/circle-text.svg"
          alt=""
          width={131}
          height={132}
          className="size-full max-h-full max-w-full object-contain object-center"
        />
      </div>
      <div className="relative z-10 flex size-16 items-center justify-center rounded-full bg-primary sm:size-[4.25rem] md:size-20 lg:size-[5.5rem]">
        <Image
          src="/omb-favicon.svg"
          alt=""
          width={299}
          height={502}
          className="h-7 w-auto max-h-[82%] object-contain brightness-0 invert sm:h-9 md:h-10 lg:h-11"
        />
      </div>
    </div>
  );
}

export type PageHeroProps = {
  /** next-intl namespace for copy (default `PageHero`). */
  translationNamespace?: string;
  ctaHref?: string;
  className?: string;
};

/**
 * Centered marketing hero: gradient, headline with highlighted underline,
 * description, CTA, optional floating badge, and bottom character cutouts.
 */
export default function PageHero({
  translationNamespace = "PageHero",
  ctaHref = "/contact",
  className,
}: PageHeroProps) {
  const t = useTranslations(translationNamespace);
  const sectionRef = useRef<HTMLElement>(null);
  const copyColRef = useRef<HTMLDivElement>(null);
  const desktopBadgeRef = useRef<HTMLDivElement>(null);
  const peopleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const copy = copyColRef.current;
      const desktopBadge = desktopBadgeRef.current;
      const people = peopleRef.current;
      if (!copy) return;

      const copyChildren = Array.from(copy.children);
      /** `from()` leaves `opacity: 0` inline if the tween is interrupted (e.g. Strict Mode); `fromTo` + wrapper CTA fixes “disabled” look. */
      const introTl = gsap.timeline({ delay: 0.06 });
      introTl.fromTo(
        copyChildren,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power2.out",
        },
      );
      if (desktopBadge) {
        introTl.fromTo(
          desktopBadge,
          { opacity: 0, x: 28, y: 20 },
          { opacity: 1, x: 0, y: 0, duration: 0.55, ease: "power2.out" },
          "-=0.35",
        );
      }

      let peopleTween: gsap.core.Tween | null = null;
      if (people) {
        const cols = people.querySelectorAll<HTMLElement>(":scope > div");
        if (cols.length) {
          peopleTween = gsap.fromTo(
            cols,
            { opacity: 0, y: 72 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: people,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            },
          );
        }
      }

      return () => {
        introTl.kill();
        peopleTween?.scrollTrigger?.kill();
        peopleTween?.kill();
        gsap.set(copyChildren, { clearProps: "opacity,transform" });
        if (desktopBadge)
          gsap.set(desktopBadge, { clearProps: "opacity,transform" });
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative isolate overflow-hidden pb-10 sm:pb-24",
        className,
      )}
      style={{ background: GRADIENT }}
    >
      <div
        ref={copyColRef}
        className="container relative mx-auto flex flex-col items-center justify-center gap-4 px-4 pt-30 sm:pt-40 lg:px-0"
      >
        <div
          ref={desktopBadgeRef}
          className="pointer-events-none absolute right-0 top-28 z-10 hidden lg:block xl:top-60"
        >
          <HeroBadgePlaceholder />
        </div>
        <div className="flex max-w-260 flex-col items-center gap-2 sm:gap-5">
          <h1 className="text-center text-balance text-xl font-bold leading-none text-black sm:text-3xl md:text-4xl md:nl:text-3xl lg:text-[64px] lg:leading-[1.06] lg:nl:text-4xl lg:nl:leading-tight">
            <span>{t("titleLine1")}</span>
            <span className="relative inline-block pb-1.5 text-primary sm:pb-2">
              <span className="relative z-10">{t("titleHighlight")}</span>
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1 rounded-sm bg-[#3838F9] sm:h-[5px]"
                aria-hidden
              />
            </span>
            <span>{t("titleLine2")}</span>
          </h1>
        </div>

        <p className="max-w-161.5 text-center text-xsm text-black/80 sm:text-body">
          {t("description")}
        </p>

        <div className="flex w-full justify-center">
          <AnimatedButton
            href={ctaHref}
            size="sm"
            className="border border-black/10 !h-auto !min-h-0 !gap-1.5 !px-3.5 !py-1.5 !shadow-[0px_10px_24px_0px_#7373AC29] text-xs sm:!px-4 sm:!py-2 sm:text-sm"
            trailingContent={
              <AnimatedArrowIcon tone="hero" className="[&_svg]:-rotate-45" />
            }
          >
            {t("cta")}
          </AnimatedButton>
        </div>
      </div>

      <div
        ref={peopleRef}
        className="container relative mt-4 flex min-w-0 items-end justify-center gap-0 px-2 sm:px-3 md:px-4 lg:mt-8"
      >
        {/* Below lg: wider % + higher max-h so the trio reads larger; lg+ unchanged (380 / 500 / 380). */}
        <div className="relative z-10 w-[32%] max-w-[12.5rem] shrink-0 -mr-7 sm:max-w-[14.5rem] sm:-mr-9 md:w-[32%] md:max-w-[13.5rem] md:-mr-11 md:min-w-0 md:shrink lg:w-[380px] lg:max-w-[380px] lg:shrink-0 lg:-mr-44">
          <div className="translate-y-2 sm:translate-y-3 md:translate-y-3 lg:translate-y-4">
            <Image
              src="/person-left-hero.png"
              alt={t("imageLeftAlt")}
              width={380}
              height={494}
              className="mx-auto h-auto w-full max-h-64 object-contain object-bottom sm:max-h-72 md:max-h-80 lg:max-h-none"
              sizes="(max-width: 767px) 40vw, 380px"
              priority
            />
          </div>
        </div>
        <div className="relative z-30 w-[36%] max-w-[14rem] shrink-0 -translate-y-2 sm:max-w-[17rem] sm:-translate-y-4 md:w-[36%] md:max-w-[18rem] md:-translate-y-5 md:min-w-0 md:shrink lg:w-[500px] lg:max-w-[500px] lg:shrink-0 lg:-translate-y-8">
          <Image
            src="/rubin-hero.png"
            alt={t("imageCenterAlt")}
            width={500}
            height={650}
            className="mx-auto h-auto w-full max-h-72 object-contain object-bottom sm:max-h-80 md:max-h-96 lg:max-h-none"
            sizes="(max-width: 767px) 44vw, 500px"
            priority
          />
        </div>
        <div className="relative z-10 w-[32%] max-w-[12.5rem] shrink-0 -ml-7 sm:max-w-[14.5rem] sm:-ml-9 md:w-[32%] md:max-w-[13.5rem] md:-ml-11 md:min-w-0 md:shrink lg:w-[380px] lg:max-w-[380px] lg:shrink-0 lg:-ml-44">
          <div className="translate-y-2 sm:translate-y-3 md:translate-y-3 lg:translate-y-4">
            <Image
              src="/person-right-hero.png"
              alt={t("imageRightAlt")}
              width={380}
              height={494}
              className="mx-auto h-auto w-full max-h-64 object-contain object-bottom sm:max-h-72 md:max-h-80 lg:max-h-none"
              sizes="(max-width: 767px) 40vw, 380px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
