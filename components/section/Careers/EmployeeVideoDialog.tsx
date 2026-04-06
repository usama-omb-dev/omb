"use client";

import { useRef } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type EmployeeVideoDialogProps = {
  thumbnailSrc: string;
  videoSrc: string;
  thumbnailAlt?: string;
  playLabel?: string;
  dialogTitle: string;
  dialogDescription?: string;
  /** Wrapper for layout (e.g. `flex-1 min-w-0` in a row). */
  className?: string;
  /** Extra classes on the thumbnail trigger button. */
  triggerClassName?: string;
  /** Passed to next/image `sizes` for responsive loading. */
  imageSizes?: string;
};

export function EmployeeVideoDialog({
  thumbnailSrc,
  videoSrc,
  thumbnailAlt = "",
  playLabel = "Play video",
  dialogTitle,
  dialogDescription,
  className,
  triggerClassName,
  imageSizes = "(max-width: 640px) 100vw, 50vw",
}: EmployeeVideoDialogProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className={cn("2xl:min-w-[536px] xl:min-w-[450px] lg:min-w-[400px] min-w-[280px] w-full flex-1", className)}>
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            videoRef.current?.pause();
          }
        }}
      >
        <DialogTrigger
          type="button"
          className={cn(
            "group relative block h-full sm:min-h-70 min-h-50 max-w-[536px] w-full cursor-pointer overflow-hidden rounded-2xl border-0 bg-transparent p-0 text-left shadow-md ring-offset-background transition-[box-shadow,transform] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:min-h-80.75",
            triggerClassName,
          )}
        >
          <Image
            src={thumbnailSrc}
            alt={thumbnailAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes={imageSizes}
          />
          <span
            className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/15"
            aria-hidden
          >
            {/* <CirclePlay
              className="size-16 text-white drop-shadow-md md:size-20"
              strokeWidth={1.25}
              aria-hidden
            /> */}
            <span className="drop-shadow-md md:size-20 size-16 border-4 border-white bg-white/20 rounded-full flex items-center justify-center">
            <FaPlay className=" text-white size-6 " />
            </span>
          </span>
          <span className="sr-only">{playLabel}</span>
        </DialogTrigger>
        <DialogContent
          showCloseButton
          className="max-h-[90vh] w-full max-w-[min(56rem,calc(100%-2rem))] gap-0 overflow-hidden border-0 bg-black p-0 sm:max-w-[min(56rem,calc(100%-2rem))]"
        >
          <DialogTitle className="sr-only">{dialogTitle}</DialogTitle>
          <DialogDescription className="sr-only">
            {dialogDescription ?? "Press play to watch the video."}
          </DialogDescription>
          <video
            ref={videoRef}
            className="aspect-video w-full bg-black"
            controls
            playsInline
            preload="metadata"
            src={videoSrc}
          >
            Your browser does not support embedded video.
          </video>
        </DialogContent>
      </Dialog>
    </div>
  );
}
