"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactElement } from "react";
import { WORK_BENTO_PROJECTS } from "@/lib/content/projects-data";
import * as analytics from "@/lib/analytics";

const ease = [0.22, 1, 0.36, 1] as const;
const view = { once: true, margin: "-80px" } as const;

const ROW1_PARTS = [
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "FastAPI",
  "Groq AI",
  "Gemini",
] as const;

const ROW2_PARTS = [
  "n8n Automation",
  "Brevo SMTP",
  "Razorpay",
  "WebSockets",
  "REST APIs",
  "GSAP",
] as const;

function Dot(): ReactElement {
  return (
    <span className="mx-3 text-[rgba(255,0,138,0.5)]" aria-hidden>
      ·
    </span>
  );
}

function MarqueeHalf({ parts }: { parts: readonly string[] }): ReactElement {
  return (
    <>
      {[0, 1, 2].map((cycle) => (
        <span key={cycle} className="inline-flex shrink-0 items-center">
          {cycle > 0 ? <Dot /> : null}
          {parts.map((p, i) => (
            <span key={`${cycle}-${p}`} className="inline-flex items-center">
              {i > 0 ? <Dot /> : null}
              <span>{p}</span>
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

export function HomeTrustMarquee(): ReactElement {
  return (
    <div className="border-y border-white/[0.06] bg-bg py-5">
      <div className="overflow-hidden">
        <div className="trust-marquee-l gap-0 font-dm text-[0.75rem] font-medium uppercase tracking-[0.2em] text-[rgba(255,255,255,0.25)]">
          <MarqueeHalf parts={ROW1_PARTS} />
          <MarqueeHalf parts={ROW1_PARTS} />
        </div>
      </div>
      <div className="overflow-hidden border-t border-white/[0.06]">
        <div className="trust-marquee-r gap-0 font-dm text-[0.75rem] font-medium uppercase tracking-[0.2em] text-[rgba(255,255,255,0.25)]">
          <MarqueeHalf parts={ROW2_PARTS} />
          <MarqueeHalf parts={ROW2_PARTS} />
        </div>
      </div>
    </div>
  );
}

const SERVICE_BLOCKS = [
  { title: "Custom Websites", tag: "Build" },
  { title: "AI Chatbots", tag: "Automate" },
  { title: "Workflow Systems", tag: "Scale" },
  { title: "SEO & Growth", tag: "Rank" },
] as const;

export function HomeServicesShowcase(): ReactElement {
  return (
    <section className="border-t border-white/[0.06] bg-bg py-32">
      <div className="mx-auto grid max-w-[1200px] gap-14 px-4 md:grid-cols-[45%_55%] md:gap-12 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.65, ease }}
          className="text-left"
        >
          <p className="font-dm text-[0.7rem] font-medium uppercase tracking-[0.35em] text-pink">
            What we build
          </p>
          <h2
            className="mt-5 font-heading font-black leading-[1.1] text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Systems that ship —
            <br />
            websites, AI, automation.
          </h2>
          <p className="mt-6 max-w-md font-dm text-base leading-relaxed text-[#9CA3AF]">
            From Ludhiana to clients worldwide — we engineer Next.js
            experiences, grounded chatbots, and workflow infrastructure you can
            operate with confidence.
          </p>
          <Link
            href="/services"
            onClick={() => {
              analytics.event({
                action: "home_content_link_click",
                category: "Engagement",
                label: "Explore all services",
              });
            }}
            className="group/ex mt-8 inline-flex items-center gap-2 font-heading text-sm font-semibold text-pink transition-colors hover:text-white"
          >
            Explore all services
            <span className="transition-transform duration-300 group-hover/ex:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.65, delay: 0.08, ease }}
          className="grid grid-cols-2 border border-white/[0.06] [&>div]:border-b [&>div]:border-r [&>div]:border-white/[0.06] [&>div:nth-child(2n)]:border-r-0 [&>div:nth-child(n+3)]:border-b-0"
        >
          {SERVICE_BLOCKS.map((b) => (
            <div
              key={b.title}
              className="group/cell relative p-6 transition-colors duration-300 hover:bg-[rgba(255,0,138,0.04)] md:p-8"
            >
              <span
                className="absolute bottom-0 left-0 top-0 w-0 bg-pink transition-[width] duration-300 ease-out group-hover/cell:w-0.5"
                aria-hidden
              />
              <h3 className="pl-0 font-heading text-[1.3rem] font-semibold text-white transition-[padding] duration-300 group-hover/cell:pl-1">
                {b.title}
              </h3>
              <p className="mt-2 font-dm text-[0.75rem] uppercase tracking-[0.15em] text-[#9CA3AF]">
                {b.tag}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const TERMINAL_LINES = [
  { cmd: "next build — production" },
  { cmd: "n8n workflow · deploy hooks" },
  { cmd: "groq stream · guardrails on" },
  { cmd: "vercel ship — edge ok" },
] as const;

const FEATURE_VELOCITY_TICKER_PARTS = [
  "deploy.local",
  "next build — production",
  "n8n workflow · deploy hooks",
  "groq stream · guardrails on",
  "vercel ship — edge ok",
  "session ready — awaiting your next lane",
] as const;

export function HomeFeaturedWork(): ReactElement {
  const featured = WORK_BENTO_PROJECTS[0];

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#030208] py-28 md:py-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 15% 40%, rgba(255,0,138,0.12), transparent 50%), radial-gradient(ellipse 50% 45% at 90% 60%, rgba(139,92,246,0.1), transparent 45%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={view}
            transition={{ duration: 0.6, ease }}
          >
            <p className="font-dm text-[0.7rem] font-medium uppercase tracking-[0.35em] text-pink">
              Featured build
            </p>
            <h2
              className="mt-4 font-heading font-black leading-none text-white"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              Latest launch.
            </h2>
          </motion.div>
          <Link
            href="/work"
            onClick={() => {
              analytics.event({
                action: "home_content_link_click",
                category: "Engagement",
                label: "View all work",
              });
            }}
            className="group flex items-center gap-3 font-heading text-xs font-bold uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
          >
            View all work
            <span className="h-px w-8 bg-white/20 transition-all group-hover:w-12 group-hover:bg-pink" />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.8, ease }}
          className="group relative overflow-hidden rounded-sm border border-white/[0.08] bg-[#08080f]/90 p-8 md:p-14 lg:p-20"
        >
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-pink/5 via-transparent to-purple/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          
          <div className="relative z-10 grid gap-12 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-2xl">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-pink">
                {featured.projectType}
              </span>
              <h3 className="mt-4 font-heading text-3xl font-bold text-white md:text-5xl lg:text-6xl">
                {featured.name}
              </h3>
              <p className="mt-6 font-dm text-lg leading-relaxed text-white/50">
                {featured.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {featured.tags.map(tag => (
                  <span key={tag} className="border border-white/10 bg-white/5 px-3 py-1 font-dm text-xs text-white/40">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={featured.href}
                target={featured.external ? "_blank" : "_self"}
                className="mt-12 inline-flex items-center gap-4 rounded-sm bg-white px-8 py-4 font-heading text-xs font-bold uppercase tracking-widest text-black transition-transform hover:-translate-y-1 active:translate-y-0"
              >
                Explore Project
                <span>→</span>
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white/10 font-heading text-6xl font-black text-white/5">
                {featured.number}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
