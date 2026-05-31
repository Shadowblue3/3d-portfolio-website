import { HeroSection } from "@/components/hero";
import { BentoGridSection } from "@/components/bento-grid";
import { SkillsAndTimeline } from "@/components/skills-section";
import { Spotlight } from "@/components/ui/spotlight";
import ParticlesComponent from "@/components/ui/particles";

export default function Page() {
  return (
    <main className="bg-black/[0.96] min-h-screen text-white relative overflow-hidden">
      {/* Global Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticlesComponent />
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
      </div>

      <div className="relative z-10">
        <HeroSection />
        <BentoGridSection />
        <SkillsAndTimeline />
      </div>
    </main>
  )
}
