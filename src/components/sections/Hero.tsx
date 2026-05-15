"use client";

import { type ReactElement } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import * as analytics from "@/lib/analytics";

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const gradientTextStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #ff008a, #d946ef 48%, #8b5cf6)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const ctaPrimaryClass =
  "inline-flex min-h-[48px] min-w-[160px] items-center justify-center rounded-md bg-gradient-to-r from-pink via-fuchsia to-purple px-7 py-3.5 text-center font-dm text-sm font-semibold tracking-wide text-white shadow-glow-pink transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_56px_rgba(255,0,138,0.35)] active:translate-y-0";

const ctaGhostClass =
  "inline-flex min-h-[48px] min-w-[160px] items-center justify-center rounded-md border border-white/[0.14] bg-white/[0.03] px-7 py-3.5 text-center font-dm text-sm font-medium tracking-wide text-white backdrop-blur-sm transition-[border-color,background-color] duration-200 hover:border-pink/40 hover:bg-white/[0.06]";

export default function Hero(): ReactElement {
  return (
    <section id="home" className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-bg pt-20 md:min-h-screen">
      <h1 className="sr-only">
        The Code Nexus — AI automation and web solutions for scaling businesses.
      </h1>

      {/* Lightweight Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      {/* Lightweight Glow Orbs (CSS Only, No JS animation overhead) */}
      <div
        className="pointer-events-none absolute left-1/2 top-[-10%] z-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-60 blur-[80px] md:h-[800px] md:w-[800px]"
        style={{
          background: "radial-gradient(circle, rgba(255,0,138,0.15) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[-10%] right-[-10%] z-0 h-[400px] w-[400px] rounded-full opacity-40 blur-[60px]"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      {/* Main Content */}
      <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center px-4 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-white/20 md:w-12" />
          <span className="font-dm text-[0.65rem] uppercase tracking-[0.3em] text-white/50 md:text-[0.75rem]">
            The Code Nexus
          </span>
          <span className="h-px w-8 bg-white/20 md:w-12" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: easeOutExpo }}
          className="font-heading font-black tracking-tight text-white"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)", lineHeight: 1.05 }}
        >
          BUILD DIGITAL <br className="hidden md:block" />
          SYSTEMS THAT <span style={gradientTextStyle}>SCALE</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
          className="mx-auto mt-6 max-w-[36rem] font-dm text-[0.95rem] leading-relaxed text-white/60 md:mt-8 md:text-[1.1rem]"
        >
          AI automation, high-performance web solutions, and bespoke scalable architectures
          engineered for global businesses.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 font-dm text-[0.65rem] uppercase tracking-[0.2em] text-white/30 md:mt-8 md:text-[0.7rem]"
        >
          5+ projects · AI-first delivery · Performance optimized
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: easeOutExpo }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 md:mt-10"
        >
          <Link
            href="/contact"
            onClick={() => {
              analytics.event({
                action: "hero_cta_click",
                category: "Engagement",
                label: "Book a Consultation",
              });
            }}
            className={ctaPrimaryClass}
          >
            Book a Consultation
          </Link>
          <Link
            href="/services"
            onClick={() => {
              analytics.event({
                action: "hero_cta_click",
                category: "Engagement",
                label: "Explore Solutions",
              });
            }}
            className={ctaGhostClass}
          >
            Explore Solutions
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
