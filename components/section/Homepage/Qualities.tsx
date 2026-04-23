"use client";
import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import TextReveal from "@/components/ui/TextReveal";
import { Link } from "@/i18n/navigation";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { useIsDesktop } from "@/hooks/isDesktop";
import { useServices } from "@/hooks/useServices";
import { stripHtmlToText } from "@/lib/strip-html-for-title";
import { useTranslations } from "next-intl";

type WpServiceRow = {
  slug: string;
  menu_order?: number;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  acf?: {
    "hero-data"?: {
      details?: string;
    };
  };
};

function serviceRecipeDescription(item: WpServiceRow): string {
  const fromExcerpt = stripHtmlToText(item.excerpt?.rendered);
  if (fromExcerpt) return fromExcerpt;
  const fromHero = stripHtmlToText(item.acf?.["hero-data"]?.details);
  if (fromHero) return fromHero;
  const fromContent = stripHtmlToText(item.content?.rendered);
  if (!fromContent) return "";
  return fromContent.length > 280
    ? `${fromContent.slice(0, 277)}…`
    : fromContent;
}

const Qualities = () => {
  const t = useTranslations("Qualities");
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const { data: servicesRaw, isLoading } = useServices();

  const recipeServices = useMemo(() => {
    if (!Array.isArray(servicesRaw)) return [];
    const rows = [...(servicesRaw as WpServiceRow[])].sort((a, b) => {
      const ao = typeof a.menu_order === "number" ? a.menu_order : 0;
      const bo = typeof b.menu_order === "number" ? b.menu_order : 0;
      if (ao !== bo) return ao - bo;
      return stripHtmlToText(a.title?.rendered).localeCompare(
        stripHtmlToText(b.title?.rendered),
      );
    });
    return rows.map((item) => {
      const title = stripHtmlToText(item.title?.rendered);
      return {
        title: title || item.slug,
        description: serviceRecipeDescription(item),
        href: `/services/${item.slug}` as const,
      };
    });
  }, [servicesRaw]);

  const steps = useMemo(
    () => [
      {
        id: 1,
        title: t("step1Title"),
        description: t("step1Body"),
      },
      {
        id: 2,
        title: t("step2Title"),
        description: t("step2Body"),
      },
      {
        id: 3,
        title: t("step3Title"),
        description: t("step3Body"),
      },
      {
        id: 4,
        title: t("step4Title"),
        description: t("step4Body"),
      },
    ],
    [t],
  );

  return (
    <section ref={mainContainerRef} className=" relative">
      <div className="container">
        <div className="flex gap-9.25 lg:flex-row flex-col">
          <div className="xl:max-w-95 lg:max-w-60 w-full">
            <div className="lg:sticky mx-auto xl:h-[550px] h-[400px] top-10 left-0">
              <Canvas camera={{ position: [1.5, 0, 1], fov: 70 }}>
                <ambientLight intensity={1} />
                <directionalLight position={[2, 2, 5]} />
                <Model mainContainer={mainContainerRef} />
                {isDesktop && <OrbitControls enableZoom={false} />}
              </Canvas>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-7.5">
            <div className="xl:py-15.75 xl:pl-15 sm:p-10 sm:pr-40.75 p-4 bg-white rounded-[0.625rem] flex flex-col sm:gap-10 gap-4">
              <h3 className="sm:text-2xl text-xl leading-none font-semibold 2xl:max-w-[65%]">
                <TextReveal>{t("storyTitle")}</TextReveal>
              </h3>
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="flex flex-col gap-3.75 sm:max-w-154"
                >
                  <h5 className="font-bold sm:text-lg text-md leading-none">
                    <span className="text-primary">
                      {t("stepPrefix")} {step.id}:
                    </span>{" "}
                    {step.title}
                  </h5>
                  <p className="sm:text-body text-xsm">{step.description}</p>
                </div>
              ))}

              <AnimatedButton
                href="/contact"
                size={"icon"}
                variant={"secondary"}
                className="lg:mt-17"
                trailingContent={<AnimatedArrowIcon />}
              >
                {t("ctaFire")}
              </AnimatedButton>
            </div>
            <div className="xl:py-15.75 xl:pl-15 sm:p-10 sm:pr-40.75 p-4 bg-white rounded-[0.625rem] flex flex-col sm:gap-10 gap-4">
              <h3 className="sm:text-2xl text-xl leading-none font-semibold 2xl:max-w-[65%]">
                <TextReveal>{t("recipeTitle")}</TextReveal>
              </h3>
              {!isLoading &&
                recipeServices.map((service) => (
                  <div
                    key={service.href}
                    className="flex flex-col sm:gap-3.75 gap-2 max-w-154"
                  >
                    <h5 className="font-bold sm:text-lg text-md leading-none">
                      <Link href={service.href} className="text-primary">
                        {service.title}
                      </Link>
                    </h5>
                    {service.description ? (
                      <p className="sm:text-body text-xsm">
                        {service.description}
                      </p>
                    ) : null}
                  </div>
                ))}

              <AnimatedButton
                href="/contact"
                size={"icon"}
                variant={"secondary"}
                trailingContent={<AnimatedArrowIcon />}
              >
                {t("ctaCurious")}
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualities;
