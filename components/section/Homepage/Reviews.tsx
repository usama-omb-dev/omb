import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { ArrowRight } from "@/components/ui/icons";
import Pill from "@/components/ui/pill";

const Reviews = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between gap-34">
          <div>
            <Pill iconColor="#3838F9" className="text-primary">
              Results
            </Pill>
          </div>
          <h3 className="text-2xl font-medium leading-none max-w-106.5">
            Gedreven door een prestatiegerichte{" "}
            <span className="text-primary">mentaliteit</span>
          </h3>
          <div className="max-w-79 flex flex-col items-start gap-7.5">
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
              Alle succesverhalen
            </AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
