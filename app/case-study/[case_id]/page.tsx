import { notFound } from "next/navigation";
import CaseStudyDetailLayout from "./CaseStudyDetailLayout";
import {
  mapCaseStudyApiToLayoutProps,
  type CaseStudyApiResponse,
} from "./types";

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ case_id: string }>;
}) {
  const { case_id } = await params;

  let data: CaseStudyApiResponse | null = null;
  try {
    const res = await fetch(
      `https://backend.onlinemarketingbakery.nl/wp-json/wp/v2/case-study?slug=${encodeURIComponent(case_id)}&_embed`,
      { next: { revalidate: 60 } }
    );
    if (res.ok) {
      const json = await res.json();
      const raw = Array.isArray(json) ? json[0] : json;
      if (raw && typeof raw === "object") {
        data = raw as CaseStudyApiResponse;
      }
    }
  } catch {
    // use layout defaults if API fails
  }

  if (!data && process.env.NODE_ENV === "production") {
    notFound();
  }

  const caseStudyData = mapCaseStudyApiToLayoutProps(data);

  return <CaseStudyDetailLayout data={caseStudyData} />;
}
