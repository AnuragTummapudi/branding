import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";
import BotBuilderMini from "./BotBuilderMini";
import Section from "../ui/Section";
import RainbowHeroWave from "../animations/RainbowHeroWave";

const MotionSpan = motion.span;

const heroTextVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }
  })
};

const builderVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.24 } }
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Hero = () => {
  const [autoScrolled, setAutoScrolled] = useState(false);

  const handleScrollToVideo = useCallback(() => {
    const videoSection = document.getElementById("video");
    if (!videoSection) {
      return;
    }
    const offset = videoSection.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: offset, behavior: "smooth" });
    setAutoScrolled(true);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || autoScrolled) {
      return;
    }

    const scrollThreshold = () => window.innerHeight * 0.1;

    const handleWheel = (event: WheelEvent) => {
      if (autoScrolled || event.deltaY <= 8) {
        return;
      }
      if (window.scrollY <= scrollThreshold()) {
        event.preventDefault();
        handleScrollToVideo();
      }
    };

    let touchStartY: number | null = null;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (autoScrolled || touchStartY === null) {
        return;
      }
      const currentY = event.touches[0]?.clientY ?? touchStartY;
      const delta = touchStartY - currentY;
      if (delta > 12 && window.scrollY <= scrollThreshold()) {
        handleScrollToVideo();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [autoScrolled, handleScrollToVideo]);

  const gradientMask = useMemo(() => "", []);

  return (
    <Section id="hero" padding="none" className={`relative h-[100svh] overflow-hidden bg-brand ${gradientMask}`}>
      <RainbowHeroWave />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(145deg,#010401_0%,#0D231C_60%,#010401_100%)]" aria-hidden />

      <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        <motion.div
          className="flex flex-col gap-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 }
            }
          }}
        >
          <motion.div variants={heroTextVariants}>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-4 py-1 text-xs uppercase tracking-[0.32em] text-brand-subtle">
              Voice AI for Bharat
            </span>
          </motion.div>
          <motion.h1
            className="font-heading text-display leading-[0.98] text-brand"
            variants={heroTextVariants}
            custom={0.08}
          >
            The Operating System Of VOICE
          </motion.h1>
          <motion.p
            className="max-w-xl text-xl text-brand-subtle"
            variants={heroTextVariants}
            custom={0.16}
          >
            Craft multilingual voice agents with cinematic polish, homegrown TTS, and enterprise routing that feels impossibly smooth.
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center gap-4"
            variants={heroTextVariants}
            custom={0.24}
          >
            <motion.a
              href="#tts"
              className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-6 py-3 text-sm font-medium text-brand-inverse shadow-brand transition hover:shadow-brand-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play size={18} />
              Build Your Own Bot
            </motion.a>
            <motion.a
              href="#docs"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-brand-subtle transition hover:text-brand"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Explore Docs
            </motion.a>
          </motion.div>
          <motion.div
            className="flex items-center gap-3 text-sm text-brand-subtle"
            variants={heroTextVariants}
            custom={0.32}
          >
            <button
              type="button"
              onClick={handleScrollToVideo}
              className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition hover:border-brand-accent"
            >
              <MotionSpan
                initial={{ y: 0 }}
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="text-brand" size={18} />
              </MotionSpan>
            </button>
            Scroll to watch the IndusLabs experience film.
          </motion.div>
        </motion.div>
        <motion.div
          className="relative flex items-center justify-center"
          variants={builderVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute inset-10 -z-10 rounded-full bg-brand-accent/30 blur-3xl" aria-hidden />
          <BotBuilderMini />
        </motion.div>
      </div>
    </Section>
  );
};

export default Hero;
