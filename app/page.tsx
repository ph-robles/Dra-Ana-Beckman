import { Hero } from "@/sections/home/hero";
import { AboutPreview } from "@/sections/home/about-preview";
import { Gallery } from "@/sections/home/gallery";
import { ProceduresPreview } from "@/sections/home/procedures-preview";
import { CtaFinal } from "@/sections/home/cta-final";
import { SectionDivider } from "@/components/shared/section-divider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <AboutPreview />
      <Gallery />
      <ProceduresPreview />
      <CtaFinal />
    </>
  );
}
