import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { VeilReveal } from "@/components/shared/veil-reveal";

const DIFERENCIAIS = [
  {
    icon: ShieldCheck,
    title: "Segurança em primeiro lugar",
    text: "Avaliação criteriosa e protocolos individualizados para cada paciente.",
  },
  {
    icon: Sparkles,
    title: "Naturalidade acima de tudo",
    text: "O objetivo é realçar, nunca apagar o que torna cada rosto único.",
  },
  {
    icon: HeartHandshake,
    title: "Cuidado humanizado",
    text: "Escuta atenta e acompanhamento próximo em cada etapa do processo.",
  },
];

export function AboutPreview() {
  return (
    <section className="section-pad !pt-0">
      <div className="mx-auto grid max-w-8xl gap-16 px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-12">
        <div>
          <Reveal>
            <span className="eyebrow">Sobre a Dra. Ana Beckman</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-4xl leading-tight text-espresso sm:text-5xl">
              Uma trajetória dedicada à beleza natural
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-espresso-soft">
              Enfermeira esteta especializada em Harmonização Orofacial, a
              Dra. Ana Beckman construiu sua trajetória em torno de um
              princípio simples: cada rosto tem uma harmonia própria, e o
              papel da técnica é revelá-la — não reinventá-la.
            </p>
          </Reveal>

          <div className="mt-10 space-y-6">
            {DIFERENCIAIS.map((item, i) => (
              <Reveal key={item.title} delay={0.2 + i * 0.08}>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush">
                    <item.icon className="h-5 w-5 text-champagne" />
                  </div>
                  <div>
                    <p className="font-medium text-espresso">{item.title}</p>
                    <p className="mt-1 text-sm text-espresso-soft">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <Link
              href="/sobre"
              data-cursor-hover
              className="mt-10 inline-flex items-center gap-2 text-sm text-espresso underline decoration-nude underline-offset-4"
            >
              Conhecer a história completa
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <VeilReveal direction="left" className="aspect-[4/5] rounded-xl">
          {/* Coloque o arquivo em: public/images/photos/about-consultorio.jpg */}
          <Image
            src="/images/photos/about-consultorio.jpg"
            alt="Consultório da Dra. Ana Beatriz Beckman"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="rounded-xl object-cover"
          />
        </VeilReveal>
      </div>
    </section>
  );
}
