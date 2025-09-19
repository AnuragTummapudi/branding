import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Section from "../ui/Section";
import GlassCard from "../ui/GlassCard";

// Map to your public/assets/integration logos
const integrationLogos = [
  "/assets/integration/api-logo.png",
  "/assets/integration/busy-logo.png",
  "/assets/integration/google-data-studio-logo.png",
  "/assets/integration/google-workspace-logo.png",
  "/assets/integration/marg-logo.png",
  "/assets/integration/microsoft-365-logo.png",
  "/assets/integration/oracle-logo.png",
  "/assets/integration/outlook-logo.png",
  "/assets/integration/power-bi.png",
  "/assets/integration/sap-logo.png",
  "/assets/integration/tablu-logo.png",
  "/assets/integration/tally-logo.png",
  "/assets/integration/whats-app-logo.png"
];

const categories = ["All", "Cloud", "Data", "Email", "ERP", "BI", "Messaging"] as const;

const IntegrationsGrid = () => {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");

  const items = useMemo(() => integrationLogos.map((src) => ({
    src: encodeURI(src),
    name: (src.split("/").pop() || "Integration").replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").replace(/\b\w/g, (m) => m.toUpperCase())
  })), []);

  const filteredIntegrations = items; // Simple display without category filtering for now

  return (
    <Section id="integrations" background="surface">
      <div className="flex flex-col gap-10">
        <div className="max-w-3xl space-y-4">
          <span className="text-sm uppercase tracking-[0.28em] text-brand-subtle">Integrations</span>
          <h2 className="font-heading text-h1 leading-[1.02] text-brand">Plug into your stack instantly.</h2>
          <p className="text-lg text-brand-subtle">
            Use prebuilt connectors or webhooks to orchestrate CRM, dialers, WhatsApp, and data warehouses.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <span
                key={category}
                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.28em] ${
                  isActive ? "border-brand-accent bg-brand-accent/10 text-brand" : "border-white/10 text-brand-subtle"
                }`}
              >
                {category}
              </span>
            );
          })}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredIntegrations.map((integration) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlassCard className="h-full flex items-center justify-center bg-black/35 transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                  <img
                    src={integration.src}
                    alt={integration.name}
                    className="max-h-10 w-auto grayscale opacity-80 transition duration-300 hover:opacity-100"
                    loading="lazy"
                  />
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
};

export default IntegrationsGrid;
