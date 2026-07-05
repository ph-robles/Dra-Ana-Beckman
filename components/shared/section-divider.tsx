"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

/**
 * Divisor de seção discreto: uma linha que se desenha verticalmente até um
 * pequeno losango em champagne. Cria uma pausa visual intencional entre
 * seções — usado especialmente na transição Hero → Sobre no mobile, onde
 * antes o conteúdo emendava sem respiro.
 */
export function SectionDivider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

  return (
    <div
      ref={ref}
      aria-hidden
      className="flex justify-center py-10 sm:py-14"
    >
      <div className="flex flex-col items-center gap-3">
        <motion.span
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top" }}
          className="h-10 w-px origin-top bg-nude"
        />
        <motion.span
          initial={{ scale: 0, rotate: 45, opacity: 0 }}
          animate={isInView ? { scale: 1, rotate: 45, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="h-2 w-2 bg-champagne"
        />
      </div>
    </div>
  );
}
