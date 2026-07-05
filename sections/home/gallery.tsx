"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Instagram } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { GALLERY_IMAGES } from "@/lib/sample-data";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Deslocamento vertical alternado por cartão — cria a composição "flutuante"
// (nunca mais que ~28px, e apenas transform — GPU-friendly, sem CLS)
const OFFSET_PATTERN = [0, 28, -18, 22, 0];

function GalleryCard({
  image,
  index,
  progress,
}: {
  image: (typeof GALLERY_IMAGES)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Cada cartão se move a uma velocidade ligeiramente diferente ao rolar —
  // o efeito de parallax fica mais perceptível nos cartões das pontas.
  const prefersReducedMotion = useReducedMotion();
  const range = prefersReducedMotion ? 0 : 20 + (index % 3) * 10;
  const y = useTransform(progress, [0, 1], [range, -range]);

  return (
    <motion.div
      style={{ y }}
      className={cn(
        "relative aspect-[3/4] w-[68vw] shrink-0 snap-center overflow-hidden rounded-lg border border-nude shadow-soft-sm sm:w-[42vw] lg:w-auto lg:shrink lg:snap-none"
      )}
    >
      <div
        style={{
          transform: `translateY(${OFFSET_PATTERN[index % OFFSET_PATTERN.length]}px)`,
        }}
        className="hidden h-full lg:block"
      >
        <Image src={image.src} alt={image.alt} fill sizes="20vw" className="object-cover" />
      </div>
      <div className="h-full lg:hidden">
        <Image src={image.src} alt={image.alt} fill sizes="70vw" className="object-cover" />
      </div>
    </motion.div>
  );
}

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section className="section-pad overflow-hidden">
      <div className="mx-auto max-w-8xl px-6 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <span className="eyebrow">Bastidores</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 max-w-md font-display text-4xl leading-tight text-espresso sm:text-5xl">
                Um pouco do dia a dia da clínica
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-2 rounded-full border border-nude px-6 py-3 text-sm text-espresso transition-colors hover:bg-white"
            >
              <Instagram className="h-4 w-4" />
              Seguir no Instagram
            </a>
          </Reveal>
        </div>
      </div>

      <div
        ref={ref}
        className="mt-14 flex snap-x gap-5 overflow-x-auto px-6 pb-4 lg:mx-auto lg:max-w-8xl lg:snap-none lg:justify-between lg:overflow-visible lg:px-12"
      >
        {GALLERY_IMAGES.map((image, i) => (
          <GalleryCard key={image.id} image={image} index={i} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
