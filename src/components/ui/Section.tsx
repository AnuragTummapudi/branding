import { CSSProperties, forwardRef, ReactNode } from "react";
import clsx from "clsx";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  background?: "default" | "alt" | "surface";
  padding?: "none" | "sm" | "lg";
  style?: CSSProperties;
};

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, children, className, background = "default", padding = "lg", style }, ref) => {
    const paddingClass =
      padding === "none" ? "py-0" : padding === "sm" ? "py-12" : "py-20 md:py-28";

    return (
      <section
        ref={ref}
        id={id}
        className={clsx(
          "relative w-full scroll-mt-24 md:scroll-mt-32",
          background === "alt" && "bg-brand-alt",
          background === "surface" && "bg-surface",
          className
        )}
        style={style}
      >
        <div
          className={clsx(
            "mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 md:px-10 lg:px-16",
            paddingClass
          )}
        >
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
