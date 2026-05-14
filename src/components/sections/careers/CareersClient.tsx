"use client";

import { type ReactElement, useRef, useEffect } from "react";
import { CareersHero } from "./CareersHero";
import { CareersForm } from "@/components/forms/CareersForm";
import { CareersFAQ } from "./CareersFAQ";
import { motion } from "framer-motion";
import { registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";

const view = {
  once: true,
  margin: "-12% 0px -8% 0px",
  amount: 0.2,
} as const;

export function CareersClient(): ReactElement {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative overflow-x-clip bg-bg">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35] careers-aurora"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.12] careers-grid-drift"
        aria-hidden
      />

      <CareersHero onStartClick={scrollToForm} />

      <section
        ref={formRef}
        id="application"
        className="scroll-mt-24 border-b border-white/[0.06] px-4 py-24 md:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-[800px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={view}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <p className="font-dm text-[0.7rem] font-medium uppercase tracking-[0.35em] text-pink">
              Application
            </p>
            <h2
              className="mt-3 font-heading font-black text-white"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}
            >
              Tell us who you are.
            </h2>
            <p className="mt-3 font-dm text-sm leading-relaxed text-white/45">
              This application will be sent directly to our hiring team. No automated filters.
            </p>
          </motion.div>

          <CareersForm />
        </div>
      </section>

      <CareersFAQ />
    </div>
  );
}
