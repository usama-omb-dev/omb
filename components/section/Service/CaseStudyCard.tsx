import { CaseStudiesSection } from "@/app/ServicesDataInterfaces";
import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import Image from "next/image";

const CaseStudyCard = ({ data }: { data: CaseStudiesSection }) => {
  const {
    featuredImage,
    companyLogo,
    caseStudySummary,
    workImplemented,
    caseStudyButton,
  } = data;
  return (
    <div className="sm:p-6.25 p-4 bg-white rounded-[0.3125rem] flex lg:flex-row flex-col items-stretch gap-5 ">
      <Image
        src={featuredImage}
        alt={featuredImage.split(".")[0]}
        width={400}
        height={413}
        className="w-full max-w-100"
      />
      <div className="flex flex-col justify-between xl:gap-11.75 gap-5">
        <div className="flex flex-col md:gap-7.5 gap-4">
          <Image src={companyLogo} alt="" width={199} height={48} />
          <p className="sm:text-body text-xsm">{caseStudySummary}</p>
        </div>
        {workImplemented.length > 0 && (
          <ul className="flex flex-wrap sm:gap-2.5 gap-2 max-w-138.25">
            {workImplemented.map((item, index) => (
              <li
                key={index + 1}
                className="bg-secondary rounded-[0.3125rem] py-2.5 px-3.75 text-nowrap sm:text-body text-[0.75rem] leading-none font-medium "
              >
                {item}
              </li>
            ))}
          </ul>
        )}
        <AnimatedButton
          size={"icon"}
          variant={"secondary"}
          trailingContent={<AnimatedArrowIcon />}
          href={caseStudyButton.btnUrl}
        >
          {caseStudyButton.btnLabel}
        </AnimatedButton>
      </div>
    </div>
  );
};

export default CaseStudyCard;
