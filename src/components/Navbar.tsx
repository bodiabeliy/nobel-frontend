import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import { DisclosureClient } from "@/components/DisclosureClient";
import { fetchData } from "@/lib/fetch";
import { getStrapiURL } from "@/lib/utils";
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

interface NavLogo {
  id: number;
  LogoText: string;
  href: string;
  LogoImage: {
    id: number;
    url: string;
    alternativeText: string | null;
    name: string;
  };
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

  // Filter authenticated links if needed (you can adjust this logic)
  const navigation = navLinks || [];

  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-800">
      <nav className="container relative flex flex-wrap items-center justify-between px-4 py-2 mx-auto lg:justify-between xl:px-0 max-w-screen-xl" style={{maxHeight: '50px'}}>
        {/* Logo  */}

        <DisclosureClient topnav={{
          // id: navbar.id,
          logoLink: {
            // id: navLogo.id,
            text: navLogo.LogoText,
            href: navLogo.href,
            image: {
              // id: navLogo.LogoImage?.id,
              url: navLogo.LogoImage?.url,
              alternativeText: navLogo.LogoImage?.alternativeText,
              name: navLogo.LogoImage?.name
            }
          },
          link: navLinks.map(link => ({
            id: link.id,
            href: link.href,
            text: link.LinkText,
            external: false
          })),
          cta: navLinks.find(link => link.isAuth) ? {
            // id: navLinks.find(link => link.isAuth)!.id,
            href: navLinks.find(link => link.isAuth)!.href,
            text: navLinks.find(link => link.isAuth)!.LinkText,
            external: false
          } : {
            // id: 0,
            href: '#',
            text: 'Get Started',
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
          {navLinks.find(link => link.isAuth) && (
            <Link
              href={navLinks.find(link => link.isAuth)!.href}
              className="px-4 py-1.5 text-sm font-nobel-content font-bold text-white bg-nobel-blue rounded hover:bg-nobel-blue/90"
            >
              {navLinks.find(link => link.isAuth)!.LinkText}
            </Link>
          )}
          <ThemeChanger />
        </div>
      </nav>
    </div>
  );
}


