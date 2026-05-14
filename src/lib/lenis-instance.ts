import type Lenis from "lenis";

let lenisRef: Lenis | null = null;

export function setGlobalLenis(instance: Lenis | null): void {
  lenisRef = instance;
}

export function getGlobalLenis(): Lenis | null {
  return lenisRef;
}

export function pauseGlobalLenis(): void {
  lenisRef?.stop();
}

export function resumeGlobalLenis(): void {
  lenisRef?.start();
}
