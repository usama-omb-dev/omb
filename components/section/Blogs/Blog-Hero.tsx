"use client";

import Counter from "@/components/ui/counter";
import Pill from "@/components/ui/pill";
import TextReveal from "@/components/ui/TextReveal";
import Image from "next/image";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { envSocialUrls, socialHref } from "@/lib/social-links";

const BlogHero = () => {
  const t = useTranslations("BlogHero");

  const socialMediaLinks = useMemo(
    () => [
      { icon: <FaFacebookF />, ...socialHref(envSocialUrls.facebook) },
      { icon: <FaInstagram />, ...socialHref(envSocialUrls.instagram) },
      { icon: <FaLinkedinIn />, ...socialHref(envSocialUrls.linkedin) },
    ],
    [],
  );
  return (
    <section className="relative isolate overflow-hidden p-3">
      <div
        style={{ backgroundImage: "url(/gradient-bg-hero.png)" }}
        className="bg-cover bg-no-repeat bg-center flex flex-col gap-16.75"
      >
        <div className="container sm:pt-50 pt-32">
          <div className="flex lg:flex-row flex-col items-center justify-between xl:gap-24 lg:gap-2.5 gap-5">
            <div className="flex flex-col md:gap-10 gap-5">
              <div className="flex flex-col gap-5">
                <Pill iconColor="#3838f9" className="text-primary">
                  {t("pill")}
                </Pill>
                <h1 className="md:text-5xl sm:text-3xl text-2xl text-black leading-none">
                  <TextReveal>{t("title")}</TextReveal>
                </h1>
                <p className="sm:text-body text-xsm text-black max-w-164">
                  {t("intro")}
                </p>
              </div>
              <div className="flex sm:flex-row flex-col gap-3.5">
                <div className="sm:p-6.5 p-3.5 bg-primary rounded-[0.625rem]">
                  <p className="text-white font-medium text-sm pb-2.5">
                    {t("statExperience")}
                  </p>
                  <Counter
                    className="text-white text-2xl font-normal"
                    suffix={"+"}
                  >
                    {6}
                  </Counter>
                </div>
                <div className="sm:p-6.5 p-3.5 bg-primary rounded-[0.625rem]">
                  <p className="text-white font-medium text-sm pb-2.5">
                    {t("statArticles")}
                  </p>
                  <Counter
                    className="text-white text-2xl font-normal"
                    suffix={"+"}
                  >
                    {200}
                  </Counter>
                </div>
              </div>
              <div className="md:mt-5">
                <p className="font-medium text-black sm:text-md text-body leading-none">
                  {t("followLabel")}
                </p>
                <ul className="flex gap-2.5 sm:mt-5 mt-2">
                  {socialMediaLinks.map((item, index) => (
                    <li key={index + 1}>
                      <a
                        className="flex items-center justify-center text-primary bg-white border hover:bg-primary hover:text-white text-md rounded-[5px] size-12 transition-all"
                        href={item.href}
                        target={item.target}
                        rel={item.rel}
                      >
                        {item.icon}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Image
              src={"/blog-hero.png"}
              alt={t("heroImageAlt")}
              width={493}
              height={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
