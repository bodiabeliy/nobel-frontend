import React from "react";
import { SocialIcon } from "react-social-icons";

import Link from "next/link";

import Image from "next/image";
import { Container } from "@/components/Container";
import { fetchData } from "@/lib/fetch";
import { getStrapiURL, getStrapiMedia } from "@/lib/utils";
import { getPuckGlobals } from "@/lib/puck-globals";
import qs from "qs";

async function loader() {
  const baseUrl = getStrapiURL();
  
  const query = qs.stringify({
    populate: {
      Footer: {
        populate: {
          logoLink: {
            populate: {
              image: true
            }
          },
          colOneLinks: true,
          colTwoLinks: true,
          socialLinks: {
            populate: {
              socialLink: true
            }
          }
        }
      }
    }
  });

  const url = `${baseUrl}/api/home-main-section?${query}`;
  
  try {
    const data = await fetchData(url);
    return data;
  } catch (error) {
    console.error("Error loading footer data:", error);
    // Fallback data
    return {
      Footer: {
        id: 1,
        description:
          "NOBEL Realty Group - Award-winning buying and selling real estate services in Florida.",
        logoLink: {
          id: 2,
          text: "NOBEL",
          href: "/",
          image: {
            id: 1,
            url: "/img/logo.svg",
            alternativeText: "Nobel Realty Group Logo",
            name: "logo.svg",
          },
        },
        colOneLinks: [
          { id: 9, href: "/buy", text: "Buy a Home", external: false },
          { id: 10, href: "/sell", text: "Sell a Home", external: false },
          { id: 11, href: "/rent", text: "Rent a Home", external: false },
          { id: 12, href: "/agents", text: "Our Agents", external: false },
          { id: 13, href: "/about", text: "About Us", external: false },
        ],
        colTwoLinks: [
          { id: 14, href: "/contact", text: "Contact", external: false },
          { id: 15, href: "/careers", text: "Careers", external: false },
          { id: 16, href: "/insights", text: "Insights", external: false },
        ],
        socialLinks: {
          id: 1,
          heading: "Follow us!",
          socialLink: [
            {
              id: 14,
              href: "https://www.facebook.com",
              text: "Facebook",
              external: true,
            },
            {
              id: 15,
              href: "https://www.instagram.com",
              text: "Instagram",
              external: true,
            },
            {
              id: 16,
              href: "https://www.linkedin.com",
              text: "LinkedIn",
              external: true,
            },
            {
              id: 17,
              href: "https://www.twitter.com",
              text: "Twitter",
              external: true,
            },
          ],
        },
      }
    };
  }
}

interface FooterData {
  Footer: {
    id: number;
    description: string;
    logoLink: {
      id: number;
      text: string;
      href: string;
      image: {
        id: number;
        url: string;
        alternativeText: string | null;
        name: string;
      };
    };
    colOneLinks: {
      id: number;
      href: string;
      text: string;
      external: boolean;
    }[];
    colTwoLinks: {
      id: number;
      href: string;
      text: string;
      external: boolean;
    }[];
    socialLinks: {
      id: number;
      heading: string;
      socialLink: SocialLink[];
    };
  };
}

interface SocialLink {
  id: number;
  href: string;
  text: string;
  external: boolean;
}
function iconSelect(link: SocialLink) {
  if (!link) return null;
  return (
    <SocialIcon
      network={link.text.toLocaleLowerCase()}
      url={link.href}
      target="_blank"
    />
  );
}

export async function Footer() {
  const data = (await loader()) as FooterData;
  const puckGlobals = getPuckGlobals();

  // Allow Footer to render even without Strapi data by using Puck globals or defaults
  const footer = data?.Footer;

  const logoLink = footer?.logoLink;
  const colOneLinks = footer?.colOneLinks;
  const colTwoLinks = footer?.colTwoLinks;
  const socialLinks = footer?.socialLinks;
  const description = footer?.description;

  // Puck overrides (editor-managed values take priority)
  const finalDescription = puckGlobals.footerDescription || description || "NOBEL Realty Group - Award-winning buying and selling real estate services in Florida.";
  const finalLogoText = puckGlobals.footerLogoText || logoLink?.text || "NOBEL";
  const finalLogoImage = puckGlobals.footerLogoImage || getStrapiMedia(logoLink?.image?.url) || "/img/logo.svg";
  const finalLogoHref = logoLink?.href || "/";
  
  const finalColOneLinks = puckGlobals.footerColOneLinks && puckGlobals.footerColOneLinks.length > 0
    ? puckGlobals.footerColOneLinks
    : colOneLinks || [
        { text: "Buy a Home", href: "/buy" },
        { text: "Sell a Home", href: "/sell" },
        { text: "Rent a Home", href: "/rent" },
        { text: "Our Agents", href: "/agents" },
        { text: "About Us", href: "/about" },
      ];

  const finalColTwoLinks = puckGlobals.footerColTwoLinks && puckGlobals.footerColTwoLinks.length > 0
    ? puckGlobals.footerColTwoLinks
    : colTwoLinks || [
        { text: "Contact", href: "/contact" },
        { text: "Careers", href: "/careers" },
        { text: "Insights", href: "/insights" },
      ];

  const finalSocialHeading = puckGlobals.footerSocialHeading || socialLinks?.heading || "Follow us!";
  const finalSocialLinks = puckGlobals.footerSocialLinks && puckGlobals.footerSocialLinks.length > 0
    ? puckGlobals.footerSocialLinks
    : socialLinks?.socialLink || [
        { text: "Facebook", href: "https://www.facebook.com" },
        { text: "Instagram", href: "https://www.instagram.com" },
        { text: "LinkedIn", href: "https://www.linkedin.com" },
        { text: "Twitter", href: "https://www.twitter.com" },
      ];

  const finalCopyright = puckGlobals.footerCopyright || `Copyright © ${new Date().getFullYear()} NOBEL Realty Group. All rights reserved.`;

  return (
    <div className="relative bg-gray-50 dark:bg-gray-900">
      <Container>
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-200 dark:border-gray-700 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div>
              <Link
                href={finalLogoHref}
                className="flex items-center space-x-2 text-2xl font-nobel-title font-medium text-nobel-blue dark:text-white"
              >
                <Image
                  src={finalLogoImage}
                  alt={logoLink?.image?.alternativeText || logoLink?.image?.name || "Logo"}
                  width={32}
                  height={32}
                  className="w-8"
                />
                <span>{finalLogoText}</span>
              </Link>
            </div>

            <div className="max-w-md mt-4 text-gray-600 dark:text-gray-400 font-nobel-content">
              {finalDescription}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {finalColOneLinks.map((item: any, index: number) => (
                <Link
                  key={index}
                  href={item.href}
                  className="w-full px-4 py-2 text-gray-600 dark:text-gray-300 font-nobel-content rounded-md hover:text-nobel-blue dark:hover:text-white focus:text-nobel-blue focus:bg-gray-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {finalColTwoLinks.map((item: any, index: number) => (
                <Link
                  key={index}
                  href={item.href}
                  className="w-full px-4 py-2 text-gray-600 dark:text-gray-300 font-nobel-content rounded-md hover:text-nobel-blue dark:hover:text-white focus:text-nobel-blue focus:bg-gray-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="font-nobel-content-bold text-gray-900 dark:text-white">{finalSocialHeading}</div>
            <div className="flex mt-5 space-x-5 text-gray-400 dark:text-gray-500">
              {finalSocialLinks.map((item: any, index: number) => {
                // Use SocialIcon if we have original Strapi data, otherwise text links
                const isStrapiSocial = item.id !== undefined;
                return (
                  <div key={index}>
                    <span className="sr-only">{item.text}</span>
                    {isStrapiSocial ? iconSelect(item as SocialLink) : (
                      <a href={item.href} target="_blank" rel="noreferrer" className="hover:text-nobel-blue" title={item.text}>
                        <SocialIcon network={item.text.toLowerCase()} url={item.href} target="_blank" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400 font-nobel-content">
          {finalCopyright}
        </div>
      </Container>
    </div>
  );
}
