import React, { Suspense, useEffect, useRef, useState } from "react";
const Lottie = React.lazy(() => import("lottie-react"));
import type { LottieRefCurrentProps } from "lottie-react";

export default function SectionWaveDivider({ height = 200 }: { height?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animData, setAnimData] = useState<any>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!lottieRef.current) return;
        if (e.isIntersecting) lottieRef.current.play();
        else lottieRef.current.pause();
      },
      { threshold: 0.1 }
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let mounted = true;
    const url = encodeURI("/assets/Wave Loop.json");
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
      ref={wrapRef}
      className="relative overflow-hidden"
      style={{ height, width: "100vw", marginLeft: "calc(50% - 50vw)" }}
    >
      {reduced ? (
        <div className="w-full h-full bg-gradient-to-b from-white/10 to-transparent" />
      ) : animData ? (
        <Suspense fallback={<div className="w-full h-full bg-black/5" />}>
          <Lottie
            lottieRef={lottieRef}
            animationData={animData}
            loop
            autoplay={false}
            className="w-full h-full"
          />
        </Suspense>
      ) : (
        <div className="w-full h-full bg-black/5" />
      )}
    </div>
  );
}
