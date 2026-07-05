import type { Metadata } from "next";
import Image from "next/image";
import { HeartHandshake, ShieldCheck, Sparkles, Award } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { VeilReveal } from "@/components/shared/veil-reveal";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a trajetória, os valores e a abordagem da Dra. Ana Beatriz Beckman, enfermeira esteta especialista em Harmonização Orofacial.",
  alternates: { canonical: "/sobre" },
};

const VALORES = [
  {
    icon: ShieldCheck,
    title: "Segurança",
    text: "Avaliação criteriosa, produtos regularizados e protocolos individualizados.",
  },
  {
    icon: Sparkles,
    title: "Naturalidade",
    text: "Cada intervenção busca equilíbrio, não transformação radical.",
  },
  {
    icon: HeartHandshake,
    title: "Humanização",
    text: "Escuta ativa antes de qualquer procedimento — a técnica vem depois da conversa.",
  },
  {
    icon: Award,
    title: "Excelência técnica",
    text: "Atualização constante em harmonização orofacial e boas práticas.",
  },
];

export default function SobrePage() {
  return (
    <>
      <section className="pt-36 section-pad !pb-0">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <Reveal>
            <span className="eyebrow">Sobre</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 max-w-2xl font-display text-5xl leading-tight text-espresso sm:text-6xl">
              Harmonia é técnica, mas também é escuta.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-8xl gap-16 px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-12">
          <VeilReveal direction="left" className="aspect-[4/5] rounded-xl">
            {/* Coloque o arquivo em: public/images/photos/sobre-retrato.jpg */}
            <Image
              src="/images/photos/sobre-retrato.jpg"
              alt="Dra. Ana Beatriz Beckman"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="rounded-xl object-cover"
            />
          </VeilReveal>

          <div>
            <Reveal>
              <h2 className="font-display text-3xl text-espresso sm:text-4xl">
                Missão
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 text-base leading-relaxed text-espresso-soft">
                {/* TODO(Raphael): substituir por texto validado com a cliente */}
                Como enfermeira esteta especialista em Harmonização
                Orofacial, a Dra. Ana Beckman dedica sua prática a um
                princípio central: toda intervenção deve partir da escuta e
                respeitar a identidade de quem está diante dela. A técnica
                existe para revelar equilíbrio, nunca para apagar
                características.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <h2 className="mt-10 font-display text-3xl text-espresso sm:text-4xl">
                Atendimento
              </h2>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-4 text-base leading-relaxed text-espresso-soft">
                Consultas em Piracicaba–SP e Ilha do Governador–RJ, com
                planejamento individualizado para cada paciente, sempre
                antecedido por uma avaliação detalhada.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ivory-deep">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <Reveal>
            <span className="eyebrow">Valores</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 max-w-lg font-display text-4xl leading-tight text-espresso sm:text-5xl">
              O que guia cada atendimento
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALORES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-lg border border-nude bg-white p-7 shadow-soft-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blush">
                    <v.icon className="h-5 w-5 text-champagne" />
                  </div>
                  <p className="mt-5 font-display text-lg text-espresso">{v.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-espresso-soft">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
