import CaseStudiesListingHero from "@/components/section/CaseStudies/CaseStudiesListingHero";
import CaseStudiesList from "@/components/section/CaseStudies/CaseStudies-List";
import { fetchCaseStudyCount } from "@/lib/api";
import { loadMessagesJson } from "@/lib/load-messages";
import { localeToWpLang } from "@/lib/wp-lang";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await loadMessagesJson(locale);
  return {
    title:
      messages.PageTitles?.caseStudiesListing ??
      messages.Nav?.caseStudies ??
      "Case studies",
  };
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const publishedCaseStudyCount = await fetchCaseStudyCount(
    localeToWpLang(locale),
  );

  return (
    <>
      <CaseStudiesListingHero
        publishedCaseStudyCount={publishedCaseStudyCount}
      />
      <CaseStudiesList />
    </>
  );
}
