import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Section from "../ui/Section";

const useCases = [
  {
    id: "lead-gen",
    name: "Lead Generation",
    summary: "Qualify inbound leads in 12 Indian languages with contextual upsell routes.",
    languages: ["English", "Hindi", "Telugu", "Marathi"],
    voices: ["Asha", "Kabir"],
    theme: {
      background: "linear-gradient(140deg,#051312 0%,#081d16 45%,#040807 100%)",
      glow: "rgba(0,195,255,0.22)",
      accent: "#00C3FF",
      badge: "Growth"
    },
    media: {
      title: "Faster MQL routing",
      copy: "Agents pre-qualify, tag intent, and sync to CRM in under 45 seconds.",
      stat: "+32% conversions"
    }
  },
  {
    id: "support",
    name: "Customer Support",
    summary: "Resolve tier-1 support queries with CRM-connected agents that escalate smartly.",
    languages: ["English", "Hindi", "Tamil", "Gujarati"],
    voices: ["Riya", "Dev"],
    theme: {
      background: "linear-gradient(160deg,#050914 0%,#0b1b2c 50%,#050914 100%)",
      glow: "rgba(106,95,255,0.24)",
      accent: "#6A5FFF",
      badge: "CX"
    },
    media: {
      title: "Auto-resolve tier-1",
      copy: "Context-aware replies with 95% containment across L1 intents.",
      stat: "85% CSAT"
    }
  },
  {
    id: "recovery",
    name: "Loan Recovery",
    summary: "Empathetic yet firm repayment nudges with regulator-compliant scripting.",
    languages: ["Hindi", "Kannada", "Marathi"],
    voices: ["Dev", "Asha"],
    theme: {
      background: "linear-gradient(150deg,#140505 0%,#2a0f0f 50%,#0a0505 100%)",
      glow: "rgba(255,94,94,0.28)",
      accent: "#FF5E5E",
      badge: "Collections"
    },
    media: {
      title: "Regulator safe",
      copy: "Dialers auto-adjust tone and timing to keep compliance airtight.",
      stat: "5x RPC uplift"
    }
  },
  {
    id: "education",
    name: "Education",
    summary: "Offer 24/7 vernacular helplines and admissions guidance across states.",
    languages: ["English", "Hindi", "Bengali", "Tamil"],
    voices: ["Riya", "Asha"],
    theme: {
      background: "linear-gradient(150deg,#051214 0%,#0d2028 55%,#051214 100%)",
      glow: "rgba(0,195,255,0.18)",
      accent: "#43E0FF",
      badge: "Admissions"
    },
    media: {
      title: "Admissions on autopilot",
      copy: "Guide parents through eligibility, paperwork, and fee plans instantly.",
      stat: "-40% turnaround"
    }
  },
  {
    id: "healthcare",
    name: "Healthcare",
    summary: "Automate appointment reminders and medicine adherence in patient-friendly voices.",
    languages: ["English", "Hindi", "Malayalam"],
    voices: ["Asha", "Kabir"],
    theme: {
      background: "linear-gradient(160deg,#07140f 0%,#0f2d22 60%,#05120e 100%)",
      glow: "rgba(80,220,190,0.26)",
      accent: "#4CD9B5",
      badge: "Care"
    },
    media: {
      title: "Patient adherence",
      copy: "Smart follow-ups with empathy detection keep patients on schedule.",
      stat: "92% adherence"
    }
  },
  {
    id: "security",
    name: "Banking KYC",
    summary: "Instant KYC verifications with language detection and secure OTP flows.",
    languages: ["English", "Hindi", "Punjabi"],
    voices: ["Dev", "Riya"],
    theme: {
      background: "linear-gradient(160deg,#080914 0%,#111d40 55%,#05060d 100%)",
      glow: "rgba(0,80,255,0.28)",
      accent: "#3F7BFF",
      badge: "Trust"
    },
    media: {
      title: "Instant KYC",
      copy: "Voice biometrics, OTP, and document capture stitched in one call.",
      stat: "< 90s verification"
    }
  }
];

const chipClass = "inline-flex items-center rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.28em]";

const UseCasesPanel = () => {
  const [activeId, setActiveId] = useState(useCases[0].id);
  const activeCase = useMemo(() => useCases.find((item) => item.id === activeId) ?? useCases[0], [activeId]);
  const [selectedLanguage, setSelectedLanguage] = useState(activeCase.languages[0]);
  const [selectedVoice, setSelectedVoice] = useState(activeCase.voices[0]);
  const [phone, setPhone] = useState("");
  const [slot, setSlot] = useState("");

  useEffect(() => {
    setSelectedLanguage(activeCase.languages[0]);
    setSelectedVoice(activeCase.voices[0]);
  }, [activeCase.languages, activeCase.voices]);

  const handleActivate = (id: string) => {
    setActiveId(id);
  };

  const trackClass = "flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 md:px-10 lg:px-16 pb-12 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20";

  return (
    <Section id="use-cases" background="surface" className="relative overflow-hidden py-20 md:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 md:px-10 lg:px-16">
        <div className="flex flex-col gap-4">
          <span className="text-sm uppercase tracking-[0.28em] text-brand-subtle">Use Cases</span>
          <h2 className="font-heading text-h1 leading-[1.02] text-brand">Adaptable flows for every vertical.</h2>
          <p className="max-w-2xl text-lg text-brand-subtle">
            Swipe through our most deployed playbooks. Each card showcases the language mix, voice selection, and the metric our customers care about most.
          </p>
        </div>
      </div>

      <div className="relative mt-12" style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface via-surface/85 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface via-surface/85 to-transparent" />

        <div className={trackClass} style={{ scrollSnapType: "x mandatory" }}>
          {useCases.map((useCase) => {
            const isActive = useCase.id === activeId;
            return (
              <article
                key={useCase.id}
                className={`snap-start shrink-0 cursor-pointer rounded-[36px] border border-white/12 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-lg transition-transform duration-300 ${
                  isActive ? "scale-[1.02]" : "hover:scale-[1.01]"
                }`}
                style={{
                  background: useCase.theme.background,
                  width: "min(82vw, 420px)",
                  height: "520px"
                } as CSSProperties}
                onClick={() => handleActivate(useCase.id)}
              >
                <div className="flex h-full flex-col justify-between gap-6 p-8 text-white">
                  <div className="flex flex-col gap-4">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/80">
                      {useCase.theme.badge}
                    </span>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-semibold leading-snug">{useCase.name}</h3>
                      <p className="text-sm text-white/75">{useCase.summary}</p>
                    </div>
                    <div className="space-y-3">
                      <span className="text-xs uppercase tracking-[0.32em] text-white/60">Languages</span>
                      <div className="flex flex-wrap gap-2">
                        {useCase.languages.map((language) => (
                          <span
                            key={language}
                            className={`${chipClass} ${
                              selectedLanguage === language ? "border-white/60 bg-white/20 text-white" : "text-white/70"
                            }`}
                          >
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <span className="text-xs uppercase tracking-[0.32em] text-white/60">Voices</span>
                      <div className="flex flex-wrap gap-2">
                        {useCase.voices.map((voice) => (
                          <span
                            key={voice}
                            className={`${chipClass} ${
                              selectedVoice === voice ? "border-white/60 bg-white/20 text-white" : "text-white/70"
                            }`}
                          >
                            {voice}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="text-xs uppercase tracking-[0.32em] text-white/60">Impact</span>
                      <div className="rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white/80">
                        <p className="font-medium text-white">{useCase.media.title}</p>
                        <p className="text-xs text-white/70">{useCase.media.copy}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>{useCase.media.stat}</span>
                      <span className="text-white/50">Live routing preview</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          <article
            className="snap-start shrink-0 rounded-[36px] border border-white/12 bg-black/40 p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-lg"
            style={{ width: "min(82vw, 420px)", height: "520px" }}
          >
            <div className="flex h-full flex-col gap-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] text-white/60">Dial in your stack</span>
                <h3 className="text-2xl font-semibold">Configure {activeCase.name}</h3>
                <p className="text-sm text-white/70">
                  Select the primary language + voice pairing you want to preview, then scroll to test drive a sample call.
                </p>
              </div>
              <div className="space-y-5">
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-[0.32em] text-white/60">Languages</span>
                  <div className="flex flex-wrap gap-2">
                    {activeCase.languages.map((language) => {
                      const isActive = selectedLanguage === language;
                      return (
                        <button
                          key={language}
                          type="button"
                          onClick={() => setSelectedLanguage(language)}
                          className={`${chipClass} transition ${
                            isActive ? "border-white/70 bg-white/25 text-white" : "text-white/70 hover:border-white/35"
                          }`}
                        >
                          {language}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-[0.32em] text-white/60">Voices</span>
                  <div className="flex flex-wrap gap-2">
                    {activeCase.voices.map((voice) => {
                      const isActive = selectedVoice === voice;
                      return (
                        <button
                          key={voice}
                          type="button"
                          onClick={() => setSelectedVoice(voice)}
                          className={`${chipClass} transition ${
                            isActive ? "border-white/70 bg-white/25 text-white" : "text-white/70 hover:border-white/35"
                          }`}
                        >
                          {voice}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/80">
                <p className="text-xs uppercase tracking-[0.32em] text-white/60">Currently previewing</p>
                <p className="mt-2 text-base font-medium text-white">
                  {selectedLanguage} · {selectedVoice}
                </p>
              </div>
            </div>
          </article>

          <article
            className="snap-start shrink-0 rounded-[36px] border border-white/12 bg-black/40 p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-lg"
            style={{ width: "min(82vw, 420px)", height: "520px" }}
          >
            <div className="flex h-full flex-col gap-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] text-white/60">Launch a test webcall</span>
                <h3 className="text-2xl font-semibold">Try {activeCase.name} on your phone</h3>
                <p className="text-sm text-white/70">
                  Drop your number and a slot—well fire a multilingual, {selectedVoice} powered sample straight to your line.
                </p>
              </div>
              <div className="space-y-4 text-sm text-white/80">
                <label className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-[0.32em] text-white/60">Phone number</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="+91 98765 43210"
                    className="rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-[0.32em] text-white/60">Preferred slot</span>
                  <input
                    type="time"
                    value={slot}
                    onChange={(event) => setSlot(event.target.value)}
                    className="rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-white focus:border-white/50 focus:outline-none"
                  />
                </label>
              </div>
              <div className="mt-auto space-y-3">
                <button
                  type="button"
                  className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Send me the sample
                </button>
                <p className="text-xs text-white/50">
                  Well route an automated sample using {selectedLanguage} · {selectedVoice}. No spam, ever.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </Section>
  );
};

export default UseCasesPanel;

