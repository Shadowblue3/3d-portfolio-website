"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface OrbitNode {
  icon: string;
  label: string;
  status: "complete" | "progress" | "pending";
  date: string;
  desc: string;
  energy: number;
  connected: string[];
}

// ─────────────────────────────────────────────
//  Customisation knobs
// ─────────────────────────────────────────────
const ORBIT_RADIUS = 180; // px — orbit ring radius
const NODE_SIZE    = 72;  // px — sphere diameter
const CENTER_SIZE  = 100; // px — center circle diameter
const SPEED        = 0.28; // degrees per 60 fps frame (higher = faster)

// ─────────────────────────────────────────────
//  Constants (derived, don't edit)
// ─────────────────────────────────────────────
const SCENE      = (ORBIT_RADIUS + NODE_SIZE / 2 + 56) * 2;
const CX         = SCENE / 2;
const CY         = SCENE / 2;
const HALF_NODE  = NODE_SIZE / 2;
const LBL_OFFSET = HALF_NODE + 20;

const STATUS_LABELS = {
  complete: "Complete",
  progress: "In progress",
  pending:  "Pending",
};

const STATUS_CLASSES = {
  complete: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  progress: "bg-blue-500/10    text-blue-400    border-blue-500/20",
  pending:  "bg-amber-500/10   text-amber-400   border-amber-500/20",
};

// ─────────────────────────────────────────────
//  Pure helpers (no React)
// ─────────────────────────────────────────────
function getXY(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + Math.cos(rad) * r, y: CY + Math.sin(rad) * r };
}

function clampCardPos(nx: number, ny: number) {
  const cardW = 240, cardH = 260;
  let left = nx + HALF_NODE + 8;
  let top  = ny - 80;
  if (left + cardW > SCENE) left = nx - HALF_NODE - cardW - 8;
  top = Math.min(Math.max(top, 8), SCENE - cardH - 8);
  return { left, top };
}

interface RadialOrbitalTimelineProps {
  nodes: OrbitNode[];
  centerText?: string[];
}

export default function RadialOrbitalTimeline({
  nodes,
  centerText = ["Portfolio", "Timeline"],
}: RadialOrbitalTimelineProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const nodeRefs  = useRef<(HTMLButtonElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRef   = useRef<HTMLDivElement | null>(null);

  const anglesRef  = useRef(nodes.map((_, i) => (360 / nodes.length) * i));
  const activeRef  = useRef<number | null>(null);
  const rafRef     = useRef<number | null>(null);
  const lastRef    = useRef<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
    activeRef.current = activeIdx;
  }, [activeIdx]);

  useEffect(() => {
    function loop(ts: number) {
      if (lastRef.current !== null) {
        const dt = Math.min(ts - lastRef.current, 50);
        const step = SPEED * (dt / 60);

        nodes.forEach((_, i) => {
          anglesRef.current[i] = (anglesRef.current[i] + step) % 360;
          const { x, y }   = getXY(anglesRef.current[i], ORBIT_RADIUS);
          const { x: lx, y: ly } = getXY(anglesRef.current[i], ORBIT_RADIUS + LBL_OFFSET);

          const nodeEl  = nodeRefs.current[i];
          const labelEl = labelRefs.current[i];
          if (nodeEl) {
            nodeEl.style.left = x - HALF_NODE + "px";
            nodeEl.style.top  = y - HALF_NODE + "px";
          }
          if (labelEl) {
            labelEl.style.left = lx + "px";
            labelEl.style.top  = ly + "px";
          }
        });

        const ai = activeRef.current;
        if (ai !== null && cardRef.current) {
          const { x, y } = getXY(anglesRef.current[ai], ORBIT_RADIUS);
          const { left, top } = clampCardPos(x, y);
          cardRef.current.style.left = left + "px";
          cardRef.current.style.top  = top + "px";
        }
      }
      lastRef.current = ts;
      rafRef.current  = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [nodes]);

  const handleNode = useCallback((i: number) => {
    setActiveIdx((prev) => (prev === i ? null : i));
  }, []);

  const close = useCallback(() => setActiveIdx(null), []);

  const active = activeIdx !== null ? nodes[activeIdx] : null;

  const initialCardPos = activeIdx !== null
    ? clampCardPos(
        CX + Math.cos((anglesRef.current[activeIdx] * Math.PI) / 180) * ORBIT_RADIUS,
        CY + Math.sin((anglesRef.current[activeIdx] * Math.PI) / 180) * ORBIT_RADIUS,
      )
    : { left: 0, top: 0 };

  return (
    <div
      className="relative mx-auto select-none"
      style={{ width: SCENE, height: SCENE }}
    >
      {/* Orbit ring */}
      <div
        className="absolute rounded-full border border-white/10 pointer-events-none"
        style={{
          width:  ORBIT_RADIUS * 2,
          height: ORBIT_RADIUS * 2,
          top:    CY - ORBIT_RADIUS,
          left:   CX - ORBIT_RADIUS,
        }}
      />

      {/* Center Core */}
      <div
        className="absolute flex flex-col items-center justify-center rounded-full
                   bg-black/40 backdrop-blur-md border border-white/10 z-10 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        style={{
          width:  CENTER_SIZE,
          height: CENTER_SIZE,
          top:    CY - CENTER_SIZE / 2,
          left:   CX - CENTER_SIZE / 2,
        }}
      >
        {centerText.map((t, i) => (
          <span
            key={i}
            className={
              i === 0
                ? "text-[16px] md:text-[18px] font-bold text-white leading-none text-center px-2 tracking-tighter font-grotesk uppercase"
                : "text-[11px] md:text-[12px] text-neutral-400 font-medium text-center px-2 mt-1 font-grotesk opacity-80"
            }
          >
            {t}
          </span>
        ))}
      </div>

      {isMounted && nodes.map((node, i) => {
        const init    = getXY(anglesRef.current[i], ORBIT_RADIUS);
        const initLbl = getXY(anglesRef.current[i], ORBIT_RADIUS + LBL_OFFSET);
        return (
          <div key={i}>
            <button
              ref={(el) => { nodeRefs.current[i] = el; }}
              onClick={() => handleNode(i)}
              aria-label={node.label}
              data-idx={i}
              className={`absolute flex items-center justify-center rounded-full border
                          transition-all duration-300 z-[5] text-3xl
                          bg-black/60 backdrop-blur-sm
                          border-white/10 text-white
                          hover:border-white/40 hover:bg-black/80 hover:scale-110 shadow-lg`}
              style={{
                width:  NODE_SIZE,
                height: NODE_SIZE,
                top:    init.y - HALF_NODE,
                left:   init.x - HALF_NODE,
                willChange: "left, top",
              }}
            >
              {node.icon.endsWith(".svg") ? (
                <img 
                  src={node.icon} 
                  alt={node.label} 
                  className="w-2/3 h-2/3 object-contain pointer-events-none"
                />
              ) : (
                node.icon
              )}
            </button>

            <span
              ref={(el) => { labelRefs.current[i] = el; }}
              className="absolute text-[12px] text-neutral-400 font-medium
                         pointer-events-none whitespace-nowrap -translate-x-1/2 -translate-y-1/2 tracking-wide"
              style={{
                left: initLbl.x,
                top:  initLbl.y,
                willChange: "left, top",
              }}
            >
              {node.label}
            </span>
          </div>
        );
      })}

      {active && (
        <div
          ref={cardRef}
          className="absolute z-20 w-64 rounded-2xl
                     bg-neutral-900/90 backdrop-blur-xl
                     border border-white/10 shadow-2xl
                     p-4"
          style={{
            left: initialCardPos.left,
            top:  initialCardPos.top,
            willChange: "left, top",
          }}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center
                       justify-center bg-white/5 hover:bg-white/10
                       text-neutral-400 hover:text-white text-xs transition-colors"
          >
            ✕
          </button>

          <div className="flex items-center gap-2 mb-3">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border
                          uppercase tracking-tighter ${STATUS_CLASSES[active.status]}`}
            >
              {STATUS_LABELS[active.status]}
            </span>
            <span className="text-[11px] text-neutral-500 font-mono">
              {active.date}
            </span>
          </div>

          <p className="text-sm font-bold text-white mb-1 tracking-tight">
            {active.label}
          </p>
          <p className="text-xs text-neutral-400 leading-relaxed mb-4">
            {active.desc}
          </p>

          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] text-neutral-500 uppercase tracking-widest font-semibold">⚡ Power</span>
            <span className="text-[11px] font-bold text-white">
              {active.energy}%
            </span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full mb-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
              style={{ width: `${active.energy}%` }}
            />
          </div>

          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 font-bold mb-2">
            Connected
          </p>
          <div className="flex flex-wrap gap-1.5">
            {active.connected.map((c) => (
              <span
                key={c}
                className="text-[10px] px-2 py-0.5 rounded-md
                           bg-white/5 border border-white/5
                           text-neutral-400 font-medium"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
