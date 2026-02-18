import { ArrowRight } from "../icons";

const AnimatedArrowIcon = ({ bgColor }: { bgColor?: string }) => {
  return (
    <span
      className={`${bgColor ? bgColor : "bg-primary"} sm:size-12.75 size-10 overflow-hidden flex items-center rounded-[0.3125rem]`}
    >
      <div className="flex justify-around sm:min-w-25.5 min-w-20 -translate-x-1/2 transition-all group-hover:translate-x-0">
        <ArrowRight color="white" />
        <ArrowRight color="white" />
      </div>
    </span>
  );
};

export default AnimatedArrowIcon;
