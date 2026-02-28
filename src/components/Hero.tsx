"use client";
import { useState } from "react";
import Image from "next/image";

interface HeroProps {
  data: {
    heading: string;
    subheading?: string;
    backgroundImage?: {
      url: string;
      alternativeText: string | null;
    };
    // Background images per mode
    bgLightDesktop?: string;
    bgLightMobile?: string;
    bgDarkDesktop?: string;
    bgDarkMobile?: string;
    // Search section
    searchTabs?: string[];
    searchPlaceholder?: string;
    searchButtonText?: string;
    showSearch?: boolean;
  };
}

export function Hero({ data }: Readonly<HeroProps>) {
  const [activeTab, setActiveTab] = useState("BUY");
  if (!data) return null;
  const {
    heading,
    subheading,
    bgLightDesktop = "/img/homepage-head-banner-light-mode.webp",
    bgLightMobile = "/img/homepage-head-banner-light-mode-mobile.webp",
    bgDarkDesktop = "/img/homepage-head-banner-dark-mode.webp",
    bgDarkMobile = "/img/homepage-head-banner-dark-mode-mobile.webp",
    searchTabs,
    searchPlaceholder = "City, State, Zip Code or Neighborhood",
    searchButtonText = "Search",
    showSearch = true,
  } = data;

  const tabs = searchTabs && searchTabs.length > 0 ? searchTabs : ["BUY", "RENT", "SELL"];

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Responsive */}
      <div className="absolute inset-0">
        {/* Light Mode - Desktop */}
        <Image
          src={bgLightDesktop}
          alt={heading}
          fill
          priority
          className="object-cover hidden md:block dark:hidden"
        />
        {/* Light Mode - Mobile */}
        <Image
          src={bgLightMobile}
          alt={heading}
          fill
          priority
          className="object-cover block md:hidden dark:hidden"
        />
        {/* Dark Mode - Desktop */}
        <Image
          src={bgDarkDesktop}
          alt={heading}
          fill
          priority
          className="object-cover hidden md:dark:block"
        />
        {/* Dark Mode - Mobile */}
        <Image
          src={bgDarkMobile}
          alt={heading}
          fill
          priority
          className="object-cover hidden dark:block dark:md:hidden"
        />
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-nobel-title font-bold text-white mb-3 md:mb-4 tracking-wide uppercase">
          {heading}
        </h1>
        {subheading && (
          <p className="text-base md:text-lg lg:text-xl text-white/95 mb-6 md:mb-8 font-nobel-content">
            {subheading}
          </p>
        )}

        {/* Search Bar */}
        {showSearch !== false && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 md:p-8 max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-0 mb-6 border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 md:px-10 py-3 font-nobel-content text-sm md:text-base uppercase transition-colors relative ${
                  activeTab === tab
                    ? "text-nobel-blue dark:text-white font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-nobel-blue dark:after:bg-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-nobel-blue dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="flex-1 px-5 py-3.5 text-base border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nobel-blue font-nobel-content"
            />
            <button className="px-8 md:px-10 py-3.5 bg-nobel-blue hover:bg-nobel-blue/90 text-white rounded font-nobel-content text-base font-bold transition-colors whitespace-nowrap">
              {searchButtonText}
            </button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
