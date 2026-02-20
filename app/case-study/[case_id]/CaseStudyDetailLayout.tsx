import AnimatedButton from "@/components/ui/button/AnimatedButton";
import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import Image from "next/image";
import Link from "next/link";
import type { CaseStudyDetailLayoutProps } from "./types";

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

const DEFAULT_PROPOSED =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const DEFAULT_RESULTS =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";
const DEFAULT_CLIENT_REVIEW =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export default function CaseStudyDetailLayout({
  data,
}: {
  data: CaseStudyDetailLayoutProps;
}) {
  const {
    tag,
    headline = "68% increase in conversion rates with the new design.",
    heroImageUrl,
    companyLogoUrl,
    companyLogoAlt,
    problemStatementTitleHtml,
    problemStatementHtml,
    problemSectionHtml,
    relevantTags = [],
    proposedSolutionIntro,
    keyStaff,
    websiteRedesign,
    development,
    secondImageUrl,
    keyMetricsIntro,
    metrics = [{ value: "+0.8 ms" }, { value: "99%" }, { value: "99%" }],
    resultsText,
    clientReviewText,
    reviewVideoUrl,
    videoThumbnailUrl,
  } = data;

  const proposedIntro = proposedSolutionIntro ?? DEFAULT_PROPOSED;
  const keyStaffText = keyStaff ?? DEFAULT_PROPOSED;
  const websiteRedesignText = websiteRedesign ?? DEFAULT_PROPOSED;
  const developmentText = development ?? DEFAULT_PROPOSED;
  const metricsIntro = keyMetricsIntro ?? DEFAULT_PROPOSED;
  const results = resultsText ?? DEFAULT_RESULTS;
  const clientReview = clientReviewText ?? DEFAULT_CLIENT_REVIEW;
  const videoUrl = reviewVideoUrl;
  const thumbUrl = videoThumbnailUrl;

  return (
    <article className="min-h-screen bg-[#f7f7f7]">
      <header className="container pt-[7.5rem] pb-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="text-[1rem] text-[#6b7280]">Case Study</span>
          {companyLogoUrl ? (
            <Image
              src={companyLogoUrl}
              alt={companyLogoAlt ?? "Company logo"}
              width={241}
              height={50}
              className="h-auto w-auto max-h-12 object-contain"
            />
          ) : null}
          {tag ? (
            <span className="rounded bg-[#dc2626] px-2.5 py-1 text-[0.875rem] font-medium text-white">
              {tag}
            </span>
          ) : null}
        </div>
        <h1 className="max-w-[56rem] text-[1.75rem] font-medium leading-[1.1] text-black sm:text-[2rem] xl:text-[2.75rem]">
          {headline}
        </h1>
      </header>
      {heroImageUrl ? (
        <section className="relative container w-full">
          <div className="relative aspect-video w-full">
            <Image
              src={heroImageUrl}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </section>
      ) : null}
      <section className="container py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[17.5rem_1fr] lg:gap-20">
          <aside className="h-fit space-y-8 self-start lg:sticky lg:top-28">
            <div>
              <h2 className="mb-5 text-[1.5rem] font-medium leading-none text-black">
                Index
              </h2>
              <ul className="space-y-2.5">
                {INDEX_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[1.125rem] text-black transition-colors hover:text-[#3838f9]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-[1rem] text-[#6b7280]">
                Want similar results?
              </p>
              <AnimatedButton
                size="icon"
                trailingContent={
                  <span className="flex size-12 items-center justify-center rounded-[0.3125rem] bg-[#3838f9]">
                    <AnimatedArrowIcon bgColor="bg-transparent" />
                  </span>
                }
                href="/contact"
              >
                Let us help!
              </AnimatedButton>
            </div>
          </aside>

          <div id="problem-statement" className="scroll-mt-28">
            {problemStatementTitleHtml ? (
              <div
                className="mb-4 text-[1.5rem] font-medium leading-none text-black [&_*]:font-medium [&_*]:leading-none"
                dangerouslySetInnerHTML={{ __html: problemStatementTitleHtml }}
              />
            ) : (
              <h2 className="mb-4 text-[1.5rem] font-medium leading-none text-black">
                Problem statement
              </h2>
            )}
            {problemStatementHtml ? (
              <div
                className="case-study-problem-body mb-10 text-[1.125rem] leading-[1.6] text-black [&_p]:mb-3 [&_p:last-child]:mb-0"
                dangerouslySetInnerHTML={{ __html: problemStatementHtml }}
              />
            ) : null}
            {relevantTags.length > 0 ? (
              <ul className="mb-10 flex flex-wrap gap-2">
                {relevantTags.map((t) => (
                  <li
                    key={t}
                    className="rounded-md bg-[#f1f1f1] px-3 py-2 text-[0.875rem] font-medium text-black"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}
            {problemSectionHtml ? (
              <div
                className="case-study-problem-section [&_*]:text-black"
                dangerouslySetInnerHTML={{ __html: problemSectionHtml }}
              />
            ) : null}
          </div>
        </div>
      </section>
      <section
        id="proposed-solution"
        className="container scroll-mt-28 py-16 lg:py-20"
      >
        <h2 className="mb-4 text-[1.5rem] font-medium leading-none text-black">
          Proposed Solution
        </h2>
        <p className="mb-10 max-w-[48rem] text-[1.125rem] leading-[1.6] text-black">
          {proposedIntro}
        </p>
        <div className="max-w-[48rem] space-y-8">
          <div className="flex gap-3">
            <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-[#3838f9]" />
            <div>
              <h3 className="mb-2 text-[1.5rem] font-medium text-black">
                Key staff
              </h3>
              <p className="text-[1.125rem] leading-[1.6] text-black">
                {keyStaffText}
              </p>
            </div>
          </div>
          <div id="website-redesign" className="flex gap-3 scroll-mt-28">
            <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-[#3838f9]" />
            <div>
              <h3 className="mb-2 text-[1.5rem] font-medium text-black">
                Website Redesign
              </h3>
              <p className="text-[1.125rem] leading-[1.6] text-black">
                {websiteRedesignText}
              </p>
            </div>
          </div>
          <div id="development" className="flex gap-3 scroll-mt-28">
            <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-[#3838f9]" />
            <div>
              <h3 className="mb-2 text-[1.5rem] font-medium text-black">
                Development
              </h3>
              <p className="text-[1.125rem] leading-[1.6] text-black">
                {developmentText}
              </p>
            </div>
          </div>
        </div>
      </section>
      {secondImageUrl ? (
        <section className="container py-12">
          <div className="relative mx-auto aspect-video w-full max-w-[56rem] overflow-hidden rounded-lg bg-[#1f1f1f]">
            <Image
              src={secondImageUrl}
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 896px) 100vw, 56rem"
            />
          </div>
        </section>
      ) : null}
      <section id="reporting" className="container scroll-mt-28 py-8">
        <h2 className="mb-2 text-[1.5rem] font-medium text-black">
          Reporting & Monitoring
        </h2>
        <p className="max-w-[48rem] text-[1.125rem] leading-[1.6] text-black">
          Ongoing reporting and monitoring to track performance and iterate.
        </p>
      </section>
      <section
        id="key-metrics"
        className="container scroll-mt-28 py-16 lg:py-20"
      >
        <h2 className="mb-6 text-[1.5rem] font-medium leading-none text-black">
          Key metrics
        </h2>
        <div className="max-w-[48rem] rounded-[0.625rem] border border-[#e5e7eb] bg-white p-6 sm:p-8">
          <p className="mb-8 text-[1.125rem] leading-[1.6] text-black">
            {metricsIntro}
          </p>
          <div className="flex flex-wrap gap-4">
            {metrics.map((m, i) => (
              <div
                key={i}
                className="min-w-[6.25rem] rounded-lg bg-[#f1f1f1] px-4 py-3 text-center"
              >
                <span className="text-[1.125rem] font-medium text-black">
                  {m.value}
                </span>
                {m.label ? (
                  <span className="mt-1 block text-[0.875rem] text-[#6b7280]">
                    {m.label}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="results" className="container scroll-mt-28 py-16 lg:py-20">
        <h2 className="mb-4 text-[1.5rem] font-medium leading-none text-black">
          Results
        </h2>
        <p className="max-w-[48rem] text-[1.125rem] leading-[1.6] text-black">
          {results}
        </p>
      </section>
      <section
        id="client-review"
        className="container scroll-mt-28 py-16 pb-24 lg:py-20"
      >
        <div className="mb-4 flex gap-3">
          <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-[#3838f9]" />
          <h2 className="text-[1.5rem] font-medium leading-none text-black">
            Client review
          </h2>
        </div>
        <p className="mb-8 max-w-[48rem] text-[1.125rem] leading-[1.6] text-black">
          {clientReview}
        </p>
        <div className="relative mx-auto flex aspect-video max-w-[42rem] items-center justify-center overflow-hidden rounded-lg bg-[#1f1f1f]">
          {thumbUrl ? (
            <Image
              src={thumbUrl}
              alt="Video thumbnail"
              fill
              className="object-cover"
              sizes="42rem"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
          )}
          {videoUrl ? (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 flex size-16 items-center justify-center rounded-full bg-white/90 transition-colors hover:bg-white sm:size-20"
              aria-label="Play client review video"
            >
              <div className="ml-1 h-0 w-0 border-y-[10px] border-y-transparent border-l-[14px] border-l-black" />
            </a>
          ) : (
            <div
              className="relative z-10 flex size-16 cursor-default items-center justify-center rounded-full bg-white/90 sm:size-20"
              aria-hidden
            >
              <div className="ml-1 h-0 w-0 border-y-[10px] border-y-transparent border-l-[14px] border-l-black" />
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
