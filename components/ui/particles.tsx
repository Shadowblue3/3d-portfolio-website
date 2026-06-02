"use client";

import { useEffect, useCallback } from "react";

export default function ParticlesComponent() {
  const initParticles = useCallback((isDark: boolean) => {
    // cleanup old canvas
    const oldCanvas = document.querySelector("#particles-js canvas");
    if (oldCanvas) oldCanvas.remove();

    // @ts-ignore
    if (window.pJSDom?.length > 0) {
      // @ts-ignore
      window.pJSDom.forEach((p) => p.pJS.fn.vendors.destroypJS());
      // @ts-ignore
      window.pJSDom = [];
    }

    const colors = isDark
      ? {
          particles: "#ffffff",
          lines: "#737373",
          accent: "#404040",
        }
      : {
          particles: "#404040",
          lines: "#a3a3a3",
          accent: "#d4d4d8",
        };

    // @ts-ignore
    window.particlesJS("particles-js", {
      particles: {
        number: { value: 140, density: { enable: true, value_area: 800 } },
        color: { value: colors.particles },
        shape: { type: "circle", stroke: { width: 0.5, color: colors.accent } },
        opacity: {
          value: 0.5,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.1 },
        },
        size: {
          value: 2,
          random: true,
          anim: { enable: true, speed: 2, size_min: 0.5 },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: colors.lines,
          opacity: 0.2,
          width: 1,
        },
        move: { enable: true, speed: 1.5, random: true, out_mode: "out" },
      },
      interactivity: {
        detect_on: "window",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: false },
          resize: true,
        },
        modes: {
          grab: { 
            distance: 280, 
            line_linked: { opacity: 0.8 } 
          },
          push: { 
            particles_nb: 6 
          },
          repulse: { 
            distance: 200, 
            duration: 0.4 
          },
        },
      },
      retina_detect: true,
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const html = document.documentElement;
      const detectDark = () =>
        html.classList.contains("dark") ||
        html.getAttribute("data-theme") === "dark" ||
        true; // Default to dark for your theme

      // init first load
      initParticles(detectDark());

      // observe changes
      const observer = new MutationObserver(() =>
        initParticles(detectDark())
      );
      observer.observe(html, {
        attributes: true,
        attributeFilter: ["class", "data-theme"],
      });
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [initParticles]);

  return (
    <div
      id="particles-js"
      className="fixed inset-0 z-0 pointer-events-none bg-transparent"
    />
  );
}
