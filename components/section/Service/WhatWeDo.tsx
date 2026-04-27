import Pill from "@/components/ui/pill";
import Image from "next/image";

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

const workCardClassNameXl =
  "bg-white rounded-xl p-5 relative xl:flex flex-col gap-3 hidden";
const workCardClassNameSm =
  "bg-white rounded-xl p-5 relative xl:hidden flex flex-col gap-3";

const WorkCardContent = ({
  item,
  titleClassName,
}: {
  item: WhatWeDoItem;
  titleClassName: string;
}) => (
  <>
    {!!item.collapseTitle && (
      <h4 className={titleClassName}>{item.collapseTitle}</h4>
    )}
    {!!item.collapseDetails && (
      <p className="text-xsm">{item.collapseDetails}</p>
    )}
  </>
);

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
                <h5 className="lg:text-2xl sm:text-xl text-md font-semibold  leading-none">
                  {workTitle}
                </h5>
              )}
              {!!workDetails && (
                <p className="sm:text-body text-xsm">{workDetails}</p>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 sm:gap-3.5 gap-2">
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
                    <div
                      key={`work-xl-${index}`}
                      className={workCardClassNameXl}
                    >
                      <WorkCardContent
                        item={item}
                        titleClassName="text-md font-semibold leading-none"
                      />
                    </div>
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
                            <div
                              key={`work-xl-nested-${actualIndex}`}
                              className={workCardClassNameXl}
                            >
                              <WorkCardContent
                                item={nestedItem}
                                titleClassName="text-md font-semibold leading-none"
                              />
                            </div>
                          );
                        },
                      )}
                    </div>
                  );
                }

                if (index === 2) return null;

                return (
                  <div
                    key={`work-xl-${index}`}
                    className={workCardClassNameXl}
                  >
                    <WorkCardContent
                      item={item}
                      titleClassName="text-md font-semibold leading-none"
                    />
                  </div>
                );
              })}
              {allWorks?.map((item, index) => {
                return (
                  <div
                    key={`work-sm-${index}`}
                    className={workCardClassNameSm}
                  >
                    <WorkCardContent
                      item={item}
                      titleClassName="sm:text-md text-body font-semibold leading-none"
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
