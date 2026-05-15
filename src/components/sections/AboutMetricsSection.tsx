"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, type ReactElement } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const MANIFESTO = [
  {
    lead: "Bias to ship",
    text: "We scope for a first version you can run in production — then tighten with real traffic, not hypothetical edge cases.",
  },
  {
    lead: "Engineering taste",
    text: "Readable code, honest trade-offs, and infrastructure you can hand off. No mystery folders, no vendor lock-in cosplay.",
  },
  {
    lead: "Partners, not pixels",
    text: "We push back when an idea needs reframing. The goal is outcomes you can defend internally, not a deck that ages overnight.",
  },
] as const;

export function AboutMetricsSection(): ReactElement {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const glowOpacity = useTransform(scrollYProgress, [0.15, 0.45, 0.75], [0.25, 0.55, 0.3]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#020206] px-4 py-28 md:px-6 md:py-36 lg:px-8"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-[-20%] opacity-40"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 20% 40%, rgba(255,0,138,0.14), transparent 55%), radial-gradient(ellipse 70% 45% at 85% 60%, rgba(139,92,246,0.12), transparent 50%)",
          }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{
          opacity: glowOpacity,
          background:
            "radial-gradient(circle, rgba(255,0,138,0.2), rgba(139,92,246,0.08), transparent 65%)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1100px]">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.75, ease }}
            className="text-left lg:sticky lg:top-32 lg:self-start"
          >
            <p className="font-dm text-[0.7rem] font-medium uppercase tracking-[0.38em] text-pink">
              Field notes
            </p>
            <h2
              className="mt-5 font-heading font-black leading-[1.08] text-white"
              style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)" }}
            >
              What working with us actually feels like.
            </h2>
            <p className="mt-6 max-w-md font-dm text-base leading-relaxed text-white/48">
              No vanity dashboards, no recycled case studies — just how we make decisions
              when software, AI, and timelines collide.
            </p>
            <Link
              href="/work"
              className="group mt-10 inline-flex items-center gap-2 font-heading text-sm font-semibold text-pink transition-colors hover:text-white"
            >
              Browse shipped work
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>

          <div className="relative pl-0 lg:pl-6">
            <div
              className="pointer-events-none absolute left-0 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-pink/70 via-white/15 to-transparent lg:block"
              aria-hidden
            />
            <div className="space-y-0">
              {MANIFESTO.map((item, i) => (
                <motion.article
                  key={item.lead}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-12%" }}
                  transition={{ duration: 0.65, delay: i * 0.1, ease }}
                  className="group relative border-b border-white/[0.06] py-10 first:pt-0 last:border-b-0 lg:pl-10"
                >
                  <div
                    className="pointer-events-none absolute left-0 top-12 hidden h-2 w-2 -translate-x-[calc(50%+0.5px)] rounded-full border border-pink/50 bg-[#020206] shadow-[0_0_12px_rgba(255,0,138,0.35)] lg:block"
                    aria-hidden
                  />
                  <p className="font-heading text-lg font-semibold tracking-tight text-white md:text-xl">
                    {item.lead}
                  </p>
                  <p className="mt-3 max-w-lg font-dm text-sm leading-relaxed text-white/50 md:text-[0.95rem]">
                    {item.text}
                  </p>
                  <div
                    className="mt-5 h-px max-w-xs origin-left scale-x-0 bg-gradient-to-r from-pink/60 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
                    aria-hidden
                  />
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
