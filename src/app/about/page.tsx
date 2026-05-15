import type { Metadata } from "next";
import type { ReactElement } from "react";

import { AboutMetricsSection } from "@/components/sections/AboutMetricsSection";
import { AboutWhatWeDontDoSection } from "@/components/sections/AboutExtraSections";
import { PageHero } from "@/components/pages/PageHero";

export const metadata: Metadata = {
  title: "About | Developer-Led Agency in Ludhiana",
  description:
    "The Code Nexus is a developer-led agency in Ludhiana building AI-powered websites, chatbots, and automation pipelines for businesses worldwide.",
  alternates: {
    canonical: "/about",
  },
};

const STACK_A =
  "Next.js · TypeScript · Node.js · MongoDB · FastAPI · Python · GSAP · Framer Motion · Groq · Gemini · n8n · Brevo · Razorpay ·";

const VALUES = [
  "We ship. No endless revisions, no scope creep. We define, build, deliver.",
  "We're engineers, not order-takers. We tell you when your idea needs rethinking.",
  "AI isn't a feature to us. It's how we approach every problem from the start.",
] as const;

export default function AboutPage(): ReactElement {
  return (
    <>
      <PageHero
        title={"We're The Code Nexus"}
        subtitle="A small team of engineers who build AI-powered digital products."
        minHeightClass="md:min-h-[50vh]"
      />

      <section className="border-t border-white/[0.06] bg-bg px-4 py-16 md:py-32 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-14 md:grid-cols-2 md:gap-16">
          <blockquote
            className="border-l-[3px] border-pink pl-8 text-left font-heading text-white"
            style={{ fontSize: "1.6rem", lineHeight: 1.5 }}
          >
            We started The Code Nexus because most agencies deliver slow, generic
            websites. We wanted to build something different — products that
            actually think.
          </blockquote>
          <div className="text-left font-dm text-base leading-relaxed text-[#9CA3AF]">
            <p>
              We&apos;re a developer-led agency based in Ludhiana, India. We
              specialize in Next.js websites, AI chatbot integrations, and
              business automation using n8n, Zapier, and custom APIs.
            </p>
            <p className="mt-6">
              Every project we take on is treated like our own product — with
              clear ownership, tight feedback loops, and engineering discipline
              from day one.
            </p>
          </div>
        </div>
      </section>

      <AboutWhatWeDontDoSection />

      <AboutMetricsSection />

      <section className="border-t border-white/[0.06] bg-bg px-4 py-16 md:py-32 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <h2
            className="text-left font-heading font-bold text-white"
            style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)" }}
          >
            Our stack
          </h2>
          <div className="mt-10 space-y-4 overflow-hidden">
            <div className="relative overflow-hidden">
              <div className="marquee-track gap-10 font-dm text-sm uppercase tracking-[0.35em] text-[#9CA3AF]">
                <span className="whitespace-nowrap">{STACK_A}</span>
                <span className="whitespace-nowrap" aria-hidden>
                  {STACK_A}
                </span>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <div className="marquee-track-reverse gap-10 font-dm text-sm uppercase tracking-[0.35em] text-[#9CA3AF]">
                <span className="whitespace-nowrap">{STACK_A}</span>
                <span className="whitespace-nowrap" aria-hidden>
                  {STACK_A}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-[#0c0606] px-4 py-16 md:py-32 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px] space-y-10 text-left md:px-0">
          {VALUES.map((text, i) => (
            <p
              key={text}
              className="font-dm text-white"
              style={{ fontSize: "1.4rem", lineHeight: 1.45 }}
            >
              <span
                className="font-heading font-black text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #ff008a, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                0{i + 1}
              </span>
              <span className="text-white/40"> — </span>
              {text}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
