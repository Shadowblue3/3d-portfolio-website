"use client";

import { SamsungSkillsEffect, SamsungProjectsEffect } from "@/components/ui/text-effect";
import RadialOrbitalTimeline, { OrbitNode } from "@/components/ui/radial-orbital-timeline";
import { FeatureCarousel } from "@/components/ui/feature-carousel";

const webDevNodes: OrbitNode[] = [
  { icon: "/nodejs.svg", label: "Node.js", status: "complete", date: "Expert", desc: "Server-side JavaScript runtime.", energy: 90, connected: ["React", "Express"] },
  { icon: "/reaact.svg", label: "React", status: "complete", date: "Expert", desc: "Modern UI library.", energy: 95, connected: ["Node.js", "Tailwind"] },
  { icon: "/express.svg", label: "Express", status: "complete", date: "Expert", desc: "Web framework for Node.js.", energy: 85, connected: ["Node.js"] },
  { icon: "/tailwind.svg", label: "Tailwind", status: "complete", date: "Expert", desc: "Utility-first CSS framework.", energy: 95, connected: ["React"] },
  { icon: "JS", label: "Javascript", status: "complete", date: "Expert", desc: "Core language of the web.", energy: 95, connected: ["React", "Node.js"] },
];

const aiNodes: OrbitNode[] = [
  { icon: "/pytorch.svg", label: "PyTorch", status: "progress", date: "Advanced", desc: "Deep learning framework.", energy: 85, connected: ["Sklearn"] },
  { icon: "/numpy.svg", label: "NumPy", status: "complete", date: "Expert", desc: "Scientific computing in Python.", energy: 90, connected: ["Pandas"] },
  { icon: "/pandas.svg", label: "Pandas", status: "complete", date: "Expert", desc: "Data manipulation and analysis.", energy: 85, connected: ["NumPy"] },
  { icon: "/scikitlearn.svg", label: "Sklearn", status: "complete", date: "Expert", desc: "Machine learning library.", energy: 85, connected: ["PyTorch"] },
  { icon: "🤗", label: "Hugging Face", status: "progress", date: "Advanced", desc: "Transformer models and NLP.", energy: 75, connected: ["PyTorch"] },
];

const languageNodes: OrbitNode[] = [
  { icon: "/cpp3.svg", label: "C/C++", status: "complete", date: "Expert", desc: "High-performance systems programming.", energy: 85, connected: ["Python"] },
  { icon: "/python.svg", label: "Python", status: "complete", date: "Expert", desc: "Versatile language for AI and web.", energy: 95, connected: ["C/C++"] },
  { icon: "/mongodb.svg", label: "MongoDB", status: "complete", date: "Expert", desc: "NoSQL document database.", energy: 85, connected: ["OracleSQL"] },
  { icon: "/oracle.svg", label: "OracleSQL", status: "complete", date: "Advanced", desc: "Relational database management.", energy: 80, connected: ["MongoDB"] },
];

export function SkillsAndTimeline() {
  return (
    <>
      <section id="skills" className="py-20 flex flex-col items-center border-b border-white/5">
        {/* "SKILLS" Tech Drawing Title */}
        <div className="w-full flex justify-center relative z-10 mb-10">
          <SamsungSkillsEffect speed={0.6} className="text-white" />
        </div>

        {/* Grid of Orbits */}
        <div className="w-full max-w-[1600px] px-8 grid grid-cols-1 md:grid-cols-2 gap-x-20 md:gap-x-32 gap-y-10 md:gap-y-0 relative z-10">
          
          {/* Web Dev */}
          <div className="flex flex-col items-center">
            <RadialOrbitalTimeline 
              nodes={webDevNodes} 
              centerText={["Web", "Development"]} 
            />
          </div>

          {/* AI/ML */}
          <div className="flex flex-col items-center">
            <RadialOrbitalTimeline 
              nodes={aiNodes} 
              centerText={["AI &", "Machine Learning"]} 
            />
          </div>

          {/* Languages & DBs */}
          <div className="flex flex-col items-center md:col-span-2 md:-mt-32">
            <RadialOrbitalTimeline 
              nodes={languageNodes} 
              centerText={["Languages &", "Databases"]} 
            />
          </div>

        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 flex flex-col items-center">
        {/* "PROJECTS" Tech Drawing Title */}
        <div className="w-full flex justify-center relative z-10 mb-20">
          <SamsungProjectsEffect speed={0.6} className="text-white" />
        </div>

        <div className="w-full relative z-10">
          <FeatureCarousel />
        </div>
      </section>
    </>
  );
}
