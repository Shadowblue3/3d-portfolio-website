"use client";

import { useState } from "react";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";
import { Copy, Check, Mail, Linkedin, Code2, Sparkles } from "lucide-react";
import { SamsungAboutMeEffect } from "@/components/ui/text-effect";

// ============================================================================
// Marquee Images
// ============================================================================

const marqueeImages = [
  "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
  "https://assets.aceternity.com/animated-modal.png",
  "https://assets.aceternity.com/animated-testimonials.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
  "https://assets.aceternity.com/github-globe.png",
  "https://assets.aceternity.com/glare-card.png",
  "https://assets.aceternity.com/layout-grid.png",
  "https://assets.aceternity.com/flip-text.png",
  "https://assets.aceternity.com/hero-highlight.png",
  "https://assets.aceternity.com/carousel.webp",
  "https://assets.aceternity.com/placeholders-and-vanish-input.png",
  "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
  "https://assets.aceternity.com/signup-form.png",
  "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
  "https://assets.aceternity.com/spotlight-new.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
  "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
  "https://assets.aceternity.com/tabs.png",
  "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
  "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
  "https://assets.aceternity.com/glowing-effect.webp",
  "https://assets.aceternity.com/hover-border-gradient.png",
  "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
  "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
  "https://assets.aceternity.com/macbook-scroll.png",
  "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
  "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
  "https://assets.aceternity.com/multi-step-loader.png",
  "https://assets.aceternity.com/vortex.png",
  "https://assets.aceternity.com/wobble-card.png",
  "https://assets.aceternity.com/world-map.webp",
];

// ============================================================================
// Globe Markers
// ============================================================================

const globeMarkers: GlobeMarker[] = [
  { lat: 40.7128, lng: -74.006, src: "https://assets.aceternity.com/avatars/1.webp", label: "New York" },
  { lat: 51.5074, lng: -0.1278, src: "https://assets.aceternity.com/avatars/2.webp", label: "London" },
  { lat: 35.6762, lng: 139.6503, src: "https://assets.aceternity.com/avatars/3.webp", label: "Tokyo" },
  { lat: -33.8688, lng: 151.2093, src: "https://assets.aceternity.com/avatars/4.webp", label: "Sydney" },
  { lat: 48.8566, lng: 2.3522, src: "https://assets.aceternity.com/avatars/5.webp", label: "Paris" },
  { lat: 28.6139, lng: 77.209, src: "https://assets.aceternity.com/avatars/6.webp", label: "New Delhi" },
  { lat: 55.7558, lng: 37.6173, src: "https://assets.aceternity.com/avatars/7.webp", label: "Moscow" },
  { lat: -22.9068, lng: -43.1729, src: "https://assets.aceternity.com/avatars/8.webp", label: "Rio de Janeiro" },
  { lat: 31.2304, lng: 121.4737, src: "https://assets.aceternity.com/avatars/9.webp", label: "Shanghai" },
  { lat: 25.2048, lng: 55.2708, src: "https://assets.aceternity.com/avatars/10.webp", label: "Dubai" },
  { lat: 1.3521, lng: 103.8198, src: "https://assets.aceternity.com/avatars/12.webp", label: "Singapore" },
  { lat: 37.5665, lng: 126.978, src: "https://assets.aceternity.com/avatars/13.webp", label: "Seoul" },
];

// ============================================================================
// Copy Button Component
// ============================================================================

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="group flex w-full items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 transition-all duration-300 hover:border-neutral-600 hover:bg-neutral-800/80"
    >
      <span className="text-sm text-neutral-300 truncate mr-3">{label}</span>
      <span className="shrink-0 text-neutral-500 transition-colors group-hover:text-white">
        {copied ? (
          <Check className="h-4 w-4 text-emerald-400" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </span>
    </button>
  );
}

// ============================================================================
// Box 1: Marquee Box
// ============================================================================

function MarqueeBox() {
  return (
    <div className="relative col-span-1 row-span-1 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 md:col-span-2">
      <ThreeDMarquee
        images={marqueeImages}
        className="h-[350px] md:h-[400px] opacity-60"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight max-w-md">
          I prioritize client collaboration, fostering open communication
        </h3>
      </div>
    </div>
  );
}

// ============================================================================
// Box 2: Globe Box
// ============================================================================

function GlobeBox() {
  return (
    <div className="relative col-span-1 row-span-2 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950">
      <div className="relative z-10 p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
          I&apos;m very flexible with time zone communications
        </h3>
        <p className="mt-2 text-sm text-neutral-400">
          Based in India, available worldwide
        </p>
      </div>
      <Globe3D
        className="absolute top-24 md:top-32 left-0 h-[500px] md:h-[600px]"
        markers={globeMarkers}
        config={{
          bumpScale: 5,
          autoRotateSpeed: 0.3,
          showAtmosphere: false,
        }}
      />
    </div>
  );
}

// ============================================================================
// Box 3: Contact Box
// ============================================================================

function ContactBox() {
  return (
    <div className="relative col-span-1 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 p-6 md:p-8">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 opacity-80" />

      <div className="relative z-10 flex flex-col gap-5">
        <div>
          <h3 className="text-lg font-semibold text-white">Get in touch</h3>
          <p className="mt-1 text-sm text-neutral-400">
            Let&apos;s build something amazing together
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <Mail className="h-4 w-4" />
            </div>
            <CopyButton
              text="saptarshibhunia5@gmail.com"
              label="saptarshibhunia5@gmail.com"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <Linkedin className="h-4 w-4" />
            </div>
            <CopyButton
              text="https://www.linkedin.com/in/saptarshi-bhunia-837662300/"
              label="linkedin.com/in/saptarshi-bhunia"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Box 4: Tech / Code Snippet Box
// ============================================================================

function TechBox() {
  return (
    <div className="relative col-span-1 overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-br from-indigo-950/80 via-neutral-950 to-neutral-950 p-6 md:p-8">
      {/* Decorative glow */}
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 text-sm text-indigo-400">
          <Sparkles className="h-4 w-4" />
          <span>The Inside Scoop</span>
        </div>
        <h3 className="mt-2 text-lg font-bold text-white">
          Currently building modern web applications
        </h3>

        {/* Code snippet */}
        <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-900/80 p-4 font-mono text-sm">
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="h-4 w-4 text-neutral-500" />
            <span className="text-neutral-500 text-xs">app.ts</span>
          </div>
          <div className="space-y-1">
            <p className="text-neutral-500">
              <span className="text-neutral-600">{"// "}</span>
              Building cool stuff
            </p>
            <p>
              <span className="text-purple-400">import</span>
              <span className="text-emerald-400"> creativity </span>
              <span className="text-purple-400">from </span>
              <span className="text-amber-300">&apos;passion&apos;</span>
            </p>
            <p>
              <span className="text-purple-400">import</span>
              <span className="text-emerald-400"> innovation </span>
              <span className="text-purple-400">from </span>
              <span className="text-amber-300">&apos;curiosity&apos;</span>
            </p>
            <p className="mt-2">
              <span className="text-blue-400">const</span>
              <span className="text-emerald-400"> stack</span>
              <span className="text-white"> = </span>
              <span className="text-amber-300">[</span>
              <span className="text-amber-200">&apos;React&apos;</span>
              <span className="text-white">, </span>
              <span className="text-amber-200">&apos;Next.js&apos;</span>
              <span className="text-white">, </span>
              <span className="text-amber-200">&apos;AI/ML&apos;</span>
              <span className="text-amber-300">]</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Bento Grid Section
// ============================================================================

export function BentoGridSection() {
  return (
    <section className="w-full px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center mb-16">
          <SamsungAboutMeEffect speed={0.6} className="text-white" />
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-5">
          {/* Box 1: 3D Marquee - top left, spans 2 cols */}
          <MarqueeBox />

          {/* Box 2: Globe - right side, spans 2 rows */}
          <GlobeBox />

          {/* Box 3: Contact - bottom left */}
          <ContactBox />

          {/* Box 4: Tech snippet - bottom center */}
          <TechBox />
        </div>
      </div>
    </section>
  );
}
