"use client";
import CaseStudyCard from "@/components/ui/case-study-card";
import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import Pill from "@/components/ui/pill";
import { useCaseStudies } from "@/hooks/useCaseStudies";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export interface CaseStudySummaryData {
  title: string;
  featuredImage: {
    imageUrl: string;
    imageAlt: string;
  };
  caseStudyUrl: string;
  caseStudyDate: string;
  caseStudyExcerpt: string;
  caseStudyCategories: string[];
}

const CaseStudiesList = () => {
  const t = useTranslations("CaseStudiesList");
  const locale = useLocale();
  const { data: caseStudies, isLoading } = useCaseStudies();
  const [visibleCount, setVisibleCount] = useState(4);
  const posts = Array.isArray(caseStudies) ? caseStudies : [];

  if (isLoading)
    return (
      <section className="h-screen flex justify-center items-center"></section>
    );

  const transformPostToSummary = (post: any): CaseStudySummaryData => {
    const date = new Date(post.date);

    const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
    const categories = post._embedded?.["wp:term"]?.[0] || [];

    return {
      title: post.title?.rendered || "",

      featuredImage: {
        imageUrl: featuredMedia?.source_url || "",
        imageAlt: featuredMedia?.slug || "",
      },

      caseStudyUrl: post.slug || "",

      caseStudyDate:
        date.toLocaleDateString(locale === "nl" ? "nl-NL" : "en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }) || "",

      caseStudyExcerpt: post.excerpt?.rendered || "",

      caseStudyCategories: categories.map((cat: any) => cat.name),
    };
  };

  const formatted: CaseStudySummaryData[] = isLoading
    ? []
    : posts.map((post: any) => transformPostToSummary(post));

  return (
    <section className="scroll-mt-24 bg-background pt-20 sm:scroll-mt-28 sm:pt-37.5">
      <div className="container">
        <div className="flex flex-col items-center justify-center nl:max-w-200 max-w-118.5 sm:mb-14.75 mb-10 sm:gap-7.5 gap-2 mx-auto">
          <Pill iconColor="#3838F9" className="leading-none">
            {t("pill")}
          </Pill>
          <h3 className="sm:text-2xl text-xl font-semibold leading-none text-center">
            {t("title")}{" "}
            <span className="text-primary">{t("titleAccent")}</span>
          </h3>
        </div>
        <div className="flex flex-col sm:gap-14.75 gap-5">
          {formatted.length === 0 ? (
            <div className="mx-auto max-w-118.5 rounded-[0.625rem] border border-black/10 bg-white px-6 py-10 text-center shadow-[0px_0px_14px_rgba(0,0,0,5%)] sm:px-10 sm:py-12">
              <h4 className="text-pretty text-xl font-semibold leading-none text-black sm:text-2xl">
                {t("emptyHeading")}{" "}
                <span className="text-primary">{t("emptyHeadingAccent")}</span>
              </h4>
              <p className="mx-auto mt-4 max-w-161.5 text-pretty text-xsm leading-relaxed text-black/75 sm:mt-5 sm:text-sm">
                {t("emptyDescription")}
              </p>
            </div>
          ) : (
            <>
              <div className="grid lg:grid-cols-2 gap-x-3.5 sm:gap-y-14.75 gap-y-8">
                {formatted.slice(0, visibleCount).map((item, index) => (
                  <React.Fragment key={index + 1}>
                    <CaseStudyCard caseStudyData={item} />
                  </React.Fragment>
                ))}
              </div>
              {visibleCount < posts.length && (
                <AnimatedButton
                  type="button"
                  className="mx-auto"
                  size={"icon"}
                  trailingContent={<AnimatedArrowIcon />}
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                >
                  {t("loadMore")}
                </AnimatedButton>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesList;
