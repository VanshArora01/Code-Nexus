"use client";

import { type ReactElement } from "react";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE_EMAIL, SITE_SOCIAL } from "@/lib/site-social";

export function ContactClient(): ReactElement {
  const socialRow = (
    [
      { label: "LinkedIn", href: SITE_SOCIAL.linkedin },
      { label: "Instagram", href: SITE_SOCIAL.instagram },
      { label: "WhatsApp", href: SITE_SOCIAL.whatsappCommunity },
    ] as const
  ).map((s) => (
    <Link
      key={s.label}
      href={s.href}
      target="_blank"
      rel="noreferrer"
      className="group/soc inline-flex items-center gap-1 font-dm text-sm text-white transition-colors hover:text-pink"
    >
      {s.label}
      <span className="transition-transform duration-300 group-hover/soc:translate-x-0.5">
        ↗
      </span>
    </Link>
  ));

  return (
    <div className="relative flex min-h-[calc(100dvh-4rem)] flex-col md:flex-row">
      <div
        className="pointer-events-none absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-pink/60 via-purple/40 to-transparent md:block"
        style={{ left: "50%" }}
        aria-hidden
      />
      
      {/* Left Column: Content */}
      <div className="relative flex flex-1 flex-col justify-center overflow-hidden bg-[#050505] px-6 py-20 md:px-12 lg:px-20 lg:py-24">
        <div
          className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full blur-[90px]"
          style={{
            background: "radial-gradient(circle, rgba(255,0,138,0.18), transparent 70%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full blur-[80px]"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.14), transparent 70%)",
          }}
          aria-hidden
        />
        
        <p className="relative font-dm text-[0.7rem] font-medium uppercase tracking-[0.35em] text-pink">
          Get in touch
        </p>
        <h1
          className="relative mt-6 font-heading font-black leading-[1.05] text-white"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          Let&apos;s build something together.
        </h1>
        <p className="relative mt-4 max-w-md font-dm text-base leading-[1.7] text-[#9CA3AF]">
          Tell us what you&apos;re building. No long forms, no automated
          responses — just a real conversation about your project.
        </p>

        <div className="relative mt-14 flex flex-col gap-10">
          <div>
            <p className="font-dm text-[0.65rem] uppercase tracking-[0.2em] text-[#9CA3AF]">
              Email
            </p>
            <a
              href={SITE_SOCIAL.email}
              className="group/gl relative mt-2 inline-block font-dm text-[1.1rem] font-medium text-white transition-colors duration-300"
            >
              <span className="group-hover/gl:text-pink">
                {SITE_EMAIL}
              </span>
            </a>
          </div>
          <div>
            <p className="font-dm text-[0.65rem] uppercase tracking-[0.2em] text-[#9CA3AF]">
              Community
            </p>
            <a
              href={SITE_SOCIAL.whatsappCommunity}
              target="_blank"
              rel="noreferrer"
              className="group/wa relative mt-2 inline-block font-dm text-[1.05rem] font-medium text-white transition-colors duration-300"
            >
              <span className="group-hover/wa:text-pink">
                Join The Code Nexus WhatsApp
              </span>
            </a>
          </div>
          <div>
            <p className="font-dm text-[0.65rem] uppercase tracking-[0.2em] text-[#9CA3AF]">
              Based in
            </p>
            <p className="mt-2 font-dm text-[1.1rem] text-white">
              Ludhiana, India · Available Worldwide
            </p>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-2">
          <div className="h-2 w-2 shrink-0 rounded-full bg-[#22c55e] animate-pulse" aria-hidden />
          <span className="font-dm text-[0.8rem] uppercase tracking-[0.15em] text-white/50">
            Currently taking new projects
          </span>
        </div>

        <div className="mt-auto pt-20">
          <p className="font-dm text-[0.65rem] uppercase tracking-[0.2em] text-[#9CA3AF]">
            Follow the build
          </p>
          <div className="mt-4 flex flex-wrap gap-6">{socialRow}</div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="relative flex flex-1 flex-col justify-center border-t border-white/[0.06] bg-[#0b0b14] px-6 py-20 md:border-t-0 md:px-12 lg:px-20 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden
        />
        <ContactForm />
      </div>
    </div>
  );
}
