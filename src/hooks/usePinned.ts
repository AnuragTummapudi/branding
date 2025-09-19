import { MutableRefObject, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type UsePinnedOptions = {
  start?: string;
  end?: string | number | (() => string | number);
  scrub?: boolean | number;
  pinSpacing?: boolean;
  anticipatePin?: number;
  enabled?: boolean;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const usePinned = (
  ref: MutableRefObject<HTMLElement | null>,
  options: UsePinnedOptions = {}
) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof window === "undefined") {
      return;
    }

    if (prefersReducedMotion() || options.enabled === false) {
      setProgress(0);
      return;
    }

    const {
      start = "top top",
      end = "+=140%",
      scrub = true,
      pinSpacing = true,
      anticipatePin = 1,
      enabled = true
    } = options;

    if (!enabled) {
      setProgress(0);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      end,
      scrub,
      pin: true,
      pinSpacing,
      anticipatePin,
      onUpdate: (self) => setProgress(self.progress)
    });

    return () => {
      setProgress(0);
      trigger.kill();
    };
  }, [ref, options.start, options.end, options.scrub, options.pinSpacing, options.anticipatePin, options.enabled]);

  return progress;
};

export default usePinned;