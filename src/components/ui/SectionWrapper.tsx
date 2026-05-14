"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

export function SectionWrapper({
  children,
  className,
  delay = 0,
  ...motionProps
}: SectionWrapperProps): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className={cn(className)}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
