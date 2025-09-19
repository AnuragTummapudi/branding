import type { ReactNode } from "react";
import clsx from "clsx";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

const SectionHeading = ({ eyebrow, title, description, align = "left", className }: SectionHeadingProps) => {
  return (
    <div
      className={clsx(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && <span className="text-sm uppercase tracking-[0.32em] text-brand-subtle">{eyebrow}</span>}
      <h2 className="font-heading text-h1 leading-tight text-brand">{title}</h2>
      {description && <p className="max-w-2xl text-lg text-brand-subtle">{description}</p>}
    </div>
  );
};

export default SectionHeading;
