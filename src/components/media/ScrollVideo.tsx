import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ScrollVideo = () => {
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    setVideoError(false);
  }, []);

  return (
    <section id="highlight-video" className="relative w-screen h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/video-poster.png"
        onError={() => setVideoError(true)}
      >
        <source src="/assets/induslabs-hero.webm" type="video/webm" onError={() => setVideoError(true)} />
        <source src="/assets/induslabs-hero.mp4" type="video/mp4" onError={() => setVideoError(true)} />
      </video>

      <div className="relative z-10 flex h-full w-full items-end md:items-center px-6 md:px-10 lg:px-16 pb-10">
        <div className="max-w-3xl space-y-4 text-white">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm uppercase tracking-[0.28em] text-white/80"
          >
            Product highlight film
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="font-heading text-display leading-tight"
          >
            Watch IndusLabs orchestrate multilingual resolution from detection to close.
          </motion.h2>
          {videoError && (
            <div className="mt-4 inline-flex items-center gap-3 rounded-xl border border-white/20 bg-black/40 px-4 py-2 text-sm text-white/90">
              <span>Video not found. Add files to</span>
              <code className="rounded bg-white/10 px-2 py-1">public/assets</code>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScrollVideo;
