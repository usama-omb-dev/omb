"use client";

import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const GRADIENT =
  "linear-gradient(0deg, rgba(56, 56, 249, 0.44) 0%, rgba(255, 255, 255, 0) 80%)";

const titleClassName =
  "text-center text-balance text-xl font-bold leading-none sm:text-3xl md:text-4xl md:nl:text-3xl lg:text-[64px] lg:leading-[1.06] lg:nl:text-4xl lg:nl:leading-tight";

/** Match PageHero CMS title so global `p` / `a` rules do not thin WordPress markup. */
const cmsTitleDescendantWeight =
  "[&_p]:font-bold [&_div]:font-bold [&_span]:font-bold [&_strong]:font-bold [&_em]:font-bold [&_a]:font-bold [&_a]:underline";

function CaseStudyHeroSeal({ className }: { className?: string }) {
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

export type CaseStudyHeroProps = {
  companyLogo: {
    imageUrl: string | null;
    imageAlt: string | null;
  } | null;
  /** WordPress `title.rendered` (HTML). */
  titleHtml: string;
  featuredImage: {
    imageUrl: string | null;
    imageAlt: string | null;
  } | null;
  className?: string;
};

export default function CaseStudyHero({
  companyLogo,
  titleHtml,
  featuredImage,
  className,
}: CaseStudyHeroProps) {
  const t = useTranslations("CaseStudyPage");
  const sectionRef = useRef<HTMLElement>(null);
  const copyColRef = useRef<HTMLDivElement>(null);
  const desktopBadgeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const copy = copyColRef.current;
      const desktopBadge = desktopBadgeRef.current;
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
          stagger: 0.08,
          ease: "power2.out",
        },
      );
      if (desktopBadge) {
        introTl.fromTo(
          desktopBadge,
          { opacity: 0, x: 24, y: 16 },
          { opacity: 1, x: 0, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        );
      }

      return () => {
        introTl.kill();
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
        "relative isolate overflow-visible pb-4 sm:pb-6",
        className,
      )}
      style={{ background: GRADIENT }}
    >
      <div
        ref={copyColRef}
        className="container relative mx-auto flex flex-col items-center px-4 pt-32 sm:pt-60 lg:px-0"
      >
        <div
          ref={desktopBadgeRef}
          className="pointer-events-none absolute right-2 top-36 z-10 hidden lg:block xl:right-0 xl:top-48"
        >
          <CaseStudyHeroSeal />
        </div>

        <div className="flex w-full max-w-260 flex-col items-center gap-5 sm:gap-8">
          <div className="flex flex-wrap items-center justify-center gap-2.5 rounded-full border border-black/5 bg-white px-4 py-2.5 shadow-[0px_10px_24px_0px_rgba(115,115,172,0.16)] sm:gap-3 sm:px-5 sm:py-3">
            <span className="text-base font-semibold text-black">
              {t("caseStudyLabel")}
            </span>
            {companyLogo?.imageUrl ? (
              <Image
                src={companyLogo.imageUrl}
                alt={companyLogo.imageAlt ?? ""}
                width={200}
                height={48}
                unoptimized
                className="h-8 w-auto max-w-[11rem] object-contain object-center sm:h-10 sm:max-w-[13rem] md:h-11"
              />
            ) : null}
          </div>

          {titleHtml ? (
            <h1
              className={cn(
                titleClassName,
                "w-full text-black [&_em]:italic",
                cmsTitleDescendantWeight,
              )}
              dangerouslySetInnerHTML={{ __html: titleHtml }}
            />
          ) : (
            <h1 className={cn(titleClassName, "text-black")}>
              {t("fallbackTitle")}
            </h1>
          )}
        </div>
      </div>

      {featuredImage?.imageUrl ? (
        <div className="container relative z-20 mx-auto mt-12 flex justify-center px-4 sm:mt-16 sm:px-6 md:mt-20 lg:mt-28 lg:px-8">
          {/**
           * Shift mockup down by half its height so ~50% sits on the gradient and ~50%
           * overlaps the white block below (layout flow keeps full height; sibling pulls up).
           */}
          <div className="relative w-full max-w-5xl -mb-[min(22vh,200px)] sm:-mb-[min(26vh,240px)] md:-mb-[min(28vh,260px)] lg:-mb-[min(30vh,280px)]">
            <Image
              src={featuredImage.imageUrl}
              alt={
                featuredImage.imageAlt ??
                t("featuredImageFallbackAlt")
              }
              width={1306}
              height={578}
              priority
              unoptimized
              className="mx-auto h-auto w-full max-h-[min(58vh,560px)] rounded-[0.625rem] object-contain shadow-[0_24px_64px_rgba(0,0,0,0.18)] sm:rounded-xl object-cover"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
