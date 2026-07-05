import type { Metadata } from "next";
import { Reveal } from "@/components/shared/reveal";
import { BeforeAfterSlider } from "@/components/shared/before-after-slider";
import { BEFORE_AFTER_ITEMS } from "@/lib/sample-data";

export const metadata: Metadata = {
  title: "Antes e Depois",
  description:
    "Galeria de resultados de Harmonização Orofacial da Dra. Ana Beatriz Beckman.",
  alternates: { canonical: "/antes-depois" },
};

export default function AntesDepoisPage() {
  return (
    <section className="pt-36 section-pad">
      <div className="mx-auto max-w-8xl px-6 lg:px-12">
        <Reveal>
          <span className="eyebrow">Antes e Depois</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-4 max-w-xl font-display text-5xl leading-tight text-espresso sm:text-6xl">
            Resultados que respeitam quem você é
          </h1>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-4 max-w-lg text-sm text-espresso-soft">
            Arraste o controle para comparar antes e depois. Imagens
            ilustrativas — serão substituídas por fotos reais de pacientes,
            com autorização, antes da publicação do site.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BEFORE_AFTER_ITEMS.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <BeforeAfterSlider item={item} />
              <p className="mt-3 text-center text-sm text-espresso-soft">
                {item.procedure}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
