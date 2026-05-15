"use client";

/**
 * Lenis + GSAP ScrollTrigger sync (required for stable hero pinning):
 * lenis.on("scroll") → ScrollTrigger.update; gsap.ticker drives lenis.raf(time*1000); lagSmoothing(0).
 */
import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, registerGsapPlugins } from "@/lib/gsap";
import { setGlobalLenis, getGlobalLenis } from "@/lib/lenis-instance";

export function useLenis(): void {
  const pathname = usePathname();

  useEffect(() => {
    registerGsapPlugins();

    // Disable Lenis on mobile for performance
    if (window.innerWidth < 768) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    setGlobalLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number): void => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      setGlobalLenis(null);
      ScrollTrigger.refresh();
    };
  }, []);

  useEffect(() => {
    const lenis = getGlobalLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);
}
