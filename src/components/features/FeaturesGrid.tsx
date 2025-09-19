import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { BrainCircuit, Layers, MessageSquareDashed, Radar, Workflow } from "lucide-react";
import Section from "../ui/Section";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
  mediaGradient: string;
  mediaAccent: string;
};

const features: Feature[] = [
  {
    icon: Workflow,
    title: "Drag-and-drop orchestrations",
    description: "Design conversational flows, fallback logic, and CRM syncs with versioning baked in.",
    tag: "Builder",
    mediaGradient: "linear-gradient(140deg,#0C1F1A 0%,#08110F 100%)",
    mediaAccent: "rgba(0,195,255,0.28)"
  },
  {
    icon: MessageSquareDashed,
    title: "Agent intelligence",
    description: "Intent detection, sentiment scoring, and contextual memory to keep your agents human-like.",
    tag: "AI",
    mediaGradient: "linear-gradient(140deg,#0B0F1F 0%,#060914 100%)",
    mediaAccent: "rgba(106,95,255,0.28)"
  },
  {
    icon: Layers,
    title: "Omnichannel ready",
    description: "Deploy the same agent across voice, WhatsApp, and webchat without additional lift.",
    tag: "Channels",
    mediaGradient: "linear-gradient(140deg,#100B1F 0%,#090612 100%)",
    mediaAccent: "rgba(255,94,172,0.28)"
  },
  {
    icon: BrainCircuit,
    title: "LLM guardrails",
    description: "Bring-your-own LLM or pick managed IndusLabs models with PII redaction and guardrails.",
    tag: "Safety",
    mediaGradient: "linear-gradient(140deg,#0F1206 0%,#050703 100%)",
    mediaAccent: "rgba(255,191,0,0.22)"
  },
  {
    icon: Radar,
    title: "Realtime analytics",
    description: "Track deflection, conversion, and NPS across languages with live dashboards.",
    tag: "Insights",
    mediaGradient: "linear-gradient(140deg,#051419 0%,#04080A 100%)",
    mediaAccent: "rgba(76,217,181,0.3)"
  }
];

const FeaturePanel = ({ feature, index }: { feature: Feature; index: number }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const mediaTranslate = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const Icon = feature.icon;
  const isReversed = index % 2 === 1;

  return (
    <motion.article
      ref={ref}
      className={`relative flex flex-col gap-12 overflow-hidden rounded-[32px] border border-white/10 bg-black/30 p-10 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl md:flex-row ${
        isReversed ? "md:flex-row-reverse" : ""
      }`}
      initial={{ opacity: 0, y: 64 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-1 flex-col justify-center gap-6">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-4 py-1 text-xs uppercase tracking-[0.32em] text-brand-subtle">
          {feature.tag}
        </span>
        <h3 className="font-heading text-h2 leading-tight text-brand">{feature.title}</h3>
        <p className="text-lg text-brand-subtle">{feature.description}</p>
      </div>
      <motion.div className="relative flex flex-1 items-center justify-center" style={{ y: mediaTranslate }}>
        <div
          className="relative h-[260px] w-full max-w-[360px] overflow-hidden rounded-[28px] border border-white/10"
          style={{ background: feature.mediaGradient }}
        >
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(circle at top, ${feature.mediaAccent}, transparent 70%)` }}
            aria-hidden
          />
          <div className="absolute inset-6 rounded-[20px] border border-white/10 bg-black/40 backdrop-blur-lg" />
          <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
            <div className="flex items-center justify-between text-sm text-white/70">
              <span>IndusLabs OS</span>
              <Icon size={20} />
            </div>
            <div className="space-y-2 text-sm text-white/75">
              <p>Latency &lt; 250ms</p>
              <p>Realtime analytics</p>
              <p>Inline prompt guardrails</p>
            </div>
            <div className="flex items-center justify-between text-xs text-white/60">
              <span>Live preview</span>
              <span>1/1</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
};

const FeaturesGrid = () => {
  return (
    <Section id="features" background="default" className="flex flex-col gap-16">
      <div className="max-w-3xl space-y-4">
        <span className="text-sm uppercase tracking-[0.28em] text-brand-subtle">Features</span>
        <h2 className="font-heading text-h1 leading-[1.02] text-brand">Apple-level craft. Enterprise depth.</h2>
        <p className="text-lg text-brand-subtle">
          Each panel is engineered to feel cinematic yet operational, so your teams can move from prototype to
          production calmly.
        </p>
      </div>
      <div className="flex flex-col gap-12">
        {features.map((feature, index) => (
          <FeaturePanel key={feature.title} feature={feature} index={index} />
        ))}
      </div>
    </Section>
  );
};

export default FeaturesGrid;
