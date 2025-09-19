import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import LogoMarquee from "./components/logos/LogoMarquee";
import SectionNav from "./components/nav/SectionNav";
import ScrollVideo from "./components/media/ScrollVideo";
import DocsCTA from "./components/docs/DocsCTA";
import FeaturesGrid from "./components/features/FeaturesGrid";
import IntegrationsGrid from "./components/integrations/IntegrationsGrid";
import LanguageGrid from "./components/languages/LanguageGrid";
import SecurityCarousel from "./components/security/SecurityCarousel";
import SectionWaveDivider from "./components/animations/SectionWaveDivider";
import TTSDemo from "./components/tts/TTSDemo";
import UseCasesPanel from "./components/usecases/UseCasesPanel";

const App = () => {
  return (
    <div className="relative min-h-screen bg-brand text-brand">
      <main className="flex flex-col gap-0">
        <SectionNav />
        <Hero />
        <ScrollVideo />
        <LogoMarquee />
        <TTSDemo />
        <SectionWaveDivider height={220} />
        <UseCasesPanel />
        <SecurityCarousel />
        <FeaturesGrid />
        <DocsCTA />
        <LanguageGrid />
        <IntegrationsGrid />
      </main>
      <Footer />
    </div>
  );
};

export default App;
