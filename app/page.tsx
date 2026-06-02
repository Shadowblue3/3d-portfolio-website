"use client";

import { useState } from "react";
import { HeroSection } from "@/components/hero";
import { BentoGridSection } from "@/components/bento-grid";
import { SkillsAndTimeline } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { Spotlight } from "@/components/ui/spotlight";
import ParticlesComponent from "@/components/ui/particles";
import { InteractiveMenu } from "@/components/ui/navbar-menu";
import { AccessGate } from "@/components/access-gate";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const [isGateOpen, setIsGateOpen] = useState(false);

  return (
    <main className="bg-black/[0.96] min-h-screen text-white relative overflow-hidden">
      <AccessGate onComplete={() => setIsGateOpen(true)} />

      <AnimatePresence>
        {isGateOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Navbar */}
            <InteractiveMenu accentColor="#3b82f6" />

            {/* Global Background Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <ParticlesComponent />
              <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
              />
            </div>

            <div className="relative z-10">
              <section id="home">
                <HeroSection />
              </section>
              <section id="about">
                <BentoGridSection />
              </section>
              <SkillsAndTimeline />
              <section id="contact">
                <ContactSection />
              </section>
              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
