"use client";

import { motion } from "framer-motion";
import type { ReactElement } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const view = { once: true, margin: "-80px" } as const;
const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease },
  viewport: view,
} as const;

const WONT_DO = [
  "We don't do rush jobs that compromise quality",
  "We don't take on projects we can't give full attention to",
  "We don't build generic templates and call it custom work",
  "We don't disappear after delivery — we are here for the long run",
] as const;

export function AboutWhatWeDontDoSection(): ReactElement {
  return (
    <section className="border-t border-white/[0.06] bg-bg px-4 py-32 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[800px] text-left">
        <motion.h2
          {...reveal}
          className="font-heading font-black text-white"
          style={{ fontSize: "2.5rem" }}
        >
          We&apos;re not for everyone.
        </motion.h2>
        <motion.p
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.06 }}
          className="mt-4 font-dm text-base text-[#9CA3AF]"
        >
          And that&apos;s intentional.
        </motion.p>
        <ul className="mt-12 space-y-6">
          {WONT_DO.map((line, i) => (
            <motion.li
              key={line}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 0.55, delay: i * 0.06, ease }}
              className="flex items-start gap-3 font-heading text-[1.1rem] text-white"
            >
              <span
                className="mt-0.5 shrink-0 font-bold text-[#ff008a]"
                style={{ marginRight: "12px" }}
                aria-hidden
              >
                ×
              </span>
              <span>{line}</span>
            </motion.li>
          ))}
        </ul>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.65, delay: 0.15, ease }}
          className="mt-14 font-dm text-base italic leading-relaxed text-[#9CA3AF]"
        >
          If you want a cheap, fast, template-based website — we&apos;re
          probably not your people. If you want a solution that actually works for
          your business, let&apos;s talk.
        </motion.p>
      </div>
    </section>
  );
}
