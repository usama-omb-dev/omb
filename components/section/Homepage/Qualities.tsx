"use client";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import AnimatedSplit from "@/components/ui/button/AnimatedSplit";
import { AnimatedSplitHandle } from "@/components/ui/button/AnimatedSplit";

import { ArrowRight } from "@/components/ui/icons";
import TextReveal from "@/components/ui/TextReveal";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const Qualities = () => {
  const titleRefs = useRef<AnimatedSplitHandle[]>([]);
  titleRefs.current = [];
  const services = [
    {
      title: "SEO & GEO",
      description:
        "We make you visible where customers search. Google, ChatGPT and all the places that matter.",
      link: "",
    },
    {
      title: "SEA",
      description:
        "We run and manage campaigns on Google and Meta with a focus on return and measurability.",
      link: "",
    },
    {
      title: "Social Media Advertisement",
      description:
        "We set up targeted campaigns on Meta and other platforms. Audience, message and budget aligned.",
      link: "",
    },
    {
      title: "Content Marketing",
      description:
        "We interview you and translate it into blogs, posts and pages. Your expertise, our words.",
      link: "",
    },
    {
      title: "Web Design",
      description:
        "We design and build websites that convert. From strategy to delivery in 4 to 8 weeks.",
      link: "",
    },
    {
      title: "Strategy",
      description:
        "Every project starts with a marketing strategy. Where are you going and how do you get there?",
      link: "",
    },
  ];

  const steps = [
    {
      id: 1,
      title: "We find the blockage",
      description:
        "You are stuck somewhere. We find out where. We dive into your market and ask the hard questions. That is where growth lives.",
    },
    {
      id: 2,
      title: "We make choices",
      description:
        "Marketing for everyone is marketing for no one. We help you choose who you want and who you do not want. That is scary but necessary.",
    },
    {
      id: 3,
      title: "We make it scalable",
      description:
        "Content, campaigns, social media, websites. Everything revolves around your story. Websites that convert. Campaigns that perform.",
    },
    {
      id: 4,
      title: "We push harder",
      description:
        "What works, we do more often. What does not work, we cut. We keep testing and adjusting until it hits.",
    },
  ];

  const setTitleRef = (el: AnimatedSplitHandle | null) => {
    if (el && !titleRefs.current.includes(el)) {
      titleRefs.current.push(el);
    }
  };

  return (
    <section className=" relative">
      <div className="container">
        <div className="flex gap-9.25">
          <div className="xl:max-w-95 max-w-60 w-full lg:block hidden">
            <div className="sticky top-10 left-0">
              <div className="bg-primary absolute -z-10 xl:w-95 w-60 xl:h-95 h-60 rounded-full left-0 top-2/8" />
              <Image
                alt="Mockup"
                width={327}
                height={673}
                src={"/iphone-mockup.png"}
                className="max-w-[80%] mx-auto"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-7.5">
            <div className="xl:py-15.75 xl:pl-15 sm:p-10 sm:pr-40.75 p-4 bg-white rounded-[0.625rem] flex flex-col gap-10">
              <h3 className="sm:text-2xl text-xl leading-none font-medium 2xl:max-w-[65%]">
                <TextReveal>
                  This is how we turn your story into results
                </TextReveal>
              </h3>
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="flex flex-col gap-3.75 sm:max-w-154"
                >
                  <h5 className="font-bold text-lg leading-none">
                    <span className="text-primary">Step {step.id}:</span>{" "}
                    {step.title}
                  </h5>
                  <p className="text-body">{step.description}</p>
                </div>
              ))}

              <AnimatedButton
                size={"icon"}
                variant={"secondary"}
                className="lg:mt-17"
                trailingContent={
                  <span className="bg-primary size-12.75 overflow-hidden flex items-center rounded-[0.3125rem]">
                    <div className="flex justify-around min-w-25.5 -translate-x-1/2 transition-all group-hover:translate-x-0">
                      <ArrowRight color="white" />
                      <ArrowRight color="white" />
                    </div>
                  </span>
                }
              >
                Start the fire!
              </AnimatedButton>
            </div>
            <div className="xl:py-15.75 xl:pl-15 sm:p-10 sm:pr-40.75 p-4 bg-white rounded-[0.625rem] flex flex-col gap-10">
              <h3 className="sm:text-2xl text-xl leading-none font-medium 2xl:max-w-[65%]">
                <TextReveal>Our recipe for profitable marketing</TextReveal>
              </h3>
              {services.map((service, index) => (
                <div key={index} className="flex flex-col gap-3.75 max-w-154">
                  <h5 className="font-bold text-lg leading-none">
                    <Link href={service.link} className="text-primary">
                      <AnimatedSplit ref={setTitleRef}>
                        {service.title}
                      </AnimatedSplit>
                    </Link>
                  </h5>
                  <p className="text-body">{service.description}</p>
                </div>
              ))}

              <AnimatedButton
                size={"icon"}
                variant={"secondary"}
                trailingContent={
                  <span className="bg-primary size-12.75 overflow-hidden flex items-center rounded-[0.3125rem]">
                    <div className="flex justify-around min-w-25.5 -translate-x-1/2 transition-all group-hover:translate-x-0">
                      <ArrowRight color="white" />
                      <ArrowRight color="white" />
                    </div>
                  </span>
                }
              >
                Curious how we work?
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualities;
