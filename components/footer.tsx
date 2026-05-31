"use client";

import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-96 relative w-full overflow-hidden bg-black flex flex-col items-center justify-center border-t border-white/5">
      <div className="absolute inset-0 w-full h-full bg-black z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      
      <div className="relative z-30 flex flex-col items-center text-center px-4">
        <h2 className={cn("text-3xl md:text-5xl font-bold text-white font-grotesk tracking-tighter uppercase")}>
          Let&apos;s Build the Future
        </h2>
        <p className="mt-4 text-neutral-500 font-mono text-sm uppercase tracking-[0.3em] max-w-lg">
          Designed & Developed by Saptarshi Bhunia
        </p>
        
        <div className="mt-12 pt-8 border-t border-white/10 w-full flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-neutral-600 uppercase tracking-widest font-bold">
            © {currentYear} All Rights Reserved
          </p>
          <div className="flex items-center gap-6">
            <FooterLink href="https://github.com/Shadowblue3" label="GitHub" />
            <FooterLink href="https://www.linkedin.com/in/saptarshi-bhunia-837662300/" label="LinkedIn" />
            <FooterLink href="https://x.com/Saptarshi_29" label="Twitter" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-[10px] text-neutral-600 hover:text-white uppercase tracking-widest font-bold transition-colors duration-300"
    >
      {label}
    </a>
  );
}
