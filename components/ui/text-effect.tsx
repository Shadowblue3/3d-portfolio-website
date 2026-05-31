"use client";

import * as React from "react";
import type { TargetAndTransition } from "motion/react";
import { motion, useInView } from "motion/react";

import { cn } from "@/lib/utils";

const initialProps: TargetAndTransition = {
  pathLength: 0,
  opacity: 0,
  scale: 0.7,
  rotateY: -15,
};

const animateProps: TargetAndTransition = {
  pathLength: 1,
  opacity: 1,
  scale: 1,
  rotateY: 0,
};

type Props = React.ComponentProps<typeof motion.svg> & {
  speed?: number;
  onAnimationComplete?: () => void;
};

export function SamsungHelloVietnameseEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-32", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1400 300"
      fill="none"
      stroke="currentColor"
      strokeWidth="20"
      initial={{ opacity: 1, scale: 0.8, rotateX: 10 }}
      exit={{ opacity: 0, scale: 0.6, rotateX: -10 }}
      transition={{ 
        duration: 0.8,
        type: "spring",
        stiffness: 120,
        damping: 15
      }}
      {...props}
    >
      <title>xin chào - Samsung Bold Tech Style</title>

      {/* x - Angular geometric X shape */}
      <motion.g>
        <motion.path
          d="M40 80L90 130L140 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.6),
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 300,
            damping: 20,
            opacity: { duration: 0.3 },
            scale: { duration: 0.5, type: "spring", stiffness: 200 },
          }}
        />
        <motion.path
          d="M140 80L90 130L40 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.6),
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: calc(0.2),
            type: "spring",
            stiffness: 300,
            damping: 20,
            opacity: { duration: 0.3, delay: calc(0.2) },
            scale: { duration: 0.5, delay: calc(0.2), type: "spring", stiffness: 200 },
          }}
        />
      </motion.g>

      {/* i - Tech vertical line with geometric dot */}
      <motion.g>
        <motion.path
          d="M200 90L200 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            delay: calc(0.8),
            type: "spring",
            stiffness: 250,
            damping: 18,
            opacity: { duration: 0.3, delay: calc(0.8) },
            scale: { duration: 0.4, delay: calc(0.8) },
          }}
        />
        <motion.rect
          x="192"
          y="60"
          width="16"
          height="16"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ ...initialProps, pathLength: 1 }}
          animate={{ ...animateProps, pathLength: 1 }}
          transition={{
            duration: calc(0.3),
            delay: calc(1.2),
            type: "spring",
            stiffness: 400,
            opacity: { duration: 0.2, delay: calc(1.2) },
            scale: { duration: 0.3, delay: calc(1.2) },
          }}
        />
      </motion.g>

      {/* n - Angular tech style with sharp turns */}
      <motion.path
        d="M250 180L250 90L290 90L330 130L330 180"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          delay: calc(1.5),
          type: "spring",
          stiffness: 180,
          damping: 15,
          opacity: { duration: 0.4, delay: calc(1.5) },
          scale: { duration: 0.6, delay: calc(1.5) },
        }}
      />

      {/* c - Geometric C shape with sharp corners */}
      <motion.path
        d="M430 120L390 90L390 180L430 150"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.7),
          ease: "easeOut",
          delay: calc(2.3),
          type: "spring",
          stiffness: 220,
          damping: 16,
          opacity: { duration: 0.35, delay: calc(2.3) },
          scale: { duration: 0.5, delay: calc(2.3) },
        }}
      />

      {/* h - Bold Samsung tech H with angular connection */}
      <motion.g>
        <motion.path
          d="M520 60L520 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            delay: calc(3.0),
            type: "spring",
            stiffness: 280,
            damping: 18,
            opacity: { duration: 0.3, delay: calc(3.0) },
            scale: { duration: 0.4, delay: calc(3.0) },
          }}
        />
        <motion.path
          d="M520 125L580 125"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(3.3),
            type: "spring",
            stiffness: 320,
            damping: 20,
            opacity: { duration: 0.25, delay: calc(3.3) },
            scale: { duration: 0.35, delay: calc(3.3) },
          }}
        />
        <motion.path
          d="M580 60L580 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            delay: calc(3.6),
            type: "spring",
            stiffness: 280,
            damping: 18,
            opacity: { duration: 0.3, delay: calc(3.6) },
            scale: { duration: 0.4, delay: calc(3.6) },
          }}
        />
      </motion.g>

      {/* à - Geometric A with angular accent */}
      <motion.g>
        <motion.path
          d="M650 180L680 90L710 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.7),
            ease: "easeInOut",
            delay: calc(4.2),
            type: "spring",
            stiffness: 200,
            damping: 16,
            opacity: { duration: 0.35, delay: calc(4.2) },
            scale: { duration: 0.5, delay: calc(4.2) },
          }}
        />
        <motion.path
          d="M665 140L695 140"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeOut",
            delay: calc(4.6),
            type: "spring",
            stiffness: 250,
            damping: 18,
            opacity: { duration: 0.25, delay: calc(4.6) },
            scale: { duration: 0.35, delay: calc(4.6) },
          }}
        />
        {/* Angular accent mark */}
        <motion.path
          className="stroke-blue-400"
          d="M700 50L720 30"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ ...initialProps, filter: "blur(3px)" }}
          animate={{ ...animateProps, filter: "blur(0px)" }}
          transition={{
            duration: calc(0.4),
            delay: calc(4.9),
            type: "spring",
            stiffness: 350,
            opacity: { duration: 0.3, delay: calc(4.9) },
            scale: { duration: 0.3, delay: calc(4.9) },
            filter: { duration: 0.6, delay: calc(4.9) },
          }}
        />
      </motion.g>

      {/* o - Geometric diamond-like O */}
      <motion.path
        d="M780 90L820 110L820 160L780 180L760 160L760 110L780 90"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.9),
          ease: "easeInOut",
          delay: calc(5.3),
          type: "spring",
          stiffness: 160,
          damping: 14,
          opacity: { duration: 0.45, delay: calc(5.3) },
          scale: { duration: 0.65, delay: calc(5.3) },
        }}
        onAnimationComplete={onAnimationComplete}
      />

      {/* Futuristic accent lines */}
      <motion.g className="stroke-cyan-400 opacity-60">
        <motion.path
          d="M50 50L1350 50"
          strokeWidth="2"
          style={{ strokeLinecap: "square" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{
            duration: calc(2.0),
            delay: calc(6.0),
            ease: "easeOut",
          }}
        />
        <motion.path
          d="M50 220L1350 220"
          strokeWidth="2"
          style={{ strokeLinecap: "square" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{
            duration: calc(2.0),
            delay: calc(6.2),
            ease: "easeOut",
          }}
        />
      </motion.g>
    </motion.svg>
  );
}

const loopTransition = (d: number, speed: number) => ({
  duration: 0.8 * speed,
  delay: d * speed,
  repeat: Infinity,
  repeatDelay: 2,
  repeatType: "loop" as const,
  ease: "easeInOut" as const,
});

export function WebDevLoopEffect({ className, speed = 1 }: Props) {
  const calc = (x: number) => x * speed;
  return (
    <motion.svg className={cn("h-12 md:h-16", className)} viewBox="0 0 400 100" fill="none" stroke="currentColor" strokeWidth="8">
      <motion.path d="M20 20 L40 80 L60 20 L80 80 L100 20" initial={initialProps} animate={animateProps} transition={loopTransition(0, speed)} />
      <motion.path d="M120 40 L160 40 L160 60 L120 60 L120 80 L160 80" initial={initialProps} animate={animateProps} transition={loopTransition(0.2, speed)} />
      <motion.path d="M180 20 L180 80 L220 80 L220 20 L180 20" initial={initialProps} animate={animateProps} transition={loopTransition(0.4, speed)} />
      <motion.path d="M250 20 L250 80 L290 80" initial={initialProps} animate={animateProps} transition={loopTransition(0.6, speed)} />
      <motion.path d="M310 40 L350 40 L350 80 L310 80 L310 40" initial={initialProps} animate={animateProps} transition={loopTransition(0.8, speed)} />
    </motion.svg>
  );
}

export function AIMLLoopEffect({ className, speed = 1 }: Props) {
  return (
    <motion.svg className={cn("h-12 md:h-16", className)} viewBox="0 0 400 100" fill="none" stroke="currentColor" strokeWidth="8">
      <motion.path d="M40 80 L70 20 L100 80 M55 60 L85 60" initial={initialProps} animate={animateProps} transition={loopTransition(0, speed)} />
      <motion.path d="M120 20 L120 80" initial={initialProps} animate={animateProps} transition={loopTransition(0.2, speed)} />
      <motion.path d="M160 80 L160 20 L200 50 L240 20 L240 80" initial={initialProps} animate={animateProps} transition={loopTransition(0.4, speed)} />
      <motion.path d="M280 80 L280 20 L320 80" initial={initialProps} animate={animateProps} transition={loopTransition(0.6, speed)} />
    </motion.svg>
  );
}

export function LanguagesLoopEffect({ className, speed = 1 }: Props) {
  return (
    <motion.svg className={cn("h-12 md:h-16", className)} viewBox="0 0 400 100" fill="none" stroke="currentColor" strokeWidth="8">
      <motion.path d="M40 20 L40 80 L80 80" initial={initialProps} animate={animateProps} transition={loopTransition(0, speed)} />
      <motion.path d="M100 80 L130 20 L160 80 M115 60 L145 60" initial={initialProps} animate={animateProps} transition={loopTransition(0.2, speed)} />
      <motion.path d="M180 80 L180 20 L220 80 L220 20" initial={initialProps} animate={animateProps} transition={loopTransition(0.4, speed)} />
      <motion.path d="M250 40 L290 40 L290 80 L250 80 L250 40" initial={initialProps} animate={animateProps} transition={loopTransition(0.6, speed)} />
    </motion.svg>
  );
}

export function DatabasesLoopEffect({ className, speed = 1 }: Props) {
  return (
    <motion.svg className={cn("h-12 md:h-16", className)} viewBox="0 0 400 100" fill="none" stroke="currentColor" strokeWidth="8">
      <motion.path d="M40 20 L40 80 L80 80 L80 20 L40 20" initial={initialProps} animate={animateProps} transition={loopTransition(0, speed)} />
      <motion.path d="M100 80 L130 20 L160 80 M115 60 L145 60" initial={initialProps} animate={animateProps} transition={loopTransition(0.2, speed)} />
      <motion.path d="M180 20 L240 20 M210 20 L210 80" initial={initialProps} animate={animateProps} transition={loopTransition(0.4, speed)} />
      <motion.path d="M260 20 L260 80 L300 80 L300 20 L260 20" initial={initialProps} animate={animateProps} transition={loopTransition(0.6, speed)} />
    </motion.svg>
  );
}

export function SamsungAboutMeEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  return (
    <motion.svg
      ref={containerRef}
      className={cn("h-24 md:h-32", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 250"
      fill="none"
      stroke="currentColor"
      strokeWidth="16"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>About Me - Tech Style</title>

      {/* A */}
      <motion.path
        d="M50 180 L100 50 L150 180"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={isInView ? animateProps : initialProps}
        transition={{ duration: calc(0.6), delay: calc(0) }}
      />
      <motion.path
        d="M75 130 L125 130"
        style={{ strokeLinecap: "square" }}
        initial={initialProps}
        animate={isInView ? animateProps : initialProps}
        transition={{ duration: calc(0.3), delay: calc(0.4) }}
      />

      {/* b */}
      <motion.path
        d="M190 50 L190 180 L250 180 L250 100 L190 100"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={isInView ? animateProps : initialProps}
        transition={{ duration: calc(0.7), delay: calc(0.6) }}
      />

      {/* o */}
      <motion.path
        d="M290 100 L350 100 L350 180 L290 180 Z"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={isInView ? animateProps : initialProps}
        transition={{ duration: calc(0.6), delay: calc(1.1) }}
      />

      {/* u */}
      <motion.path
        d="M390 100 L390 180 L450 180 L450 100"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={isInView ? animateProps : initialProps}
        transition={{ duration: calc(0.6), delay: calc(1.5) }}
      />

      {/* t */}
      <motion.path
        d="M510 50 L510 180 M480 80 L540 80"
        style={{ strokeLinecap: "square" }}
        initial={initialProps}
        animate={isInView ? animateProps : initialProps}
        transition={{ duration: calc(0.5), delay: calc(2.0) }}
      />

      {/* M */}
      <motion.path
        d="M620 180 L620 50 L670 120 L720 50 L720 180"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={isInView ? animateProps : initialProps}
        transition={{ duration: calc(0.8), delay: calc(2.6) }}
      />

      {/* e */}
      <motion.path
        d="M830 140 L770 140 L770 100 L830 100 L830 180 L770 180"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={isInView ? animateProps : initialProps}
        transition={{ duration: calc(0.7), delay: calc(3.2) }}
        onAnimationComplete={onAnimationComplete}
      />

      {/* Accent lines */}
      <motion.g className="stroke-blue-500 opacity-50">
        <motion.path
          d="M30 220 L970 220"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: calc(1.5), delay: calc(3.5) }}
        />
      </motion.g>
    </motion.svg>
  );
}

export function SamsungSkillsEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  return (
    <motion.svg
      ref={containerRef}
      className={cn("h-24 md:h-32", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 250"
      fill="none"
      stroke="currentColor"
      strokeWidth="16"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>Skills - Tech Style</title>

      {/* S */}
      <motion.path
        d="M100 60 L40 60 L40 120 L100 120 L100 180 L40 180"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={isInView ? animateProps : initialProps}
        transition={{ duration: calc(0.8), delay: calc(0) }}
      />

      {/* K */}
      <motion.path
        d="M140 50 L140 190 M140 120 L200 60 M140 120 L200 190"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={isInView ? animateProps : initialProps}
        transition={{ duration: calc(0.8), delay: calc(0.5) }}
      />

      {/* I */}
      <motion.path
        d="M240 50 L240 190"
        style={{ strokeLinecap: "square" }}
        initial={initialProps}
        animate={isInView ? animateProps : initialProps}
        transition={{ duration: calc(0.5), delay: calc(1.0) }}
      />

      {/* L */}
      <motion.path
        d="M280 50 L280 190 L340 190"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={isInView ? animateProps : initialProps}
        transition={{ duration: calc(0.6), delay: calc(1.3) }}
      />

      {/* L */}
      <motion.path
        d="M380 50 L380 190 L440 190"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={isInView ? animateProps : initialProps}
        transition={{ duration: calc(0.6), delay: calc(1.6) }}
      />

      {/* S */}
      <motion.path
        d="M540 60 L480 60 L480 120 L540 120 L540 180 L480 180"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={isInView ? animateProps : initialProps}
        transition={{ duration: calc(0.8), delay: calc(2.0) }}
        onAnimationComplete={onAnimationComplete}
      />

      {/* Accent lines */}
      <motion.g className="stroke-blue-500 opacity-50">
        <motion.path
          d="M30 220 L560 220"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: calc(1.2), delay: calc(2.5) }}
        />
      </motion.g>
    </motion.svg>
  );
}

export function SamsungHelloEnglishEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-28", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 250"
      fill="none"
      stroke="currentColor"
      strokeWidth="18"
      initial={{ opacity: 1, scale: 0.8, rotateX: 8 }}
      exit={{ opacity: 0, scale: 0.6, rotateX: -8 }}
      transition={{ 
        duration: 0.7,
        type: "spring",
        stiffness: 140,
        damping: 18
      }}
      {...props}
    >
      <title>hello - Samsung Bold Tech Style</title>

      {/* h - Bold angular H with tech styling */}
      <motion.g>
        <motion.path
          d="M40 60L40 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            type: "spring",
            stiffness: 280,
            damping: 20,
            opacity: { duration: 0.3 },
            scale: { duration: 0.4 },
          }}
        />
        <motion.path
          d="M40 125L100 125"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(0.3),
            type: "spring",
            stiffness: 320,
            damping: 22,
            opacity: { duration: 0.25, delay: calc(0.3) },
            scale: { duration: 0.35, delay: calc(0.3) },
          }}
        />
        <motion.path
          d="M100 60L100 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            delay: calc(0.6),
            type: "spring",
            stiffness: 280,
            damping: 20,
            opacity: { duration: 0.3, delay: calc(0.6) },
            scale: { duration: 0.4, delay: calc(0.6) },
          }}
        />
      </motion.g>

      {/* e - Geometric E with sharp edges */}
      <motion.g>
        <motion.path
          d="M150 60L150 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            delay: calc(1.0),
            type: "spring",
            stiffness: 260,
            damping: 19,
            opacity: { duration: 0.3, delay: calc(1.0) },
            scale: { duration: 0.4, delay: calc(1.0) },
          }}
        />
        <motion.path
          d="M150 60L210 60"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(1.3),
            type: "spring",
            stiffness: 300,
            damping: 21,
            opacity: { duration: 0.25, delay: calc(1.3) },
            scale: { duration: 0.35, delay: calc(1.3) },
          }}
        />
        <motion.path
          d="M150 125L190 125"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(1.6),
            type: "spring",
            stiffness: 300,
            damping: 21,
            opacity: { duration: 0.25, delay: calc(1.6) },
            scale: { duration: 0.35, delay: calc(1.6) },
          }}
        />
        <motion.path
          d="M150 190L210 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(1.9),
            type: "spring",
            stiffness: 300,
            damping: 21,
            opacity: { duration: 0.25, delay: calc(1.9) },
            scale: { duration: 0.35, delay: calc(1.9) },
          }}
        />
      </motion.g>

      {/* l - Tech vertical line */}
      <motion.path
        d="M260 60L260 190L300 190"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.6),
          ease: "easeOut",
          delay: calc(2.3),
          type: "spring",
          stiffness: 240,
          damping: 18,
          opacity: { duration: 0.35, delay: calc(2.3) },
          scale: { duration: 0.45, delay: calc(2.3) },
        }}
      />

      {/* l - Second tech vertical line */}
      <motion.path
        d="M340 60L340 190L380 190"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.6),
          ease: "easeOut",
          delay: calc(2.8),
          type: "spring",
          stiffness: 240,
          damping: 18,
          opacity: { duration: 0.35, delay: calc(2.8) },
          scale: { duration: 0.45, delay: calc(2.8) },
        }}
      />

      {/* o - Geometric diamond-style O */}
      <motion.path
        d="M450 90L490 110L490 170L450 190L420 170L420 110L450 90"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          delay: calc(3.3),
          type: "spring",
          stiffness: 180,
          damping: 16,
          opacity: { duration: 0.4, delay: calc(3.3) },
          scale: { duration: 0.6, delay: calc(3.3) },
        }}
      />

      {/* Tech accent elements */}
      <motion.g className="stroke-blue-500 opacity-70">
        {/* Corner brackets for tech aesthetic */}
        <motion.path
          d="M20 40L20 20L40 20"
          strokeWidth="3"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{
            duration: calc(0.5),
            delay: calc(4.0),
            ease: "easeOut",
          }}
        />
        <motion.path
          d="M500 40L520 20L520 40"
          strokeWidth="3"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{
            duration: calc(0.5),
            delay: calc(4.2),
            ease: "easeOut",
          }}
        />
        <motion.path
          d="M20 210L20 230L40 230"
          strokeWidth="3"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{
            duration: calc(0.5),
            delay: calc(4.4),
            ease: "easeOut",
          }}
        />
        <motion.path
          d="M500 210L520 230L520 210"
          strokeWidth="3"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{
            duration: calc(0.5),
            delay: calc(4.6),
            ease: "easeOut",
          }}
          onAnimationComplete={onAnimationComplete}
        />
      </motion.g>
    </motion.svg>
  );
}
