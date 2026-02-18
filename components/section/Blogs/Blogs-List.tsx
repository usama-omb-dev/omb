"use client";
import BlogCard from "@/components/ui/blog-card";
import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import Pill from "@/components/ui/pill";
import { useBlogs } from "@/hooks/useBlogs";
import React, { useState } from "react";

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
  const { data: blogs, isLoading } = useBlogs();
  const [visibleCount, setVisibleCount] = useState(4);

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
        date.toLocaleDateString("en-GB", {
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
    : blogs.map((post: any) => transformPostToBlogSummary(post));

  return (
    <section className="sm:pt-37.5 pt-10">
      <div className="container">
        <div className="flex flex-col items-center justify-center max-w-118.5 sm:mb-14.75 mb-10 sm:gap-7.5 gap-2 mx-auto">
          <Pill iconColor="#3838F9" className="leading-none">
            List of the most recent write-up from Rubin
          </Pill>
          <h3 className="sm:text-2xl text-xl font-medium leading-none text-center">
            Latest blogs from the{" "}
            <span className="text-primary">online marketing baker!</span>
          </h3>
        </div>
        <div className="flex flex-col sm:gap-14.75 gap-5">
          <div className="grid lg:grid-cols-2 gap-x-3.5 sm:gap-y-14.75 gap-y-8">
            {formattedBlogs.slice(0, visibleCount).map((blog, index) => (
              <React.Fragment key={index + 1}>
                <BlogCard blogData={blog} />
              </React.Fragment>
            ))}
          </div>
          {visibleCount < blogs.length && (
            <AnimatedButton
              className="mx-auto"
              size={"icon"}
              trailingContent={<AnimatedArrowIcon />}
              href={""}
              onClick={() => setVisibleCount((prev) => prev + 4)}
            >
              Load more
            </AnimatedButton>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogsList;
