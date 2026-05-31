"use client";

import { SamsungSkillsEffect } from "@/components/ui/text-effect";
import { Spotlight } from "@/components/ui/spotlight";
import { RotatingSpheres } from "@/components/ui/rotating-spheres";

export function SkillsAndTimeline() {
  return (
    <section className="py-20 relative overflow-hidden min-h-screen flex flex-col items-center justify-center">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      {/* "SKILLS" Tech Drawing Title */}
      <div className="w-full flex justify-center relative z-10">
        <SamsungSkillsEffect speed={0.6} className="text-white" />
      </div>

      {/* Rotating Spheres Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-20 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First Component - 5 Rotating Spheres */}
          <RotatingSpheres
            sphereCount={5}
            label="Frontend"
            className="col-span-1"
          />

          {/* Second Component - 5 Rotating Spheres */}
          <RotatingSpheres
            sphereCount={5}
            label="Backend"
            className="col-span-1"
          />

          {/* Third Component - 4 Rotating Spheres */}
          <RotatingSpheres
            sphereCount={4}
            label="Tools"
            className="col-span-1"
          />
        </div>
      </div>
    </section>
  );
}
