"use client";

import type { ReactNode } from "react";

import { useLenis } from "@/lib/lenis";

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps): ReactNode {
  useLenis();
  return children;
}
