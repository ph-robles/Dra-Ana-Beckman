"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { BeforeAfterItem } from "@/types";

/**
 * Cartão comparativo Antes/Depois. Toque ou clique para alternar —
 * funciona igualmente bem em desktop e mobile.
 */
export function BeforeAfterCard({ item }: { item: BeforeAfterItem }) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <button
      type="button"
      data-cursor-hover
      onClick={() => setShowAfter((v) => !v)}
      aria-pressed={showAfter}
      className="group relative block aspect-[4/5] w-full overflow-hidden rounded-lg border border-nude text-left shadow-soft-sm"
    >
      <Image
        src={item.beforeImage}
        alt={`Antes — ${item.procedure}`}
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-cover"
      />

      <motion.div
        animate={{ opacity: showAfter ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        <Image
          src={item.afterImage}
          alt={`Depois — ${item.procedure}`}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover"
        />
      </motion.div>

      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs uppercase tracking-wide text-espresso shadow-soft-sm">
        {showAfter ? "Depois" : "Antes"}
      </span>

      <span className="absolute bottom-4 right-4 rounded-full border border-white/60 bg-espresso/70 px-3 py-1 text-[11px] text-ivory backdrop-blur-sm">
        Toque para comparar
      </span>
    </button>
  );
}
