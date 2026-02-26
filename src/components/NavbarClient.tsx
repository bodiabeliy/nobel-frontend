"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, lazy, useState, useEffect } from "react";
import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";
import { useTheme } from "next-themes";

// Lazy load ThemeChanger to avoid SSR issues
const ThemeChanger = lazy(() => import("./DarkSwitch"));

interface NavLink {
  id?: number;
  text: string;
  href: string;
  isAuth?: boolean;
}

interface NavbarClientProps {
  logoText?: string;
  logoUrl?: string;
  logoHref?: string;
  links?: NavLink[];
}

export function NavbarClient({
  logoText = "Nobel Realty Group",
  logoUrl = "/img/nobel-logo.png",
  logoHref = "/",
  links = [
    { text: "BUY", href: "/buy", isAuth: false },
    { text: "RENT", href: "/rent", isAuth: false },
    { text: "SELL", href: "/sell", isAuth: false },
    { text: "AGENTS", href: "/agents", isAuth: false },
    { text: "CONTACT US", href: "/contact", isAuth: false },
  ],
}: NavbarClientProps) {
  const authLink = links.find(link => link.isAuth);
  const regularLinks = links.filter(link => !link.isAuth);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <nav className="container relative flex flex-wrap items-center justify-between px-4 py-2 mx-auto lg:justify-between xl:px-0 max-w-screen-xl" style={{ maxHeight: "50px" }}>
        <Disclosure>
          {({ open }) => (
            <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
              {/* Logo */}
              <Link href={logoHref} className="flex items-center space-x-2 text-lg font-nobel-title font-medium text-nobel-blue dark:text-white">
                <Image
                  src={logoUrl}
                  alt={logoText}
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                  unoptimized
                />
                <span className="hidden sm:inline">{logoText}</span>
              </Link>

              {/* Mobile hamburger button */}
              <DisclosureButton
                aria-label="Toggle Menu"
                className="p-2 ml-auto text-gray-700 rounded-md lg:hidden hover:text-nobel-blue focus:text-nobel-blue focus:outline-none dark:text-gray-300 dark:hover:text-blue-400"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {open ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    />
                  )}
                </svg>
              </DisclosureButton>

              {/* Mobile panel */}
              <DisclosurePanel className="fixed inset-0 z-50 bg-gray-100 dark:bg-gray-800 lg:hidden overflow-y-auto">
                <div className="flex flex-col min-h-screen">
                  {/* Header with logo and close button */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                    <Link href={logoHref}>
                      <span className="flex items-center space-x-2">
                        <Image
                          src={logoUrl}
                          alt={logoText}
                          width={120}
                          height={40}
                          className="h-8 w-auto"
                          unoptimized
                        />
                      </span>
                    </Link>
                    <DisclosureButton className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                      </svg>
                    </DisclosureButton>
                  </div>

                  {/* Menu Items */}
                  <div className="flex-1 py-4">
                    {regularLinks.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="flex items-center justify-between px-6 py-4 text-base font-nobel-content text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700"
                      >
                        <span>{item.text}</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    ))}
                  </div>

                  {/* Mode Switcher */}
                  {mounted && (
                    <div className="border-t border-gray-200 dark:border-gray-700 py-6 px-6 bg-white dark:bg-gray-900">
                      <div className="text-xs font-nobel-content font-bold text-gray-500 dark:text-gray-400 uppercase mb-3">
                        Mode
                      </div>
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => setTheme("light")}
                          className={`p-3 rounded-full transition-colors ${
                            theme === "light"
                              ? "bg-nobel-blue text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                          }`}
                          aria-label="Light mode"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                          </svg>
                        </button>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={theme === "dark"}
                            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="sr-only"
                            id="puck-theme-toggle"
                          />
                          <label
                            htmlFor="puck-theme-toggle"
                            className="block w-14 h-7 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer relative"
                          >
                            <span className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${theme === "dark" ? "translate-x-7" : ""}`} />
                          </label>
                        </div>
                        <button
                          onClick={() => setTheme("dark")}
                          className={`p-3 rounded-full transition-colors ${
                            theme === "dark"
                              ? "bg-nobel-blue text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                          }`}
                          aria-label="Dark mode"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </DisclosurePanel>
            </div>
          )}
        </Disclosure>

        {/* Desktop menu */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 list-none lg:flex">
            {regularLinks.map((menu, index) => (
              <li className="nav__item" key={index}>
                <Link
                  href={menu.href}
                  className="inline-block px-3 py-2 text-sm font-nobel-content font-bold text-gray-800 no-underline uppercase dark:text-gray-200 hover:text-nobel-blue focus:text-nobel-blue focus:outline-none dark:hover:text-blue-400"
                >
                  {menu.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden space-x-3 lg:flex lg:items-center nav__item">
          {authLink && (
            <Link
              href={authLink.href}
              className="px-4 py-1.5 text-sm font-nobel-content font-bold text-white bg-nobel-blue rounded hover:bg-nobel-blue/90"
            >
              {authLink.text}
            </Link>
          )}
          <Suspense fallback={<div className="w-5 h-5" />}>
            <ThemeChanger />
          </Suspense>
        </div>
      </nav>
    </div>
  );
}
