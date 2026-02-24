import React from "react";
import { SocialIcon } from "react-social-icons";

import Link from "next/link";

import Image from "next/image";
import { Container } from "@/components/Container";
import { fetchData } from "@/lib/fetch";
import { getStrapiURL } from "@/lib/utils";
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
  if (!data || !data.Footer) return null;
  const footer = data.Footer;

  const { logoLink, colOneLinks, colTwoLinks, socialLinks, description } =
    footer;
  return (
    <div className="relative bg-gray-50 dark:bg-gray-900">
      <Container>
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-200 dark:border-gray-700 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div>
              <Link
                href={logoLink.href}
                className="flex items-center space-x-2 text-2xl font-nobel-title font-medium text-nobel-blue dark:text-white"
              >
                <Image
                  src={logoLink.image.url}
                  alt={logoLink.image.alternativeText || logoLink.image.name}
                  width={32}
                  height={32}
                  className="w-8"
                />
                <span>{logoLink.text}</span>
              </Link>
            </div>

            <div className="max-w-md mt-4 text-gray-600 dark:text-gray-400 font-nobel-content">
              {description}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {colOneLinks &&
                colOneLinks.map((item, index) => (
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
              {colTwoLinks &&
                colTwoLinks.map((item, index) => (
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
            <div className="font-nobel-content-bold text-gray-900 dark:text-white">{socialLinks.heading}</div>
            <div className="flex mt-5 space-x-5 text-gray-400 dark:text-gray-500">
              {socialLinks.socialLink &&
                socialLinks.socialLink.map((item, index) => (
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
      </Container>
    </div>
  );
}
