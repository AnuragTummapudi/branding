import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Highlight, themes, type RenderProps } from "prism-react-renderer";
import Section from "../ui/Section";
import GlassCard from "../ui/GlassCard";

const nightOwl = themes.nightOwl;

const codeSample = `import { IndusLabs } from "@induslabs/sdk";

const client = new IndusLabs({ apiKey: process.env.INDUSLABS_KEY });

await client.calls.create({
  language: "hi-IN",
  voice: "asha",
  prompt: "Collect premium payment from Rahul",
  metadata: { policyId: "POL123" }
});`;

const DocsCTA = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSample);
      setCopied(true);
    } catch (error) {
      setCopied(false);
    }
  };

  const renderSnippet = ({ className, style, tokens, getLineProps, getTokenProps }: RenderProps) => (
    <pre className={`${className} overflow-x-auto px-6 pb-6 text-sm`} style={style}>
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
    <Section id="docs" background="surface">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col gap-8">
          <motion.span
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm uppercase tracking-[0.28em] text-brand-subtle"
          >
            Developers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-heading text-h1 leading-[1.02] text-brand"
          >
            Build with IndusLabs in minutes.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            className="max-w-xl text-lg text-brand-subtle"
          >
            Clean SDKs, APIs, and detailed guides help your engineers ship production-grade voice agents without waiting
            on platform teams.
          </motion.p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "View Docs", href: "#" },
              { label: "APIs", href: "#" },
              { label: "SDKs", href: "#" }
            ].map(({ label, href }) => (
              <motion.a
                key={label}
                href={href}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-brand-subtle transition hover:border-brand-accent hover:text-brand"
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>{label}</span>
              </motion.a>
            ))}
          </div>
          <p className="text-sm text-brand-subtle">
            Quickstart examples include Node.js, Python, Go, and cURL. We also ship Postman collections + Terraform
            modules.
          </p>
        </div>
        <GlassCard className="relative grid gap-6 bg-black/40 p-0 md:sticky md:top-28">
          <div className="flex items-center justify-between px-6 pt-6">
            <div>
              <h3 className="font-heading text-lg text-brand">Voice call quickstart</h3>
              <p className="text-xs uppercase tracking-[0.28em] text-brand-subtle">Node.js</p>
            </div>
            <motion.button
              type="button"
              onClick={handleCopy}
              whileTap={{ scale: 0.96 }}
              className="rounded-full border border-white/12 px-3 py-1 text-xs text-brand-subtle transition hover:border-brand-accent hover:text-brand"
            >
              {copied ? "Copied" : "Copy"}
            </motion.button>
          </div>
          <Highlight theme={nightOwl} code={codeSample} language="ts">
            {renderSnippet}
          </Highlight>
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/90"
              >
                Snippet copied
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </Section>
  );
};

export default DocsCTA;
