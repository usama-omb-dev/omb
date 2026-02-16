import { ServiceData } from "@/app/ServicesData";
import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import Pill from "@/components/ui/pill";
import ServiceCard from "@/components/ui/service-card";
import Image from "next/image";

const Services = () => {
  const servicesList = ServiceData.map((item) => {
    return {
      title: item.heroData.pillTitle,
      href: `/services/${item.url}`,
      imgUrl: item.featuredImage,
    };
  });

  return (
    <section className="lg:py-37.5 sm:py-20 py-10">
      <div className="container flex flex-col lg:gap-28 gap-8">
        <div className="flex lg:flex-row flex-col gap-6 items-start justify-between">
          <Pill iconColor="#3838F9" className="text-primary">
            We understand your frustration
          </Pill>
          <div className="lg:max-w-132 flex flex-col gap-5">
            <h3 className="sm:text-2xl text-xl font-medium leading-none">
              Your marketing is not working, and{" "}
              <span className="text-primary">you don’t know why.</span>
            </h3>
            <p className="sm:text-body text-sm">
              Your competitor is growing while you stay stuck. You know
              something has to change. But what? And how?
            </p>
          </div>
          <AnimatedButton size={"icon"} trailingContent={<AnimatedArrowIcon />}>
            Explore all services
          </AnimatedButton>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-2 sm:gap-3.5 gap-2 sm:auto-rows-[1fr]">
          <div className="lg:row-span-3 sm:row-span-2 sm:col-span-1 col-span-2 lg:col-span-1">
            <Image
              alt="Hero Image"
              width={1440}
              height={613}
              src={"/service-hero_img.png"}
              className=""
            />
          </div>
          {servicesList.map((item, index) => (
            <ServiceCard key={index + 1} cardDetails={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
