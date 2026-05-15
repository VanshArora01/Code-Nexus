"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useState,
  type ReactElement,
} from "react";

import {
  pauseGlobalLenis,
  resumeGlobalLenis,
} from "@/lib/lenis-instance";
import { cn } from "@/lib/utils";
import * as analytics from "@/lib/analytics";
import { SITE_SOCIAL } from "@/lib/site-social";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar(): ReactElement {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = (): void => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setSolid(window.scrollY > 48);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (open) {
      pauseGlobalLenis();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      resumeGlobalLenis();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      resumeGlobalLenis();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
        "fixed inset-x-0 top-0 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out",
        solid || open
          ? "border-b border-white/[0.08] bg-[rgba(5,5,5,0.92)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
      style={{ zIndex: 2147483647 }}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3.5 md:px-6 lg:px-8">
        <Link
          href="/"
          className="group relative z-[120] flex items-center gap-3 transition-transform active:scale-95"
          onClick={() => setOpen(false)}
        >
          <Image 
            src="/image.png" 
            alt="The Code Nexus Logo" 
            width={40}
            height={40}
            priority
            className="h-9 w-auto md:h-10" 
          />
          <span className="flex items-baseline gap-0 font-heading text-lg font-bold tracking-tight">
            <span className="text-white">The Code</span>
            <span className="bg-gradient-to-r from-pink via-fuchsia to-purple bg-clip-text text-transparent">
              Nexus
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group/nav relative py-2 text-sm font-medium transition-colors duration-300 ease-out",
                  active ? "text-white" : "text-white/50 hover:text-white",
                )}
              >
                <span>{item.label}</span>
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-pink via-fuchsia to-purple transition-transform duration-300 ease-out",
                    active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100",
                  )}
                  aria-hidden
                />
              </Link>
            );
          })}
        </div>
        <div className="hidden md:block">
          <Link
            href="/contact"
            onClick={() => {
              analytics.event({
                action: "navbar_cta_click",
                category: "Engagement",
                label: "Get Started",
              });
            }}
            className="group relative inline-flex items-center gap-1 text-sm font-semibold text-white/90 transition-colors hover:text-white"
          >
            <span className="relative">
              Get Started
              <span
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-pink via-fuchsia to-purple transition-transform duration-300 ease-out group-hover:scale-x-100"
                aria-hidden
              />
            </span>
            <span
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>

        <button
          type="button"
          className="relative z-[120] flex h-12 w-12 flex-col items-center justify-center gap-[6px] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav-overlay"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 8, backgroundColor: "#fff" } : { rotate: 0, y: 0, backgroundColor: "rgba(255,255,255,0.7)" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="h-0.5 w-7 rounded-full bg-white/70"
          />
          <motion.span
            animate={open ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1, backgroundColor: "rgba(255,255,255,0.7)" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="h-0.5 w-7 rounded-full bg-white/70"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -8, backgroundColor: "#fff" } : { rotate: 0, y: 0, backgroundColor: "rgba(255,255,255,0.7)" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="h-0.5 w-7 rounded-full bg-white/70"
          />
        </button>
      </nav>
    </header>

    <AnimatePresence>
          {open ? (
            <motion.div
              id="mobile-nav-overlay"
              initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
              animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 flex flex-col px-6 pb-8 pt-[calc(7rem+env(safe-area-inset-top,0px))] md:hidden"
              style={{ backgroundColor: "#000000", zIndex: 2147483640 }}
            >
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              {/* Animated orbs */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute -right-[20%] top-[10%] h-[400px] w-[400px] rounded-full blur-[120px]"
                style={{
                  background: "radial-gradient(circle, rgba(255,0,138,0.35), transparent 70%)",
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                className="absolute -left-[10%] bottom-[15%] h-[350px] w-[350px] rounded-full blur-[120px]"
                style={{
                  background: "radial-gradient(circle, rgba(139,92,246,0.35), transparent 70%)",
                }}
              />
              {/* Clean minimal grid */}
              <div
                className="absolute inset-0 opacity-[0.25]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
                  backgroundSize: "48px 48px",
                  maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                }}
              />
            </div>

            <nav className="relative z-[1] flex flex-1 flex-col justify-center gap-[3vh]" aria-label="Mobile">
              {NAV_LINKS.map((item, i) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <div key={item.href} className="py-1">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1 + i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-6 font-heading text-[10.5vw] font-black uppercase leading-none tracking-tighter sm:text-[3rem]"
                      >
                        <span
                          className={cn(
                            "transition-all duration-500",
                            active
                              ? "bg-gradient-to-br from-pink via-white to-purple bg-clip-text text-transparent"
                              : "text-white/40 active:text-white"
                          )}
                        >
                          {item.label}
                        </span>
                        {active && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.6, duration: 0.4 }}
                            className="h-2.5 w-2.5 shrink-0 rounded-full bg-pink shadow-[0_0_24px_rgba(255,0,138,1)]"
                          />
                        )}
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="relative z-[1] mt-auto grid grid-cols-2 gap-4 border-t border-white/10 pt-8"
            >
              <div>
                <p className="mb-3 font-dm text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/30">
                  Socials
                </p>
                <div className="flex flex-col gap-3 font-dm text-sm font-medium text-white/70">
                  <a href={SITE_SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-pink">LinkedIn</a>
                  <a href={SITE_SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-pink">Instagram</a>
                  <a href={SITE_SOCIAL.whatsappCommunity} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-pink">WhatsApp</a>
                </div>
              </div>
              <div className="flex flex-col items-end justify-end">
                <Link
                  href="/contact"
                  onClick={() => {
                    setOpen(false);
                    analytics.event({
                      action: "navbar_cta_click",
                      category: "Engagement",
                      label: "Mobile Start Project",
                    });
                  }}
                  className="group relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-full bg-white/[0.04] font-heading text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/[0.08] active:scale-[0.98]"
                >
                  <span className="relative z-10">Start Project</span>
                  <div className="absolute inset-0 z-0 scale-x-0 bg-gradient-to-r from-pink via-fuchsia to-purple origin-left transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
