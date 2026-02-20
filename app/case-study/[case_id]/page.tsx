import { notFound } from "next/navigation";
import CaseStudyDetailLayout from "./CaseStudyDetailLayout";

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ case_id: string }>;
}) {
  const { case_id } = await params;

  let data = null;
  try {
    const res = await fetch(
      `https://backend.onlinemarketingbakery.nl/wp-json/wp/v2/case-study?slug=${encodeURIComponent(case_id)}&_embed&lang=en`,
      { next: { revalidate: 60 } },
    );
    if (res.ok) {
      const json = await res.json();
      const raw = Array.isArray(json) ? json[0] : json;
      if (raw && typeof raw === "object") {
        data = raw;
      }
    }
  } catch {}

  console.log("data", data);

  if (!data && process.env.NODE_ENV === "production") {
    notFound();
  }

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
      keys:
        | {
            label: string | null;
            value: string | null;
          }[]
        | null;
    } | null;

    clientReviews: {
      review: string | null;
      video: string | null;
    } | null;
  }

  const caseStudyDatStructured: CaseStudyStructured = {
    companyLogo: {
      imageUrl: data.acf.case_study_informations.company_logo.url,
      imageAlt: data.acf.case_study_informations.company_logo.title,
    },
    title: data.title.rendered,
    featuredImage: {
      imageUrl: data["_embedded"]["wp:featuredmedia"][0].source_url,
      imageAlt: data["_embedded"]["wp:featuredmedia"][0].slug,
    },
    content: data.content.rendered,
    beforeAfterImages: {
      beforeImage: {
        imageUrl: data.acf.before_image.url,
        imageAlt: data.acf.before_image.filename,
      },
      afterImage: {
        imageUrl: data.acf.after_image.url,
        imageAlt: data.acf.after_image.filename,
      },
    },
    keyMatrics: {
      heading: data.acf.new_key_matrics.heading,
      details: data.acf.new_key_matrics.details,
      keys:
        data.acf.new_key_matrics.key_matrics.length > 0
          ? data.acf.new_key_matrics.key_matrics.map((item: any) => {
              return {
                label: item.key_matric_heading,
                value: item.key_matric_value,
              };
            })
          : [],
    },
    clientReviews: {
      review: data.acf.client_reviews.client_review,
      video: data.acf.client_reviews.review_video.url,
    },
  };

  return <CaseStudyDetailLayout caseStudyData={caseStudyDatStructured} />;
}
