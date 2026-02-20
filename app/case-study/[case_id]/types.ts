/** Shape of case study API response (WP REST + ACF + _embed) */
export interface CaseStudyApiResponse {
  id?: number;
  slug?: string;
  title?: { rendered?: string };
  content?: { rendered?: string };
  featured_media?: number;
  acf?: {
    before_image?: { url?: string } | false;
    after_image?: { url?: string } | false;
    client_reviews?: {
      client_review?: string;
      review_video?: { url?: string; id?: number } | false;
    };
    featured_case_study?: unknown[];
    case_study_informations?: {
      case_study_summary?: string;
      company_logo?: { url?: string; alt?: string };
      relevant_tags?: { relevancy?: string }[];
      problem_statement_title?: string;
      problem_statement_content?: string;
      problem_section_content?: string;
    };
  };
  _embedded?: {
    "wp:featuredmedia"?: {
      id?: number;
      source_url?: string;
      media_details?: { width?: number; height?: number };
    }[];
  };
}

export function mapCaseStudyApiToLayoutProps(
  data: CaseStudyApiResponse | null
): CaseStudyDetailLayoutProps {
  if (!data) {
    return {};
  }
  const title = data.title?.rendered;
  const embedded = data._embedded;
  const media = embedded?.["wp:featuredmedia"]?.[0];
  const info = data.acf?.case_study_informations;
  const clientReviews = data.acf?.client_reviews;

  return {
    headline: title ?? undefined,
    heroImageUrl: media?.source_url ?? undefined,
    companyLogoUrl: info?.company_logo?.url ?? undefined,
    companyLogoAlt: info?.company_logo?.alt ?? undefined,
    problemStatementTitleHtml: info?.problem_statement_title ?? undefined,
    problemStatementHtml: info?.problem_statement_content ?? (info?.case_study_summary ? `<p>${info.case_study_summary}</p>` : undefined),
    problemSectionHtml: info?.problem_section_content ?? undefined,
    relevantTags:
      info?.relevant_tags?.map((t) => t.relevancy ?? "").filter(Boolean) ?? [],
    clientReviewText: clientReviews?.client_review ?? undefined,
    reviewVideoUrl:
      clientReviews?.review_video &&
      typeof clientReviews.review_video === "object" &&
      "url" in clientReviews.review_video
        ? (clientReviews.review_video as { url?: string }).url
        : undefined,
    secondImageUrl:
      (data.acf?.after_image && typeof data.acf.after_image === "object" && data.acf.after_image.url)
        ? data.acf.after_image.url
        : (data.acf?.before_image && typeof data.acf.before_image === "object" && data.acf.before_image.url)
          ? data.acf.before_image.url
          : undefined,
  };
}

export interface CaseStudyDetailLayoutProps {
  tag?: string;
  headline?: string;
  heroImageUrl?: string;
  companyLogoUrl?: string;
  companyLogoAlt?: string;
  problemStatementTitleHtml?: string;
  problemStatementHtml?: string;
  problemSectionHtml?: string;
  relevantTags?: string[];
  proposedSolutionIntro?: string;
  keyStaff?: string;
  websiteRedesign?: string;
  development?: string;
  secondImageUrl?: string;
  keyMetricsIntro?: string;
  metrics?: { value: string; label?: string }[];
  resultsText?: string;
  clientReviewText?: string;
  reviewVideoUrl?: string;
  videoThumbnailUrl?: string;
}
