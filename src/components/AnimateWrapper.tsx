"use client";

import React, { ReactNode } from "react";
import { motion, type Variant, type Transition } from "framer-motion";
import { useInView } from "react-intersection-observer";

/* ─── animation presets ──────────────────────────────────────────── */

const presets: Record<string, { hidden: Variant; visible: Variant }> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  zoomOut: {
    hidden: { opacity: 0, scale: 1.15 },
    visible: { opacity: 1, scale: 1 },
  },
  flipX: {
    hidden: { opacity: 0, rotateX: 90 },
    visible: { opacity: 1, rotateX: 0 },
  },
  flipY: {
    hidden: { opacity: 0, rotateY: 90 },
    visible: { opacity: 1, rotateY: 0 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -80 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
  },
  none: {
    hidden: {},
    visible: {},
  },
};

export type AnimationPreset = keyof typeof presets;

export const ANIMATION_OPTIONS: { label: string; value: AnimationPreset }[] = [
  { label: "None", value: "none" },
  { label: "Fade In", value: "fadeIn" },
  { label: "Fade Up", value: "fadeUp" },
  { label: "Fade Down", value: "fadeDown" },
  { label: "Fade Left", value: "fadeLeft" },
  { label: "Fade Right", value: "fadeRight" },
  { label: "Zoom In", value: "zoomIn" },
  { label: "Zoom Out", value: "zoomOut" },
  { label: "Flip X", value: "flipX" },
  { label: "Flip Y", value: "flipY" },
  { label: "Slide Up", value: "slideUp" },
  { label: "Slide Down", value: "slideDown" },
  { label: "Slide Left", value: "slideLeft" },
  { label: "Slide Right", value: "slideRight" },
];

export const EASING_OPTIONS = [
  { label: "Ease Out", value: "easeOut" },
  { label: "Ease In Out", value: "easeInOut" },
  { label: "Ease In", value: "easeIn" },
  { label: "Spring", value: "spring" },
  { label: "Linear", value: "linear" },
];

/* ─── component ──────────────────────────────────────────────────── */

export interface AnimateWrapperProps {
  children: ReactNode;
  animation?: AnimationPreset;
  duration?: number;
  delay?: number;
  easing?: string;
  once?: boolean;
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimateWrapper({
  children,
  animation = "fadeUp",
  duration = 0.6,
  delay = 0,
  easing = "easeOut",
  once = true,
  threshold = 0.15,
  className,
  style,
}: AnimateWrapperProps) {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold,
  });

  const preset = presets[animation] || presets.fadeUp;

  const isSpring = easing === "spring";
  const transition: Transition = isSpring
    ? { type: "spring", duration, delay, bounce: 0.3 }
    : { duration, delay, ease: easing as any };

  if (animation === "none") {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ hidden: preset.hidden, visible: preset.visible }}
      transition={transition}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
