"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  useEffect,
  type ReactNode,
} from "react";

import { registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";

type PageTemplateProps = {
  children: ReactNode;
};

export default function Template({ children }: PageTemplateProps): ReactNode {
  const pathname = usePathname();

  useEffect(() => {
    registerGsapPlugins();
    // Skip ScrollTrigger refresh on mobile — fewer instances, saves a main-thread cycle
    if (window.innerWidth < 768) return;
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }}
    >
      {children}
    </motion.div>
  );
}
