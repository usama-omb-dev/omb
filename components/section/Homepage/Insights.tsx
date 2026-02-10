import AnimatedButton from "@/components/ui/button/AnimatedButton";
import { ArrowRight } from "@/components/ui/icons";

const Insights = () => {
  return (
    <section className="pt-50 h-screen">
      <div className="container">
        <div className="flex justify-between gap-34">
          <h3 className="text-2xl font-medium">
            <span className="text-primary">68 percent increase</span> in
            conversion rates with the new design.
          </h3>
          <div className="max-w-79">
            <p className="text-body">
              If everything was going great, you would not be here right now.
              Our clients understand that. They hire us for expertise and accept
              the discussion that comes with it. Because politely continuing
              what does not work will cost you dearly.
            </p>
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
              View our results
            </AnimatedButton>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default Insights;
