import { cn } from "@/lib/utils";
import { ArrowRight } from "../icons";

export type AnimatedArrowTone = "on-light" | "on-dark" | "hero";

type AnimatedArrowIconProps = {
  /** Full Tailwind classes for the disc (e.g. `bg-transparent` when a parent provides the fill). */
  bgColor?: string;
  /**
   * `on-light` — solid primary disc + white arrow (default white pill CTAs).
   * `hero` — soft primary tint disc + primary arrow (homepage hero only).
   * `on-dark` — white disc + black arrow (solid primary / dark CTAs).
   */
  tone?: AnimatedArrowTone;
  /** Narrower motion track + smaller arrows for compact header discs. */
  compact?: boolean;
  className?: string;
};

const AnimatedArrowIcon = ({
  bgColor,
  tone = "on-light",
  compact = false,
  className,
}: AnimatedArrowIconProps) => {
  const circle =
    bgColor ??
    (tone === "on-dark"
      ? "bg-white"
      : tone === "hero"
        ? "bg-primary/12"
        : "bg-primary");

  const arrow =
    bgColor?.includes("transparent")
      ? "#ffffff"
      : tone === "on-dark"
        ? "#000000"
        : tone === "hero"
          ? "#3838F9"
          : "#ffffff";

  return (
    <span
      className={cn(
        "shrink-0 overflow-hidden flex items-center rounded-full sm:size-12.75 size-10",
        circle,
        className,
      )}
    >
      <div
        className={cn(
          "flex justify-around -translate-x-1/2 transition-all group-hover:translate-x-0",
          compact
            ? "min-w-14 [&_svg]:size-3"
            : "min-w-20 sm:min-w-25.5",
        )}
      >
        <ArrowRight color={arrow} />
        <ArrowRight color={arrow} />
      </div>
    </span>
  );
};

export default AnimatedArrowIcon;
