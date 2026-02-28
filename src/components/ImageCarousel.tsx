"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export interface CarouselSlide {
  imageUrl: string;
  alt?: string;
  heading?: string;
  text?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface ImageCarouselProps {
  slides: CarouselSlide[];
  autoplay?: boolean;
  autoplayDelay?: number;
  effect?: "slide" | "fade";
  showNav?: boolean;
  showPagination?: boolean;
  loop?: boolean;
  height?: string;
  overlay?: boolean;
}

export function ImageCarousel({
  slides = [],
  autoplay = true,
  autoplayDelay = 4000,
  effect = "slide",
  showNav = true,
  showPagination = true,
  loop = true,
  height = "500px",
  overlay = true,
}: ImageCarouselProps) {
  if (!slides.length) {
    return (
      <div
        className="bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400"
        style={{ height }}
      >
        <p>Add slides to the carousel</p>
      </div>
    );
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      navigation={showNav}
      pagination={showPagination ? { clickable: true } : false}
      autoplay={autoplay ? { delay: autoplayDelay, disableOnInteraction: false } : false}
      effect={effect}
      loop={loop}
      className="w-full"
      style={{ height }}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <div className="relative w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.imageUrl}
              alt={slide.alt || slide.heading || `Slide ${i + 1}`}
              className="w-full h-full object-cover"
            />
            {overlay && (slide.heading || slide.text) && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-6">
                {slide.heading && (
                  <h3 className="text-2xl md:text-4xl font-nobel-title font-bold text-white uppercase mb-3">
                    {slide.heading}
                  </h3>
                )}
                {slide.text && (
                  <p className="text-base md:text-lg text-white/90 font-nobel-content mb-4 max-w-xl">
                    {slide.text}
                  </p>
                )}
                {slide.ctaText && slide.ctaLink && (
                  <a
                    href={slide.ctaLink}
                    className="inline-block px-6 py-3 bg-nobel-blue hover:bg-nobel-blue/90 text-white rounded font-nobel-content font-bold transition-colors"
                  >
                    {slide.ctaText}
                  </a>
                )}
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
