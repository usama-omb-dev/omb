"use client";

import { Button } from "@/components/ui/button";
import AnimatedSplit, {
  AnimatedSplitHandle,
} from "@/components/ui/button/AnimatedSplit";
import { forwardRef, ReactNode, useRef } from "react";

type AnimatedButtonProps = React.ComponentProps<typeof Button> & {
  children: ReactNode;
  trailingContent?: ReactNode;
};

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, trailingContent, className, ...rest }, ref) => {
    const textRef = useRef<AnimatedSplitHandle>(null);

    const mergeEvent =
      <T extends React.SyntheticEvent>(
        userHandler?: (e: T) => void,
        internalHandler?: (e: T) => void,
      ) =>
      (e: T) => {
        internalHandler?.(e);
        userHandler?.(e);
      };

    return (
      <Button
        {...rest}
        ref={ref}
        className={`group relative inline-flex items-center justify-center ${className ?? ""}`}
        onMouseEnter={mergeEvent(rest.onMouseEnter, () =>
          textRef.current?.play(),
        )}
        onMouseLeave={mergeEvent(rest.onMouseLeave, () =>
          textRef.current?.reverse(),
        )}
        onFocus={mergeEvent(rest.onFocus, () => textRef.current?.play())}
        onBlur={mergeEvent(rest.onBlur, () => textRef.current?.reverse())}
      >
        <AnimatedSplit ref={textRef}>{children}</AnimatedSplit>

        {trailingContent && <span className="">{trailingContent}</span>}
      </Button>
    );
  },
);

AnimatedButton.displayName = "AnimatedButton";
export default AnimatedButton;
