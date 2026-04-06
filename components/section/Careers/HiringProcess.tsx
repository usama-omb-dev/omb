"use client";

import { useTranslations } from "next-intl";

const HiringProcess = () => {
  const t = useTranslations("HiringProcess");

  const steps = [
    { n: 1, title: t("step1Title") },
    { n: 2, title: t("step2Title") },
    { n: 3, title: t("step3Title") },
    { n: 4, title: t("step4Title") },
  ];

  return (
    <section className="md:pb-37.5 pb-7.5">
      <div className="container">
        <div className="bg-white rounded-[1.25rem] lg:py-10 py-4 lg:px-11.25 px-4 flex flex-col gap-7.5 ">
          <div className="max-w-166 mx-auto flex flex-col justify-center items-center gap-5">
            <h2 className="md:text-2xl text-xl font-medium text-center leading-none">
              {t("title")}
            </h2>
            <p className="md:text-body text-xsm text-center max-w-134">
              {t("intro")}
            </p>
          </div>
          <div className="w-full xl:p-6 sm:rounded-[2.5rem] rounded-[1.25rem] flex flex-col md:flex-row gap-3.5 ">
            <div className="bg-secondary xl:p-10 md:p-8 p-4 sm:rounded-[1.25rem] rounded-[0.625rem] overflow-hidden flex flex-col md:gap-8 gap-4 bg-cover bg-center bg-no-repeat w-full">
              {steps.map((step, index) => (
                <div
                  key={step.n}
                  className={
                    index < steps.length - 1
                      ? "flex flex-col gap-4 border-b border-[#D9D9D9] md:pb-8 pb-4 lg:pr-14"
                      : "flex flex-col gap-4 lg:pr-14"
                  }
                >
                  <div className="flex flex-col md:flex-row md:items-center items-start gap-3">
                    <span className="text-white font-medium text-[20px] leading-none bg-primary rounded-[8px] px-4 py-3">
                      {t("stepLabel", { n: step.n })}
                    </span>
                    <h3 className="text-md font-medium leading-none">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-body">{t("stepBody")}</p>
                </div>
              ))}
            </div>
            <div
              style={{
                backgroundImage: `url(/hiring-process-1.png)`,
              }}
              className="bg-secondary sm:p-10 p-4 sm:rounded-[1.25rem] rounded-[0.625rem] overflow-hidden flex flex-col sm:gap-15 gap-6 bg-cover bg-center bg-no-repeat sm:min-h-100 min-h-[15.625rem] md:max-w-[512px] w-full"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HiringProcess;
