"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useMotionValueEvent, useTransform } from "motion/react";
import { MoveHorizontal } from "lucide-react";
import type { BeforeAfterItem } from "@/types";

const STEP = 4;

/**
 * Slider comparativo Antes/Depois com arraste (mouse, touque e teclado).
 * Usa Pointer Events (unifica mouse/touch) e MotionValue (sem re-render do
 * React a cada pixel de arraste — só transform, GPU-friendly). Um pequeno
 * estado React é sincronizado só para o aria-valuenow ficar reativo para
 * leitores de tela, sem afetar a performance do arraste visual.
 */
export function BeforeAfterSlider({ item }: { item: BeforeAfterItem }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [ariaValue, setAriaValue] = useState(50);
  const x = useMotionValue(50); // posição do divisor, em %
  const clipPath = useTransform(x, (v) => `inset(0 ${100 - v}% 0 0)`);
  const handleLeft = useTransform(x, (v) => `${v}%`);

  useMotionValueEvent(x, "change", (latest) => setAriaValue(Math.round(latest)));

  function updateFromClientX(clientX: number) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    x.set(Math.min(100, Math.max(0, pct)));
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") x.set(Math.max(0, x.get() - STEP));
    if (e.key === "ArrowRight") x.set(Math.min(100, x.get() + STEP));
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/5] w-full touch-pan-y select-none overflow-hidden rounded-lg border border-nude shadow-soft-sm"
      onPointerDown={(e) => {
        setDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging && updateFromClientX(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <Image
        src={item.beforeImage}
        alt={`Antes — ${item.procedure}`}
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="pointer-events-none object-cover"
      />

      <motion.div style={{ clipPath }} className="pointer-events-none absolute inset-0">
        <Image
          src={item.afterImage}
          alt={`Depois — ${item.procedure}`}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        role="slider"
        tabIndex={0}
        aria-label={`Comparar antes e depois — ${item.procedure}`}
        aria-valuenow={ariaValue}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={onKeyDown}
        style={{ left: handleLeft }}
        className="absolute top-0 h-full w-px -translate-x-1/2 cursor-ew-resize bg-white/80 focus-visible:outline-none"
      >
        <span className="absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-espresso shadow-soft-sm ring-2 ring-transparent transition-shadow focus-visible:ring-champagne">
          <MoveHorizontal className="h-4 w-4" />
        </span>
      </motion.div>

      <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs uppercase tracking-wide text-espresso shadow-soft-sm">
        Antes
      </span>
      <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-espresso/80 px-3 py-1 text-xs uppercase tracking-wide text-ivory backdrop-blur-sm">
        Depois
      </span>
    </div>
  );
}
