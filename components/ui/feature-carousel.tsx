"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  AiCloudIcon,
  GlobalSearchIcon,
  ComponentIcon,
  CommandFreeIcons,
  DashboardSquare01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Github, ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    id: "blogcraft",
    label: "BlogCraft",
    icon: AiCloudIcon,
    image: "/blogcraft.png",
    description: "Full-stack blogging platform built with EJS and Node.js.",
    visitLink: "https://blogcraft-a2nl.onrender.com",
    githubLink: "https://github.com/Shadowblue3/BlogCraft",
  },
  {
    id: "metalsense",
    label: "MetalSense",
    icon: GlobalSearchIcon,
    image: "/metalsense.png",
    description: "Intelligent metal detection and monitoring dashboard.",
    visitLink: "https://metalsense.onrender.com",
    githubLink: "https://github.com/Shadowblue3/MetalSense",
  },
  {
    id: "ping",
    label: "Ping",
    icon: ComponentIcon,
    image: "/ping.png",
    description: "Gaming portfolio and social network for players.",
    visitLink: "https://ping-murex.vercel.app/",
    githubLink: "https://github.com/aasaan-hainn/Ping",
  },
  {
    id: "chathub",
    label: "ChatHub",
    icon: CommandFreeIcons,
    image: "/chathub.png",
    description: "Real-time messaging platform with a clean interface.",
    visitLink: "https://chat-hub-blond.vercel.app/",
    githubLink: "https://github.com/Shadowblue3/ChatHub",
  },
  {
    id: "healthsync",
    label: "HealthSync",
    icon: DashboardSquare01Icon,
    image: "/healthsync.png",
    description: "Healthcare platform connecting doctors and patients.",
    visitLink: "https://healthsync-0n0d.onrender.com/",
    githubLink: "https://github.com/aasaan-hainn/HealthSync",
  },
];

const AUTO_PLAY_INTERVAL = 5000;
const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % PROJECTS.length) + PROJECTS.length) % PROJECTS.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + PROJECTS.length) % PROJECTS.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = PROJECTS.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-7xl mx-auto md:p-8">
      <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] flex flex-col lg:flex-row min-h-[600px] lg:aspect-video border border-white/10 bg-neutral-950/50 backdrop-blur-sm">
        {/* Left Side: Project Selector */}
        <div className="w-full lg:w-[40%] min-h-[350px] md:min-h-[450px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 lg:pl-16 bg-blue-600/20">
          <div className="absolute inset-x-0 top-0 h-12 md:h-20 lg:h-16 bg-gradient-to-b from-[#1a1a1a]/20 via-transparent to-transparent z-40" />
          <div className="absolute inset-x-0 bottom-0 h-12 md:h-20 lg:h-16 bg-gradient-to-t from-[#1a1a1a]/20 via-transparent to-transparent z-40" />
          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {PROJECTS.map((project, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(PROJECTS.length / 2),
                PROJECTS.length / 2,
                distance
              );

              return (
                <motion.div
                  key={project.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "fit-content",
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.35,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-4 px-6 md:px-10 lg:px-8 py-3.5 md:py-5 lg:py-4 rounded-full transition-all duration-700 text-left group border",
                      isActive
                        ? "bg-white text-blue-600 border-white z-10 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        : "bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-500",
                        isActive ? "text-blue-600" : "text-white/30"
                      )}
                    >
                      <HugeiconsIcon
                        icon={project.icon}
                        size={18}
                        strokeWidth={2}
                      />
                    </div>

                    <span className="font-bold text-sm md:text-[15px] tracking-widest whitespace-nowrap uppercase font-grotesk">
                      {project.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Project Card */}
        <div className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative flex items-center justify-center py-16 md:py-24 lg:py-16 px-6 md:px-12 lg:px-10 overflow-hidden lg:border-l border-white/10">
          <div className="relative w-full max-w-[440px] aspect-[4/5] flex items-center justify-center">
            {PROJECTS.map((project, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={project.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -120 : isNext ? 120 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.3 : 0,
                    rotate: isPrev ? -5 : isNext ? 5 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute inset-0 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-4 md:border-8 border-neutral-900 bg-neutral-900 origin-center shadow-2xl"
                >
                  <img
                    src={project.image}
                    alt={project.label}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isActive
                        ? "grayscale-0 blur-0 scale-100"
                        : "grayscale blur-[2px] brightness-50 scale-110"
                    )}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute inset-x-0 bottom-0 p-8 pt-32 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end"
                      >
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] w-fit mb-3 border border-blue-400/50 font-grotesk">
                          PROJECT {index + 1}
                        </div>
                        <h3 className="text-white font-bold text-2xl md:text-3xl leading-tight tracking-tighter font-grotesk mb-2">
                          {project.label}
                        </h3>
                        <p className="text-neutral-300 font-medium text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                          {project.description}
                        </p>

                        <div className="flex items-center gap-4">
                          <a
                            href={project.visitLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-500 hover:text-white transition-colors"
                          >
                            <ExternalLink size={14} />
                            Visit
                          </a>
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-black/50 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm"
                          >
                            <Github size={14} />
                            Code
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className={cn(
                      "absolute top-8 left-8 flex items-center gap-3 transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                    <span className="text-white/80 text-[9px] font-bold uppercase tracking-[0.3em] font-mono">
                      Production Ready
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
