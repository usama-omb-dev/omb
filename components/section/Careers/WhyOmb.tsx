import type { ReactNode } from "react";
import {
  BookIcon,
  CompeteIcon,
  FlexiblyIcon,
  GrafIcon,
} from "@/components/ui/icons";
import Image from "next/image";

type WhyOmbItem = {
  title: string;
  description: string;
  icon: ReactNode;
};

const WhyOmb = () => {
  const whyOmbList: WhyOmbItem[] = [
    {
      title: "Why OMB",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatemaccusantium doloremque.",
      icon: <CompeteIcon />,
    },
    {
      title: "Learning & Development",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatemaccusantium doloremque.",
      icon: <BookIcon />,
    },
    {
      title: "Growth Opportunities",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatemaccusantium doloremque.",
      icon: <GrafIcon />,
    },
    {
      title: "Remote / Flexible Work",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatemaccusantium doloremque.",
      icon: <FlexiblyIcon />,
    },
  ];
  return (
    <section>
      <div className="container">
        <div className="flex flex-col gap-5 max-w-[528px] mx-auto text-center mb-11">
          <h2 className="sm:text-2xl text-xl font-medium leading-none">
          Why Join OMB!
          </h2>
          <p className="sm:text-body text-sm">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatemaccu
          santium doloremque.
          </p>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-2 sm:gap-3.5 gap-2 sm:auto-rows-[1fr]">
          <div className="sm:row-span-2 sm:col-span-1 col-span-2 lg:col-span-1">
            <Image
              alt="Why OMB"
              width={1440}
              height={613}
              src={"/why-omb.png"}
              className=""
            />
          </div>
          {whyOmbList.map((item) => (
            <div
              key={item.title}
              className="bg-white h-full xl:p-7.5 sm:p-5 p-3 rounded-[0.625rem] flex flex-col gap-4 sm:gap-0 justify-between relative isolate perspective-[1000]"
            >
              <span className="rounded-[0.3125rem] max-w-10 sm:w-10 w-8 sm:h-10 h-8 bg-primary self-start flex justify-center items-center">
                {item.icon}
              </span>
              <div className="flex flex-col gap-2.5">
                <h6 className="sm:text-md text-body font-medium leading-none">
                  {item.title}
                </h6>
                <p className="sm:text-body text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyOmb;
