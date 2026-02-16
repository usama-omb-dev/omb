import Image from "next/image";
import { ArrowRight } from "./icons";

interface WhatWeDoItem {
  collapseTitle?: string;
  collapseDetails?: string;
}

const ServiceCollapse = ({ collapseData }: { collapseData: WhatWeDoItem }) => {
  const { collapseTitle, collapseDetails } = collapseData;
  return (
    <div className="bg-white h-full xl:p-7.5 sm:p-5 p-3 rounded-[0.625rem] flex flex-col gap-4 sm:gap-0 justify-between relative isolate perspective-[1000]">
      {!!collapseTitle && (
        <h6 className="sm:text-md text-body font-medium sm:max-w-52.5 leading-none">
          {collapseTitle}
        </h6>
      )}

      <div className="rounded-[0.3125rem] max-w-10 sm:w-10 w-8 sm:h-10 h-8 bg-primary self-end [&>svg]:-rotate-45 flex justify-center items-center">
        <ArrowRight color="white" />
      </div>
    </div>
  );
};

export default ServiceCollapse;
