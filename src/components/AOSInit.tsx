"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * Initialize AOS (Animate On Scroll) library globally.
 * Place this component once in your root layout.
 */
export function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  return null;
}
