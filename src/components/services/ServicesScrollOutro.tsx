"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactElement } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const PILLARS = [
  { label: "Web", detail: "Next.js products, dashboards, marketing sites" },
  { label: "AI", detail: "Agents, chatbots, evals, and guardrails" },
  { label: "Ops", detail: "n8n, APIs, CRM, email, WhatsApp flows" },
  { label: "Growth", detail: "Technical SEO, CWV, analytics loops" },
] as const;

export function ServicesScrollOutro(): ReactElement {
  return (
    <section className="relative min-h-[min(72vh,640px)] border-t border-white/[0.06] bg-[#030208] px-4 py-24 md:px-8 md:py-32 lg:py-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% 0%, rgba(255,0,138,0.16), transparent 52%), radial-gradient(ellipse 70% 50% at 0% 100%, rgba(139,92,246,0.12), transparent 50%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent 35%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-16 lg:flex-row lg:items-stretch lg:justify-between lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="max-w-xl flex-1 text-left"
        >
          <p className="font-dm text-[0.7rem] font-medium uppercase tracking-[0.38em] text-pink">
            After the scroll
          </p>
          <h2
            className="mt-5 font-heading font-black leading-[1.05] text-white"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            That was the full map — now pick where we go deep first.
          </h2>
          <p className="mt-6 font-dm text-base leading-relaxed text-white/50 md:text-lg">
            Most teams do not need every lane on day one. Tell us what is blocking revenue,
            speed, or trust — we will sequence the build so each milestone is shippable.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-pink to-purple px-6 py-3 font-heading text-sm font-semibold text-white shadow-[0_0_40px_rgba(255,0,138,0.22)] transition-transform hover:-translate-y-0.5"
            >
              Book a scoping call
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-sm border border-white/[0.14] bg-white/[0.04] px-6 py-3 font-heading text-sm font-semibold text-white/90 transition-colors hover:border-pink/35"
            >
              See proof in work
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="flex flex-1 flex-col justify-center gap-4 lg:max-w-md"
        >
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-white/35">
            Capability lanes
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.12 + i * 0.06, ease }}
                className="group relative overflow-hidden rounded-sm border border-white/[0.08] bg-[#0a0a12]/90 p-5 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-pink/25"
              >
                <div
                  className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-pink to-purple opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
                <p className="font-heading text-lg font-bold text-white">{p.label}</p>
                <p className="mt-2 font-dm text-sm leading-relaxed text-white/45">
                  {p.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.15, ease }}
        className="relative mx-auto mt-20 max-w-[1200px] border-t border-white/[0.08] pt-12 md:mt-24 md:pt-16"
      >
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="text-left">
            <p className="font-heading text-4xl font-black text-transparent md:text-5xl" style={{
              backgroundImage: "linear-gradient(135deg, #ffffff, #ff008a 40%, #8b5cf6)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}>
              6+
            </p>
            <p className="mt-2 max-w-sm font-dm text-sm uppercase tracking-[0.22em] text-white/40">
              Integrated service verticals — mix, match, or phase them across quarters.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end md:w-auto">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent sm:hidden" />
            <p className="max-w-xs text-left font-dm text-sm text-white/45 sm:text-right">
              Prefer async? Drop a brief on the contact page — we reply with a concrete
              next step, not a calendar wall.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
