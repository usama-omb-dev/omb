"use client";

import Pill from "@/components/ui/pill";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextReveal from "@/components/ui/TextReveal";
import Image from "next/image";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

export type ServicesDifferenceEffectItem = {
  icon: string;
  text: string;
  gif: string;
  span?: string;
};

export type ServicesDifferenceTraditionalItem = {
  icon: string;
  text: string;
  span?: string;
  gif?: string;
};

const TAB_EFFECT = "effect" as const;
const TAB_TRADITIONAL = "traditional" as const;

const ServicesDifference = () => {
  const t = useTranslations("ServicesDifference");

  const data: ServicesDifferenceEffectItem[] = useMemo(
    () => [
      {
        icon: "/white-globe-icon.svg",
        text: t("effect1"),
        span: "lg:row-span-2",
        gif: "/gif-1.gif",
      },
      {
        icon: "/breifing-icon.svg",
        text: t("effect2"),
        gif: "/gif-2.gif",
      },
      {
        icon: "/stock-icon.svg",
        text: t("effect3"),
        span: "lg:row-span-2",
        gif: "/gif-3.gif",
      },
      {
        icon: "/bolt-icon.svg",
        text: t("effect4"),
        gif: "/gif-4.gif",
      },
      {
        icon: "/github-icon.svg",
        text: t("effect5"),
        span: "lg:row-span-2",
        gif: "/gif-5.gif",
      },
      {
        icon: "/slack-icon.svg",
        text: t("effect6"),
        gif: "/gif-6.gif",
      },
    ],
    [t],
  );

  const oldData: ServicesDifferenceTraditionalItem[] = useMemo(
    () => [
      {
        icon: "/white-globe-icon.svg",
        text: t("traditional1"),
        span: "lg:row-span-2",
      },
      {
        icon: "/breifing-icon.svg",
        text: t("traditional2"),
      },
      {
        icon: "/stock-icon.svg",
        text: t("traditional3"),
        span: "lg:row-span-2",
      },
      {
        icon: "/bolt-icon.svg",
        text: t("traditional4"),
      },
      {
        icon: "/github-icon.svg",
        text: t("traditional5"),
        span: "lg:row-span-2",
      },
      {
        icon: "/slack-icon.svg",
        text: t("traditional6"),
      },
    ],
    [t],
  );

  return (
    <section>
      <div className="container">
        <div className="lg:py-[3.5938rem] lg:px-11.25 p-4 bg-white lg:rounded-4xl rounded-[3.5rem] flex flex-col justify-center items-center gap-5 ">
          <div className="max-w-134 flex justify-center items-center flex-col gap-5 mx-auto">
            <Pill iconColor="#3838F9" className="text-primary">
              {t("pill")}
            </Pill>
            <h2 className="text-center sm:text-2xl text-lg font-semibold leading-none">
              <TextReveal>{t("title")}</TextReveal>
            </h2>
            <p className="text-center sm:text-sm text-xsm ">{t("description")}</p>
          </div>
          <Tabs
            className="w-full justify-center items-center gap-7.5"
            defaultValue={TAB_EFFECT}
          >
            <TabsList className="bg-secondary lg:py-2.5 lg:px-3.75 p-2.5 h-auto! lg:rounded-full rounded-[3.5rem] flex [anchor-name:--tabs] isolate">
              <TabsTrigger
                className="text-[#0E0F0C] sm:text-body! text-xsm font-medium! data-[state=active]:text-white! cursor-pointer rounded-full data-[state=active]:bg-primary relative lg:py-4.5 py-3 lg:px-7 px-2.5 [anchor-name:--tab] data-[state=active]:[anchor-name:--active-tab]"
                value={TAB_TRADITIONAL}
              >
                {t("tabTraditional")}
              </TabsTrigger>
              <TabsTrigger
                className="text-[#0E0F0C] sm:text-body! text-xsm font-medium! data-[state=active]:text-white! cursor-pointer rounded-full data-[state=active]:bg-primary relative lg:py-4.5 py-3 lg:px-7 px-2.5 [anchor-name:--tab] data-[state=active]:[anchor-name:--active-tab]"
                value={TAB_EFFECT}
              >
                {t("tabEffect")}
              </TabsTrigger>
            </TabsList>
            <TabsContent
              className="bg-secondary w-full rounded-[2.5rem] lg:p-6 p-4"
              value={TAB_TRADITIONAL}
            >
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-3.5">
                {oldData.map((item, index) => {
                  if (index === 4) {
                    return (
                      <div
                        key="bottom-row"
                        className="lg:col-span-3 sm:col-span-2 grid sm:grid-cols-2 gap-3.5"
                      >
                        {oldData.slice(4).map((bottomItem, innerIndex) => (
                          <div
                            key={`${bottomItem.icon}-${innerIndex}`}
                            className="relative overflow-hidden group isolate sm:rounded-2xl rounded-4xl bg-white xl:p-10 p-5 flex flex-col justify-between xl:min-h-65 lg:min-h-48 min-h-44"
                          >
                            {bottomItem.gif != null ? (
                              <img
                                className="absolute transition-opacity w-full h-full top-0 left-0 object-cover z-10 opacity-0 group-hover:opacity-100"
                                src={bottomItem.gif}
                                alt=""
                              />
                            ) : null}
                            <div className="sm:min-w-16 max-w-10 sm:w-16 w-10 sm:min-h-16 min-h-10 p-2.5 rounded-full bg-primary flex items-center justify-center">
                              <Image
                                alt={t("iconAlt")}
                                width={30}
                                height={30}
                                src={bottomItem.icon}
                              />
                            </div>
                            <p className="mt-6 sm:text-body text-sm font-medium">
                              {bottomItem.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    );
                  }

                  if (index > 4) return null;
                  return (
                    <div
                      key={item.icon}
                      className={`relative overflow-hidden group isolate sm:rounded-2xl rounded-4xl bg-white xl:p-10 p-5 flex flex-col justify-between xl:min-h-59.25 min-h-44 ${item.span ?? ""}`}
                    >
                      {item.gif != null ? (
                        <img
                          className="absolute transition-opacity w-full h-full top-0 left-0 object-cover z-10 opacity-0 group-hover:opacity-100"
                          src={item.gif}
                          alt=""
                        />
                      ) : null}
                      <div className="sm:min-w-16 max-w-10 sm:w-16 w-10 sm:min-h-16 min-h-10 p-2.5 rounded-full bg-primary flex items-center justify-center">
                        <Image
                          alt={t("iconAlt")}
                          width={30}
                          height={30}
                          src={item.icon}
                        />
                      </div>
                      <p className="mt-6 sm:text-body text-sm font-medium">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent
              className="bg-secondary w-full rounded-[2.5rem] lg:p-6 p-4"
              value={TAB_EFFECT}
            >
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-3.5">
                {data.map((item, index) => {
                  if (index === 4) {
                    return (
                      <div
                        key="bottom-row"
                        className="lg:col-span-3 sm:col-span-2 grid sm:grid-cols-2 gap-3.5"
                      >
                        {data.slice(4).map((bottomItem, innerIndex) => (
                          <div
                            key={`${bottomItem.icon}-${innerIndex}`}
                            className="relative overflow-hidden group isolate sm:rounded-2xl rounded-4xl bg-white xl:p-10 p-5 flex flex-col justify-between xl:min-h-65 lg:min-h-48 min-h-44"
                          >
                            <img
                              className="absolute transition-opacity w-full h-full top-0 left-0 object-cover z-10 opacity-0 group-hover:opacity-100"
                              src={bottomItem.gif}
                              alt=""
                            />
                            <div className="sm:min-w-16 max-w-10 sm:w-16 w-10 sm:min-h-16 min-h-10 p-2.5 rounded-full bg-primary flex items-center justify-center">
                              <Image
                                alt={t("iconAlt")}
                                width={30}
                                height={30}
                                src={bottomItem.icon}
                              />
                            </div>
                            <p className="mt-6 sm:text-body text-sm font-medium">
                              {bottomItem.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    );
                  }

                  if (index > 4) return null;
                  return (
                    <div
                      key={item.icon}
                      className={`relative overflow-hidden group isolate sm:rounded-2xl rounded-4xl bg-white xl:p-10 p-5 flex flex-col justify-between xl:min-h-59.25 min-h-44 ${item.span ?? ""}`}
                    >
                      <img
                        className="absolute transition-opacity w-full h-full top-0 left-0 object-cover z-10 opacity-0 group-hover:opacity-100"
                        src={item.gif}
                        alt=""
                      />
                      <div className="sm:min-w-16 max-w-10 sm:w-16 w-10 sm:min-h-16 min-h-10 p-2.5 rounded-full bg-primary flex items-center justify-center">
                        <Image
                          alt={t("iconAlt")}
                          width={30}
                          height={30}
                          src={item.icon}
                        />
                      </div>
                      <p className="mt-6 sm:text-body text-sm font-medium">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ServicesDifference;
