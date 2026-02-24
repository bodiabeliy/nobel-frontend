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
  if (!data || !data.Navbar) return null;
  
  const navbar = data.Navbar;
  const navLogo = navbar.NavLogo;
  const navLinks = navbar.NavLinks;

  // Filter authenticated links if needed (you can adjust this logic)
  const navigation = navLinks || [];

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
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
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.filter(link => !link.isAuth).map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link
                  href={menu.href}
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  {menu.LinkText}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          {navLinks.find(link => link.isAuth) && (
            <Link
              href={navLinks.find(link => link.isAuth)!.href}
              className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5"
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


