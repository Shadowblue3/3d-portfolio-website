'use client'

import { useState } from 'react'
import { SplineScene } from "@/components/ui/spline";
import { TextScramble } from "@/components/ui/text-scramble"
import { GooeyText } from "@/components/ui/gooey-text-morphing"

export function HeroSection() {
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showDescription, setShowDescription] = useState(false)

  return (
    <div className="w-full h-screen relative">
      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-8 md:pl-24 lg:pl-32 relative z-10 flex flex-col justify-center">
          <TextScramble
            as="h1"
            className="font-glitch tracking-widest text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
            duration={1.2}
            speed={0.03}
            onScrambleComplete={() => setShowSubtitle(true)}
          >
            Welcome
          </TextScramble>

          <TextScramble
            as="h2"
            className="font-grotesk mt-4 text-2xl md:text-3xl font-semibold text-neutral-200"
            duration={1}
            speed={0.03}
            trigger={showSubtitle}
            onScrambleComplete={() => setShowDescription(true)}
          >
            I&apos;m Saptarshi Bhunia
          </TextScramble>

          {showDescription && (
            <div className="mt-2 flex flex-col gap-2">
              <GooeyText
                texts={["Full stack dev", "Programmer", "Machine Learning", "Deep learning", "Gen AI"]}
                className="h-16 md:h-20 flex items-center justify-start"
                textClassName="text-3xl md:text-5xl font-bold text-white text-left left-0 transform-none"
              />
              
              <TextScramble
                as="p"
                className="font-grotesk text-neutral-400 max-w-lg text-base md:text-lg leading-relaxed"
                duration={1.4}
                speed={0.02}
                trigger={showDescription}
              >
                passionate about building modern web experiences. Deeply invested in AI, Machine Learning, and Deep Learning — bridging the gap between intelligent systems and beautiful interfaces.
              </TextScramble>
            </div>
          )}
        </div>

        {/* Right content */}
        <div className="flex-1 relative">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  )
}
