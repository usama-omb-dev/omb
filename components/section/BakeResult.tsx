"use client";
import Image from "next/image";
import AnimatedButton from "../ui/button/AnimatedButton";
import AnimatedArrowIcon from "../ui/button/AnimatedArrowIcon";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const BakeResult = () => {
  const pathName = usePathname();
  const t = useTranslations("BakeResult");
  const segments = pathName.split("/").filter(Boolean);

  if (segments.includes("contact")) return;
  const isBlogPost = segments[0] === "blogs" && segments.length > 1;
  return (
    <section className={`pt-10 ${isBlogPost ? "bg-white" : ""}`}
    >
      <div className="  relative isolate">
        <div className="container flex flex-col justify-center items-center ">
          <div className="flex flex-col items-center justify-center gap-7 sm:translate-y-16">
            <h3 className="sm:text-2xl text-lg text-black leading-none font-medium text-center">
              {t("title")}{" "}
              <span className="block italic">{t("titleItalic")}</span>
            </h3>
            <AnimatedButton
              size={"icon"}
              className="  duration-700 "
              trailingContent={<AnimatedArrowIcon />}
            >
              {t("cta")}
            </AnimatedButton>
          </div>
          <Image
            unoptimized
            src={"/footer-top.png"}
            alt={t("footerImageAlt")}
            width={1040}
            height={590}
          />
        </div>
      </div>
    </section>
  );
};

export default BakeResult;
