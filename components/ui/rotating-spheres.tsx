"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RotatingSpheresProps {
  sphereCount: number;
  className?: string;
  label?: string;
}

export function RotatingSpheres({
  sphereCount,
  className,
  label,
}: RotatingSpheresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const animationRef = useRef<number | null>(null);
  const rotationRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const orbitRadius = Math.min(width, height) * 0.25;

      rotationRef.current += 0.5;

      // Draw orbiting spheres
      for (let i = 0; i < sphereCount; i++) {
        const angle = (i / sphereCount) * Math.PI * 2 + (rotationRef.current * Math.PI) / 180;
        const x = centerX + Math.cos(angle) * orbitRadius;
        const y = centerY + Math.sin(angle) * orbitRadius;

        // Create gradient for sphere
        const gradient = ctx.createRadialGradient(x - 3, y - 3, 0, x, y, 12);
        gradient.addColorStop(0, "rgba(147, 51, 234, 0.8)"); // purple
        gradient.addColorStop(0.5, "rgba(59, 130, 246, 0.6)"); // blue
        gradient.addColorStop(1, "rgba(6, 182, 212, 0.4)"); // cyan

        // Draw sphere with glow
        ctx.shadowColor = "rgba(147, 51, 234, 0.5)";
        ctx.shadowBlur = 15;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();

        // Draw highlight
        const highlightGradient = ctx.createRadialGradient(x - 4, y - 4, 0, x, y, 6);
        highlightGradient.addColorStop(0, "rgba(255, 255, 255, 0.6)");
        highlightGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = highlightGradient;
        ctx.beginPath();
        ctx.arc(x - 4, y - 4, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw center glow
      const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 50);
      centerGradient.addColorStop(0, "rgba(147, 51, 234, 0.2)");
      centerGradient.addColorStop(1, "rgba(147, 51, 234, 0)");
      ctx.fillStyle = centerGradient;
      ctx.fillRect(centerX - 50, centerY - 50, 100, 100);

      // Reset shadow for next frame
      ctx.shadowColor = "transparent";

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mounted, sphereCount]);

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-64 border border-white/10 rounded-lg bg-black/40 backdrop-blur-sm"
      />
      {label && (
        <p className="text-sm font-semibold text-white/80 tracking-wide uppercase">
          {label}
        </p>
      )}
    </div>
  );
}
