"use client";
import Image from "next/image";
import AnimatedButton from "./button/AnimatedButton";
import AnimatedArrowIcon from "./button/AnimatedArrowIcon";
import Pill from "./pill";
import { BlogSummaryData } from "../section/Blogs/Blogs-List";

const BlogCard = ({ blogData }: { blogData: BlogSummaryData }) => {
  const {
    title,
    featuredImage,
    blogUrl,
    blogDate,
    blogExcerpt,
    blogCategories,
  } = blogData;

  function limitTo211Characters(text: string, charLength: number) {
    const MAX_LENGTH = 211;
    if (text.split("").length > MAX_LENGTH) {
      return `${stripHTML(text).slice(0, MAX_LENGTH)}...`;
    } else {
      return text;
    }
  }

  const stripHTML = (html: string) => {
    return html.replace(/<[^>]+>/g, "");
  };

  return (
    <div className="relative flex flex-col sm:gap-5 gap-3">
      <div className="relative overflow-hidden rounded-[0.3125rem] p-2.5 min-h-79 flex flex-col justify-end items-end">
        <Image
          className="rounded-[0.3125rem] object-cover"
          src={featuredImage.imageUrl}
          alt={featuredImage.imageAlt}
          unoptimized
          fill
        />
        <AnimatedButton
          className="md:p-2.5! w-full justify-between sm:shadow-none shadow-[0px_0px_10px_rgba(0,0,0,0.25)]"
          size={"icon"}
          trailingContent={
            <span className="[&_span]:-rotate-45 rounded-[0.3125rem] flex bg-primary">
              <AnimatedArrowIcon bgColor="bg-transparent" />
            </span>
          }
          href={`/blog/${blogUrl}`}
        >
          <div className="flex flex-col items-start gap-1.25">
            <span className="text-xsm text-black/20 font-normal">
              {blogDate}
            </span>
            <p className="text-xsm font-medium">Rubin Koot</p>
          </div>
        </AnimatedButton>
      </div>
      <div className="flex flex-col sm:gap-3.75 gap-2">
        <ul className="flex flex-wrap gap-4">
          {blogCategories.map((cat, index) => (
            <li key={index + 1}>
              <Pill iconColor="#3838F9" className="text-primary leading-none">
                {cat}
              </Pill>
            </li>
          ))}
        </ul>
        <h6 className=" font-medium sm:text-md text-body leading-none">
          {limitTo211Characters(title, 56)}
        </h6>
      </div>
      <p className="sm:text-body text-xsm leading-tight">
        {limitTo211Characters(blogExcerpt, 211)}
      </p>
    </div>
  );
};

export default BlogCard;
