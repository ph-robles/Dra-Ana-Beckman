"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { VeilReveal } from "@/components/shared/veil-reveal";
import { SITE } from "@/lib/constants";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Parallax sutil e só-transform (GPU-friendly) — a imagem se move um
  // pouco mais devagar que o scroll, dando profundidade sem distração.
  const prefersReducedMotion = useReducedMotion();
  const imageY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "14%"]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      {/* Elemento flutuante decorativo — atmosfera, discreto, canto oposto ao texto */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-champagne-soft/60 blur-3xl"
        animate={{ y: [0, -26, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto grid w-full max-w-8xl gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:px-12">
        <div>
          <Reveal>
            <span className="eyebrow">Enfermeira Esteta · Harmonização Orofacial</span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-xl font-display text-[2.75rem] leading-[1.08] text-espresso sm:text-6xl lg:text-[4.25rem]">
              Sua essência, <em className="italic text-champagne">em plena harmonia</em>.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-espresso-soft">
              Técnica apurada e delicadeza para realçar — nunca transformar —
              a beleza que já é sua. Atendimento em Piracicaba–SP e Ilha do
              Governador–RJ.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="group inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-sm text-ivory transition-transform hover:scale-[1.03]"
              >
                Agendar Avaliação
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/procedimentos"
                data-cursor-hover
                className="text-sm text-espresso-soft underline decoration-nude underline-offset-4 transition-colors hover:text-espresso"
              >
                Conhecer os procedimentos
              </Link>
            </div>
          </Reveal>
        </div>

        <motion.div style={{ y: imageY }}>
          <VeilReveal
            eager
            delay={0.3}
            direction="right"
            className="aspect-[4/5] w-full rounded-xl lg:aspect-[3/4]"
          >
            {/* Coloque o arquivo em: public/images/photos/hero-portrait.jpg */}
            <Image
              src="/images/photos/hero-portrait.jpg"
              alt="Dra. Ana Beatriz Beckman"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="rounded-xl object-cover"
            />
          </VeilReveal>
        </motion.div>
      </div>
    </section>
  );
}

