"use client";

import { EmployeeVideoDialog } from "@/components/section/Careers/EmployeeVideoDialog";
import { useTranslations } from "next-intl";

const OurEmployees = () => {
  const t = useTranslations("OurEmployees");
  const videos = [
    {
      thumbnailSrc: "/employees-video-thumb.png",
      videoSrc:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      dialogTitle: t("video1Title"),
      dialogDescription: t("video1Description"),
      playLabel: t("video1PlayLabel"),
    },
    {
      thumbnailSrc: "/employees-video-thumb-2.png",
      videoSrc:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      dialogTitle: t("video2Title"),
      dialogDescription: t("video2Description"),
      playLabel: t("video2PlayLabel"),
    },
  ] as const;

  return (
    <section className="sm:pb-10 relative isolate overflow-hidden">
      <div className="container">
        <div className="max-w-166 mx-auto flex flex-col justify-center items-center gap-5 mb-8.75">
          <h2 className="md:text-2xl text-xl font-semibold text-center leading-none">
            {t("title")}
          </h2>
          <p className="md:text-body text-xsm text-center max-w-134">
            {t("description")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-3.5 w-fit mx-auto">
          {videos.map((item) => (
            <EmployeeVideoDialog
              key={item.thumbnailSrc}
              thumbnailSrc={item.thumbnailSrc}
              videoSrc={item.videoSrc}
              dialogTitle={item.dialogTitle}
              dialogDescription={item.dialogDescription}
              playLabel={item.playLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurEmployees;
