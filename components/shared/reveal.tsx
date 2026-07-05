"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type RevealDirection = "up" | "down" | "left" | "right" | "in";

type RevealProps = {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
};

const OFFSET = 28;

const variantsFor = (direction: RevealDirection): Variants => {
  const hidden =
    direction === "up"
      ? { opacity: 0, y: OFFSET }
      : direction === "down"
      ? { opacity: 0, y: -OFFSET }
      : direction === "left"
      ? { opacity: 0, x: OFFSET }
      : direction === "right"
      ? { opacity: 0, x: -OFFSET }
      : { opacity: 0, scale: 0.97 };

  return {
    hidden,
    visible: { opacity: 1, y: 0, x: 0, scale: 1 },
  };
};

/**
 * Componente de entrada suave usado em toda a coreografia de scroll do site.
 * Fade + deslocamento sutil, nunca chamativo — "nada exagerado" (briefing).
 * Some por completo se o usuário preferir menos movimento.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className,
  once = true,
}: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variantsFor(direction)}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
