"use client";

import type { ReactNode } from "react";
import {
  BookIcon,
  CompeteIcon,
  FlexiblyIcon,
  GrafIcon,
} from "@/components/ui/icons";
import Image from "next/image";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

type WhyOmbItem = {
  title: string;
  description: string;
  icon: ReactNode;
};

const WhyOmb = () => {
  const t = useTranslations("WhyOmb");

  const whyOmbList: WhyOmbItem[] = useMemo(
    () => [
      {
        title: t("card1Title"),
        description: t("card1Body"),
        icon: <CompeteIcon />,
      },
      {
        title: t("card2Title"),
        description: t("card2Body"),
        icon: <BookIcon />,
      },
      {
        title: t("card3Title"),
        description: t("card3Body"),
        icon: <GrafIcon />,
      },
      {
        title: t("card4Title"),
        description: t("card4Body"),
        icon: <FlexiblyIcon />,
      },
    ],
    [t],
  );

  return (
    <section>
      <div className="container">
        <div className="flex flex-col gap-5 max-w-[528px] mx-auto text-center mb-11">
          <h2 className="sm:text-2xl text-xl font-semibold leading-none">
            {t("title")}
          </h2>
          <p className="sm:text-body text-sm">{t("intro")}</p>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 sm:gap-3.5 gap-2 sm:auto-rows-[1fr]">
          <div className="sm:row-span-2 sm:col-span-1 lg:col-span-1">
            <Image
              alt={t("imageAlt")}
              width={1440}
              height={613}
              src={"/why-omb.png"}
              className="w-full h-full object-cover rounded-[10px] overflow-hidden"
            />
          </div>
          {whyOmbList.map((item) => (
            <div
              key={item.title}
              className="bg-white h-full xl:p-7.5 sm:p-5 p-3 rounded-[0.625rem] flex flex-col gap-4 justify-between relative isolate perspective-[1000]"
            >
              <span className="rounded-[0.3125rem] max-w-10 sm:w-10 w-8 sm:h-10 h-8 bg-primary self-start flex justify-center items-center">
                {item.icon}
              </span>
              <div className="flex flex-col gap-2.5">
                <h6 className="sm:text-md text-body font-semibold leading-none">
                  {item.title}
                </h6>
                <p className="xl:text-body text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyOmb;
