import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import Pill from "@/components/ui/pill";
import { getTranslations } from "next-intl/server";

const Reviews = async () => {
  const t = await getTranslations("Reviews");
  return (
    <section>
      <div className="container">
        <div className="flex lg:flex-row flex-col justify-between xl:gap-34 lg:gap-20 gap-6">
          <div>
            <Pill iconColor="#3838F9" className="text-primary">
              {t("pill")}
            </Pill>
          </div>
          <h3 className="sm:text-2xl text-xl font-semibold leading-none lg:max-w-106.5">
            {t("title")}{" "}
            <span className="text-primary">{t("titleAccent")}</span>
          </h3>
          <div className="max-w-79 flex flex-col items-start gap-7.5">
            <AnimatedButton
              href="/blogs"
              size={"icon"}
              trailingContent={<AnimatedArrowIcon />}
            >
              {t("cta")}
            </AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
