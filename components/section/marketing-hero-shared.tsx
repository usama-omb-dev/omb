import { cn } from "@/lib/utils";
import Image from "next/image";

/** Same lavender → white wash as `PageHero` and case-study heroes. */
export const MARKETING_HERO_GRADIENT =
  "linear-gradient(0deg, rgba(56, 56, 249, 0.44) 0%, rgba(255, 255, 255, 0) 80%)";

/** Rotating ring + center mark; used on marketing heroes (e.g. blog listing, home). */
export function MarketingHeroFloatingBadge({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-white p-1.5 sm:size-28 sm:p-2 md:size-32 md:p-2.5 lg:size-36 lg:p-3",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          "page-hero-ring-spin pointer-events-none absolute inset-1 z-0 flex origin-center items-center justify-center sm:inset-1.5 md:inset-2",
        )}
      >
        <Image
          src="/circle-text.svg"
          alt=""
          width={131}
          height={132}
          className="size-full max-h-full max-w-full object-contain object-center"
        />
      </div>
      <div className="relative z-10 flex size-16 items-center justify-center rounded-full bg-primary sm:size-[4.25rem] md:size-20 lg:size-[5.5rem]">
        <Image
          src="/omb-favicon.svg"
          alt=""
          width={299}
          height={502}
          className="h-7 w-auto max-h-[82%] object-contain brightness-0 invert sm:h-9 md:h-10 lg:h-11"
        />
      </div>
    </div>
  );
}
