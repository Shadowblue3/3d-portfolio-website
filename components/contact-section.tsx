"use client";

import { SamsungContactEffect } from "@/components/ui/text-effect";
import CosmicNebulaMastercard from "@/components/ui/cosmic-card";
import { Mail, Github, Linkedin, Twitter, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export function ContactSection() {
  const copyEmail = () => {
    navigator.clipboard.writeText("saptarshibhunia5@gmail.com");
    toast.success("Email copied to clipboard!", {
      description: "saptarshibhunia5@gmail.com",
      duration: 3000,
    });
  };

  return (
    <section className="py-32 relative overflow-hidden flex flex-col items-center">
      {/* "GET IN TOUCH" Tech Drawing Title */}
      <div className="w-full flex justify-center relative z-10 mb-16">
        <SamsungContactEffect speed={0.6} className="text-white" />
      </div>

      <div className="w-full max-w-7xl px-8 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 relative z-10">
        {/* Left Side: Heading & Social Links */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h3 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white font-grotesk tracking-tighter uppercase leading-[0.9]">
            Here&apos;s <br className="hidden lg:block" /> my card
          </h3>
          
          {/* Social Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-12 w-full max-w-md">
            <button 
              onClick={copyEmail}
              className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group hover:text-blue-400"
            >
              <div className="text-neutral-400 group-hover:scale-110 transition-transform duration-300">
                <Mail size={18} />
              </div>
              <span className="text-[10px] font-bold font-grotesk tracking-tight text-neutral-300 group-hover:text-white uppercase">
                Email
              </span>
            </button>

            <ContactLink 
              href="https://github.com/Shadowblue3" 
              icon={<Github size={18} />} 
              label="GitHub" 
              color="hover:text-neutral-400"
            />
            <ContactLink 
              href="https://www.linkedin.com/in/saptarshi-bhunia-837662300/" 
              icon={<Linkedin size={18} />} 
              label="LinkedIn" 
              color="hover:text-blue-600"
            />
            <ContactLink 
              href="https://x.com/Saptarshi_29" 
              icon={<Twitter size={18} />} 
              label="Twitter" 
              color="hover:text-sky-400"
            />
            <ContactLink 
              href="#" 
              icon={<MessageSquare size={18} />} 
              label="Discord" 
              color="hover:text-indigo-400"
            />
          </div>

          <p className="text-neutral-500 font-mono text-sm uppercase tracking-[0.4em] animate-pulse mt-12 hidden lg:block">
            Hover to tilt • Click to interact
          </p>
        </div>

        {/* Right Side: 3D Cosmic Card */}
        <div className="flex-1 flex justify-center lg:justify-end perspective-3000 w-full py-10">
          <CosmicNebulaMastercard 
            cardholderName="SAPTARSHI BHUNIA"
            logoText={{ topText: "SAPTARSHI", bottomText: "BHUNIA" }}
            className="w-full max-w-[500px]"
            width="100%"
            height="320px"
          />
        </div>
        
        {/* Mobile-only interactivity hint */}
        <p className="text-neutral-500 font-mono text-xs uppercase tracking-[0.4em] animate-pulse mt-4 lg:hidden">
          Hover to tilt • Click to interact
        </p>
      </div>
    </section>
  );
}

function ContactLink({ href, icon, label, color }: { href: string, icon: React.ReactNode, label: string, color: string }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group ${color}`}
    >
      <div className="text-neutral-400 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <span className="text-[10px] font-bold font-grotesk tracking-tight text-neutral-300 group-hover:text-white uppercase">
        {label}
      </span>
    </a>
  );
}
