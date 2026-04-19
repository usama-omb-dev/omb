"use client";
import BlogCard from "@/components/ui/blog-card";
import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import Pill from "@/components/ui/pill";
import { useBlogs } from "@/hooks/useBlogs";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export interface BlogSummaryData {
  title: string;
  featuredImage: {
    imageUrl: string;
    imageAlt: string;
  };
  blogUrl: string;
  blogDate: string;
  blogDetails: string;
  blogExcerpt: string;
  blogCategories: string[];
}

const BlogsList = () => {
  const t = useTranslations("BlogsList");
  const locale = useLocale();
  const { data: blogs, isLoading } = useBlogs();
  const [visibleCount, setVisibleCount] = useState(4);
  const posts = Array.isArray(blogs) ? blogs : [];

  if (isLoading)
    return (
      <section className="h-screen flex justify-center items-center"></section>
    );

  const transformPostToBlogSummary = (post: any): BlogSummaryData => {
    const date = new Date(post.date);

    const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
    const categories = post._embedded?.["wp:term"]?.[0] || [];

    return {
      title: post.title?.rendered || "",

      featuredImage: {
        imageUrl: featuredMedia?.source_url || "",
        imageAlt: featuredMedia?.slug || "",
      },

      blogUrl: post.slug || "",

      blogDate:
        date.toLocaleDateString(locale === "nl" ? "nl-NL" : "en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }) || "",

      blogDetails: post.content?.rendered || "",

      blogExcerpt: post.excerpt?.rendered || "",

      blogCategories: categories.map((cat: any) => cat.name),
    };
  };

  const formattedBlogs: BlogSummaryData[] = isLoading
    ? []
    : posts.map((post: any) => transformPostToBlogSummary(post));

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
          {formattedBlogs.length === 0 ? (
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
                {formattedBlogs.slice(0, visibleCount).map((blog, index) => (
                  <React.Fragment key={index + 1}>
                    <BlogCard blogData={blog} />
                  </React.Fragment>
                ))}
              </div>
              {visibleCount < posts.length && (
                <AnimatedButton
                  className="mx-auto"
                  size={"icon"}
                  trailingContent={<AnimatedArrowIcon />}
                  href={""}
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

export default BlogsList;
