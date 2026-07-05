import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/shared/reveal";
import { BLOG_POSTS } from "@/lib/sample-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <article className="pt-36 section-pad">
      <div className="mx-auto max-w-2xl px-6 lg:px-12">
        <Reveal>
          <p className="text-xs uppercase tracking-wide text-champagne">
            {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}{" "}
            · {post.readingTime}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-3 font-display text-4xl leading-tight text-espresso sm:text-5xl">
            {post.title}
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg bg-blush">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 42rem, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-8 text-lg leading-relaxed text-espresso-soft">
            {post.excerpt}
          </p>
          <p className="mt-6 rounded-md border border-dashed border-nude bg-ivory-deep p-5 text-sm text-espresso-soft">
            {/* TODO(Raphael): substituir por conteúdo completo do artigo */}
            Conteúdo completo deste artigo em breve.
          </p>
        </Reveal>
      </div>
    </article>
  );
}
