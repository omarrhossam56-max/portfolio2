"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP ScrollTo plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

let lenisInstance: Lenis | null = null;

/**
 * Universal ultra-smooth scroll utility powered by GSAP + Lenis.
 * Easing: Custom exponential luxury curve matching high-end Awwwards websites.
 */
export function smoothScrollTo(
  target: string | HTMLElement,
  options?: { offset?: number; duration?: number }
) {
  const offset = options?.offset ?? -85;
  const duration = options?.duration ?? 1.3;

  if (target === "#" || target === "top") {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, {
        duration,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      return;
    }
    gsap.to(window, {
      duration,
      scrollTo: { y: 0, autoKill: true },
      ease: "power4.inOut",
    });
    return;
  }

  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(el as HTMLElement, {
      offset,
      duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    gsap.to(window, {
      duration,
      scrollTo: { y: el, offsetY: Math.abs(offset), autoKill: true },
      ease: "power4.inOut",
    });
  }
}

export default function SmoothScroll({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    // 1. Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisInstance = lenis;

    // 2. Synchronize Lenis with GSAP's high-precision ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 3. Global click interceptor for all hash links (#workflows, #contact, etc.)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const dest = document.querySelector(href);
        if (dest) {
          e.preventDefault();
          smoothScrollTo(href, { offset: -85, duration: 1.3 });
          // Update URL hash without jumping
          window.history.pushState(null, "", href);
        }
      } else if (href === "#") {
        e.preventDefault();
        smoothScrollTo("top", { duration: 1.2 });
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
