"use client";

import {
  MARKETING_HERO_GRADIENT,
  MarketingHeroFloatingBadge,
} from "@/components/section/marketing-hero-shared";
import Counter from "@/components/ui/counter";
import { cn } from "@/lib/utils";
import { envSocialUrls, socialHref } from "@/lib/social-links";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useMemo, useRef } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useTranslations } from "next-intl";

const titleClassName =
  "text-center text-balance text-2xl font-bold leading-none text-black sm:text-3xl md:text-4xl lg:text-[56px] lg:leading-[1.06]";

type BlogsListingHeroProps = {
  className?: string;
  /** Published posts in the current language (WordPress + Polylang). */
  publishedPostCount: number;
};

export default function BlogsListingHero({
  className,
  publishedPostCount,
}: BlogsListingHeroProps) {
  const t = useTranslations("BlogHero");
  const sectionRef = useRef<HTMLElement>(null);
  const copyColRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const socialMediaLinks = useMemo(
    () => [
      { icon: <FaFacebookF />, ...socialHref(envSocialUrls.facebook) },
      { icon: <FaInstagram />, ...socialHref(envSocialUrls.instagram) },
      { icon: <FaLinkedinIn />, ...socialHref(envSocialUrls.linkedin) },
    ],
    [],
  );

  useGSAP(
    () => {
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const copy = copyColRef.current;
      const badge = badgeRef.current;
      if (!copy) return;

      const copyChildren = Array.from(copy.children);
      const introTl = gsap.timeline({ delay: 0.06 });
      introTl.fromTo(
        copyChildren,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.09,
          ease: "power2.out",
        },
      );
      if (badge) {
        introTl.fromTo(
          badge,
          { opacity: 0, x: 24, y: 16 },
          { opacity: 1, x: 0, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        );
      }

      return () => {
        introTl.kill();
        gsap.set(copyChildren, { clearProps: "opacity,transform" });
        if (badge) gsap.set(badge, { clearProps: "opacity,transform" });
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative isolate overflow-x-hidden overflow-y-visible",
        className,
      )}
      style={{ background: MARKETING_HERO_GRADIENT }}
    >
      <div className="container relative mx-auto px-4 lg:px-0">
        <div
          ref={badgeRef}
          className="pointer-events-none absolute right-0 top-32 z-10 hidden lg:block xl:top-40"
        >
          <MarketingHeroFloatingBadge />
        </div>

        <div
          ref={copyColRef}
          className="mx-auto flex max-w-260 flex-col items-center gap-3 pt-28 text-center sm:gap-5 sm:pt-40 lg:pt-44"
        >
          <p className="flex items-center justify-center gap-2 sm:gap-2.5">
            <span
              className="size-2 shrink-0 rounded-full bg-primary sm:size-2.5"
              aria-hidden
            />
            <span className="text-sm font-semibold tracking-tight text-black sm:text-base">
              {t("pill")}
            </span>
          </p>

          <h1
            className={titleClassName}
            aria-label={t("title")}
          >
            <span className="relative inline-block pb-1.5 sm:pb-2">
              <span className="text-black">{t("titlePrefix")}</span>
              <span className="text-primary">{t("titleName")}</span>
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1 rounded-sm bg-primary sm:h-[5px]"
                aria-hidden
              />
            </span>
          </h1>

          <p className="max-w-161.5 text-pretty text-xsm leading-relaxed text-black/80 sm:text-sm">
            {t("intro")}
          </p>
        </div>

        <div className="relative mx-auto mt-8 w-full min-w-0 sm:mt-10 lg:mt-12">
          <div className="mx-auto w-full max-w-[min(100%,550px)]">
            <Image
              src="/OMB-Rubin.png"
              alt={t("heroImageAlt")}
              width={550}
              height={619}
              priority
              className="relative z-10 mx-auto h-auto w-full max-w-[550px] object-contain object-bottom"
              sizes="(max-width: 640px) 100vw, 550px"
            />
          </div>

          {/**
           * Full container width below the portrait. Mobile: column stack, stats spread,
           * follow label white + shadow on photo. sm+: one row, label dark, justify-between.
           */}
          <div
            className={cn(
              "absolute bottom-8 left-0 right-0 z-20 mx-auto mt-6 flex w-full min-w-0 max-w-none flex-col gap-8",
              "sm:mt-7 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-x-6 sm:gap-y-5",
              "lg:-mt-12 lg:gap-x-8 xl:-mt-16",
            )}
          >
            <div className="flex w-full min-w-0 flex-row gap-2 sm:w-auto sm:max-w-none sm:shrink-0 sm:gap-3">
              <div className="min-w-0 flex-1 rounded-xl border border-black/5 bg-white px-3 py-2.5 shadow-[0px_10px_24px_0px_rgba(115,115,172,0.16)] sm:min-w-[8rem] sm:flex-none sm:px-5 sm:py-4">
                <Counter
                  className="text-xl font-bold leading-none text-primary sm:text-2xl"
                  suffix="+"
                >
                  {10}
                </Counter>
                <p className="mt-1 text-xsm font-medium leading-snug text-black sm:mt-1.5 sm:text-sm">
                  {t("statExperience")}
                </p>
              </div>
              <div className="min-w-0 flex-1 rounded-xl border border-black/5 bg-white px-3 py-2.5 shadow-[0px_10px_24px_0px_rgba(115,115,172,0.16)] sm:min-w-[8rem] sm:flex-none sm:px-5 sm:py-4">
                <Counter
                  className="text-xl font-bold leading-none text-primary sm:text-2xl"
                >
                  {publishedPostCount}
                </Counter>
                <p className="mt-1 text-xsm font-medium leading-snug text-black sm:mt-1.5 sm:text-sm">
                  {t("statArticles")}
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col items-center gap-2.5 sm:w-auto sm:items-end sm:gap-2.5">
              <p
                className={cn(
                  "text-center text-sm font-semibold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_12px_rgba(0,0,0,0.35)]",
                  "sm:text-right sm:text-base sm:font-medium sm:text-black sm:[text-shadow:none]",
                )}
              >
                {t("followLabel")}
              </p>
              <ul className="flex justify-center gap-2.5 sm:justify-end sm:gap-2.5">
                {socialMediaLinks.map((item, index) => (
                  <li key={index + 1}>
                    <a
                      className="flex size-11 items-center justify-center rounded-md border border-black/10 bg-white text-lg text-primary shadow-[0px_8px_20px_rgba(115,115,172,0.14)] transition-colors hover:bg-primary hover:text-white sm:size-12"
                      href={item.href}
                      target={item.target}
                      rel={item.rel}
                    >
                      {item.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
