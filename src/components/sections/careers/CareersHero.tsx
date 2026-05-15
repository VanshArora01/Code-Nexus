"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type ReactElement } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const FOCUS_AREAS = [
  "AI automation",
  "Custom web development",
  "Chatbot integrations",
  "Workflow automation",
  "Machine learning solutions",
  "SEO & digital growth",
] as const;

interface CareersHeroProps {
  onStartClick: () => void;
}

export function CareersHero({ onStartClick }: CareersHeroProps): ReactElement {
  return (
    <section className="relative min-h-[88vh] border-b border-white/[0.06] px-4 pb-24 pt-28 md:px-6 lg:px-8 lg:pt-32">
      <div className="pointer-events-none absolute left-1/2 top-24 h-[min(70vw,480px)] w-[min(70vw,480px)] -translate-x-1/2 rounded-full blur-[120px] careers-orb" />
      <div className="relative mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease }}
          className="relative overflow-hidden rounded-sm border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-px"
        >
          <div className="relative bg-[#06060f]/90 px-6 py-16 backdrop-blur-xl md:px-14 md:py-20">
            <div className="careers-scanline pointer-events-none absolute inset-0 opacity-30" aria-hidden />
            <p className="font-dm text-[0.7rem] font-medium uppercase tracking-[0.38em] text-pink">
              Careers
            </p>
            <h1
              className="mt-6 max-w-[16ch] font-heading font-black tracking-tight text-white"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.75rem)", lineHeight: 1.02 }}
            >
              Build the{" "}
              <span className="bg-gradient-to-r from-pink via-white to-purple bg-clip-text text-transparent">
                future stack
              </span>{" "}
              with us.
            </h1>
            <p className="mt-8 max-w-2xl font-dm text-base leading-relaxed text-white/55 md:text-lg">
              The Code Nexus is a startup team obsessed with AI automation, custom web
              builds, chatbots, workflows, machine learning, and SEO-led growth.
              Use the form below to introduce yourself — we read every submission.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {FOCUS_AREAS.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.4, ease }}
                  className="rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-1.5 font-dm text-[0.72rem] tracking-wide text-white/60"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={onStartClick}
                className="group inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-pink to-purple px-6 py-3 font-heading text-sm font-semibold text-white shadow-[0_0_40px_rgba(255,0,138,0.25)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(255,0,138,0.35)]"
              >
                Start application
                <span className="transition-transform group-hover:translate-x-0.5">↓</span>
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-sm border border-white/[0.14] bg-white/[0.03] px-6 py-3 font-heading text-sm font-semibold text-white/90 transition-colors hover:border-pink/40 hover:text-white"
              >
                Partner inquiry
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
