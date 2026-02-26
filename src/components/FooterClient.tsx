"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";

interface FooterLink {
  id?: number;
  text: string;
  href: string;
}

interface SocialLink {
  id?: number;
  text: string;
  href: string;
}

interface FooterClientProps {
  logoText?: string;
  logoUrl?: string;
  logoHref?: string;
  description?: string;
  colOneLinks?: FooterLink[];
  colTwoLinks?: FooterLink[];
  socialHeading?: string;
  socialLinks?: SocialLink[];
}

function iconSelect(link: SocialLink) {
  if (!link) return null;
  return (
    <SocialIcon
      network={link.text.toLowerCase()}
      url={link.href}
      target="_blank"
      style={{ width: 35, height: 35 }}
    />
  );
}

export function FooterClient({
  logoText = "NOBEL",
  logoUrl = "/img/logo.svg",
  logoHref = "/",
  description = "NOBEL Realty Group - Award-winning buying and selling real estate services in Florida.",
  colOneLinks = [
    { text: "Buy a Home", href: "/buy" },
    { text: "Sell a Home", href: "/sell" },
    { text: "Rent a Home", href: "/rent" },
    { text: "Our Agents", href: "/agents" },
    { text: "About Us", href: "/about" },
  ],
  colTwoLinks = [
    { text: "Contact", href: "/contact" },
    { text: "Careers", href: "/careers" },
    { text: "Insights", href: "/insights" },
  ],
  socialHeading = "Follow us!",
  socialLinks = [
    { text: "Facebook", href: "https://www.facebook.com" },
    { text: "Instagram", href: "https://www.instagram.com" },
    { text: "LinkedIn", href: "https://www.linkedin.com" },
    { text: "Twitter", href: "https://www.twitter.com" },
  ],
}: FooterClientProps) {
  return (
    <div className="relative bg-gray-50 dark:bg-gray-900 w-full">
      <div className="container p-8 mx-auto xl:px-0 max-w-screen-xl">
        <div className="grid grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-200 dark:border-gray-700 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div>
              <Link
                href={logoHref}
                className="flex items-center space-x-2 text-2xl font-nobel-title font-medium text-nobel-blue dark:text-white"
              >
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
            </div>

            <div className="max-w-md mt-4 text-gray-600 dark:text-gray-400 font-nobel-content text-sm">
              {description}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {colOneLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="w-full px-4 py-2 text-gray-600 dark:text-gray-300 font-nobel-content text-sm rounded-md hover:text-nobel-blue dark:hover:text-white focus:text-nobel-blue focus:bg-gray-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {colTwoLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="w-full px-4 py-2 text-gray-600 dark:text-gray-300 font-nobel-content text-sm rounded-md hover:text-nobel-blue dark:hover:text-white focus:text-nobel-blue focus:bg-gray-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="font-nobel-content-bold text-gray-900 dark:text-white text-base mb-2">
              {socialHeading}
            </div>
            <div className="flex mt-5 space-x-3 text-gray-400 dark:text-gray-500">
              {socialLinks.map((item, index) => (
                <div key={index}>
                  <span className="sr-only">{item.text}</span>
                  {iconSelect(item)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400 font-nobel-content">
          Copyright © {new Date().getFullYear()} NOBEL Realty Group. All rights reserved.
        </div>
      </div>
    </div>
  );
}
