import { useEffect, useState } from "react";
import clsx from "clsx";
import useSectionObserver from "../../hooks/useSectionObserver";

const sections = [
  { id: "highlight-video", label: "Highlights" },
  { id: "tts", label: "Voice Studio" },
  { id: "use-cases", label: "Use Cases" },
  { id: "security", label: "Security" },
  { id: "features", label: "Features" },
  { id: "docs", label: "Docs" },
  { id: "languages", label: "Languages" },
  { id: "integrations", label: "Integrations" }
];

const SectionNav = () => {
  const activeId = useSectionObserver(sections.map((section) => section.id), {
    rootMargin: "-60% 0px -40% 0px"
  });
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsPinned(window.scrollY > window.innerHeight * 0.3);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full px-0 md:block">
      <div
        className={clsx(
          "mx-auto flex w-full max-w-7xl items-center justify-between gap-2 overflow-hidden rounded-none md:rounded-full px-3 py-2 text-sm transition-all duration-300",
          isPinned
            ? "backdrop-blur-xl border-b md:border border-white/10 bg-[rgba(1,4,1,0.72)] shadow-[0_16px_40px_rgba(1,4,1,0.45)]"
            : "bg-transparent"
        )}
      >
        {sections.map(({ id, label }) => {
          const isActive = id === activeId;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-current={isActive ? "true" : undefined}
              className={clsx(
                "flex-1 whitespace-nowrap rounded-full px-4 py-2 text-center transition duration-300",
                isActive ? "bg-white/12 text-brand" : "text-brand-subtle hover:text-brand"
              )}
            >
              {label}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SectionNav;
