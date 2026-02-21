"use client";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable, ScrollTrigger } from "gsap/all";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import { useGSAP } from "@gsap/react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";

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
  gsap.registerPlugin(Draggable, ScrollTrigger);

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const handlePlayClick = () => {
    videoRef.current?.play();
  };

  const handlePauseClick = () => {
    videoRef.current?.pause();
  };

  useGSAP(() => {
    if (!processedContent || !contentContainerRef.current) return;

    const headings = contentContainerRef.current.querySelectorAll(
      "h1, h2, h3, h4, h5, h6",
    );

    console.log("headings", headings);

    headings.forEach((heading) => {
      const id = heading.id;

      ScrollTrigger.create({
        trigger: heading,
        start: "top 50px",
        end: "bottom 50px",
        onEnter: () => setActiveId(id),
        onEnterBack: () => setActiveId(id),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [processedContent]);

  const textStyling =
    "xl:[&_h1]:text-5xl [&_h1]:text-2xl xl:[&_h2]:text-3xl [&_h2]:text-xl xl:[&_h3]:text-2xl [&_h3]:text-xl xl:[&_h4]:text-xl [&_h4]:text-lg xl:[&_h5]:text-lg [&_h5]:text-md xl:[&_h6]:text-md [&_h6]:text-sm xl:[&_li]:text-sm [&_li]:text-xsm xl:[&_p]:text-body [&_p]:text-xsm [&_h1]:font-medium [&_h2]:font-medium [&_h3]:font-medium [&_h4]:font-medium [&_h5]:font-medium [&_h6]:font-medium **:leading-none sm:[&_h1]:mb-10 sm:[&_h2]:mb-10 sm:[&_h3]:mb-10 sm:[&_h4]:mb-10 sm:[&_h5]:mb-10 sm:[&_h6]:mb-10 [&_h1]:mb-5 [&_h2]:mb-5 [&_h3]:mb-5 [&_h4]:mb-5 [&_h5]:mb-5 [&_h6]:mb-5 [&_h1]:scroll-mt-10 [&_h2]:scroll-mt-10 [&_h3]:scroll-mt-10 [&_h4]:scroll-mt-10 [&_h5]:scroll-mt-10 [&_h6]:scroll-mt-10 [&_li>h5]:my-5 [&_p]:leading-tight lg:[&_p]:mb-4 [&_p]:mb-2 [&_p]:mt-2";
  return (
    <article className="min-h-screen sm:pt-60 pt-32 bg-background scroll-smooth">
      <div className="container">
        <div className="border-b xl:pb-15 pb-8 xl:mb-15 mb-8">
          <div className="xl:mb-4 mb-2 flex flex-wrap items-center sm:gap-5 gap-3 xl:py-3.75 py-2 px-5 bg-white rounded-[0.625rem] w-fit">
            <span className="sm:text-md text-sm font-medium">Case Study:</span>
            {companyLogo?.imageUrl ? (
              <Image
                src={companyLogo?.imageUrl}
                alt={
                  companyLogo.imageAlt ? companyLogo.imageAlt : "Company Logo"
                }
                unoptimized
                width={241}
                height={50}
                className="h-auto w-auto object-contain"
              />
            ) : null}
          </div>
          <h1 className="max-w-271.5 lg:text-5xl sm:text-3xl text-2xl leading-none text-black">
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
      <section className="lg:pt-37.5 sm:pt-20 pt-5">
        <div className="container">
          <div className="flex lg:flex-row flex-col xl:gap-31 gap-10">
            <aside className="lg:sticky top-20 left-0 flex flex-col xl:gap-22.5 gap-10 h-fit bg-white lg:w-fit w-full xl:min-w-106.5 lg:min-w-80 sm:p-7.5 p-5 pb-5 self-start">
              <div className="flex flex-col gap-5.25">
                <h2 className="text-md font-medium leading-none text-black pb-5.5 border-b">
                  Index
                </h2>
                <ul className="space-y-5">
                  {indexing.map((item, index) => (
                    <li key={index + 1}>
                      <Link
                        href={`#${item.split(" ").join("-").toLowerCase()}`}
                        className={`text-body transition-all border-l-8 ${
                          activeId === item.split(" ").join("-").toLowerCase()
                            ? "text-primary px-5 py-3.75 border-primary"
                            : "text-black/60 border-transparent hover:text-primary hover:px-5 hover:py-3.75 hover:border-primary"
                        }`}
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

            <div
              className="  [&_li]:relative [&_li]:pl-7 [&_li]:flex [&_li]:items-center [&_li]:gap-2.5 [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-1/2 [&_li]:before:-translate-y-1/2 [&_li]:before:w-4.5 [&_li]:before:h-5.25 [&_li]:before:bg-[url('/li-dot.svg')] [&_li]:before:bg-no-repeat [&_li]:before:bg-contain"
              ref={contentContainerRef}
            >
              <div
                className={`${textStyling} [&_img]:inline-block`}
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
              {beforeAfterImages?.afterImage &&
                Object.entries(beforeAfterImages?.afterImage).length > 0 &&
                beforeAfterImages?.beforeImage &&
                Object.entries(beforeAfterImages?.beforeImage).length > 0 && (
                  <div className="relative isolate sm:my-20 my-5">
                    <Image
                      src={"/laptop-mockup.png"}
                      alt={""}
                      width={866}
                      height={508}
                      className="max-w-[280px] sm:max-w-full"
                    />
                    <div
                      ref={containerRef}
                      className="absolute sm:top-5 top-2 2xl:right-[191px] lg:right-[80px] md:right-[85px] sm:right-[70px] sm:left-[unset]! left-[35px] 2xl:w-[660px] xl:w-[535px] lg:w-[470px] md:w-[565px] sm:w-[465px] w-[212px] 2xl:h-[430px] xl:h-[340px] lg:h-[300px] md:h-[360px] sm:h-[295px] h-[135px] overflow-hidden"
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
                        className="absolute top-0 h-full sm:w-3.5 w-2 bg-primary/20 backdrop-blur-sm rounded-[1.25rem] -translate-x-1/2 cursor-ew-resize z-10"
                      >
                        <div className="flex justify-center items-center sm:text-sm text-[12px] text-white bg-primary sm:w-9.5 w-7 sm:h-9.5 h-7 absolute rounded-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
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
                <div className="bg-white sm:p-7.5 p-5 rounded-[0.3125rem] flex flex-col sm:gap-7.5 gap-3">
                  {keyMatrics?.heading && (
                    <h6 className="text-md font-medium scroll-mt-10">
                      {keyMatrics?.heading}
                    </h6>
                  )}
                  {keyMatrics?.details && (
                    <p className="sm:text-body text-sm">
                      {keyMatrics?.details}
                    </p>
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
              {clientReviews &&
                (clientReviews.review || clientReviews.video) && (
                  <div>
                    <ul>
                      <li>
                        <h4 className="text-md font-medium sm:my-10 my-5 scroll-mt-10">
                          Client review
                        </h4>
                      </li>
                    </ul>
                    <blockquote className="text-body mb-10">
                      {clientReviews.review}
                    </blockquote>
                    {clientReviews.video && (
                      <div className="relative isolate group">
                        {!isPlaying && (
                          <button
                            onClick={handlePlayClick}
                            className="cursor-pointer text-white z-10 sm:text-xl text-md sm:w-27.5 w-20 sm:h-27.5 h-20 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-primary/10 backdrop-blur-md rounded-full flex justify-center items-center"
                          >
                            <FaPlay />
                          </button>
                        )}

                        <video
                          ref={videoRef}
                          className="rounded-[0.625rem] w-full -z-10"
                          loop
                          src={clientReviews.video}
                          controls={false}
                        />
                        <div className="flex items-center gap-4 mt-4">
                          {isPlaying && (
                            <button
                              onClick={handlePauseClick}
                              className="transition-all cursor-pointer opacity-0 group-hover:opacity-100 text-white z-10 text-xl w-27.5 h-27.5 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-primary/10 backdrop-blur-md rounded-full flex justify-center items-center"
                            >
                              <FaPause />
                            </button>
                          )}
                          {isPlaying && (
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.01"
                              defaultValue="1"
                              className="custom-slider sm:w-40! w-[calc(100%-20px)] absolute sm:bottom-10 bottom-0 sm:right-10 right-2.5"
                              onChange={(e) => {
                                const value = Number(e.target.value);

                                if (videoRef.current) {
                                  videoRef.current.volume = value;
                                }

                                const percent = value * 100;
                                e.target.style.setProperty(
                                  "--progress",
                                  `${percent}%`,
                                );
                              }}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
