"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Fingerprint, ScanLine } from "lucide-react"
import { ContainerScroll } from "./ui/container-scroll-animation"

type GateStage = "idle" | "holding" | "verified" | "initializing" | "revealing" | "complete"

const HOLD_DURATION = 3500
const INIT_DURATION = 5000
const REVEAL_DURATION = 2800
const terminalLines = [
  "root@portfolio:~$ validating palm signature",
  "hashstream: 4F A9 11 00 FF 7C 92",
  "kernel: biometric confidence locked at 99.8%",
  "access_matrix: decrypting viewport layers",
  "interface: mounting primary scene",
  "status: verification complete, initializing",
  "system: clearing security buffers",
  "io: piping neural link to viewport",
  "exec: start_interface_render",
]

export function AccessGate({ onComplete }: { onComplete?: () => void }) {
  const [stage, setStage] = useState<GateStage>("idle")
  const [progress, setProgress] = useState(0)
  const [revealProgress, setRevealProgress] = useState(0)
  const holdStartRef = useRef<number | null>(null)
  const animationRef = useRef<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const completedRef = useRef(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  // 12x12 Grid for disintegration
  const grid = Array.from({ length: 144 }).map((_, i) => i)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const fontSize = 20
    const columns = Math.floor(width / fontSize)
    const drops: number[] = new Array(columns).fill(1)
    const chars = "0101010101100101101" 

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)"
      ctx.fillRect(0, 0, width, height)

      ctx.font = `bold ${fontSize}px monospace`
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length))
        const x = i * fontSize
        const y = drops[i] * fontSize
        
        if (Math.random() > 0.98) {
          ctx.fillStyle = "#3b82f6" 
          ctx.shadowBlur = 12
        } else {
          ctx.fillStyle = "#1e3a8a" 
          ctx.shadowBlur = 4
        }
        ctx.shadowColor = "#3b82f6"
        
        ctx.fillText(text, x, y)

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      stopScanSound()
      window.speechSynthesis?.cancel()
    }
  }, [])

  const startScanSound = () => {
    const audioWindow = window as typeof window & {
      webkitAudioContext?: typeof AudioContext
    }
    const AudioContextClass = audioWindow.AudioContext || audioWindow.webkitAudioContext
    if (!AudioContextClass || oscillatorRef.current) return

    const audioContext = new AudioContextClass()
    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()
    const filter = audioContext.createBiquadFilter()

    const now = audioContext.currentTime
    oscillator.type = "sawtooth"
    oscillator.frequency.setValueAtTime(130, now)
    oscillator.frequency.linearRampToValueAtTime(620, now + 0.45)
    oscillator.frequency.linearRampToValueAtTime(180, now + 0.9)
    oscillator.frequency.setValueCurveAtTime(
      new Float32Array([180, 540, 260, 720, 330, 590]),
      now + 0.9,
      1.1,
    )

    filter.type = "bandpass"
    filter.frequency.value = 920
    filter.Q.value = 8
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.055, now + 0.08)

    oscillator.connect(filter)
    filter.connect(gain)
    gain.connect(audioContext.destination)
    oscillator.start()

    audioContextRef.current = audioContext
    oscillatorRef.current = oscillator
    gainRef.current = gain
  }

  const stopScanSound = () => {
    const audioContext = audioContextRef.current
    const oscillator = oscillatorRef.current
    const gain = gainRef.current

    if (audioContext && oscillator && gain) {
      const now = audioContext.currentTime
      gain.gain.cancelScheduledValues(now)
      gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0001), now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08)
      oscillator.stop(now + 0.1)
      window.setTimeout(() => audioContext.close(), 140)
    }

    audioContextRef.current = null
    oscillatorRef.current = null
    gainRef.current = null
  }

  const speakVerification = () => {
    if (!("speechSynthesis" in window)) return

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance("Biometric verification complete. Initializing master terminal protocols.")
    utterance.rate = 0.95
    utterance.pitch = 1.1
    utterance.volume = 1.0

    const voices = window.speechSynthesis.getVoices()
    const femaleVoice = voices.find((v) => 
      /female|samantha|zira|victoria|google us english female|microsoft sally|tessa|karen|moira|veena|aura/i.test(v.name)
    ) || voices.find(v => v.lang.startsWith('en') && /female/i.test(v.name)) || voices[0]

    if (femaleVoice) utterance.voice = femaleVoice
    window.speechSynthesis.speak(utterance)
  }

  const finishHold = () => {
    if (completedRef.current) return

    completedRef.current = true
    stopScanSound()
    setProgress(100)
    setStage("verified")
    speakVerification()

    window.setTimeout(() => {
      setStage("initializing")
    }, 760)

    window.setTimeout(() => {
      startReveal()
    }, INIT_DURATION)
  }

  const tickHold = (time: number) => {
    if (!holdStartRef.current) holdStartRef.current = time

    const elapsed = time - holdStartRef.current
    const nextProgress = Math.min(100, (elapsed / HOLD_DURATION) * 100)
    setProgress(nextProgress)

    if (nextProgress >= 100) {
      finishHold()
      return
    }

    animationRef.current = requestAnimationFrame(tickHold)
  }

  const startHold = () => {
    if (stage !== "idle") return

    setStage("holding")
    setProgress(0)
    holdStartRef.current = null
    startScanSound()
    animationRef.current = requestAnimationFrame(tickHold)
  }

  const cancelHold = () => {
    if (stage !== "holding") return

    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    animationRef.current = null
    holdStartRef.current = null
    stopScanSound()
    setStage("idle")
    setProgress(0)
  }

  const startReveal = () => {
    setStage("revealing")
    const start = performance.now()

    const tickReveal = (time: number) => {
      const elapsed = time - start
      const nextProgress = Math.min(100, (elapsed / REVEAL_DURATION) * 100)
      setRevealProgress(nextProgress)

      if (nextProgress >= 100) {
        if (onComplete) onComplete()
        setStage("complete")
        return
      }

      animationRef.current = requestAnimationFrame(tickReveal)
    }

    animationRef.current = requestAnimationFrame(tickReveal)
  }

  if (stage === "complete") return null

  const isScanning = stage === "holding"
  const isInitializing = stage === "verified" || stage === "initializing"
  const isRevealing = stage === "revealing"
  const statusText =
    stage === "idle"
      ? "[CLICK & HOLD TO SCAN]"
      : stage === "holding"
        ? "LINKING NEURAL PATHWAYS..."
        : stage === "verified"
          ? "IDENTITY VERIFIED"
          : stage === "initializing"
            ? "BOOTING KERNEL_OMEGA..."
            : "DECRYPTING LAYERS..."

  return (
    <div className={`fixed inset-0 z-[999] overflow-y-auto selection:bg-white selection:text-black scrollbar-hide bg-black ${stage === "revealing" ? "pointer-events-none" : ""}`}>
      {/* Scrollable Container Animation */}
      <motion.div 
        className="relative z-[50]"
        animate={isRevealing ? { 
          scale: [1, 0.9, 1.5, 4],
          opacity: [1, 1, 1, 0]
        } : { scale: 1, opacity: 1 }}
        transition={{ 
          duration: REVEAL_DURATION / 1000, 
          times: [0, 0.1, 0.6, 1],
          ease: "circIn" 
        }}
      >
        <ContainerScroll
          titleComponent={
            <motion.div 
              className="flex flex-col items-center"
              animate={isRevealing ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-4 border-l-4 border-white bg-white/5 px-6 py-3 text-sm font-black uppercase tracking-[0.5em] text-white backdrop-blur-xl shadow-2xl mb-8"
              >
                <ScanLine className="h-5 w-5 animate-pulse" />
                Heavy-Access Terminal
              </motion.div>
              <h1 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tighter mb-4 uppercase text-center">
                Scroll for <br />
                <span className="text-neutral-500">Biometric Verification</span>
              </h1>
              <p className="max-w-xl text-lg text-neutral-400 font-mono tracking-tight mb-10">
                AUTHENTICATION LEVEL: OMEGA
              </p>
            </motion.div>
          }
        >
          <div className="relative w-full h-full bg-black overflow-hidden">
             {/* BACKGROUND DISINTEGRATION GRID */}
            <div className="absolute inset-0 z-10 grid grid-cols-12 grid-rows-12 pointer-events-none">
              {grid.map(i => {
                const row = Math.floor(i / 12);
                const col = i % 12;
                return (
                  <motion.div
                    key={i}
                    className="bg-black w-full h-full"
                    initial={{ opacity: 1 }}
                    animate={isRevealing ? { 
                      opacity: 0, 
                      scale: 0.2,
                      filter: "blur(12px)" 
                    } : { opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: isRevealing ? (row * 0.1) + (col * 0.05) + (Math.random() * 0.1) : 0,
                      ease: "circIn"
                    }}
                  />
                )
              })}
            </div>

            {/* Matrix Background */}
            <motion.div 
              className="absolute inset-0 z-0 bg-black"
              animate={isRevealing ? { opacity: 0 } : { opacity: 1 }}
            >
              <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.9)_100%)]" />
            </motion.div>

            {/* Scan Beam Effect */}
            {isRevealing && (
              <motion.div 
                className="absolute left-0 right-0 z-[110] h-3 bg-white shadow-[0_0_50px_15px_#fff]"
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: REVEAL_DURATION / 2000, ease: "linear" }}
              />
            )}

            {/* Main UI Content */}
            <motion.div 
              className="relative z-[105] w-full h-full flex flex-col items-center justify-center p-4 md:p-8"
              animate={isRevealing ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Phase 1: Scanner */}
              {!isInitializing && (
                <div className="flex flex-col items-center gap-10">
                  <button
                    type="button"
                    onPointerDown={startHold}
                    onPointerUp={cancelHold}
                    onPointerLeave={cancelHold}
                    onPointerCancel={cancelHold}
                    disabled={stage !== "idle" && stage !== "holding"}
                    className="group relative grid aspect-square w-[min(70vw,380px)] place-items-center overflow-hidden border-[8px] border-neutral-900 bg-neutral-950 shadow-[0_0_100px_rgba(255,255,255,0.05)] outline-none transition-all duration-500 hover:border-neutral-800 active:scale-95 disabled:cursor-default rounded-lg"
                  >
                    <div className="absolute top-6 left-6 h-8 w-8 border-t-2 border-l-2 border-white/20" />
                    <div className="absolute top-6 right-6 h-8 w-8 border-t-2 border-r-2 border-white/20" />
                    <div className="absolute bottom-6 left-6 h-8 w-8 border-b-2 border-l-2 border-white/20" />
                    <div className="absolute bottom-6 right-6 h-8 w-8 border-b-2 border-r-2 border-white/20" />
                    
                    <motion.div
                      className="absolute inset-4 border-[4px] border-white/5"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {isScanning && (
                      <motion.div
                        className="absolute left-4 right-4 z-20 h-1.5 bg-white shadow-[0_0_30px_5px_#fff]"
                        initial={{ top: "10%" }}
                        animate={{ top: "90%" }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                    )}

                    <div className="relative z-10 flex flex-col items-center gap-6">
                      <Fingerprint className={`h-32 w-32 transition-all duration-700 ${isScanning ? 'text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.8)] scale-110' : 'text-neutral-700'}`} />
                      <div className="font-mono text-xl font-black tracking-[0.5em] text-white">
                        {Math.round(progress)}%
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-white/5" style={{ height: `${progress}%`, top: `${100 - progress}%` }} />
                  </button>
                  <div className="text-xs font-black tracking-[0.6em] text-white uppercase text-center max-w-xs leading-loose">
                    {statusText}
                  </div>
                </div>
              )}

              {/* Phase 2: Centered Terminal Focus */}
              {isInitializing && (
                <motion.div 
                  className="w-full max-w-2xl border-[6px] border-white bg-black p-6 md:p-10 text-left text-xs leading-relaxed text-white shadow-[0_0_100px_rgba(255,255,255,0.2)] relative overflow-y-auto max-h-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mb-6 flex items-center justify-between border-b-2 border-white pb-3 font-black uppercase tracking-tighter text-sm">
                    <span className="flex items-center gap-2 text-white">
                      <div className="h-2 w-2 bg-white animate-ping" />
                      MASTER_TERMINAL_V7
                    </span>
                    <span className="text-neutral-500">LINK_ESTABLISHED</span>
                  </div>
                  <div className="space-y-1 font-mono">
                    {terminalLines.map((line, index) => (
                      <motion.div
                        key={line}
                        className="flex gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15, duration: 0.4 }}
                      >
                        <span className="opacity-30 font-bold w-10">[{index}]</span>
                        <span className="font-black tracking-tight">{line}</span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    className="mt-6 h-2 bg-white shadow-[0_0_30px_#fff]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: INIT_DURATION / 1000 - 1, ease: "linear" }}
                  />
                </motion.div>
              )}
            </motion.div>
          </div>
        </ContainerScroll>
      </motion.div>
    </div>
  )
}
