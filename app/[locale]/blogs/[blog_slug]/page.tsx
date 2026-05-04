import LatestBlogs from "@/components/section/Blogs/Latest-Blogs";
import BlogPostHero from "@/components/section/Blogs/BlogPostHero";
import { SidebarLeadForm } from "@/components/sidebar-lead-form";
import { getSidebarOmbFormProps } from "@/lib/omb-form-builder";
import { estimateReadingTimeMinutes } from "@/lib/blog-reading-time";
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
  const sidebarOmb = getSidebarOmbFormProps("blog");
  const date = new Date(data.date);
  const dateLocale = locale === "nl" ? "nl-NL" : "en-GB";
  const featuredMedia = data._embedded?.["wp:featuredmedia"]?.[0];
  const categories = data._embedded?.["wp:term"]?.[0] || [];

  const readingMinutes = estimateReadingTimeMinutes(
    data.content?.rendered || "",
  );

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
    "[&_h1]:scroll-mt-10 [&_h2]:scroll-mt-10 [&_h3]:scroll-mt-10 [&_h4]:scroll-mt-10 [&_h5]:scroll-mt-10 [&_h6]:scroll-mt-10 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:mb-4 sm:[&_h1]:text-2xl sm:[&_h1]:mb-5 xl:[&_h1]:text-3xl [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:leading-snug [&_h2]:mb-3 sm:[&_h2]:text-xl sm:[&_h2]:mb-4 xl:[&_h2]:text-2xl [&_h3]:text-base [&_h3]:font-semibold [&_h3]:leading-snug [&_h3]:mb-3 sm:[&_h3]:text-lg xl:[&_h3]:text-xl [&_h4]:text-base [&_h4]:font-semibold [&_h4]:leading-snug [&_h4]:mb-2 [&_h5]:text-sm [&_h5]:font-semibold [&_h5]:leading-normal [&_h5]:mb-2 [&_h6]:text-xsm [&_h6]:font-semibold [&_h6]:leading-normal [&_h6]:mb-2 [&_p]:text-xsm [&_p]:leading-relaxed [&_p]:text-foreground/90 [&_p]:mb-4 sm:[&_p]:text-sm [&_li]:text-xsm [&_li]:leading-relaxed sm:[&_li]:text-sm [&_ul]:my-3 [&_ol]:my-3 [&_li]:mb-1.5 [&_a]:text-primary [&_a]:underline";

  return (
    <>
      <BlogPostHero
        titleHtml={transformPostToBlogSummary.title}
        excerptHtml={transformPostToBlogSummary.blogExcerpt}
        blogDate={transformPostToBlogSummary.blogDate}
        publishedIso={new Date(data.date).toISOString()}
        readingTimeLabel={tBlog("readingTime", { count: readingMinutes })}
      />
      <section className="bg-background pt-8 sm:pt-12 lg:pb-37.5 lg:pt-14 pb-10">
        <div className="container">
          <div className="flex xl:flex-row flex-col-reverse xl:gap-32.5 gap-8 relative">
            <div className={`flex flex-col gap-4 ${textStyling}`}>
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: transformPostToBlogSummary?.blogDetails,
                }}
              />
              {transformPostToBlogSummary.featuredImage.imageUrl ? (
                <Image
                  src={transformPostToBlogSummary.featuredImage.imageUrl}
                  alt={transformPostToBlogSummary.featuredImage.imageAlt}
                  width={756}
                  height={361}
                  className="w-full object-cover"
                />
              ) : null}
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
              <SidebarLeadForm
                ombFormId={
                  sidebarOmb && "formId" in sidebarOmb
                    ? sidebarOmb.formId
                    : undefined
                }
                ombFormSlug={
                  sidebarOmb && "formSlug" in sidebarOmb
                    ? sidebarOmb.formSlug
                    : undefined
                }
              />
            </div>
          </div>
        </div>
      </section>
      <LatestBlogs />
    </>
  );
};

export default page;
