"use client";

import { Code, FileText, User, Zap, GitBranch, Database } from "lucide-react";
import { SamsungSkillsEffect } from "@/components/ui/text-effect";
import { Spotlight } from "@/components/ui/spotlight";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

export function SkillsAndTimeline() {
  // Frontend Skills - 5 nodes
  const frontendData = [
    {
      id: 1,
      title: "React",
      date: "Expert",
      content: "Advanced component architecture and performance optimization.",
      category: "Frontend",
      icon: Code,
      relatedIds: [2, 3],
      status: "completed" as const,
      energy: 95,
    },
    {
      id: 2,
      title: "TypeScript",
      date: "Expert",
      content: "Type-safe development with advanced generics and patterns.",
      category: "Frontend",
      icon: FileText,
      relatedIds: [1, 4],
      status: "completed" as const,
      energy: 90,
    },
    {
      id: 3,
      title: "Tailwind",
      date: "Expert",
      content: "Utility-first CSS for responsive and modern designs.",
      category: "Frontend",
      icon: Zap,
      relatedIds: [1, 5],
      status: "completed" as const,
      energy: 88,
    },
    {
      id: 4,
      title: "Next.js",
      date: "Advanced",
      content: "Full-stack framework with SSR, SSG, and API routes.",
      category: "Frontend",
      icon: Code,
      relatedIds: [2],
      status: "completed" as const,
      energy: 92,
    },
    {
      id: 5,
      title: "UI/UX",
      date: "Advanced",
      content: "User-centered design and interactive experiences.",
      category: "Frontend",
      icon: User,
      relatedIds: [3],
      status: "in-progress" as const,
      energy: 85,
    },
  ];

  // Backend Skills - 5 nodes
  const backendData = [
    {
      id: 1,
      title: "Node.js",
      date: "Expert",
      content: "Server-side JavaScript and asynchronous programming.",
      category: "Backend",
      icon: Code,
      relatedIds: [2, 3],
      status: "completed" as const,
      energy: 95,
    },
    {
      id: 2,
      title: "PostgreSQL",
      date: "Advanced",
      content: "Relational database design and optimization.",
      category: "Backend",
      icon: Database,
      relatedIds: [1, 4],
      status: "completed" as const,
      energy: 88,
    },
    {
      id: 3,
      title: "APIs",
      date: "Expert",
      content: "RESTful and GraphQL API development.",
      category: "Backend",
      icon: Zap,
      relatedIds: [1, 5],
      status: "completed" as const,
      energy: 90,
    },
    {
      id: 4,
      title: "Authentication",
      date: "Advanced",
      content: "JWT, OAuth, and session-based auth systems.",
      category: "Backend",
      icon: User,
      relatedIds: [2],
      status: "completed" as const,
      energy: 85,
    },
    {
      id: 5,
      title: "DevOps",
      date: "Intermediate",
      content: "Deployment, CI/CD, and infrastructure management.",
      category: "Backend",
      icon: Zap,
      relatedIds: [3],
      status: "in-progress" as const,
      energy: 70,
    },
  ];

  // Tools & Others - 4 nodes
  const toolsData = [
    {
      id: 1,
      title: "Git",
      date: "Expert",
      content: "Version control and collaboration workflows.",
      category: "Tools",
      icon: GitBranch,
      relatedIds: [2],
      status: "completed" as const,
      energy: 95,
    },
    {
      id: 2,
      title: "Docker",
      date: "Advanced",
      content: "Containerization and orchestration.",
      category: "Tools",
      icon: Zap,
      relatedIds: [1, 3],
      status: "completed" as const,
      energy: 80,
    },
    {
      id: 3,
      title: "Testing",
      date: "Advanced",
      content: "Jest, React Testing Library, and E2E testing.",
      category: "Tools",
      icon: Code,
      relatedIds: [2, 4],
      status: "in-progress" as const,
      energy: 75,
    },
    {
      id: 4,
      title: "Cloud",
      date: "Intermediate",
      content: "AWS, Vercel, and cloud services.",
      category: "Tools",
      icon: Zap,
      relatedIds: [3],
      status: "in-progress" as const,
      energy: 70,
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden min-h-screen flex flex-col items-center justify-center">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      {/* "SKILLS" Tech Drawing Title */}
      <div className="w-full flex justify-center relative z-10 mb-10">
        <SamsungSkillsEffect speed={0.6} className="text-white" />
      </div>

      {/* Orbital Timeline Grid */}
      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Frontend Skills */}
          <div className="h-96 relative">
            <h3 className="absolute top-0 left-1/2 -translate-x-1/2 text-white font-bold text-lg z-20 bg-black px-4 py-2 rounded">Frontend</h3>
            <RadialOrbitalTimeline timelineData={frontendData} />
          </div>

          {/* Backend Skills */}
          <div className="h-96 relative">
            <h3 className="absolute top-0 left-1/2 -translate-x-1/2 text-white font-bold text-lg z-20 bg-black px-4 py-2 rounded">Backend</h3>
            <RadialOrbitalTimeline timelineData={backendData} />
          </div>

          {/* Tools & Others */}
          <div className="h-96 relative">
            <h3 className="absolute top-0 left-1/2 -translate-x-1/2 text-white font-bold text-lg z-20 bg-black px-4 py-2 rounded">Tools</h3>
            <RadialOrbitalTimeline timelineData={toolsData} />
          </div>
        </div>
      </div>
    </section>
  );
}
