"use client";
import { useBlogs } from "@/hooks/useBlogs";
import { BlogSummaryData } from "./Blogs-List";
import React from "react";
import BlogCard from "@/components/ui/blog-card";

const LatestBlogs = () => {
  const { data: blogs, isLoading } = useBlogs();

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
    <section className="bg-white sm:rounded-tl-[3.75rem] rounded-tl-[1.875rem] sm:rounded-tr-[3.75rem] rounded-tr-[1.875rem] lg:pt-20 pt-10">
      <div className="container flex flex-col sm:gap-15 gap-4">
        <h3 className="text-center sm:text-2xl text-xl font-medium">
          Latest <span className="text-primary">blogs</span>
        </h3>
        <div className="grid lg:grid-cols-3 gap-3.5">
          {formattedBlogs.splice(0, 3).map((item, index) => (
            <React.Fragment key={index + 1}>
              <BlogCard blogData={item} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
