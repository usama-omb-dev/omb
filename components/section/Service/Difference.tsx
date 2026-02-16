import { DifferenceSection } from "@/app/ServicesDataInterfaces";
import Pill from "@/components/ui/pill";
import { RxCross1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";

const Difference = ({ data }: { data: DifferenceSection }) => {
  const {
    pillTitle,
    differenceTitle,
    differenceSummary,
    differenceDetails,
    differenceButton,
  } = data;
  return (
    <section className="sm:pb-37.5 pb-7.5">
      <div className="container">
        <div className="bg-white rounded-[1.25rem] sm:py-10 py-6 sm:px-11.25 px-4 flex flex-col gap-7.5 ">
          <div className="max-w-166 mx-auto flex flex-col justify-center items-center gap-5">
            {!!pillTitle && (
              <Pill iconColor="#3838F9" className="text-primary">
                {pillTitle}
              </Pill>
            )}
            <h2 className="md:text-2xl text-xl font-medium text-center leading-none">
              {differenceTitle}
            </h2>
            <p className="md:text-body text-xsm text-center max-w-134">
              {differenceSummary}
            </p>
          </div>
          <div className="bg-secondary w-full sm:p-6 p-4 sm:rounded-[2.5rem] rounded-[1.25rem] grid lg:grid-cols-2 gap-3.5 ">
            <div
              style={{
                backgroundImage: `url(${differenceDetails.summary1.featuredImage})`,
              }}
              className="bg-white sm:p-10 p-4 sm:rounded-[1.25rem] rounded-[0.625rem] overflow-hidden flex flex-col sm:gap-15 gap-6 bg-cover bg-center bg-no-repeat sm:min-h-100 min-h-[15.625rem]"
            >
              <h5 className="text-xl font-medium leading-none ">
                {differenceDetails.summary1.summaryHeading}
              </h5>
              {differenceDetails?.summary1?.summaryPoints.length > 0 && (
                <ul className="flex flex-col gap-5">
                  {differenceDetails?.summary1?.summaryPoints.map(
                    (item, index) => (
                      <li
                        key={index + 1}
                        className="flex items-center gap-3.5 sm:text-body text-xsm"
                      >
                        <div className="sm:w-10 w-6 sm:h-10 h-6 rounded-[0.3125rem] flex justify-center items-center text-black/20 bg-secondary">
                          <RxCross1 />
                        </div>{" "}
                        <span>{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              )}
            </div>
            <div
              style={{
                backgroundImage: `url(${differenceDetails.summary2.featuredImage})`,
              }}
              className="bg-white sm:p-10 p-4 sm:rounded-[1.25rem] rounded-[0.625rem] overflow-hidden flex flex-col sm:gap-15 gap-6 bg-cover bg-center bg-no-repeat sm:min-h-100 min-h-[15.625rem]"
            >
              <h5 className="text-xl font-medium leading-none ">
                {differenceDetails.summary2.summaryHeading}
              </h5>
              {differenceDetails?.summary2?.summaryPoints.length > 0 && (
                <ul className="flex flex-col gap-5">
                  {differenceDetails?.summary2?.summaryPoints.map(
                    (item, index) => (
                      <li
                        key={index + 1}
                        className="flex items-center gap-3.5 sm:text-body text-xsm"
                      >
                        <div className="sm:w-10 w-6 sm:h-10 h-6 rounded-[0.3125rem] flex justify-center items-center text-white bg-primary">
                          <FaCheck />
                        </div>{" "}
                        <span>{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              )}
            </div>
          </div>
          <AnimatedButton
            size={"icon"}
            variant={"secondary"}
            className=" mx-auto"
            trailingContent={<AnimatedArrowIcon />}
            href={differenceButton.btnUrl}
          >
            {differenceButton.btnLabel}
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
};

export default Difference;
