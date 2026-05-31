import { HeroSection } from "@/components/hero";
import { BentoGridSection } from "@/components/bento-grid";
import { SkillsAndTimeline } from "@/components/skills-section";

export default function Page() {
  return (
    <main className="bg-black/[0.96] min-h-screen text-white">
      <HeroSection />
      <BentoGridSection />
      <SkillsAndTimeline />
    </main>
  )
}
