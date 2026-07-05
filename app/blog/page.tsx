import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { BLOG_POSTS } from "@/lib/sample-data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conteúdos sobre Harmonização Orofacial, cuidados com a pele e bem-estar, pela Dra. Ana Beatriz Beckman.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <section className="pt-36 section-pad">
      <div className="mx-auto max-w-8xl px-6 lg:px-12">
        <Reveal>
          <span className="eyebrow">Blog</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-4 max-w-xl font-display text-5xl leading-tight text-espresso sm:text-6xl">
            Conversas sobre harmonia e cuidado
          </h1>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                data-cursor-hover
                className="group block h-full overflow-hidden rounded-lg border border-nude bg-white shadow-soft-sm transition-shadow hover:shadow-soft"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-blush">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-wide text-champagne">
                    {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    · {post.readingTime}
                  </p>
                  <p className="mt-3 font-display text-xl text-espresso">
                    {post.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-espresso-soft">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-espresso opacity-0 transition-opacity group-hover:opacity-100">
                    Ler mais
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
