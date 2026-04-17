import LatestBlogs from "@/components/section/Blogs/Latest-Blogs";
import { ScheduleCallForm } from "@/components/ui/schedule-call-form";
import { stripHtmlForTitle } from "@/lib/strip-html-for-title";
import { localeToWpLang } from "@/lib/wp-lang";
import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { envSocialUrls, socialHref } from "@/lib/social-links";
import { notFound } from "next/navigation";
import { FaLinkedin } from "react-icons/fa6";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; blog_slug: string }>;
}): Promise<Metadata> {
  const { locale, blog_slug } = await params;
  const wpLang = localeToWpLang(locale);
  const res = await fetch(
    `https://backend.onlinemarketingbakery.nl/wp-json/wp/v2/posts?slug=${encodeURIComponent(blog_slug)}&_embed&lang=${wpLang}`,
    { next: { revalidate: 60 } },
  );
  if (!res.ok) notFound();
  const data = await res.json();
  const post = Array.isArray(data) ? data[0] : null;
  if (!post) notFound();
  const title = stripHtmlForTitle(post.title?.rendered);
  if (!title) notFound();
  return { title };
}

const page = async ({
  params,
}: {
  params: Promise<{ locale: string; blog_slug: string }>;
}) => {
  const { locale, blog_slug } = await params;
  setRequestLocale(locale);
  const wpLang = localeToWpLang(locale);

  const getData = async () => {
    const res = await fetch(
      `https://backend.onlinemarketingbakery.nl/wp-json/wp/v2/posts?slug=${encodeURIComponent(blog_slug)}&_embed&lang=${wpLang}`,
    );
    const data = await res.json();
    if (res.status === 200) {
      return data[0];
    } else {
      notFound();
    }
  };

  const data = await getData();
  const tBlog = await getTranslations("BlogPostPage");
  const rubinLinkedIn = socialHref(envSocialUrls.linkedinRubin);
  const date = new Date(data.date);
  const dateLocale = locale === "nl" ? "nl-NL" : "en-GB";
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
      date.toLocaleDateString(dateLocale, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }) || "",

    blogDetails: data.content?.rendered || "",

    blogExcerpt: data.excerpt?.rendered || "",

    blogCategories: categories.map((cat: any) => cat.name),
  };

  const textStyling =
    "xl:[&_h1]:text-5xl [&_h1]:text-2xl xl:[&_h2]:text-3xl [&_h2]:text-xl xl:[&_h3]:text-2xl [&_h3]:text-xl xl:[&_h4]:text-xl [&_h4]:text-lg xl:[&_h5]:text-lg [&_h5]:text-md xl:[&_h6]:text-md [&_h6]:text-sm xl:[&_li]:text-sm [&_li]:text-xsm xl:[&_p]:text-body [&_p]:text-xsm [&_h1]:font-bold [&_h2]:font-semibold [&_h3]:font-semibold **:leading-none [&_p]:leading-tight lg:[&_p]:mb-4 [&_p]:mb-2 [&_p]:mt-2";

  return (
    <>
      <section className="sm:pt-52.5 pt-28">
        <div className="container">
          <div className="flex lg:flex-row flex-col-reverse justify-between items-start border-b border-black/20 sm:mb-15 mb-7 sm:pb-15 pb-7">
            <h1 className="xl:text-5xl sm:text-3xl text-xl font-bold leading-none">
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
                  alt={tBlog("avatarAlt")}
                  width={88}
                  height={88}
                />
                <div>
                  <a
                    className="flex gap-2.5 items-center leading-none sm:text-md text-sm"
                    href={rubinLinkedIn.href}
                    target={rubinLinkedIn.target}
                    rel={rubinLinkedIn.rel}
                  >
                    Rubin Koot{" "}
                    <span className="text-primary">
                      <FaLinkedin />
                    </span>
                  </a>
                  <a
                    className="text-black/40 sm:text-body text-xsm"
                    href="mailto:rubin@onlinemarketingbakery.nl"
                  >
                    rubin@onlinemarketingbakery.nl
                  </a>
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
