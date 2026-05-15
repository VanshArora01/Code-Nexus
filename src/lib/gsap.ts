import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let didRegister = false;

export function registerGsapPlugins(): void {
  if (typeof window === "undefined" || didRegister) {
    return;
  }
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);
  didRegister = true;
}

export { gsap, ScrollToPlugin, ScrollTrigger };
