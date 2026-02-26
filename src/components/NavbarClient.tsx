"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, lazy } from "react";

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

  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <nav className="container relative flex flex-wrap items-center justify-between px-4 py-3 mx-auto xl:px-0 max-w-screen-xl">
        {/* Logo */}
        <Link href={logoHref} className="flex items-center space-x-2 text-xl font-nobel-title font-medium text-nobel-blue dark:text-white">
          <Image
            src={logoUrl}
            alt={logoText}
            width={32}
            height={32}
            className="w-8 h-8"
            unoptimized
          />
          <span>{logoText}</span>
        </Link>

        {/* Desktop menu */}
        <div className="flex text-center items-center">
          <ul className="items-center justify-end flex-1 list-none flex gap-1">
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

        <div className="flex space-x-3 items-center nav__item">
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
