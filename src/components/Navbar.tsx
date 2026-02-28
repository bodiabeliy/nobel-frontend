import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import { DisclosureClient } from "@/components/DisclosureClient";
import { fetchData } from "@/lib/fetch";
import { getStrapiURL, getStrapiMedia } from "@/lib/utils";
import { getPuckGlobals } from "@/lib/puck-globals";
import qs from "qs";

async function loader() {
  const baseUrl = getStrapiURL();
  
  const query = qs.stringify({
    populate: {
      Navbar: {
        populate: {
          NavLogo: {
            populate: {
              LogoImage: true
            },
            fields: ['LogoText', 'href']
          },
          NavLinks: {
            fields: ['LinkText', 'href', 'isAuth']
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
    console.error("Error loading navbar data:", error);
    return null;
  }
}

interface NavLink {
  id: number;
  LinkText: string;
  href: string;
  isAuth: boolean;
}

interface NavLogoImage {
  id: number;
  url: string;
  alternativeText: string | null;
  name: string;
}

interface NavLogo {
  id: number;
  LogoText: string;
  href: string;
  LogoImage: NavLogoImage | NavLogoImage[];
}

interface NavbarData {
  id: number;
  Navbar: {
    id: number;
    NavLogo: NavLogo;
    NavLinks: NavLink[];
  };
}

export async function Navbar() {
  const data = await loader() as NavbarData;
  const puckGlobals = getPuckGlobals();
  
  // Fallback data if Strapi is not available
  const fallbackData = {
    Navbar: {
      id: 1,
      NavLogo: {
        id: 1,
        LogoText: "Nobel Realty Group",
        href: "/",
        LogoImage: {
          id: 1,
          url: "/img/nobel-logo.png",
          alternativeText: "Nobel Realty Group",
          name: "nobel-logo"
        }
      },
      NavLinks: [
        { id: 1, LinkText: "BUY", href: "/buy", isAuth: false },
        { id: 2, LinkText: "RENT", href: "/rent", isAuth: false },
        { id: 3, LinkText: "SELL", href: "/sell", isAuth: false },
        { id: 4, LinkText: "AGENTS", href: "/agents", isAuth: false },
        { id: 5, LinkText: "CONTACT US", href: "/contact", isAuth: false }
      ]
    }
  };
  
  const navbarData = data && data.Navbar ? data : fallbackData;
  const navbar = navbarData.Navbar;
  const navLogo = navbar.NavLogo;
  const navLinks = navbar.NavLinks;

  // Apply Puck global overrides (if editor has set them)
  const finalLogoText = puckGlobals.navLogoText || navLogo.LogoText;
  // LogoImage can be an array (Strapi multiple media) or a single object
  const rawLogoImage = Array.isArray(navLogo.LogoImage) ? navLogo.LogoImage[0] : navLogo.LogoImage;
  const finalLogoImage = puckGlobals.navLogoImage || getStrapiMedia(rawLogoImage?.url) || "/img/nobel-logo.png";
  const finalLogoHref = navLogo.href || "/";
  
  const finalNavLinks = puckGlobals.navLinks && puckGlobals.navLinks.length > 0
    ? puckGlobals.navLinks.map((link, i) => ({
        id: i + 1,
        LinkText: link.text,
        href: link.href,
        isAuth: false,
      }))
    : navLinks;

  const finalCtaText = puckGlobals.navCtaText || (navLinks.find(link => link.isAuth)?.LinkText) || "Get Started";
  const finalCtaHref = puckGlobals.navCtaHref || (navLinks.find(link => link.isAuth)?.href) || "#";
  const hasCtaFromPuck = !!(puckGlobals.navCtaText && puckGlobals.navCtaHref);
  const hasCtaFromStrapi = !!navLinks.find(link => link.isAuth);

  // Filter authenticated links if needed
  const navigation = finalNavLinks || [];

  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-800">
      <nav className="container relative flex flex-wrap items-center justify-between px-4 py-2 mx-auto lg:justify-between xl:px-0 max-w-screen-xl" style={{maxHeight: '50px'}}>
        {/* Logo  */}

        <DisclosureClient topnav={{
          logoLink: {
            text: finalLogoText,
            href: finalLogoHref,
            image: {
              url: finalLogoImage,
              alternativeText: rawLogoImage?.alternativeText ?? null,
              name: rawLogoImage?.name ?? "logo"
            }
          },
          link: finalNavLinks.map(link => ({
            id: link.id,
            href: link.href,
            text: link.LinkText,
            external: false
          })),
          cta: {
            href: finalCtaHref,
            text: finalCtaText,
            external: false
          }
        }} />

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 list-none lg:flex">
            {navigation.filter(link => !link.isAuth).map((menu, index) => (
              <li className="nav__item" key={index}>
                <Link
                  href={menu.href}
                  className="inline-block px-3 py-2 text-sm font-nobel-content font-bold text-gray-800 no-underline uppercase dark:text-gray-200 hover:text-nobel-blue focus:text-nobel-blue focus:outline-none dark:hover:text-blue-400"
                >
                  {menu.LinkText}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden space-x-3 lg:flex lg:items-center nav__item">
          {(hasCtaFromPuck || hasCtaFromStrapi) && (
            <Link
              href={finalCtaHref}
              className="px-4 py-1.5 text-sm font-nobel-content font-bold text-white bg-nobel-blue rounded hover:bg-nobel-blue/90"
            >
              {finalCtaText}
            </Link>
          )}
          <ThemeChanger />
        </div>
      </nav>
    </div>
  );
}


