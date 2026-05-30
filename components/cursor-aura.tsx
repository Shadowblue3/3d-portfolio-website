"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorAura() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Motion values for raw mouse position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring configuration for smooth follow effect
  const springConfig = { damping: 28, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    
    const moveCursor = (e: MouseEvent) => {
      // 200 is half the size of our 400px x 400px aura box
      cursorX.set(e.clientX - 200);
      cursorY.set(e.clientY - 200);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  // Don't render on server to prevent hydration mismatch
  if (!isMounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 h-[400px] w-[400px] rounded-full mix-blend-screen hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 0.6 : 0,
        background: "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 40%, rgba(0,0,0,0) 70%)",
        transition: "opacity 0.3s ease",
      }}
    />
  );
}
