"use client";

import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import Pill from "@/components/ui/pill";
import Image from "next/image";
import { useTranslations } from "next-intl";

const ROLE_MAP: Record<
  string,
  "owner" | "digitalMarketer" | "uiUxDesigner" | "contentMarketer" | "copywriter"
> = {
  Owner: "owner",
  "Digital Marketer": "digitalMarketer",
  "Ui/UX Designer": "uiUxDesigner",
  "UI/UX Designer": "uiUxDesigner",
  "Content Marketeer": "contentMarketer",
  Copywriter: "copywriter",
};

const MarketingTeam = () => {
  const t = useTranslations("MarketingTeam");
  const tRoles = useTranslations("MarketingTeam.roles");

  const marketingTeam = [
    {
      title: "Rubin Koot",
      profileImage: "/rubin-koot.png",
      designation: "Owner",
    },
    {
      title: "Zhou Yi",
      profileImage: "/zhou-yi.png",
      designation: "Digital Marketer",
    },
    {
      title: "Didi Houben",
      profileImage: "/didi-houben.png",
      designation: "Content Marketeer",
    },
  ];

  function roleLabel(designation: string) {
    const key = ROLE_MAP[designation];
    return key ? tRoles(key) : designation;
  }

  return (
    <section>
      <div className="container">
        <div className="bg-white xl:py-20 xl:px-27.5 lg:py-16 sm:py-8 lg:px-16 sm:px-8 p-4 rounded-4xl flex flex-col lg:gap-20 gap-10">
          <div className="flex flex-col items-center justify-center self-center lg:gap-7.5 gap-5 max-w-118.5">
            <Pill iconColor="#3838F9">{t("pill")}</Pill>
            <h3 className="text-center font-semibold sm:text-2xl text-lg leading-none">
              {t("titleBefore")} <span className="italic">{t("titleItalic")}</span>{" "}
              {t("titleMid")}{" "}
              <span className="text-primary">{t("titleAccent")}</span>
            </h3>
          </div>
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-x-3.5 sm:gap-y-10 gap-4">
            {marketingTeam.map((item, index) => (
              <div key={`${item.title}-${index}`} className="flex flex-col gap-5 ">
                <Image
                  src={item.profileImage}
                  alt={item.title}
                  width={206}
                  height={265}
                  className="rounded-[0.625rem] w-full"
                  unoptimized
                />
                <div className="flex flex-col gap-2.5">
                  <h6 className="font-semibold text-md leading-none">
                    {item.title}
                  </h6>

                  <span className="text-black/40 sm:text-body text-sm leading-none">
                    {roleLabel(item.designation)}
                  </span>
                </div>
              </div>
            ))}
            <div className="bg-primary p-5 rounded-[0.625rem] flex flex-col gap-6 h-fit">
              <h6 className="text-white font-semibold text-md pr-14 leading-none">
                {t("ctaTitle")} <span className="italic">{t("ctaTitleItalic")}</span>{" "}
                {t("ctaTitleAfter")}
              </h6>
              <p className="text-white">{t("ctaBody")}</p>
              <AnimatedButton
              href="/careers"
                size={"icon"}
                className=""
                trailingContent={<AnimatedArrowIcon />}
              >
                {t("ctaButton")}
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingTeam;
