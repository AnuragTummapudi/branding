import React, { Suspense, useEffect, useRef, useState } from "react";
const Lottie = React.lazy(() => import("lottie-react"));
import type { LottieRefCurrentProps } from "lottie-react";

export default function RainbowHeroWave() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animData, setAnimData] = useState<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!lottieRef.current) return;
        if (e.isIntersecting) lottieRef.current.play();
        else lottieRef.current.pause();
      },
      { root: null, threshold: 0.15 }
    );
    io.observe(containerRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let mounted = true;
    const url = encodeURI("/assets/Rainbow wave.json");
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        if (mounted) setAnimData(json);
      })
      .catch(() => setAnimData(null));
    return () => {
      mounted = false;
    };
  }, []);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      ref={containerRef}
      className="absolute inset-x-0 bottom-0 z-0 w-screen h-[22px] md:h-[28px] lg:h-[600px] pointer-events-none opacity-40"
    >
      {reduced ? (
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 to-white/0" />
      ) : animData ? (
        <Suspense fallback={<div className="w-full h-full bg-black/10" />}>
          <Lottie
            lottieRef={lottieRef}
            animationData={animData}
            loop
            autoplay={false}
            className="w-full h-full object-cover"
          />
        </Suspense>
      ) : (
        <div className="w-full h-full bg-black/10" />
      )}
    </div>
  );
}
