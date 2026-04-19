import { cn } from "@/lib/utils";
import { stripHtmlToText } from "@/lib/strip-html-for-title";

const GRADIENT =
  "linear-gradient(0deg, rgba(56, 56, 249, 0.44) 0%, rgba(255, 255, 255, 0) 80%)";

const titleClassName =
  "text-center text-balance text-xl font-bold leading-[1.08] sm:text-3xl md:text-4xl lg:text-[3.25rem] lg:leading-[1.06]";

/** WordPress titles may include markup; keep weight consistent when rendering raw HTML. */
const cmsTitleDescendantWeight =
  "[&_p]:font-bold [&_div]:font-bold [&_span]:font-bold [&_strong]:font-bold [&_em]:font-bold [&_a]:font-bold [&_a]:underline";

function splitTitleAtColon(plain: string): {
  primary: string;
  secondary: string | null;
} {
  const idx = plain.indexOf(":");
  if (idx === -1) return { primary: plain, secondary: null };
  const primary = plain.slice(0, idx + 1).trimEnd();
  const secondary = plain.slice(idx + 1).trim();
  if (!secondary) return { primary: plain, secondary: null };
  return { primary, secondary };
}

export type BlogPostHeroProps = {
  titleHtml: string;
  excerptHtml: string;
  blogDate: string;
  publishedIso: string;
  readingTimeLabel: string;
  className?: string;
};

export default function BlogPostHero({
  titleHtml,
  excerptHtml,
  blogDate,
  publishedIso,
  readingTimeLabel,
  className,
}: BlogPostHeroProps) {
  const plainTitle = stripHtmlToText(titleHtml);
  const { primary, secondary } = splitTitleAtColon(plainTitle);
  const excerptPlain = stripHtmlToText(excerptHtml);
  const useColonLayout = Boolean(secondary);

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden pt-28 sm:pt-52.5",
        className,
      )}
      style={{ background: GRADIENT }}
    >
      <div className="container relative mx-auto px-4 pb-2 sm:pb-4 lg:px-0">
        <div className="mx-auto flex max-w-260 flex-col items-center gap-4 pt-2 text-center sm:gap-6 sm:pt-0">
          {useColonLayout ? (
            <h1 className={cn(titleClassName, "[&_em]:italic")}>
              <span className="text-primary">{primary}</span>
              <span className="mt-1.5 block text-black sm:mt-2">
                {secondary}
              </span>
            </h1>
          ) : (
            <h1
              className={cn(
                titleClassName,
                "text-black [&_em]:italic",
                cmsTitleDescendantWeight,
              )}
              dangerouslySetInnerHTML={{ __html: titleHtml }}
            />
          )}

          {excerptPlain ? (
            <p className="max-w-161.5 text-pretty text-xsm font-medium leading-tight text-black sm:text-body">
              {excerptPlain}
            </p>
          ) : null}
        </div>

        <div className="mt-10 flex flex-col gap-2 pb-8 text-xsm font-medium leading-none text-black sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-body sm:pb-10">
          <time dateTime={publishedIso}>{blogDate}</time>
          <span className="sm:text-right">{readingTimeLabel}</span>
        </div>
      </div>
    </section>
  );
}
