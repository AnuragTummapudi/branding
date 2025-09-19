import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCheck, Shield, ShieldAlert } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import Section from "../ui/Section";
import GlassCard from "../ui/GlassCard";

const certificates = [
  {
    title: "ISO 27001",
    description: "End-to-end information security practices with yearly surveillance audits.",
    details:
      "Our ISO controls cover infrastructure, application development, incident response, and vendor management. SOC2 and CERT-In attestations piggyback on the same evidence locker."
  },
  {
    title: "SOC 2",
    description: "Controls across security, availability, confidentiality & privacy.",
    details:
      "Type II reports with continuous control monitoring via Drata. Real-time dashboards are available for enterprise customers with NDA in place."
  },
  {
    title: "GDPR",
    description: "Privacy-first flows with data residency in-region for EU workloads.",
    details:
      "Data processing agreements, SCCs, and regional data residency (Frankfurt / Mumbai) deliver compliance without performance penalties."
  },
  {
    title: "MeitY",
    description: "Aligned with Indian data mandates with on-soil storage.",
    details:
      "We meet MeitY and RBI advisories with sovereign cloud options and fully encrypted voice storage across Indian AZs."
  },
  {
    title: "HIPAA",
    description: "Healthcare-grade safeguards for PHI handling.",
    details:
      "Signed BAAs, audit trails, and PHI-safe redaction keep tele-health deployments compliant from day zero."
  }
];

const SecurityCarousel = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showTrustBar, setShowTrustBar] = useState(false);
  const [activeCert, setActiveCert] = useState<typeof certificates[number] | null>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowTrustBar(true);
          } else if (entry.boundingClientRect.top > 0) {
            setShowTrustBar(false);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.15, 0.35] }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="security" ref={sectionRef} background="default" className="pb-32">
      <AnimatePresence>
        {showTrustBar && (
          <motion.div
            key="trust-bar"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-16 z-30 mb-8 hidden rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-white/70 shadow-brand md:flex"
          >
            <div className="flex items-center gap-2 px-3">
              <Shield size={14} className="text-brand-accent" />
              <span>Zero trust network</span>
            </div>
            <div className="flex items-center gap-2 px-3">
              <CheckCheck size={14} className="text-brand-accent" />
              <span>Audit-ready evidence locker</span>
            </div>
            <div className="flex items-center gap-2 px-3">
              <ShieldAlert size={14} className="text-brand-accent" />
              <span>PII redaction + on-soil storage</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-4">
            <span className="text-sm uppercase tracking-[0.28em] text-brand-subtle">Security & Compliance</span>
            <h2 className="font-heading text-h1 leading-[1.02] text-brand">
              Enterprise-grade security with audit-ready workflows.
            </h2>
            <p className="text-lg text-brand-subtle">
              Multi-layer safeguards, air-gapped models, and full audit logs give your teams peace of mind before the
              first pilot.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-brand-subtle transition hover:border-brand-accent hover:text-brand"
          >
            View security whitepaper
          </a>
        </div>
        <GlassCard className="p-0">
          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={24}
            slidesPerView={1.1}
            freeMode={{ enabled: true, momentum: true }}
            centeredSlides
            loop
            speed={1600}
            autoplay={{ delay: 2800, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 }
            }}
          >
            {certificates.map((cert) => (
              <SwiperSlide key={cert.title}>
                <button
                  type="button"
                  onClick={() => setActiveCert(cert)}
                  className="group h-full w-full rounded-brand-xl border border-white/12 bg-black/20 p-6 text-left transition hover:border-brand-accent"
                >
                  <h3 className="text-lg font-semibold text-brand">{cert.title}</h3>
                  <p className="mt-3 text-sm text-brand-subtle">{cert.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm text-brand-subtle transition group-hover:text-brand">
                    Learn more
                  </span>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </GlassCard>
      </div>
      <AnimatePresence>
        {activeCert && (
          <motion.div
            key="security-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur"
            onClick={() => setActiveCert(null)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto w-full max-w-xl rounded-brand-2xl border border-white/10 bg-brand px-6 py-8 text-brand"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-2xl text-brand">{activeCert.title}</h3>
                <button
                  type="button"
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-brand-subtle"
                  onClick={() => setActiveCert(null)}
                >
                  Close
                </button>
              </div>
              <p className="mt-4 text-sm text-brand-subtle">{activeCert.description}</p>
              <p className="mt-6 text-base leading-relaxed text-brand-subtle">{activeCert.details}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default SecurityCarousel;