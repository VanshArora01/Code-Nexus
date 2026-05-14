"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactElement } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const view = { once: true, margin: "-80px" } as const;

export function HomeCTA(): ReactElement {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-bg py-32">
      <p
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-heading font-black uppercase text-white/[0.025]"
        style={{ fontSize: "18vw" }}
        aria-hidden
      >
        Let&apos;s build
      </p>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(90vw,720px)] w-[min(90vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(255,0,138,0.1), transparent 65%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-[1200px] gap-14 px-4 md:grid-cols-[55%_45%] md:items-center md:gap-12 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.65, ease }}
          className="text-left"
        >
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink/30 px-3 py-1.5 font-dm text-[0.7rem] font-medium text-white/90"
          >
            <span className="text-pink" aria-hidden>
              ●
            </span>
            Taking new projects
          </div>
          <h2
            className="font-heading font-black tracking-tight text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Ready to scale with AI?
          </h2>
          <p className="mt-6 max-w-lg font-dm text-[1.1rem] leading-[1.7] text-[#9CA3AF]">
            Tell us what you&apos;re building. We respond within 24 hours.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded px-8 py-3.5 font-dm font-semibold text-white transition-[filter,transform] duration-200 hover:brightness-110 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #ff008a, #8b5cf6)",
              }}
            >
              Book a Free Call
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-1 rounded border border-white/25 px-8 py-3.5 font-dm font-semibold text-white transition-[border-color,transform] duration-200 hover:border-pink/40 hover:-translate-y-0.5"
            >
              See Our Work
              <span aria-hidden>→</span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.65, delay: 0.08, ease }}
          className="relative mx-auto flex h-[300px] w-full max-w-[300px] items-center justify-center md:mx-0 md:ml-auto"
        >
          <div className="home-cta-float relative h-[300px] w-[300px]">
            <div
              className="absolute left-[10%] top-[10%] h-[70%] w-[70%] rounded border border-pink/30"
              style={{ transform: "rotate(-8deg)" }}
              aria-hidden
            />
            <div
              className="absolute left-[20%] top-[20%] h-[70%] w-[70%] rounded border border-purple/25"
              style={{ transform: "rotate(4deg)" }}
              aria-hidden
            />
            <div
              className="absolute left-[30%] top-[30%] h-[50%] w-[50%] rounded"
              style={{
                transform: "rotate(-3deg)",
                background:
                  "linear-gradient(135deg, rgba(255,0,138,0.1), rgba(139,92,246,0.1))",
              }}
              aria-hidden
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
