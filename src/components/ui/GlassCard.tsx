import type { ReactNode } from "react";
import clsx from "clsx";

type GlassCardProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: ReactNode;
};

const GlassCard = ({ as: Component = "div", className, children }: GlassCardProps) => {
  return <Component className={clsx("glass rounded-brand-xl p-6 md:p-8", className)}>{children}</Component>;
};

export default GlassCard;
