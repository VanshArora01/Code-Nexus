"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  useLayoutEffect,
  type ReactNode,
} from "react";

import { registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";

type PageTemplateProps = {
  children: ReactNode;
};

export default function Template({ children }: PageTemplateProps): ReactNode {
  const pathname = usePathname();

  useLayoutEffect(() => {
    registerGsapPlugins();
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
