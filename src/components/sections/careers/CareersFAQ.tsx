"use client";

import { motion, AnimatePresence } from "framer-motion";
import { type ReactElement, useState } from "react";
import { CAREER_FAQ } from "@/lib/content/careers-data";

const ease = [0.22, 1, 0.36, 1] as const;

export function CareersFAQ(): ReactElement {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-4 py-24 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[800px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="font-dm text-[0.7rem] font-medium uppercase tracking-[0.35em] text-pink">
            FAQ
          </p>
          <h2
            className="mt-3 font-heading font-black text-white"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}
          >
            Frequent questions.
          </h2>
        </motion.div>

        <div className="mt-12 space-y-4">
          {CAREER_FAQ.map((item, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-sm border border-white/[0.06] bg-white/[0.02] transition-colors hover:border-white/[0.1]"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-heading text-sm font-semibold text-white/90">
                  {item.q}
                </span>
                <span
                  className={`text-lg transition-transform duration-300 ${
                    openIndex === i ? "rotate-45 text-pink" : "text-white/30"
                  }`}
                >
                  +
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="font-dm text-sm leading-relaxed text-white/45">
                        {item.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
