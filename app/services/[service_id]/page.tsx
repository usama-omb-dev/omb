import {
  CaseStudiesSection,
  DifferenceSection,
  HeroDataSection,
  OurWorkSection,
  WhatWeDoSection,
} from "@/app/ServicesDataInterfaces";
import Contact from "@/components/section/Contact";
import Difference from "@/components/section/Service/Difference";
import OurWork from "@/components/section/Service/OurWork";
import ServicesHero from "@/components/section/Service/ServicesHero";
import WhatWeDo from "@/components/section/Service/WhatWeDo";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ service_id: string }>;
}) {
  const { service_id } = await params;

  const getData = async () => {
    const res = await fetch(
      `https://backend.onlinemarketingbakery.nl/wp-json/wp/v2/services?slug=${service_id}&_embed`,
    );
    const data = await res.json();
    if (res.status === 200) {
      return data[0];
    } else {
      notFound();
    }
  };

  const data = await getData();

  const heroData: HeroDataSection = {
    pillTitle: data.acf["hero-data"]["pill-title"],
    mainTitle: (
      <div
        dangerouslySetInnerHTML={{
          __html: data.acf["hero-data"]["main-title"],
        }}
      />
    ),
    heroImage: data.acf["hero-data"]["hero-image"]?.url,
    details: data.acf["hero-data"]["details"],
    leftSmallImage: data.acf["hero-data"]["left-small-image"]?.url,
    rightSmallImage: data.acf["hero-data"]["right-small-image"]?.url,
  };

  const whatWeDoData: WhatWeDoSection = {
    showSection: data.acf["what-we-do"]["show-section"],
    pillTitle: data.acf["what-we-do"]["pill-title"],
    workTitle: (
      <div
        dangerouslySetInnerHTML={{
          __html: data.acf["what-we-do"]["work-title"],
        }}
      />
    ),
    workDetails: data.acf["what-we-do"]["work-details"],
    workImage: data.acf["what-we-do"]["work-image"]?.url,
    allWorks: data.acf["what-we-do"]["all-works"]?.map((work: any) => ({
      collapseTitle: work["collapse-title"],
      collapseDetails: work["collapse-details"],
    })),
  };

  const differenceData: DifferenceSection = {
    showSection: data.acf.difference["show-section"],
    pillTitle: data.acf.difference["pill-title"],
    differenceTitle: (
      <div
        dangerouslySetInnerHTML={{
          __html: data.acf.difference["difference-title"] || "",
        }}
      />
    ),
    differenceSummary: data.acf.difference["difference-summary"],

    differenceDetails: {
      summary1: {
        featuredImage:
          data.acf.difference["difference-details"]?.["summary-1"]?.[
            "featured-image"
          ]?.url || "",

        summaryHeading: (
          <div
            dangerouslySetInnerHTML={{
              __html:
                data.acf.difference["difference-details"]?.["summary-1"]?.[
                  "summary-heading"
                ] || "",
            }}
          />
        ),

        summaryPoints:
          data.acf.difference["difference-details"]?.["summary-1"]?.[
            "summary-points"
          ].length > 0
            ? data.acf.difference["difference-details"]?.["summary-1"]?.[
                "summary-points"
              ]?.map((p: any) => p["Summary-Point"])
            : [],
      },

      summary2: {
        featuredImage:
          data.acf.difference["difference-details"]?.["summary-2"]?.[
            "featured-image"
          ]?.url || "",

        summaryHeading: (
          <div
            dangerouslySetInnerHTML={{
              __html:
                data.acf.difference["difference-details"]?.["summary-2"]?.[
                  "summary-heading"
                ] || "",
            }}
          />
        ),

        summaryPoints:
          data.acf.difference["difference-details"]?.["summary-2"]?.[
            "summary-points"
          ].length > 0
            ? data.acf.difference["difference-details"]?.["summary-2"]?.[
                "summary-points"
              ]?.map((p: any) => p["Summary-Point"])
            : [],
      },
    },

    differenceButton: {
      btnLabel: data.acf.difference["difference-button"]?.["btn-label"] || "",
      btnUrl: data.acf.difference["difference-button"]?.["btn-url"] || "",
    },
  };

  const ourWorkData: OurWorkSection = {
    showSection: data.acf["our-work"]["show-section"],
    pillTitle: data.acf["our-work"]["pill-title"],
    ourWorkTitle: data.acf["our-work"]["our-work-title"],

    workBookingButton: {
      btnLabel:
        data.acf["our-work"]["work-booking-button"]?.["btn-label"] || "",
      btnUrl: data.acf["our-work"]["work-booking-button"]?.["btn-url"] || "",
    },

    workSlider: {
      workSlider1: Array.isArray(
        data.acf["our-work"]?.["work-slider"]?.["work-slider-1"],
      )
        ? data.acf["our-work"]["work-slider"]["work-slider-1"].map(
            (item: any) => item?.["Portfolio-image"]?.url || "",
          )
        : [],

      workSlider2: Array.isArray(
        data.acf["our-work"]?.["work-slider"]?.["work-slider-2"],
      )
        ? data.acf["our-work"]["work-slider"]["work-slider-2"].map(
            (item: any) => item?.["Portfolio-image"]?.url || "",
          )
        : [],

      workSlider3: Array.isArray(
        data.acf["our-work"]?.["work-slider"]?.["work-slider-3"],
      )
        ? data.acf["our-work"]["work-slider"]["work-slider-3"].map(
            (item: any) => item?.["Portfolio-image"]?.url || "",
          )
        : [],

      workSlider4: Array.isArray(
        data.acf["our-work"]?.["work-slider"]?.["work-slider-4"],
      )
        ? data.acf["our-work"]["work-slider"]["work-slider-4"].map(
            (item: any) => item?.["Portfolio-image"]?.url || "",
          )
        : [],
    },
  };

  const featuredCaseStudyData: CaseStudiesSection[] =
    data.featured_case_studies.map((item: any) => ({
      featuredImage: item.featured_image_url || "",

      companyLogo: item.acf?.case_study_informations?.company_logo?.url || "",

      caseStudySummary:
        item.acf?.case_study_informations?.case_study_summary || "",

      workImplemented:
        item.acf?.case_study_informations?.relevant_tags.length > 0
          ? item.acf?.case_study_informations?.relevant_tags?.map(
              (tag: any) => tag.relevancy,
            )
          : [],

      caseStudyButton: {
        btnLabel: "View Case Study",
        btnUrl: `/case-study/${item.id}` || "",
      },
    }));

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
      <Contact />
    </>
  );
}
