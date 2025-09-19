import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AudioPlayer from "react-h5-audio-player";
import { Highlight, themes, type RenderProps } from "prism-react-renderer";
import "react-h5-audio-player/lib/styles.css";
import Section from "../ui/Section";
import GlassCard from "../ui/GlassCard";
import usePinned from "../../hooks/usePinned";

const nightOwl = themes.nightOwl;

const demoVoices = [
  {
    id: "voice-a",
    name: "Asha - Warm Female",
    src: "/assets/audio/asha-demo.mp3",
    accent: "Hindi"
  },
  {
    id: "voice-b",
    name: "Dev - Confident Male",
    src: "/assets/audio/dev-demo.mp3",
    accent: "English"
  }
];

const ssmlSnippet = `<speak>
  <p>Good afternoon, Rahul.</p>
  <break time="400ms"/>
  <p>Your premium for policy <say-as interpret-as="characters">POL123</say-as>
  is due today. Press 1 to pay now, or 2 to schedule a reminder.</p>
  <prosody rate="90%">Thank you from the IndusLabs team.</prosody>
</speak>`;

const containerVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } }
};

const TTSDemo = () => {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [text, setText] = useState(
    "Hi there! I'm IndusLabs Asha. How can I help your customers in their preferred language today?"
  );
  const [activeVoice, setActiveVoice] = useState(demoVoices[0].id);
  const [showSSML, setShowSSML] = useState(false);

  const progress = usePinned(sectionRef, {
    end: "+=120%",
    scrub: true,
    enabled: !reduceMotion
  });

  useEffect(() => {
    if (!showSSML) {
      return;
    }
    const timer = setTimeout(() => {
      const snippet = document.getElementById("tts-ssml-snippet");
      snippet?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 200);
    return () => clearTimeout(timer);
  }, [showSSML]);

  const activeVoiceMeta = useMemo(() => demoVoices.find((voice) => voice.id === activeVoice), [activeVoice]);

  const renderSnippet = ({ className, style, tokens, getLineProps, getTokenProps }: RenderProps) => (
    <pre
      id="tts-ssml-snippet"
      className={`${className} overflow-x-auto rounded-brand-xl p-6 text-sm`}
      style={style}
    >
      {tokens.map((line, lineIndex) => (
        <div key={lineIndex} {...getLineProps({ line, key: lineIndex })}>
          {line.map((token, tokenIndex) => (
            <span key={tokenIndex} {...getTokenProps({ token, key: tokenIndex })} />
          ))}
        </div>
      ))}
    </pre>
  );

  return (
    <Section id="tts" ref={sectionRef} background="default">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          className="flex flex-col gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.55 }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.12 }
            }
          }}
        >
          <motion.span variants={containerVariants} className="text-sm uppercase tracking-[0.28em] text-brand-subtle">
            Real-time voice studio
          </motion.span>
          <motion.h2 variants={containerVariants} className="font-heading text-h1 leading-[1.02] text-brand">
            Homegrown TTS that sounds like a flagship launch film.
          </motion.h2>
          <motion.p variants={containerVariants} className="max-w-xl text-lg text-brand-subtle">
            Type anything and hear IndusLabs voices render it with vernacular nuance, SSML, and emotion tags that feel
            premium out of the box.
          </motion.p>
          <motion.div variants={containerVariants} className="space-y-3 text-sm text-brand-subtle">
            <label className="flex flex-col gap-2">
              <span>Paste your script</span>
              <textarea
                className="min-h-[220px] rounded-brand-xl border border-white/10 bg-transparent px-4 py-4 text-brand outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/40"
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
              <span className="text-xs text-brand-subtle">{text.length} / 320 characters</span>
            </label>
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-brand-subtle">
              Supports SSML, emotion, and accent tuning
            </div>
            <button
              type="button"
              onClick={() => setShowSSML((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-brand-subtle transition hover:border-brand-accent hover:text-brand"
            >
              {showSSML ? "Hide SSML snippet" : "Show SSML snippet"}
            </button>
          </motion.div>
          <motion.div
            variants={containerVariants}
            animate={{
              opacity: showSSML ? 1 : 0,
              height: showSSML ? "auto" : 0
            }}
            className="overflow-hidden"
          >
            {showSSML && (
              <GlassCard className="mt-4 bg-[#0b1820]/80 p-0">
                <Highlight theme={nightOwl} code={ssmlSnippet} language="markup">
                  {renderSnippet}
                </Highlight>
              </GlassCard>
            )}
          </motion.div>
        </motion.div>
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
          style={{
            transform: reduceMotion ? undefined : `translateY(${(1 - progress) * 32}px)`
          }}
        >
          <GlassCard className="relative flex flex-col gap-6 overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,195,255,0.18),transparent_70%)]" aria-hidden />
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl text-brand">Preview voices</h3>
                <p className="text-sm text-brand-subtle">Tap play to hear the IndusLabs fidelity.</p>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-brand-subtle">
                {activeVoiceMeta?.accent}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {demoVoices.map((voice) => (
                <div key={voice.id} className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setActiveVoice(voice.id)}
                    className={`flex w-full items-center justify-between rounded-brand-lg border px-4 py-3 text-left text-sm transition ${
                      activeVoice === voice.id
                        ? "border-brand-accent bg-brand-accent/10 text-brand"
                        : "border-white/10 bg-transparent text-brand-subtle hover:border-white/20"
                    }`}
                  >
                    <span>{voice.name}</span>
                    <span className="text-xs uppercase tracking-[0.28em]">Play</span>
                  </button>
                  {activeVoice === voice.id && (
                    <AudioPlayer
                      src={voice.src}
                      showJumpControls={false}
                      customAdditionalControls={[]}
                      customVolumeControls={[]}
                      layout="stacked"
                    />
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </Section>
  );
};

export default TTSDemo;
