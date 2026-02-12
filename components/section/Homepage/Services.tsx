import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { ArrowRight } from "@/components/ui/icons";
import Pill from "@/components/ui/pill";
import ServiceCard from "@/components/ui/service-card";
import Image from "next/image";

const Services = () => {
  const servicesList = [
    {
      title: "Profitable Websites",
      imgUrl: "/profitable-websites.png",
      href: "#",
    },
    {
      title: "Digital Footprint (SEO & GEO)",
      imgUrl: "/profitable-websites.png",
      href: "#",
    },
    {
      title: "Marketing strategy",
      imgUrl: "/profitable-websites.png",
      href: "#",
    },
    {
      title: "Content marketing",
      imgUrl: "/profitable-websites.png",
      href: "#",
    },
    {
      title: "Lead generation",
      imgUrl: "/profitable-websites.png",
      href: "#",
    },
    {
      title: "Personal branding",
      imgUrl: "/profitable-websites.png",
      href: "#",
    },
  ];
  return (
    <section className="py-37.5">
      <div className="container flex flex-col gap-28">
        <div className="flex items-start justify-between">
          <Pill iconColor="#3838F9" className="text-primary">
            We understand your frustration
          </Pill>
          <div className="max-w-132 flex flex-col gap-5">
            <h3 className="text-2xl font-medium leading-none">
              Your marketing is not working, and{" "}
              <span className="text-primary">you don’t know why.</span>
            </h3>
            <p className="text-body">
              Your competitor is growing while you stay stuck. You know
              something has to change. But what? And how?
            </p>
          </div>
          <AnimatedButton
            size={"icon"}
            trailingContent={
              <span className="bg-primary size-12.75 overflow-hidden flex items-center rounded-[0.3125rem]">
                <div className="flex justify-around min-w-25.5 -translate-x-1/2 transition-all group-hover:translate-x-0">
                  <ArrowRight color="white" />
                  <ArrowRight color="white" />
                </div>
              </span>
            }
          >
            Explore all services
          </AnimatedButton>
        </div>
        <div className="grid grid-cols-3 gap-3.5 auto-rows-[1fr]">
          <div className="row-span-3">
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
