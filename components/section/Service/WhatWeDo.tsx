import Pill from "@/components/ui/pill";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

interface WhatWeDoItem {
  collapseTitle?: string;
  collapseDetails?: string;
}

interface WhatWeDo {
  pillTitle?: string;
  workTitle?: React.ReactNode;
  workDetails?: string;
  workImage?: string;
  allWorks?: WhatWeDoItem[];
}

const WhatWeDo = ({ data }: { data: WhatWeDo }) => {
  const { pillTitle, workTitle, workDetails, workImage, allWorks } = data;
  return (
    <section className="xl:py-37.5 sm:py-12 py-7.5">
      <div className="container">
        <div className="flex flex-col gap-20">
          <div className="flex md:flex-row flex-col items-start md:gap-5 gap-3">
            <div className="lg:max-w-106.5 max-w-40 w-full">
              {!!pillTitle && <Pill iconColor="#3838F9">{pillTitle}</Pill>}
            </div>
            <div className="max-w-136.5 flex flex-col gap-5">
              {!!workTitle && (
                <h5 className="lg:text-2xl sm:text-xl text-md font-medium  leading-none">
                  {workTitle}
                </h5>
              )}
              {!!workDetails && (
                <p className="sm:text-body text-xsm">{workDetails}</p>
              )}
            </div>
          </div>
          <Accordion type="single" collapsible defaultValue="item-0">
            <div className="grid md:grid-cols-3 sm:grid-cols-2 sm:gap-3.5 gap-2 md:auto-rows-[1fr]">
              {!!workImage && (
                <div className="lg:row-span-3 sm:row-span-2 md:col-span-1 sm:col-span-2 lg:col-span-1">
                  <Image
                    alt="Hero Image"
                    width={1440}
                    height={613}
                    src={workImage}
                    className="h-full object-cover rounded-[10px]"
                  />
                </div>
              )}
              {allWorks?.map((item, index) => {
                if (index === 0) {
                  return (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="bg-white rounded-xl p-5 pb-16 relative xl:flex flex-col gap-5 hidden"
                    >
                      <h4 className="text-md font-medium leading-none">
                        {item.collapseTitle}
                      </h4>

                      <AccordionContent className="2xl:min-h-22 min-h-12.5 2xl:max-h-22 max-h-12.5 overflow-y-scroll text-xsm pb-0!">
                        {item.collapseDetails}
                      </AccordionContent>
                      <AccordionTrigger className="cursor-pointer self-end absolute right-5 bottom-5 ml-auto max-w-10 w-10 h-10 rounded-[5px] bg-primary flex justify-center items-center text-white text-[22px] data-[state=open]:bg-secondary data-[state=open]:text-black [&_.icon-minus]:hidden data-[state=open]:[&_.icon-minus]:block [&_.icon-plus]:block data-[state=open]:[&_.icon-plus]:hidden">
                        <FiPlus className="icon-plus" />
                        <FiMinus className="icon-minus" />
                      </AccordionTrigger>
                    </AccordionItem>
                  );
                }
                if (index === 1) {
                  return (
                    <div
                      key="nested-grid"
                      className="xl:grid hidden grid-cols-2 gap-4"
                    >
                      {[item, allWorks[index + 1]].map(
                        (nestedItem, nestedIndex) => {
                          if (!nestedItem) return null;

                          const actualIndex = index + nestedIndex;

                          return (
                            <AccordionItem
                              key={actualIndex}
                              value={`item-${actualIndex}`}
                              className="bg-white rounded-xl p-5 pb-16 relative xl:flex flex-col gap-5 hidden"
                            >
                              <h4 className="text-md font-medium leading-none">
                                {nestedItem.collapseTitle}
                              </h4>

                              <AccordionContent className="2xl:min-h-22 min-h-12.5 2xl:max-h-22 max-h-12.5 overflow-y-scroll text-xsm pb-0!">
                                {nestedItem.collapseDetails}
                              </AccordionContent>
                              <AccordionTrigger className="cursor-pointer self-end absolute right-5 bottom-5 ml-auto max-w-10 w-10 h-10 rounded-[5px] bg-primary flex justify-center items-center text-white text-[22px] data-[state=open]:bg-secondary data-[state=open]:text-black [&_.icon-minus]:hidden data-[state=open]:[&_.icon-minus]:block [&_.icon-plus]:block data-[state=open]:[&_.icon-plus]:hidden">
                                <FiPlus className="icon-plus" />
                                <FiMinus className="icon-minus" />
                              </AccordionTrigger>
                            </AccordionItem>
                          );
                        },
                      )}
                    </div>
                  );
                }

                if (index === 2) return null;

                return (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white rounded-xl p-5 pb-16 relative xl:flex flex-col gap-5 hidden"
                  >
                    <h4 className="text-md font-medium leading-none">
                      {item.collapseTitle}
                    </h4>

                    <AccordionContent className="2xl:min-h-22 min-h-12.5 2xl:max-h-22 max-h-12.5 overflow-y-scroll text-xsm pb-0!">
                      {item.collapseDetails}
                    </AccordionContent>
                    <AccordionTrigger className="cursor-pointer self-end absolute right-5 bottom-5 ml-auto max-w-10 w-10 h-10 rounded-[5px] bg-primary flex justify-center items-center text-white text-[22px] data-[state=open]:bg-secondary data-[state=open]:text-black [&_.icon-minus]:hidden data-[state=open]:[&_.icon-minus]:block [&_.icon-plus]:block data-[state=open]:[&_.icon-plus]:hidden">
                      <FiPlus className="icon-plus" />
                      <FiMinus className="icon-minus" />
                    </AccordionTrigger>
                  </AccordionItem>
                );
              })}
              {allWorks?.map((item, index) => {
                return (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white rounded-xl p-5 pb-16 relative xl:hidden flex flex-col gap-5"
                  >
                    <h4 className="sm:text-md text-body font-medium leading-none">
                      {item.collapseTitle}
                    </h4>

                    <AccordionContent className="2xl:min-h-22 2xl:max-h-22 md:min-h-12.5 md:max-h-12.5 sm:min-h-14 sm:max-h-14 overflow-y-scroll text-xsm pb-0!">
                      {item.collapseDetails}
                    </AccordionContent>
                    <AccordionTrigger className="cursor-pointer self-end absolute right-5 bottom-5 ml-auto max-w-10 w-10 h-10 rounded-[5px] bg-primary flex justify-center items-center text-white text-[22px] data-[state=open]:bg-secondary data-[state=open]:text-black [&_.icon-minus]:hidden data-[state=open]:[&_.icon-minus]:block [&_.icon-plus]:block data-[state=open]:[&_.icon-plus]:hidden">
                      <FiPlus className="icon-plus" />
                      <FiMinus className="icon-minus" />
                    </AccordionTrigger>
                  </AccordionItem>
                );
              })}
            </div>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
