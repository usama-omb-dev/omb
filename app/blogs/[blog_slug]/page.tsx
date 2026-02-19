import LatestBlogs from "@/components/section/Blogs/Latest-Blogs";
import { ScheduleCallForm } from "@/components/ui/schedule-call-form";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaLinkedin } from "react-icons/fa6";

const page = async ({ params }: { params: Promise<{ blog_slug: string }> }) => {
  const { blog_slug } = await params;

  const getData = async () => {
    const res = await fetch(
      `https://backend.onlinemarketingbakery.nl/wp-json/wp/v2/posts?slug=${blog_slug}&_embed`,
    );
    const data = await res.json();
    if (res.status === 200) {
      return data[0];
    } else {
      notFound();
    }
  };

  const data = await getData();
  const date = new Date(data.date);
  const featuredMedia = data._embedded?.["wp:featuredmedia"]?.[0];
  const categories = data._embedded?.["wp:term"]?.[0] || [];

  const transformPostToBlogSummary = {
    title: data.title?.rendered || "",

    featuredImage: {
      imageUrl: featuredMedia?.source_url || "",
      imageAlt: featuredMedia?.slug || "",
    },

    blogUrl: data.slug || "",

    blogDate:
      date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }) || "",

    blogDetails: data.content?.rendered || "",

    blogExcerpt: data.excerpt?.rendered || "",

    blogCategories: categories.map((cat: any) => cat.name),
  };

  const textStyling =
    "xl:[&_h1]:text-5xl [&_h1]:text-2xl xl:[&_h2]:text-3xl [&_h2]:text-xl xl:[&_h3]:text-2xl [&_h3]:text-xl xl:[&_h4]:text-xl [&_h4]:text-lg xl:[&_h5]:text-lg [&_h5]:text-md xl:[&_h6]:text-md [&_h6]:text-sm xl:[&_li]:text-sm [&_li]:text-xsm xl:[&_p]:text-body [&_p]:text-xsm [&_h1]:font-medium [&_h2]:font-medium [&_h3]:font-medium **:leading-none [&_p]:leading-tight lg:[&_p]:mb-4 [&_p]:mb-2 [&_p]:mt-2";

  return (
    <>
      <section className="sm:pt-52.5 pt-28">
        <div className="container">
          <div className="flex lg:flex-row flex-col-reverse justify-between items-start border-b border-black/20 sm:mb-15 mb-7 sm:pb-15 pb-7">
            <h1 className="xl:text-5xl sm:text-3xl text-xl font-normal leading-none">
              {transformPostToBlogSummary.title}
            </h1>
            <p className="max-w-82.5 w-full sm:text-body text-xsm mb-2 sm:mb-0 font-medium leading-none text-left">
              {transformPostToBlogSummary.blogDate}
            </p>
          </div>
        </div>
      </section>
      <section className="lg:pb-37.5 pb-10">
        <div className="container">
          <div className="flex xl:flex-row flex-col-reverse xl:gap-32.5 gap-8 relative">
            <div className={`flex flex-col gap-4 ${textStyling}`}>
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: transformPostToBlogSummary?.blogDetails,
                }}
              />
              <Image
                src={transformPostToBlogSummary?.featuredImage.imageUrl}
                alt={transformPostToBlogSummary?.featuredImage.imageAlt}
                width={756}
                height={361}
                className="object-cover w-ful"
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: transformPostToBlogSummary?.blogExcerpt,
                }}
              />
            </div>
            <div className="bg-white sm:py-9 py-4 sm:px-8 px-4 sm:min-w-105 w-full h-fit rounded-[0.625rem] xl:sticky top-10 left-0 shadow-[0px_0px_14px_rgba(0,0,0,5%)]">
              <div className="flex flex-col gap-5 sm:pb-5 pb-3 sm:mb-5 mb-3 border-b border-black/20">
                <Image
                  src={"/rubin-koot-avatar.png"}
                  alt={"Rubin's Avatar"}
                  width={88}
                  height={88}
                />
                <div>
                  <Link
                    className="flex gap-2.5 items-center leading-none sm:text-md text-sm"
                    href={"https://www.linkedin.com/in/rubinkoot"}
                    target="_blank"
                  >
                    Rubin Koot{" "}
                    <span className="text-primary">
                      <FaLinkedin />
                    </span>
                  </Link>
                  <Link
                    className="text-black/40 sm:text-body text-xsm"
                    href={"mailto:rubin@onlinemarketingbakery.nl"}
                  >
                    rubin@onlinemarketingbakery.nl
                  </Link>
                </div>
              </div>
              <ScheduleCallForm />
            </div>
          </div>
        </div>
      </section>
      <LatestBlogs />
    </>
  );
};

export default page;
