import { useEffect, useState } from "react";

export function useStickyAfterHero(targetId: string = "hero") {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetId]);

    return isSticky;
}
