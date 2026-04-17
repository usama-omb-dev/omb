import {
  CaseStudiesSection,
  DifferenceSection,
  HeroDataSection,
  OurWorkSection,
  WhatWeDoSection,
} from "@/app/ServicesDataInterfaces";
import Contact from "@/components/section/Contact";
import { fetchAPI } from "@/lib/api";
import { stripHtmlForTitle } from "@/lib/strip-html-for-title";
import { localeToWpLang } from "@/lib/wp-lang";
import Difference from "@/components/section/Service/Difference";
import OurWork from "@/components/section/Service/OurWork";
import ServicesHero from "@/components/section/Service/ServicesHero";
import WhatWeDo from "@/components/section/Service/WhatWeDo";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; service_id: string }>;
}): Promise<Metadata> {
  const { locale, service_id } = await params;
  const wpLang = localeToWpLang(locale);
  try {
    const data = await fetchAPI(
      `/services?slug=${encodeURIComponent(service_id)}&_embed`,
      wpLang,
    );
    if (Array.isArray(data) && data[0]) {
      const title = stripHtmlForTitle(
        (data[0] as { title?: { rendered?: string } }).title?.rendered,
      );
      if (title) return { title };
    }
  } catch {
    // fall through to notFound
  }
  notFound();
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

/** ACF repeater / flexible content: NL posts sometimes omit or return a non-array. */
function mapAllWorks(raw: unknown) {
  return asArray<Record<string, unknown>>(raw).map((work) => ({
    collapseTitle: String(work?.["collapse-title"] ?? ""),
    collapseDetails: String(work?.["collapse-details"] ?? ""),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; service_id: string }>;
}) {
  const { locale, service_id } = await params;
  setRequestLocale(locale);
  const wpLang = localeToWpLang(locale);
  const tContact = await getTranslations("ContactSection");
  const tService = await getTranslations("ServicePage");

  const getData = async () => {
    const data = await fetchAPI(
      `/services?slug=${encodeURIComponent(service_id)}&_embed`,
      wpLang,
    );
    if (Array.isArray(data) && data[0]) {
      return data[0];
    }
    notFound();
  };

  const data = await getData();

  const acf = data.acf ?? {};
  const heroAcf = acf["hero-data"] ?? {};
  const whatWeDoAcf = acf["what-we-do"] ?? {};
  const differenceAcf = acf.difference ?? {};
  const ourWorkAcf = acf["our-work"] ?? {};

  const heroData: HeroDataSection = {
    pillTitle: heroAcf["pill-title"] as string | undefined,
    mainTitle: (
      <div
        dangerouslySetInnerHTML={{
          __html: String(heroAcf["main-title"] ?? ""),
        }}
      />
    ),
    heroImage: (heroAcf["hero-image"] as { url?: string } | undefined)?.url,
    details: heroAcf["details"] as string | undefined,
    leftSmallImage: (heroAcf["left-small-image"] as { url?: string } | undefined)
      ?.url,
    rightSmallImage: (
      heroAcf["right-small-image"] as { url?: string } | undefined
    )?.url,
  };

  const whatWeDoData: WhatWeDoSection = {
    showSection: Boolean(whatWeDoAcf["show-section"]),
    pillTitle: String(whatWeDoAcf["pill-title"] ?? ""),
    workTitle: (
      <div
        dangerouslySetInnerHTML={{
          __html: String(whatWeDoAcf["work-title"] ?? ""),
        }}
      />
    ),
    workDetails: String(whatWeDoAcf["work-details"] ?? ""),
    workImage: String(
      (whatWeDoAcf["work-image"] as { url?: string } | undefined)?.url ?? "",
    ),
    allWorks: mapAllWorks(whatWeDoAcf["all-works"]),
  };

  const diffDetails = differenceAcf["difference-details"] as
    | Record<string, unknown>
    | undefined;
  const summary1 = diffDetails?.["summary-1"] as Record<string, unknown> | undefined;
  const summary2 = diffDetails?.["summary-2"] as Record<string, unknown> | undefined;
  const points1 = asArray<{ "Summary-Point"?: string }>(
    summary1?.["summary-points"],
  );
  const points2 = asArray<{ "Summary-Point"?: string }>(
    summary2?.["summary-points"],
  );

  const differenceData: DifferenceSection = {
    showSection: Boolean(differenceAcf["show-section"]),
    pillTitle: String(differenceAcf["pill-title"] ?? ""),
    differenceTitle: (
      <div
        dangerouslySetInnerHTML={{
          __html: String(differenceAcf["difference-title"] ?? ""),
        }}
      />
    ),
    differenceSummary: String(differenceAcf["difference-summary"] ?? ""),

    differenceDetails: {
      summary1: {
        featuredImage: String(
          (summary1?.["featured-image"] as { url?: string } | undefined)?.url ??
            "",
        ),

        summaryHeading: (
          <div
            dangerouslySetInnerHTML={{
              __html: String(summary1?.["summary-heading"] ?? ""),
            }}
          />
        ),

        summaryPoints:
          points1.length > 0
            ? points1.map((p) => String(p?.["Summary-Point"] ?? ""))
            : [],
      },

      summary2: {
        featuredImage: String(
          (summary2?.["featured-image"] as { url?: string } | undefined)?.url ??
            "",
        ),

        summaryHeading: (
          <div
            dangerouslySetInnerHTML={{
              __html: String(summary2?.["summary-heading"] ?? ""),
            }}
          />
        ),

        summaryPoints:
          points2.length > 0
            ? points2.map((p) => String(p?.["Summary-Point"] ?? ""))
            : [],
      },
    },

    differenceButton: {
      btnLabel: String(
        (differenceAcf["difference-button"] as Record<string, string> | undefined)?.[
          "btn-label"
        ] ?? "",
      ),
      btnUrl: String(
        (differenceAcf["difference-button"] as Record<string, string> | undefined)?.[
          "btn-url"
        ] ?? "",
      ),
    },
  };

  const workSlider = ourWorkAcf["work-slider"] as Record<string, unknown> | undefined;

  const ourWorkData: OurWorkSection = {
    showSection: Boolean(ourWorkAcf["show-section"]),
    pillTitle: String(ourWorkAcf["pill-title"] ?? ""),
    ourWorkTitle: String(ourWorkAcf["our-work-title"] ?? ""),

    workBookingButton: {
      btnLabel: String(
        (ourWorkAcf["work-booking-button"] as Record<string, string> | undefined)?.[
          "btn-label"
        ] ?? "",
      ),
      btnUrl: String(
        (ourWorkAcf["work-booking-button"] as Record<string, string> | undefined)?.[
          "btn-url"
        ] ?? "",
      ),
    },

    workSlider: {
      workSlider1: asArray<Record<string, unknown>>(workSlider?.["work-slider-1"]).map(
        (item) =>
          String(
            (item?.["Portfolio-image"] as { url?: string } | undefined)?.url ??
              "",
          ),
      ),

      workSlider2: asArray<Record<string, unknown>>(workSlider?.["work-slider-2"]).map(
        (item) =>
          String(
            (item?.["Portfolio-image"] as { url?: string } | undefined)?.url ??
              "",
          ),
      ),

      workSlider3: asArray<Record<string, unknown>>(workSlider?.["work-slider-3"]).map(
        (item) =>
          String(
            (item?.["Portfolio-image"] as { url?: string } | undefined)?.url ??
              "",
          ),
      ),

      workSlider4: asArray<Record<string, unknown>>(workSlider?.["work-slider-4"]).map(
        (item) =>
          String(
            (item?.["Portfolio-image"] as { url?: string } | undefined)?.url ??
              "",
          ),
      ),
    },
  };

  const featuredCaseStudyData: CaseStudiesSection[] = asArray<Record<string, unknown>>(
    data.featured_case_studies,
  ).map((raw) => {
    const item = raw as {
      slug?: string;
      featured_image_url?: string;
      acf?: {
        case_study_informations?: {
          company_logo?: { url?: string };
          case_study_summary?: string;
          relevant_tags?: unknown;
        };
      };
    };
    const info = item.acf?.case_study_informations;
    const tags = asArray<{ relevancy?: string }>(info?.relevant_tags);
    return {
      featuredImage: item.featured_image_url || "",

      companyLogo: info?.company_logo?.url || "",

      caseStudySummary: info?.case_study_summary || "",

      workImplemented:
        tags.length > 0 ? tags.map((tag) => String(tag?.relevancy ?? "")) : [],

      caseStudyButton: {
        btnLabel: tService("viewCaseStudy"),
        btnUrl: item.slug ? `/case-study/${item.slug}` : "",
      },
    };
  });

  return (
    <>
      <ServicesHero data={heroData} />
      {whatWeDoData.showSection && <WhatWeDo data={whatWeDoData} />}
      {differenceData.showSection && <Difference data={differenceData} />}
      {ourWorkData.showSection && (
        <OurWork
          data={{
            ...ourWorkData,
            featuredCaseStudy: featuredCaseStudyData,
          }}
          pageName={data.title?.rendered}
        />
      )}
      <Contact
        eyebrow={tContact("eyebrow")}
        headline={tContact("headline")}
        paragraph1={tContact("paragraph1")}
        paragraph2={tContact("paragraph2")}
        bulletPoints={[
          tContact("bullet1"),
          tContact("bullet2"),
          tContact("bullet3"),
          tContact("bullet4"),
        ]}
      />
    </>
  );
}
