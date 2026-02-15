import AnimatedArrowIcon from "@/components/ui/button/AnimatedArrowIcon";
import AnimatedButton from "@/components/ui/button/AnimatedButton";
import Pill from "@/components/ui/pill";

const Reviews = () => {
  return (
    <section>
      <div className="container">
        <div className="flex lg:flex-row flex-col justify-between xl:gap-34 lg:gap-20 gap-6">
          <div>
            <Pill iconColor="#3838F9" className="text-primary">
              Results
            </Pill>
          </div>
          <h3 className="sm:text-2xl text-xl font-medium leading-none lg:max-w-106.5">
            Gedreven door een prestatiegerichte{" "}
            <span className="text-primary">mentaliteit</span>
          </h3>
          <div className="max-w-79 flex flex-col items-start gap-7.5">
            <AnimatedButton
              size={"icon"}
              trailingContent={<AnimatedArrowIcon />}
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
