import { useState } from "react";
import { Sparkle, Wand2 } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const languages = ["English", "Hindi", "Tamil", "Kannada", "Bengali"];
const voices = ["Asha (Female)", "Dev (Male)", "Riya (Female)", "Kabir (Male)"];

const BotBuilderMini = () => {
  const [language, setLanguage] = useState(languages[0]);
  const [voice, setVoice] = useState(voices[0]);
  const [prompt, setPrompt] = useState("Need an AI agent for loan recovery in Hindi.");

  return (
    <GlassCard className="w-full max-w-md space-y-6">
      <header className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-accent text-brand-inverse">
          <Sparkle size={18} />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-brand-subtle">Builder Preview</p>
          <h3 className="font-heading text-lg text-brand">Configure your agent</h3>
        </div>
      </header>
      <div className="grid gap-4">
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-brand-subtle">Language</span>
          <select
            className="rounded-brand-lg border border-brand bg-transparent px-3 py-2 text-brand outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
          >
            {languages.map((item) => (
              <option key={item} value={item} className="text-brand">
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-brand-subtle">Voice</span>
          <select
            className="rounded-brand-lg border border-brand bg-transparent px-3 py-2 text-brand outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent"
            value={voice}
            onChange={(event) => setVoice(event.target.value)}
          >
            {voices.map((item) => (
              <option key={item} value={item} className="text-brand">
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-brand-subtle">Agent Prompt</span>
          <textarea
            className="min-h-[120px] rounded-brand-lg border border-brand bg-transparent px-3 py-3 text-brand outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
          />
        </label>
      </div>
      <div className="flex items-center justify-between gap-3">
        <button className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-4 py-2 text-sm font-medium text-brand-inverse shadow-brand transition duration-300 hover:shadow-brand-md">
          <Wand2 size={16} />
          Generate Script
        </button>
        <button className="rounded-full border border-brand px-4 py-2 text-sm text-brand-subtle transition duration-300 hover:text-brand">
          Preview Call
        </button>
      </div>
      <footer className="text-xs text-brand-subtle">
        {language} - {voice} - {prompt.length} chars
      </footer>
    </GlassCard>
  );
};

export default BotBuilderMini;
