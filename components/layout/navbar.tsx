"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "motion/react";
import { ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, PROCEDURES, SITE } from "@/lib/constants";
import { MobileMenu } from "@/components/layout/mobile-menu";

const ACTIVE_INDICATOR_ID = "nav-active-indicator";

function NavItem({
  href,
  label,
  active,
  children,
}: {
  href: string;
  label: string;
  active: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      data-cursor-hover
      className={cn(
        "relative flex items-center gap-1 py-2 text-sm text-espresso-soft transition-colors hover:text-espresso",
        active && "text-espresso"
      )}
    >
      {label}
      {children}
      {active && (
        <motion.span
          layoutId={ACTIVE_INDICATOR_ID}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="absolute -bottom-0.5 left-0 right-0 h-px bg-champagne"
        />
      )}
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [proceduresOpen, setProceduresOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled
            ? "bg-ivory/85 shadow-soft-sm backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-20 max-w-8xl items-center justify-between px-6 lg:px-12">
          <Link
            href="/"
            data-cursor-hover
            className="font-display text-xl tracking-wide text-espresso"
          >
            Ana Beckman
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => {
              if (link.href === "/procedimentos") {
                return (
                  <li
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setProceduresOpen(true)}
                    onMouseLeave={() => setProceduresOpen(false)}
                  >
                    <NavItem href={link.href} label={link.label} active={pathname === link.href}>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </NavItem>

                    <AnimatePresence>
                      {proceduresOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-1/2 top-full grid w-[520px] -translate-x-1/2 grid-cols-2 gap-x-6 gap-y-1 rounded-lg border border-nude bg-white p-5 shadow-soft"
                        >
                          {PROCEDURES.map((p) => (
                            <Link
                              key={p.slug}
                              href={`/procedimentos#${p.slug}`}
                              data-cursor-hover
                              className="rounded-sm px-2 py-2 text-sm text-espresso-soft transition-colors hover:bg-blush hover:text-espresso"
                            >
                              {p.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              return (
                <li key={link.href}>
                  <NavItem href={link.href} label={link.label} active={pathname === link.href} />
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <Link
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="hidden rounded-full bg-espresso px-6 py-2.5 text-sm text-ivory transition-transform hover:scale-[1.03] lg:inline-block"
            >
              Agendar Avaliação
            </Link>

            <button
              aria-label="Abrir menu"
              data-cursor-hover
              onClick={() => setMobileOpen(true)}
              className="rounded-full p-2 text-espresso lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
