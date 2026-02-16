import { CaseStudiesSection } from "@/app/ServicesDataInterfaces";
import CaseStudyCard from "./CaseStudyCard";
import React from "react";

const CaseStudy = ({ data }: { data: CaseStudiesSection[] }) => {
  return (
    <section>
      <div className="container">
        <div className="flex flex-col gap-7.5">
          {data.map((item, index) => (
            <React.Fragment key={index + 1}>
              <CaseStudyCard data={item} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
