"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { ReactElement } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const view = { once: true, margin: "-80px" } as const;
const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease },
  viewport: view,
} as const;

const STEPS = [
  {
    n: "01",
    title: "Discover",
    desc: "Scope, constraints, and a plan you can ship against.",
  },
  {
    n: "02",
    title: "Build",
    desc: "Engineering sprints with tight feedback and visibility.",
  },
  {
    n: "03",
    title: "Launch",
    desc: "Hardening, handoff, and iteration on real usage.",
  },
] as const;

export function HomeHowItWorks(): ReactElement {
  return (
    <section className="border-t border-white/[0.06] bg-bg px-4 py-32 md:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1200px] gap-14 md:grid-cols-[40%_60%] md:gap-16">
        <motion.div {...reveal} className="text-left">
          <p className="font-dm text-[0.7rem] font-medium uppercase tracking-[0.35em] text-pink">
            The process
          </p>
          <h2
            className="mt-5 font-heading font-black leading-[1.15] text-white"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
          >
            Three steps from idea to live product.
          </h2>
          <p className="mt-6 max-w-md font-dm text-base leading-relaxed text-[#9CA3AF]">
            We move fast without cutting corners. Most projects are live within
            2-4 weeks.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-3 py-1.5 font-dm text-[0.7rem] text-[#9CA3AF] transition-colors hover:border-pink/40">
            <Clock className="h-3.5 w-3.5 shrink-0 text-pink" aria-hidden />
            Average delivery: 2–4 weeks
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.08 }}
          className="relative"
        >
          <div className="hidden items-stretch md:flex">
            {STEPS.map((s, i) => (
              <div key={s.n} className="flex min-w-0 flex-1 items-center">
                {i > 0 ? (
                  <div
                    className="mx-4 h-px w-[60px] shrink-0 self-center bg-gradient-to-r from-[#ff008a] to-[#8b5cf6]"
                    aria-hidden
                  />
                ) : null}
                <div className="min-w-0 flex-1 text-left">
                  <span
                    className="font-heading font-black leading-none text-transparent"
                    style={{
                      fontSize: "4rem",
                      backgroundImage:
                        "linear-gradient(135deg, #ff008a, #8b5cf6)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    {s.n}
                  </span>
                  <p className="mt-3 font-heading text-[1.1rem] font-semibold text-white">
                    {s.title}
                  </p>
                  <p className="mt-2 font-dm text-[0.85rem] leading-snug text-[#9CA3AF]">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative flex flex-col gap-10 pl-10 md:hidden">
            <div
              className="absolute bottom-2 left-[15px] top-2 w-px bg-white/10"
              aria-hidden
            />
            {STEPS.map((s) => (
              <div key={s.n} className="relative text-left">
                <span
                  className="absolute -left-[26px] top-1 h-2 w-2 rounded-full bg-gradient-to-br from-[#ff008a] to-[#8b5cf6]"
                  aria-hidden
                />
                <span
                  className="font-heading font-black text-transparent"
                  style={{
                    fontSize: "3rem",
                    backgroundImage: "linear-gradient(135deg, #ff008a, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  {s.n}
                </span>
                <p className="mt-1 font-heading text-[1.05rem] font-semibold text-white">
                  {s.title}
                </p>
                <p className="mt-2 font-dm text-[0.85rem] text-[#9CA3AF]">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const PILL_HOVER =
  "rounded-full border border-white/[0.1] px-5 py-2 font-dm text-[0.8rem] text-[#9CA3AF] transition-[border-color,color] duration-300 hover:border-[rgba(255,0,138,0.4)] hover:text-white/80";

export function HomeTechApproach(): ReactElement {
  const statements = [
    {
      text: "We don't build templates.",
      className:
        "font-heading font-black text-white",
      style: { fontSize: "clamp(2.5rem, 5vw, 5rem)" } as const,
    },
    {
      text: "We engineer infrastructure tailored to how your business actually works.",
      className: "font-heading font-bold text-white/50",
      style: { fontSize: "clamp(1.5rem, 3vw, 2.8rem)" } as const,
    },
    {
      text: "AI-first. Code-obsessed. Results-driven.",
      className: "font-heading font-black text-transparent",
      style: {
        fontSize: "clamp(2rem, 4vw, 4rem)",
        backgroundImage: "linear-gradient(135deg, #ff008a, #8b5cf6)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
      } as const,
    },
  ] as const;

  return (
    <section className="border-t border-white/[0.06] bg-bg px-4 py-32 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1100px] text-center">
        <motion.p
          {...reveal}
          className="font-dm text-[0.7rem] font-medium uppercase tracking-[0.35em] text-pink"
        >
          Why The Code Nexus
        </motion.p>
        <div className="mt-12 space-y-10 md:space-y-12">
          {statements.map((s, i) => (
            <motion.p
              key={s.text}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 0.65, delay: i * 0.12, ease }}
              className={`leading-[1.1] ${s.className}`}
              style={s.style}
            >
              {s.text}
            </motion.p>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.65, delay: 0.2, ease }}
          className="mx-auto mt-14 h-px max-w-3xl bg-white/[0.08]"
          aria-hidden
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.65, delay: 0.28, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <span className={PILL_HOVER}>⚡ Ships in weeks, not months</span>
          <span className={PILL_HOVER}>🤖 AI built-in from day one</span>
          <span className={PILL_HOVER}>📈 Measurable ROI</span>
        </motion.div>
      </div>
    </section>
  );
}
