import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { ArrowRight } from "@/components/ui/icons";
import Image from "next/image";

const Qualities = () => {
  return (
    <section className=" relative">
      <div className="container">
        <div className="flex gap-9.25">
          <div className="max-w-95 w-full">
            <div className="sticky top-10 left-0">
              <div className="bg-primary absolute -z-10 w-95 h-95 rounded-full left-0 top-2/8" />
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
            <div className="py-15.75 pl-15 pr-40.75 bg-white rounded-[0.625rem] flex flex-col gap-10">
              <h3 className="text-2xl font-medium max-w-[65%]">
                This is how we turn your story into results
              </h3>
              <div className="flex flex-col gap-3.75 max-w-154">
                <h5 className="font-bold text-lg leading-none">
                  <span className="text-primary">Step 1:</span> We find the
                  blockage
                </h5>
                <p className="text-body">
                  You are stuck somewhere. We find out where. We dive into your
                  market and ask the hard questions. That is where growth lives.
                </p>
              </div>
              <div className="flex flex-col gap-3.75 max-w-154">
                <h5 className="font-bold text-lg leading-none">
                  <span className="text-primary">Step 2:</span> We make choices
                </h5>
                <p className="text-body">
                  Marketing for everyone is marketing for no one. We help you
                  choose who you want and who you do not want. That is scary but
                  necessary.
                </p>
              </div>
              <div className="flex flex-col gap-3.75 max-w-154">
                <h5 className="font-bold text-lg leading-none">
                  <span className="text-primary">Step 1:</span> We make it
                  scalable
                </h5>
                <p className="text-body">
                  Content, campaigns, social media, websites. Everything
                  revolves around your story. Websites that convert. Campaigns
                  that perform.
                </p>
              </div>
              <div className="flex flex-col gap-3.75 max-w-154">
                <h5 className="font-bold text-lg leading-none">
                  <span className="text-primary">Step 1:</span> We push harder
                </h5>
                <p className="text-body">
                  What works, we do more often. What does not work, we cut. We
                  keep testing and adjusting until it hits.
                </p>
              </div>
              <AnimatedButton
                size={"icon"}
                variant={"secondary"}
                className="mt-17"
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
            <div className="py-15.75 pl-15 pr-40.75 bg-white rounded-[0.625rem] flex flex-col gap-10">
              <h3 className="text-2xl font-medium max-w-[65%]">
                Our recipe for profitable marketing
              </h3>
              <div className="flex flex-col gap-3.75 max-w-154">
                <h5 className="font-bold text-lg leading-none">
                  <span className="text-primary">SEO & GEO</span>
                </h5>
                <p className="text-body">
                  We make you visible where customers search. Google, ChatGPT
                  and all the places that matter.
                </p>
              </div>
              <div className="flex flex-col gap-3.75 max-w-154">
                <h5 className="font-bold text-lg leading-none">
                  <span className="text-primary">SEA</span>
                </h5>
                <p className="text-body">
                  We run and manage campaigns on Google and Meta with a focus on
                  return and measurability.{" "}
                </p>
              </div>
              <div className="flex flex-col gap-3.75 max-w-154">
                <h5 className="font-bold text-lg leading-none">
                  <span className="text-primary">
                    Social Media Advertisement
                  </span>
                </h5>
                <p className="text-body">
                  We set up targeted campaigns on Meta and other platforms.
                  Audience, message and budget aligned.
                </p>
              </div>
              <div className="flex flex-col gap-3.75 max-w-154">
                <h5 className="font-bold text-lg leading-none">
                  <span className="text-primary">Content Marketing</span>
                </h5>
                <p className="text-body">
                  We interview you and translate it into blogs, posts and pages.
                  Your expertise, our words.
                </p>
              </div>
              <div className="flex flex-col gap-3.75 max-w-154">
                <h5 className="font-bold text-lg leading-none">
                  <span className="text-primary">Web Design</span>
                </h5>
                <p className="text-body">
                  We design and build websites that convert. From strategy to
                  delivery in 4 to 8 weeks.
                </p>
              </div>
              <div className="flex flex-col gap-3.75 max-w-154">
                <h5 className="font-bold text-lg leading-none">
                  <span className="text-primary">Strategy</span>
                </h5>
                <p className="text-body">
                  Every project starts with a marketing strategy. Where are you
                  going and how do you get there?
                </p>
              </div>
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
