"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export interface AnimatedCounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  separator?: string;
  decimals?: number;
  label?: string;
  className?: string;
}

export function AnimatedCounter({
  end,
  prefix = "",
  suffix = "",
  duration = 2.5,
  separator = ",",
  decimals = 0,
  label,
  className,
}: AnimatedCounterProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div ref={ref} className={className || "text-center"}>
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold font-nobel-title text-nobel-blue dark:text-blue-400">
        {inView ? (
          <CountUp
            start={0}
            end={end}
            duration={duration}
            prefix={prefix}
            suffix={suffix}
            separator={separator}
            decimals={decimals}
          />
        ) : (
          <span>
            {prefix}0{suffix}
          </span>
        )}
      </div>
      {label && (
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2 font-nobel-content uppercase">
          {label}
        </p>
      )}
    </div>
  );
}
