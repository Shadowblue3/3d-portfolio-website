"use client";

import { SamsungSkillsEffect } from "@/components/ui/text-effect";
import { Spotlight } from "@/components/ui/spotlight";

export function SkillsAndTimeline() {
  return (
    <section className="py-20 relative overflow-hidden min-h-[40vh] flex flex-col items-center justify-center">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      {/* "SKILLS" Tech Drawing Title */}
      <div className="w-full flex justify-center relative z-10">
        <SamsungSkillsEffect speed={0.6} className="text-white" />
      </div>

      {/* Placeholder for future component integration */}
      <div className="max-w-7xl mx-auto px-4 mt-20 relative z-10">
        {/* New component will go here */}
      </div>
    </section>
  );
}
