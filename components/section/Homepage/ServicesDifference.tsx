import Pill from "@/components/ui/pill";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextReveal from "@/components/ui/TextReveal";
import Image from "next/image";

const ServicesDifference = () => {
  const data = [
    {
      icon: "/white-globe-icon.svg",
      text: "Online in 4 to 8 weeks Working together should feel like a celebration",
      span: "row-span-2",
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
      span: "row-span-2",
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
      span: "row-span-2",
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
        <div className="py-[3.5938rem] px-11.25 bg-white rounded-4xl flex flex-col justify-center items-center gap-5 ">
          <div className="max-w-134 flex justify-center items-center flex-col gap-5 mx-auto">
            <Pill iconColor="#3838F9" className="text-primary">
              Services
            </Pill>
            <h2 className="text-center text-2xl font-medium leading-none">
              <TextReveal>Traditional vs OMB Effect</TextReveal>
            </h2>
            <p className="text-center">
              Traditional agencies work the way you are used to. Polite,
              predictable, safe. And without results. We choose a different
              approach. One that creates friction but also shine.
            </p>
          </div>
          <Tabs
            className="w-full justify-center items-center gap-7.5"
            defaultValue="effect"
          >
            <TabsList className="bg-secondary py-2.5 px-3.75 h-auto! rounded-full flex [anchor-name:--tabs] isolate">
              <TabsTrigger
                className="text-[#0E0F0C] text-body! font-medium! data-[state=active]:text-white! cursor-pointer rounded-full data-[state=active]:bg-primary relative py-4.5 px-7 [anchor-name:--tab] data-[state=active]:[anchor-name:--active-tab]"
                value="traditional"
              >
                Traditional
              </TabsTrigger>
              <TabsTrigger
                className="text-[#0E0F0C] text-body! font-medium! data-[state=active]:text-white! cursor-pointer rounded-full data-[state=active]:bg-primary relative py-4.5 px-7 [anchor-name:--tab] data-[state=active]:[anchor-name:--active-tab]"
                value="effect"
              >
                OMB Effect
              </TabsTrigger>
            </TabsList>
            <TabsContent
              className="bg-secondary w-full rounded-[2.5rem] p-6"
              value="traditional"
            >
              Traditional
            </TabsContent>
            <TabsContent
              className="bg-secondary w-full rounded-[2.5rem] p-6"
              value="effect"
            >
              <div className="grid grid-cols-3 gap-3.5">
                {data.map((item, index) => {
                  if (index === 4) {
                    return (
                      <div
                        key="bottom-row"
                        className="col-span-3 grid grid-cols-2 gap-3.5"
                      >
                        {data.slice(4).map((bottomItem, innerIndex) => (
                          <div
                            key={index + innerIndex + 1}
                            className="relative overflow-hidden group isolate rounded-2xl bg-white p-10 flex flex-col justify-between min-h-65"
                          >
                            <img
                              className="absolute transition-opacity w-full h-full top-0 left-0 object-cover -z-10 opacity-0 group-hover:opacity-20"
                              src={bottomItem.gif}
                              alt=""
                            />
                            <div className="min-w-16 w-16 min-h-16 rounded-full bg-primary flex items-center justify-center">
                              <Image
                                alt="Icon"
                                width={30}
                                height={30}
                                src={bottomItem.icon}
                              />
                            </div>
                            <p className="mt-6 text-body font-medium">
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
                      className={`relative overflow-hidden group isolate rounded-2xl bg-white p-10 flex flex-col justify-between min-h-59.25 ${item.span ?? ""}`}
                    >
                      <img
                        className="absolute transition-opacity w-full h-full top-0 left-0 object-cover -z-10 opacity-0 group-hover:opacity-20"
                        src={item.gif}
                        alt=""
                      />
                      <div className="min-w-16 w-16 min-h-16 rounded-full bg-primary flex items-center justify-center">
                        <Image
                          alt="Icon"
                          width={30}
                          height={30}
                          src={item.icon}
                        />
                      </div>
                      <p className="mt-6 text-body font-medium">{item.text}</p>
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
