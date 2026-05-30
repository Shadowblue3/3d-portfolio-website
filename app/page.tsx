import { HeroSection } from "@/components/hero";
import { BentoGridSection } from "@/components/bento-grid";

export default function Page() {
  return (
    <main className="bg-black/[0.96] min-h-screen text-white">
      <HeroSection />
      <BentoGridSection />
    </main>
  )
}
