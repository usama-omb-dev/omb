"use client";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import { useGSAP } from "@gsap/react";

const INDEX_LINKS = [
  { label: "Problem statement", href: "#problem-statement" },
  { label: "Proposed Solution", href: "#proposed-solution" },
  { label: "Key metrics", href: "#key-metrics" },
  { label: "Website Redesign", href: "#website-redesign" },
  { label: "Development", href: "#development" },
  { label: "Reporting & Monitoring", href: "#reporting" },
  { label: "Results", href: "#results" },
  { label: "Client review", href: "#client-review" },
];

interface CaseStudyStructured {
  companyLogo: {
    imageUrl: string | null;
    imageAlt: string | null;
  } | null;

  title: string | null;

  featuredImage: {
    imageUrl: string | null;
    imageAlt: string | null;
  } | null;

  content: string | null;

  beforeAfterImages: {
    beforeImage: {
      imageUrl: string | null;
      imageAlt: string | null;
    } | null;

    afterImage: {
      imageUrl: string | null;
      imageAlt: string | null;
    } | null;
  } | null;

  keyMatrics: {
    heading: string | null;
    details: string | null;
    keys: {
      label: string | null;
      value: string | null;
    }[];
  } | null;

  clientReviews: {
    review: string | null;
    video: string | null;
  } | null;
}

export default function CaseStudyDetailLayout({
  caseStudyData,
}: {
  caseStudyData: CaseStudyStructured;
}) {
  gsap.registerPlugin(Draggable);

  const {
    companyLogo,
    title,
    featuredImage,
    content,
    beforeAfterImages,
    keyMatrics,
    clientReviews,
  } = caseStudyData;

  const [indexing, setIndexing] = useState<string[]>([]);
  const [processedContent, setProcessedContent] = useState("");
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const before = beforeRef.current;
      const handle = handleRef.current;

      if (!container || !before || !handle) return;
      const containerWidth = container.offsetWidth;
      const startX = containerWidth / 2;

      gsap.set(handle, { x: startX });
      gsap.set(before, {
        clipPath: `inset(0 ${containerWidth - startX}px 0 0)`,
      });

      Draggable.create(handle, {
        type: "x",
        bounds: { minX: 0, maxX: containerWidth },
        onDrag: function () {
          const x = this.x;

          gsap.set(before, {
            clipPath: `inset(0 ${containerWidth - x}px 0 0)`,
          });
        },
      });
    },
    { scope: containerRef },
  );

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  };

  const processHeadings = (root: ParentNode): { texts: string[] } => {
    const headings = root.querySelectorAll("h1, h2, h3, h4, h5, h6");

    const texts: string[] = [];

    headings.forEach((heading) => {
      const text = heading.textContent?.trim() || "";
      if (!text) return;

      if (!heading.id) {
        heading.id = generateSlug(text);
      }

      texts.push(text);
    });

    return { texts };
  };

  useEffect(() => {
    if (!content) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    processHeadings(doc);

    setProcessedContent(doc.body.innerHTML);
  }, [content]);

  useEffect(() => {
    if (!contentContainerRef.current) return;

    const { texts } = processHeadings(contentContainerRef.current);

    setIndexing(texts);
  }, [processedContent]);

  const textStyling =
    "xl:[&_h1]:text-5xl [&_h1]:text-2xl xl:[&_h2]:text-3xl [&_h2]:text-xl xl:[&_h3]:text-2xl [&_h3]:text-xl xl:[&_h4]:text-xl [&_h4]:text-lg xl:[&_h5]:text-lg [&_h5]:text-md xl:[&_h6]:text-md [&_h6]:text-sm xl:[&_li]:text-sm [&_li]:text-xsm xl:[&_p]:text-body [&_p]:text-xsm [&_h1]:font-medium [&_h2]:font-medium [&_h3]:font-medium [&_h4]:font-medium [&_h5]:font-medium [&_h6]:font-medium **:leading-none [&_p]:leading-tight lg:[&_p]:mb-4 [&_p]:mb-2 [&_p]:mt-2";
  return (
    <article className="min-h-screen pt-60 bg-background scroll-smooth">
      <div className="container">
        <div className="border-b pb-15 mb-15">
          <div className="mb-4 flex flex-wrap items-center gap-5 py-3.75 px-5 bg-white rounded-[0.625rem] w-fit">
            <span className="text-md font-medium">Case Study:</span>
            {companyLogo?.imageUrl ? (
              <Image
                src={companyLogo?.imageUrl}
                alt={
                  companyLogo.imageAlt ? companyLogo.imageAlt : "Company Logo"
                }
                unoptimized
                width={241}
                height={50}
                className="h-auto w-auto max-h-12 object-contain"
              />
            ) : null}
          </div>
          <h1 className="max-w-271.5 text-5xl leading-none text-black">
            {title}
          </h1>
        </div>

        {featuredImage?.imageUrl ? (
          <div className="relative w-full">
            <Image
              width={1306}
              height={578}
              src={featuredImage?.imageUrl}
              alt={
                featuredImage?.imageAlt
                  ? featuredImage?.imageAlt
                  : "Featured Image"
              }
              className="object-cover w-full max-h-160 rounded-[0.625rem]"
              priority
            />
          </div>
        ) : null}
      </div>
      <section className="pt-37.5">
        <div className="container">
          <div className="flex gap-31">
            <aside className="sticky top-20 left-0 flex flex-col gap-22.5 h-fit bg-white w-fit min-w-106.5 p-7.5 pb-5 self-start">
              <div className="flex flex-col gap-5.25">
                <h2 className="text-md font-medium leading-none text-black pb-5.5 border-b">
                  Index
                </h2>
                <ul className="space-y-5">
                  {indexing.map((item, index) => (
                    <li key={index + 1}>
                      <Link
                        href={`#${item.split(" ").join("-").toLowerCase()}`}
                        className="text-body text-black/60 hover:text-primary hover:px-5 hover:py-3.75 hover:border-l-8 border-primary transition-all"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-5">
                <p className=" text-md font-medium  ">Want similar results?</p>
                <AnimatedButton
                  className="bg-primary text-white justify-between w-full p-2.5! pl-5!"
                  type="submit"
                  trailingContent={
                    <span
                      className={`bg-white sm:size-12.75 size-10 overflow-hidden flex items-center rounded-[0.3125rem]`}
                    >
                      <div className="flex justify-around sm:min-w-25.5 min-w-20 -translate-x-1/2 transition-all group-hover:translate-x-0">
                        <ArrowRight color="#3838F9" />
                        <ArrowRight color="#3838F9" />
                      </div>
                    </span>
                  }
                >
                  Let’s talk!
                </AnimatedButton>
              </div>
            </aside>

            <div ref={contentContainerRef}>
              <div
                className={`${textStyling}`}
                // dangerouslySetInnerHTML={{
                //   __html: content ?? "",
                // }}
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
              {beforeAfterImages?.afterImage &&
                Object.entries(beforeAfterImages?.afterImage).length > 0 &&
                beforeAfterImages?.beforeImage &&
                Object.entries(beforeAfterImages?.beforeImage).length > 0 && (
                  <div className="relative isolate">
                    <Image
                      src={"/laptop-mockup.png"}
                      alt={""}
                      width={866}
                      height={508}
                    />
                    <div
                      ref={containerRef}
                      className="absolute top-5 right-[191px] w-[660px] h-[430px] overflow-hidden"
                    >
                      <Image
                        src={beforeAfterImages.afterImage.imageUrl ?? ""}
                        alt=""
                        fill
                        className="object-cover"
                      />
                      <div
                        ref={beforeRef}
                        className="absolute inset-0 will-change-[clip-path]"
                      >
                        <Image
                          src={beforeAfterImages.beforeImage.imageUrl ?? ""}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div
                        ref={handleRef}
                        className="absolute top-0 h-full w-3.5 bg-primary/20 backdrop-blur-sm rounded-[1.25rem] -translate-x-1/2 cursor-ew-resize z-10"
                      >
                        <div className="flex justify-center items-center text-sm text-white bg-primary w-9.5 h-9.5 absolute rounded-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                          <FaChevronLeft />
                          <FaChevronRight />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              {(keyMatrics?.heading ||
                keyMatrics?.details ||
                (keyMatrics?.keys && keyMatrics?.keys.length > 0)) && (
                <div className="bg-white p-7.5 rounded-[0.3125rem] flex flex-col gap-7.5">
                  {keyMatrics?.heading && (
                    <h6 className="text-md font-medium">
                      {keyMatrics?.heading}
                    </h6>
                  )}
                  {keyMatrics?.details && (
                    <p className="text-body">{keyMatrics?.details}</p>
                  )}
                  <div className="flex flex-wrap mt-7.5 gap-3.5">
                    {keyMatrics?.keys &&
                      keyMatrics?.keys?.length > 0 &&
                      keyMatrics?.keys?.map((item, index) => (
                        <div
                          key={index + 1}
                          className="bg-secondary p-2.5 rounded-[0.3125rem] flex flex-col gap-5 min-w-44"
                        >
                          <span className="text-xsm leading-none">
                            {item.label}
                          </span>
                          <p className="text-xl font-bold leading-none">
                            {item.value}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
