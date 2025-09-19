import { useEffect, useMemo, useState } from "react";

const DEFAULT_ROOT_MARGIN = "-55% 0px -35% 0px";

type UseSectionObserverOptions = {
  rootMargin?: string;
  once?: boolean;
};

const useSectionObserver = (
  sectionIds: string[],
  { rootMargin = DEFAULT_ROOT_MARGIN, once = false }: UseSectionObserverOptions = {}
) => {
  const [activeId, setActiveId] = useState<string | null>(sectionIds[0] ?? null);

  const ids = useMemo(() => [...new Set(sectionIds)], [sectionIds]);

  useEffect(() => {
    if (typeof window === "undefined" || ids.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (intersecting.length > 0) {
          const topEntry = intersecting[0];
          const id = topEntry.target.getAttribute("id");
          if (id && id !== activeId) {
            setActiveId(id);
          }
          return;
        }

        if (!once) {
          const sortedByViewport = entries
            .slice()
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          const candidate = sortedByViewport.find((entry) => entry.intersectionRatio > 0);
          const id = candidate?.target.getAttribute("id");
          if (id && id !== activeId) {
            setActiveId(id);
          }
        }
      },
      { rootMargin, threshold: [0.05, 0.2, 0.4, 0.6, 0.8] }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|"), rootMargin, once]);

  return activeId;
};

export default useSectionObserver;