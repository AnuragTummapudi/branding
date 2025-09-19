import Marquee from "react-fast-marquee";
import Section from "../ui/Section";

const clientLogos = [
  "/assets/client logos/bharat-petrolium-logo-v2.png",
  "/assets/client logos/bharat-petrolium.png",
  "/assets/client logos/bikaji.png",
  "/assets/client logos/casio.png",
  "/assets/client logos/century-logo.png",
  "/assets/client logos/colorbar-logo.png",
  "/assets/client logos/denver.png",
  "/assets/client logos/friends.png",
  "/assets/client logos/heilderburg-cement.png",
  "/assets/client logos/iffco-logo-old.png",
  "/assets/client logos/iffco-logo.png",
  "/assets/client logos/kajaria.png",
  "/assets/client logos/nykaa-logo.png",
  "/assets/client logos/rupa-logo.png",
  "/assets/client logos/samsung.png",
  "/assets/client logos/toi.png",
  "/assets/client logos/vini.png",
  "/assets/client logos/volvo-eicher.png"
];

const LogoMarquee = () => {
  return (
    <Section id="clients" background="alt" padding="sm">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm uppercase tracking-[0.28em] text-brand-subtle">Trusted partners</h3>
          <span className="text-xs text-brand-subtle">Hover to reveal color</span>
        </div>
        <div className="overflow-hidden rounded-brand-xl border border-brand bg-surface">
          <Marquee gradient={false} speed={18} pauseOnHover>
            {clientLogos.map((src) => {
              const encoded = encodeURI(src);
              const label = src
                .split("/").pop()?.replace(/\.[^.]+$/, "")
                ?.replace(/[-_]+/g, " ")
                ?.replace(/\b\w/g, (m) => m.toUpperCase()) ?? "Client";
              return (
                <div key={src} className="mx-10 flex h-20 items-center justify-center">
                  <img
                    src={encoded}
                    alt={label}
                    className="h-8 w-auto grayscale opacity-80 transition duration-300 hover:opacity-100"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </Marquee>
        </div>
      </div>
    </Section>
  );
};

export default LogoMarquee;
