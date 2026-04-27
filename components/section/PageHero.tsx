"use client";

import {
  MARKETING_HERO_GRADIENT,
  MarketingHeroFloatingBadge,
} from "@/components/section/marketing-hero-shared";
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

/** WordPress / CMS strings for single-service (and similar) pages. */
export type PageHeroCmsContent = {
  /** Plain text above the title (HTML stripped server-side). Omit or empty to hide. */
  eyebrow?: string;
  /** HTML for the main headline (from CMS). */
  titleHtml: string;
  /** HTML for the intro under the title (from CMS). */
  descriptionHtml: string;
};

export type PageHeroProps = {
  /** next-intl namespace for copy (default `PageHero`). */
  translationNamespace?: string;
  ctaHref?: string;
  className?: string;
  /** Dot + label above the title. Use a namespace with an `eyebrow` key. */
  showEyebrow?: boolean;
  /**
   * When omitted: CTA shows except when `showEyebrow` is true (inner pages).
   * Set true to force CTA with eyebrow.
   */
  showCta?: boolean;
  /**
   * Less padding below the people row (smaller gap before the next section).
   * Use on inner pages; keep default on home when a block overlaps (e.g. stats strip).
   */
  tightBottom?: boolean;
  /**
   * When set, eyebrow / title / description come from CMS HTML instead of next-intl
   * (no CTA unless `showCta` is true). Use `translationNamespace` for image alts only
   * (e.g. `ServicePageHero`).
   */
  contentFromCms?: PageHeroCmsContent;
};

const titleClassName =
  "text-center text-balance text-xl font-bold leading-none sm:text-3xl md:text-4xl md:nl:text-3xl lg:text-[64px] lg:leading-[1.06] lg:nl:text-4xl lg:nl:leading-tight";

/** CMS titles often include `<p>` / `<a>` from WordPress; `@layer base` sets those to `font-medium`, so we reset descendants to match the marketing hero. */
const cmsTitleDescendantWeight =
  "[&_p]:font-bold [&_div]:font-bold [&_span]:font-bold [&_strong]:font-bold [&_em]:font-bold [&_a]:font-bold [&_a]:underline";

/**
 * Centered marketing hero: gradient, headline with highlighted underline,
 * description, optional CTA, optional floating badge, and bottom character cutouts.
 */
export default function PageHero({
  translationNamespace = "PageHero",
  ctaHref = "/contact",
  className,
  showEyebrow = false,
  showCta,
  tightBottom = false,
  contentFromCms,
}: PageHeroProps) {
  const t = useTranslations(translationNamespace);
  const isCms = Boolean(contentFromCms);
  const showCtaButton = showCta ?? (!showEyebrow && !isCms);
  const titlePrimarySuffixText =
    showEyebrow && !isCms ? t("titlePrimarySuffix") : "";
  const showEyebrowRow =
    isCms && contentFromCms
      ? Boolean(contentFromCms.eyebrow?.trim())
      : showEyebrow;
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
        "relative isolate overflow-hidden",
        tightBottom ? "pb-0" : "pb-10 sm:pb-24",
        className,
      )}
      style={{ background: MARKETING_HERO_GRADIENT }}
    >
      <div
        ref={copyColRef}
        className="container relative mx-auto flex flex-col items-center justify-center gap-4 px-4 pt-30 sm:pt-40 lg:px-0"
      >
        {showEyebrowRow ? (
          <p className="flex items-center justify-center gap-2 sm:gap-2.5">
            <span
              className="size-2 shrink-0 rounded-full bg-primary sm:size-2.5"
              aria-hidden
            />
            <span className="text-sm font-semibold tracking-tight text-black sm:text-base">
              {isCms && contentFromCms?.eyebrow
                ? contentFromCms.eyebrow
                : t("eyebrow")}
            </span>
          </p>
        ) : null}
        <div
          ref={desktopBadgeRef}
          className="pointer-events-none absolute right-0 top-28 z-10 hidden lg:block xl:top-60"
        >
          <MarketingHeroFloatingBadge />
        </div>
        <div className="flex max-w-260 flex-col items-center gap-2 sm:gap-5">
          {isCms && contentFromCms ? (
            <h1
              className={cn(
                titleClassName,
                "text-black [&_em]:italic",
                cmsTitleDescendantWeight,
              )}
              dangerouslySetInnerHTML={{ __html: contentFromCms.titleHtml }}
            />
          ) : showEyebrow ? (
            <h1
              className={cn(
                titleClassName,
                "flex flex-col items-center gap-1.5 text-black sm:gap-2",
              )}
            >
              <span className="flex flex-wrap items-baseline justify-center gap-x-5 leading-none">
                <span className="relative inline-block pb-1.5 text-primary sm:pb-2">
                  <span className="relative z-10">{t("titleHighlight")}</span>
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1 rounded-sm bg-[#3838F9] sm:h-[5px]"
                    aria-hidden
                  />
                </span>
                {titlePrimarySuffixText ? (
                  <span className="text-primary">{titlePrimarySuffixText}</span>
                ) : null}
              </span>
              <span className="text-black">{t("titleLine2")}</span>
            </h1>
          ) : (
            <h1 className={cn(titleClassName, "text-black")}>
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
          )}
        </div>

        {isCms && contentFromCms ? (
          <div
            className="max-w-161.5 text-center text-xsm text-black/80 sm:text-body [&_a]:text-primary [&_p]:mb-0 [&_p+p]:mt-3"
            dangerouslySetInnerHTML={{
              __html: contentFromCms.descriptionHtml || "",
            }}
          />
        ) : (
          <p className="max-w-161.5 text-center text-xsm text-black/80 sm:text-body">
            {t("description")}
          </p>
        )}

        {showCtaButton ? (
          <div className="flex w-full justify-center">
            <AnimatedButton
              href={ctaHref}
              size="sm"
              className="border border-black/10 !h-auto !min-h-0 !gap-1.5 !px-3.5 !py-1.5 !shadow-[0px_10px_24px_0px_#7373AC29] text-xs sm:!px-2 sm:!pl-4 sm:!py-2 sm:text-sm"
              trailingContent={
                <AnimatedArrowIcon tone="hero" className="[&_svg]:-rotate-45" />
              }
            >
              {t("cta")}
            </AnimatedButton>
          </div>
        ) : null}
      </div>

      <div
        ref={peopleRef}
        className={cn(
          "container relative flex min-w-0 items-end justify-center gap-0 px-2 sm:px-3 md:px-4",
          tightBottom ? "mt-2 sm:mt-3 lg:mt-5" : "mt-4 lg:mt-8",
        )}
      >
        {/* Below lg: wider % + higher max-h so the trio reads larger; lg+ unchanged (380 / 500 / 380). */}
        <div className="relative z-10 w-[32%] max-w-[12.5rem] shrink-0 -mr-7 sm:max-w-[14.5rem] sm:-mr-9 md:w-[32%] md:max-w-[13.5rem] md:-mr-11 md:min-w-0 md:shrink lg:w-[380px] lg:max-w-[380px] lg:shrink-0 lg:-mr-44">
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
        <div className="relative z-30 w-[36%] max-w-[14rem] shrink-0 sm:max-w-[17rem] md:w-[36%] md:max-w-[18rem] md:min-w-0 md:shrink lg:w-[500px] lg:max-w-[500px] lg:shrink-0">
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
    </section>
  );
}
