import { ReactNode } from "react";
import { BulletPoint } from "./icons";

const Pill = ({
  children,
  className,
  iconColor,
}: {
  children: string;
  className?: string;
  iconColor?: string;
}) => {
  return (
    <div
      className={`flex items-center gap-2.5 w-fit font-medium sm:text-body text-xsm ${className}`}
    >
      <BulletPoint color={iconColor ? iconColor : "#fff"} />
      <span>{children}</span>
    </div>
  );
};

export default Pill;
