"use client";

import { EmployeeVideoDialog } from "@/components/section/Careers/EmployeeVideoDialog";

const VIDEOS = [
  {
    thumbnailSrc: "/employees-video-thumb.png",
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    dialogTitle: "Employee testimonial — first video",
    dialogDescription:
      "Video of an employee speaking about working at the company.",
    playLabel: "Play first employee video",
  },
  {
    thumbnailSrc: "/employees-video-thumb-2.png",
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    dialogTitle: "Employee testimonial — second video",
    dialogDescription:
      "Video of an employee speaking about working at the company.",
    playLabel: "Play second employee video",
  },
] as const;

const OurEmployees = () => {
  return (
    <section className="sm:pb-10 relative isolate overflow-hidden">
      <div className="container">
        <div className="max-w-166 mx-auto flex flex-col justify-center items-center gap-5 mb-8.75">
          <h2 className="md:text-2xl text-xl font-medium text-center leading-none">
            Hear From Our Employees
          </h2>
          <p className="md:text-body text-xsm text-center max-w-134">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatemaccu
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-3.5 w-fit mx-auto">
          {VIDEOS.map((item) => (
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
