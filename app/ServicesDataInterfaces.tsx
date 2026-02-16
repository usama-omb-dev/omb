import { ReactNode } from "react";

export interface ServicePageSection {
  url: string;
  featuredImage: string;
  heroData: HeroDataSection;
  whatWeDo?: WhatWeDoSection;
  difference?: DifferenceSection;
  ourWork?: OurWorkSection;
  caseStudies?: {
    showSection: boolean;
    slides: CaseStudiesSection[];
  };
}
export interface HeroDataSection {
  pillTitle: string;
  mainTitle: ReactNode;
  heroImage: string;
  details: string;
  leftSmallImage?: string;
  rightSmallImage?: string;
}
export interface WhatWeDoSection {
  showSection: boolean;
  pillTitle: string;
  workTitle: ReactNode;
  workDetails: string;
  workImage: string;
  allWorks?: WorkCollapseSection[];
}
export interface WorkCollapseSection {
  collapseTitle: string;
  collapseDetails: string;
}
export interface DifferenceSection {
  showSection: boolean;
  pillTitle: string;
  differenceTitle: ReactNode;
  differenceSummary: string;
  differenceDetails: DifferenceDetailsSection;
  differenceButton: Button;
}
export interface DifferenceDetailsSection {
  summary1: DifferenceSummaryArray;
  summary2: DifferenceSummaryArray;
}
export interface DifferenceSummaryArray {
  featuredImage: string;
  summaryHeading: ReactNode;
  summaryPoints: string[];
}
export interface OurWorkSection {
  showSection: boolean;
  pillTitle: string;
  ourWorkTitle: string;
  workBookingButton: Button;
  workSlider?: WorkSlider;
  featuredCaseStudy?: FeaturedCaseStudySection;
}
export interface WorkSlider {
  workSlider1?: string[];
  workSlider2?: string[];
  workSlider3?: string[];
  workSlider4?: string[];
}
export interface CaseStudiesSection {
  // showSection: boolean;
  featuredImage: string;
  companyLogo: string;
  caseStudySummary: string;
  workImplemented: string[];
  caseStudyButton: Button;
}
export interface Button {
  btnLabel: string;
  btnUrl: string;
}
export interface FeaturedCaseStudySection extends CaseStudiesSection {
  showSection: boolean;
}
