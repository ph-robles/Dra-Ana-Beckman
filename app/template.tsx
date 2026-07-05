"use client";

import { motion } from "motion/react";

/**
 * template.tsx remonta a cada navegação (diferente de layout.tsx), então é
 * o lugar certo para uma transição de página leve — só opacity + translateY,
 * sem custo de layout. Framer Motion já lida com prefers-reduced-motion
 * reduzindo a duração quando aplicável ao usar transições simples como esta.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
