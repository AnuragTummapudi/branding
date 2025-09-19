import { useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Section from "../ui/Section";

const languageList = [
  "Hindi",
  "English",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Gujarati",
  "Marathi",
  "Punjabi",
  "Bengali",
  "Odia",
  "Assamese",
  "Urdu",
  "Konkani",
  "Maithili",
  "Rajasthani",
  "Haryanvi",
  "Bhojpuri",
  "Sanskrit",
  "Nepali"
] as const;

const samples = ["/assets/audio/asha-demo.mp3", "/assets/audio/dev-demo.mp3"];

type LanguageName = (typeof languageList)[number];

const LanguageGrid = () => {
  const reduceMotion = useReducedMotion();
  const audioMap = useRef<Record<LanguageName, HTMLAudioElement>>({} as Record<LanguageName, HTMLAudioElement>);

  useEffect(() => {
    languageList.forEach((language, index) => {
      if (!audioMap.current[language]) {
        audioMap.current[language] = new Audio(samples[index % samples.length]);
      }
    });

    return () => {
      Object.values(audioMap.current).forEach((audio) => {
        audio.pause();
      });
    };
  }, []);

  const handlePlay = (language: LanguageName) => {
    if (reduceMotion) {
      return;
    }
    Object.values(audioMap.current).forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });

    const audio = audioMap.current[language];
    if (audio) {
      void audio.play().catch(() => undefined);
    }
  };

  const handleStop = (language: LanguageName) => {
    const audio = audioMap.current[language];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const tileVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 24 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }
      })
    }),
    []
  );

  return (
    <Section id="languages" background="default">
      <div className="flex flex-col gap-8">
        <div className="max-w-2xl space-y-4">
          <span className="text-sm uppercase tracking-[0.28em] text-brand-subtle">Languages supported</span>
          <h2 className="font-heading text-h1 leading-[1.02] text-brand">20+ languages with native tonality.</h2>
          <p className="text-lg text-brand-subtle">
            One pipeline for Bharat-scale coverage - tune pronunciations, accents, and emotion packs per state.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {languageList.map((language, index) => (
            <motion.button
              type="button"
              key={language}
              custom={index}
              variants={tileVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.45 }}
              className="group flex flex-col items-start gap-3 rounded-brand-xl border border-white/12 bg-black/30 p-6 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              onMouseEnter={() => handlePlay(language)}
              onMouseLeave={() => handleStop(language)}
              onFocus={() => handlePlay(language)}
              onBlur={() => handleStop(language)}
            >
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-brand-subtle">
                {index < 8 ? "Primary" : "Extended"}
              </span>
              <span className="font-heading text-lg text-brand">{language}</span>
              <span className="text-sm text-brand-subtle">Hover to preview the sample clip.</span>
            </motion.button>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default LanguageGrid;