"use client";

import { type ReactElement, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import * as analytics from "@/lib/analytics";

import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";

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

function HeroBackground(): ReactElement {
  return (
    <>
      {/* Layer 1: Far Grid */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: 0.6,
        }}
      />
      {/* Layer 2: Near Grid */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "120px 120px",
          opacity: 0.5,
        }}
      />

      {/* Glow Orbs */}
      <div
        className="pointer-events-none absolute left-1/2 top-[-200px] z-[3] h-[700px] w-[700px] -translate-x-1/2 rounded-full blur-[40px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,0,138,0.12) 0%, rgba(255,0,138,0.04) 40%, transparent 70%)",
          animation: "breathe 6s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-[-150px] left-[-100px] z-[3] h-[600px] w-[600px] rounded-full blur-[50px] hidden md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(139,92,246,0.03) 45%, transparent 70%)",
          animation: "breatheSlow 8s ease-in-out infinite",
          animationDelay: "-3s",
        }}
      />
      <div
        className="pointer-events-none absolute right-[-80px] top-[30%] z-[3] h-[350px] w-[350px] rounded-full blur-[30px] hidden md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(255,0,138,0.08) 0%, transparent 65%)",
          animation: "breatheFast 5s ease-in-out infinite",
          animationDelay: "-1.5s",
        }}
      />



      {/* Floating Particles - only render on desktop */}
      {typeof window !== "undefined" && window.innerWidth >= 768 && [
        {
          top: "75%",
          left: "12%",
          size: "3px",
          color: "rgba(255,0,138,0.5)",
          dur: "7s",
          delay: "0s",
          drift: "8px",
        },
        {
          top: "60%",
          left: "25%",
          size: "2px",
          color: "rgba(139,92,246,0.4)",
          dur: "9s",
          delay: "1s",
          drift: "-5px",
        },
        {
          top: "80%",
          left: "38%",
          size: "4px",
          color: "rgba(255,0,138,0.35)",
          dur: "6s",
          delay: "2s",
          drift: "10px",
        },
        {
          top: "65%",
          left: "52%",
          size: "2px",
          color: "rgba(139,92,246,0.5)",
          dur: "8s",
          delay: "0.5s",
          drift: "-8px",
        },
        {
          top: "70%",
          left: "65%",
          size: "3px",
          color: "rgba(255,0,138,0.4)",
          dur: "7s",
          delay: "3s",
          drift: "6px",
        },
        {
          top: "55%",
          left: "78%",
          size: "2px",
          color: "rgba(139,92,246,0.35)",
          dur: "10s",
          delay: "1.5s",
          drift: "-4px",
        },
        {
          top: "85%",
          left: "88%",
          size: "4px",
          color: "rgba(255,0,138,0.3)",
          dur: "6s",
          delay: "4s",
          drift: "12px",
        },
        {
          top: "40%",
          left: "8%",
          size: "2px",
          color: "rgba(139,92,246,0.4)",
          dur: "9s",
          delay: "2.5s",
          drift: "-6px",
        },
        {
          top: "50%",
          left: "90%",
          size: "3px",
          color: "rgba(255,0,138,0.45)",
          dur: "7s",
          delay: "0.8s",
          drift: "7px",
        },
        {
          top: "72%",
          left: "45%",
          size: "2px",
          color: "rgba(139,92,246,0.3)",
          dur: "8s",
          delay: "3.5s",
          drift: "-9px",
        },
        {
          top: "62%",
          left: "70%",
          size: "3px",
          color: "rgba(255,0,138,0.35)",
          dur: "6s",
          delay: "1.2s",
          drift: "5px",
        },
        {
          top: "78%",
          left: "30%",
          size: "2px",
          color: "rgba(139,92,246,0.45)",
          dur: "9s",
          delay: "4.5s",
          drift: "-7px",
        },
      ].map((p, i) => (
        <div
          key={i}
          className="pointer-events-none absolute rounded-full blur-[0.5px] z-[5]"
          style={
            {
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              background: p.color,
              animation: `floatUp ${p.dur} ease-in ${p.delay} infinite`,
              "--drift": p.drift,
            } as any
          }
        />
      ))}

      {/* Corner Accents */}
      <div className="pointer-events-none absolute left-[24px] top-[24px] z-[6] h-[40px] w-[40px] border-l border-t border-[rgba(255,0,138,0.25)] hidden md:block" />
      <div className="pointer-events-none absolute right-[24px] top-[24px] z-[6] h-[40px] w-[40px] border-r border-t border-[rgba(139,92,246,0.25)] hidden md:block" />
      <div className="pointer-events-none absolute bottom-[24px] left-[24px] z-[6] h-[40px] w-[40px] border-b border-l border-[rgba(139,92,246,0.2)] hidden md:block" />
      <div className="pointer-events-none absolute bottom-[24px] right-[24px] z-[6] h-[40px] w-[40px] border-b border-r border-[rgba(255,0,138,0.2)] hidden md:block" />

    </>
  );
}

export default function Hero(): ReactElement {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();

    const wrapper = wrapperRef.current;
    const topHalf = topHalfRef.current;
    const bottomHalf = bottomHalfRef.current;
    if (!wrapper || !topHalf || !bottomHalf) return;

    const ctx = gsap.context(() => {
      // Performance: Only run split pinning on desktop
      const isDesktop = window.innerWidth >= 768;
      
      if (isDesktop) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "+=130%",
            scrub: 0.35,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          topHalf,
          { yPercent: -100, ease: "none", duration: 1, force3D: true },
          0
        );
        tl.to(
          bottomHalf,
          { yPercent: 100, ease: "none", duration: 1, force3D: true },
          0
        );
      }
    }, wrapper);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="home" className="scroll-mt-0">
      <h1 className="sr-only">
        Build digital products — AI automation and web solutions for
        scaling businesses.
      </h1>

      {/* Split hero (responsive for both desktop and mobile) */}
      <div
        ref={wrapperRef}
        className="relative h-[100dvh] w-full overflow-hidden md:h-screen"
      >
        {/* New Revealed Section Design */}
        <div
          id="services-behind"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            background: '#0D0A14',      // warmer dark: different from hero
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* vertical accent line LEFT edge */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: '20%',
            width: '3px',
            height: '60%',
            background: 'linear-gradient(to bottom, #ff008a, #8b5cf6, transparent)',
            pointerEvents: 'none',
          }} />

          {/* 3D Kinetic Composition — Right Aligned */}
          <div
            className="hidden lg:flex"
            style={{
              position: 'absolute',
              right: '10vw',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '500px',
              height: '500px',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            {/* Animation Wrapper to separate positioning from floating */}
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'floatCube 8s ease-in-out infinite',
            }}>
              {/* Outer Perspective Layer */}
              <div
                style={{
                  width: '240px',
                  height: '240px',
                  position: 'relative',
                  perspective: '1200px',
                }}
              >
              {/* Outer Wireframe Cube */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  animation: 'rotateCube 18s linear infinite',
                }}
              >
                {/* 6 faces of the outer cube */}
                {['rotateY(0deg)', 'rotateY(180deg)', 'rotateY(-90deg)', 'rotateY(90deg)', 'rotateX(90deg)', 'rotateX(-90deg)'].map((transform, i) => (
                  <div key={i} style={{
                    position: 'absolute',
                    inset: 0,
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: i % 2 === 0 ? 'rgba(255,0,138,0.02)' : 'rgba(139,92,246,0.02)',
                    transform: `${transform} translateZ(110px)`,
                    boxShadow: 'inset 0 0 30px rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(1px)',
                    animation: 'edgeGlow 4s ease-in-out infinite',
                    animationDelay: `${i * 0.5}s`,
                  }} />
                ))}

                {/* Inner Nested Cube — counter-rotating */}
                <div
                  style={{
                    position: 'absolute',
                    top: '25%',
                    left: '25%',
                    width: '50%',
                    height: '50%',
                    transformStyle: 'preserve-3d',
                    animation: 'rotateInner 10s linear infinite',
                  }}
                >
                  {['rotateY(0deg)', 'rotateY(180deg)', 'rotateY(-90deg)', 'rotateY(90deg)', 'rotateX(90deg)', 'rotateX(-90deg)'].map((transform, i) => (
                    <div key={i} style={{
                      position: 'absolute',
                      inset: 0,
                      border: '1px solid rgba(255,0,138,0.4)',
                      background: 'rgba(255,0,138,0.05)',
                      transform: `${transform} translateZ(55px)`,
                    }} />
                  ))}
                </div>
              </div>

              {/* Glowing Core Sphere (CSS hack) */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '60px',
                height: '60px',
                marginTop: '-30px',
                marginLeft: '-30px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #fff 0%, #ff008a 30%, #8b5cf6 70%)',
                boxShadow: '0 0 40px #ff008a, 0 0 80px rgba(139,92,246,0.6)',
                zIndex: 10,
                animation: 'corePulse 3s ease-in-out infinite',
              }} />
            </div>

            {/* Energy Expansion Rings */}
            {[0, 1, 2].map((i) => (
              <div key={i} style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                border: '1px solid rgba(255,0,138,0.3)',
                borderRadius: '50%',
                pointerEvents: 'none',
                animation: 'energyRing 4s cubic-bezier(0, 0, 0.2, 1) infinite',
                animationDelay: `${i * 1.3}s`,
              }} />
            ))}

            {/* Data Stream Particles */}
            {[
              { left: '22%', delay: '0s' },
              { left: '35%', delay: '0.8s' },
              { left: '48%', delay: '1.5s' },
              { left: '62%', delay: '0.3s' },
              { left: '75%', delay: '2.2s' },
              { left: '28%', delay: '1.1s' },
              { left: '55%', delay: '0.6s' },
              { left: '42%', delay: '1.9s' },
            ].map((p, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: p.left,
                width: '1px',
                height: '40px',
                background: 'linear-gradient(to bottom, transparent, #ff008a, transparent)',
                animation: 'dataStream 3s linear infinite',
                animationDelay: p.delay,
                opacity: 0.4,
              }} />
            ))}

            {/* Orbiting Elements */}
            <div style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              border: '1px dashed rgba(255,255,255,0.05)',
              animation: 'rotateCube 25s linear infinite reverse',
            }}>
               <div style={{
                 position: 'absolute',
                 top: '-5px',
                 left: '50%',
                 width: '10px',
                 height: '10px',
                 background: '#ff008a',
                 borderRadius: '50%',
                 boxShadow: '0 0 15px #ff008a',
               }} />
            </div>

            {/* Background Atmosphere — deeper and more atmospheric */}
            <div style={{
              position: 'absolute',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(255,0,138,0.15) 0%, rgba(139,92,246,0.08) 40%, transparent 75%)',
              filter: 'blur(60px)',
              zIndex: -1,
              opacity: 0.8,
            }} />
            </div>
          </div>

          {/* bottom-right glow orb */}
          <div style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 65%)',
            pointerEvents: 'none',
            filter: 'blur(30px)',
          }} />

          {/* Main content block — LEFT aligned */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            paddingLeft: 'clamp(20px, 6vw, 120px)',
            paddingRight: 'clamp(20px, 4vw, 40px)',
            paddingTop: '0',
            paddingBottom: '0',
            maxWidth: '560px',
          }}>
            {/* Top label */}
            <p style={{
              fontSize: '0.65rem',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: 'rgba(255,0,138,0.7)',
              marginBottom: '14px',
              fontFamily: 'var(--font-dm-sans)',
            }}>
              WHAT HAPPENS NEXT
            </p>

            {/* Large statement — 2 lines, left aligned */}
            <h2 style={{
              fontSize: 'clamp(1.6rem, 5vw, 3.8rem)',
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              fontFamily: 'var(--font-space-grotesk)',
              marginBottom: '32px',
            }}>
              <span style={{ color: '#ffffff', display: 'block' }}>
                Solutions crafted
              </span>
              <span style={{
                display: 'block',
                background: 'linear-gradient(135deg, #ff008a 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                to outlast trends.
              </span>
            </h2>

            {/* 3 horizontal service lines */}
            {[
              { n: '01', name: 'Web Development', hint: 'Next.js · TypeScript · SEO' },
              { n: '02', name: 'AI Automation', hint: 'Chatbots · Workflows · APIs' },
              { n: '03', name: 'Digital Growth', hint: 'SEO · CRM · Analytics' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: 'clamp(8px, 2vw, 11px) 0',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                ...(i === 2 ? { borderBottom: '1px solid rgba(255,255,255,0.06)' } : {}),
              }}>
                <span style={{
                  fontSize: '0.65rem',
                  color: '#ff008a',
                  fontFamily: 'var(--font-space-grotesk)',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  minWidth: '24px',
                }}>
                  {item.n}
                </span>
                <span style={{
                  fontSize: 'clamp(0.85rem, 3vw, 1rem)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-space-grotesk)',
                  fontWeight: 600,
                  flex: 1,
                }}>
                  {item.name}
                </span>
                <span style={{
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.3)',
                  fontFamily: 'var(--font-dm-sans)',
                  letterSpacing: '0.08em',
                }}>
                  {item.hint}
                </span>
              </div>
            ))}

            {/* Bottom CTA link */}
            <Link href="/services" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '20px',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontFamily: 'var(--font-dm-sans)',
              transition: 'color 0.2s ease',
            }}>
              Explore all services
              <span>→</span>
            </Link>
          </div>
        </div>

        <div
          ref={topHalfRef}
          className="absolute left-0 right-0 top-0 z-10 h-[45%] overflow-hidden md:will-change-transform bg-[#0a0a0f]"
          style={{ willChange: "transform" }}
        >
          <HeroBackground />
          <div
            className="absolute bottom-0 left-0 right-0 flex flex-col items-center"
            style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: easeOutExpo }}
              className="mb-3 flex items-center gap-2 md:mb-5 md:gap-3"
            >
              <span className="h-px w-8 bg-white/15 md:w-10" />
              <span className="font-dm text-[0.55rem] uppercase tracking-[0.3em] text-white/35 md:text-[0.62rem] md:tracking-[0.36em]">
                The Code Nexus
              </span>
              <span className="h-px w-8 bg-white/15 md:w-10" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.26, ease: easeOutExpo }}
              className="mb-2 font-dm text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-pink md:mb-4 md:text-[0.68rem] md:tracking-[0.28em]"
            >
              AI automation + web solutions
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.32, ease: easeOutExpo }}
              className="text-center font-heading font-black tracking-[-0.03em] text-white"
              style={{
                fontSize: "clamp(2.4rem, 9vw, 8.5rem)",
                lineHeight: 0.92,
                textShadow: "0 0 100px rgba(255,0,138,0.12)",
                paddingBottom: "0.25rem",
              }}
            >
              BUILD DIGITAL
            </motion.p>
          </div>
        </div>

        <div
          ref={bottomHalfRef}
          className="absolute bottom-0 left-0 right-0 z-10 h-[55%] overflow-hidden md:will-change-transform bg-[#0a0a0f]"
          style={{ willChange: "transform" }}
        >
          <HeroBackground />
          <div
            className="absolute left-0 right-0 top-0 flex flex-col items-center px-4"
            style={{ position: "absolute", top: 0, left: 0, right: 0 }}
          >
            <motion.p
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.45, ease: easeOutExpo }}
              className="mb-[0.85rem] text-center font-heading font-black tracking-[-0.03em] text-white md:mb-[1.35rem]"
              style={{
                fontSize: "clamp(2.4rem, 9vw, 8.5rem)",
                lineHeight: 0.92,
                textShadow: "0 0 100px rgba(255,0,138,0.12)",
                paddingTop: "0.25rem",
              }}
            >
              SYSTEMS THAT <span style={gradientTextStyle}>SCALE</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.58 }}
              className="max-w-[32rem] text-center font-dm text-[clamp(0.875rem,3vw,1.1rem)] leading-snug text-[var(--text-body)] md:leading-relaxed"
            >
              AI automation, web solutions, and bespoke scalable architectures for global
              businesses.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.72 }}
              className="mt-4 font-dm text-[0.55rem] uppercase tracking-[0.15em] text-white/25 md:mt-6 md:text-[0.62rem] md:tracking-[0.2em] hidden md:block"
            >
              5+ projects · AI-first delivery · Performance optimized
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-[clamp(8px,2vw,14px)] md:mt-8 md:gap-3"
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 1.15 }}
              className="absolute bottom-[-3rem] left-1/2 flex -translate-x-1/2 flex-col items-center gap-[6px] md:bottom-[-4.5rem] md:gap-2"
            >
              <span className="font-dm text-[0.5rem] uppercase tracking-[0.32em] text-white/22 md:text-[0.58rem]">
                Scroll
              </span>
              <div
                className="hero-split-scroll-line w-px bg-gradient-to-b from-pink/70 to-transparent"
                style={{
                  height: "30px",
                  animation: "scrollPulse 2s ease-in-out infinite",
                }}
              />
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
