import Pill from "@/components/ui/pill";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextReveal from "@/components/ui/TextReveal";
import Image from "next/image";

const ServicesDifference = () => {
  const data = [
    {
      icon: "/white-globe-icon.svg",
      text: "Online in 4 to 8 weeks Working together should feel like a celebration",
      span: "lg:row-span-2",
      gif: "/gif-1.gif",
    },
    {
      icon: "/breifing-icon.svg",
      text: "We challenge your briefing, debate up front, celebration at the end.",
      gif: "/gif-2.gif",
    },
    {
      icon: "/stock-icon.svg",
      text: "Your story baked in a way that keeps customers hungry.",
      span: "lg:row-span-2",
      gif: "/gif-3.gif",
    },
    {
      icon: "/bolt-icon.svg",
      text: "A brand with an opinion that keeps you up at night.",
      gif: "/gif-4.gif",
    },
    {
      icon: "/github-icon.svg",
      text: "Too much noise online. Boring is not our thing.",
      span: "lg:row-span-2",
      gif: "/gif-5.gif",
    },
    {
      icon: "/slack-icon.svg",
      text: "Results that leave you wanting more.",
      gif: "/gif-6.gif",
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="lg:py-[3.5938rem] lg:px-11.25 p-4 bg-white lg:rounded-4xl rounded-[3.5rem] flex flex-col justify-center items-center gap-5 ">
          <div className="max-w-134 flex justify-center items-center flex-col gap-5 mx-auto">
            <Pill iconColor="#3838F9" className="text-primary">
              Services
            </Pill>
            <h2 className="text-center sm:text-2xl text-lg font-medium leading-none">
              <TextReveal>Traditional vs OMB Effect</TextReveal>
            </h2>
            <p className="text-center sm:text-sm text-xsm ">
              Traditional agencies work the way you are used to. Polite,
              predictable, safe. And without results. We choose a different
              approach. One that creates friction but also shine.
            </p>
          </div>
          <Tabs
            className="w-full justify-center items-center gap-7.5"
            defaultValue="effect"
          >
            <TabsList className="bg-secondary lg:py-2.5 lg:px-3.75 p-2.5 h-auto! lg:rounded-full rounded-[3.5rem] flex [anchor-name:--tabs] isolate">
              <TabsTrigger
                className="text-[#0E0F0C] sm:text-body! text-xsm font-medium! data-[state=active]:text-white! cursor-pointer rounded-full data-[state=active]:bg-primary relative lg:py-4.5 py-3 lg:px-7 px-2.5 [anchor-name:--tab] data-[state=active]:[anchor-name:--active-tab]"
                value="traditional"
              >
                Traditional
              </TabsTrigger>
              <TabsTrigger
                className="text-[#0E0F0C] sm:text-body! text-xsm font-medium! data-[state=active]:text-white! cursor-pointer rounded-full data-[state=active]:bg-primary relative lg:py-4.5 py-3 lg:px-7 px-2.5 [anchor-name:--tab] data-[state=active]:[anchor-name:--active-tab]"
                value="effect"
              >
                OMB Effect
              </TabsTrigger>
            </TabsList>
            <TabsContent
              className="bg-secondary w-full rounded-[2.5rem] lg:p-6 p-4"
              value="traditional"
            >
              Traditional
            </TabsContent>
            <TabsContent
              className="bg-secondary w-full rounded-[2.5rem] lg:p-6 p-4"
              value="effect"
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
                            key={index + innerIndex + 1}
                            className="relative overflow-hidden group isolate sm:rounded-2xl rounded-4xl bg-white xl:p-10 p-5 flex flex-col justify-between xl:min-h-65 lg:min-h-48 min-h-44"
                          >
                            <img
                              className="absolute transition-opacity w-full h-full top-0 left-0 object-cover z-10 opacity-0 group-hover:opacity-100"
                              src={bottomItem.gif}
                              alt=""
                            />
                            <div className="sm:min-w-16 max-w-10 sm:w-16 w-10 sm:min-h-16 min-h-10 p-2.5 rounded-full bg-primary flex items-center justify-center">
                              <Image
                                alt="Icon"
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
                      key={index + 1}
                      className={`relative overflow-hidden group isolate sm:rounded-2xl rounded-4xl bg-white xl:p-10 p-5 flex flex-col justify-between xl:min-h-59.25 min-h-44 ${item.span ?? ""}`}
                    >
                      <img
                        className="absolute transition-opacity w-full h-full top-0 left-0 object-cover z-10 opacity-0 group-hover:opacity-100"
                        src={item.gif}
                        alt=""
                      />
                      <div className="sm:min-w-16 max-w-10 sm:w-16 w-10 sm:min-h-16 min-h-10 p-2.5 rounded-full bg-primary flex items-center justify-center">
                        <Image
                          alt="Icon"
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
