/**
 * Reads global (root-level) Puck settings.
 * Tries Strapi puck-page collection first, falls back to local puck-data.json.
 * Used by server components like Navbar/Footer to apply editor overrides.
 */
import { getStrapiURL, getStrapiToken } from "@/lib/utils";

interface PuckGlobals {
  title?: string;
  // Navbar
  navLogoText?: string;
  navLogoImage?: string;
  navLinks?: { text: string; href: string }[];
  navCtaText?: string;
  navCtaHref?: string;
  // Footer
  footerDescription?: string;
  footerLogoText?: string;
  footerLogoImage?: string;
  footerColOneLinks?: { text: string; href: string }[];
  footerColTwoLinks?: { text: string; href: string }[];
  footerSocialHeading?: string;
  footerSocialLinks?: { text: string; href: string }[];
  footerCopyright?: string;
}

// Cache for the current request lifecycle (avoids repeated fetches during same render)
let cachedGlobals: PuckGlobals | null = null;
let cacheTime = 0;
const CACHE_TTL = 30_000; // 30 seconds

export async function getPuckGlobals(): Promise<PuckGlobals> {
  // Return cached if fresh
  if (cachedGlobals && Date.now() - cacheTime < CACHE_TTL) {
    return cachedGlobals;
  }

  // Try Strapi
  try {
    const base = getStrapiURL();
    const token = getStrapiToken();
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(
      `${base}/api/puck-pages?filters[path][$eq]=${encodeURIComponent("/")}`,
      { headers, next: { revalidate: 60 } }
    );
    if (res.ok) {
      const json = await res.json();
      const entry = json.data?.[0];
      if (entry) {
        const data = entry.data;
        const rootProps = data?.root?.props;
        if (rootProps) {
          cachedGlobals = rootProps;
          cacheTime = Date.now();
          return rootProps;
        }
      }
    }
  } catch (e) {
    // Strapi not reachable — try local
  }

  // Fallback: local filesystem (dev only)
  try {
    const fs = require("fs");
    const path = require("path");
    const dataFilePath = path.join(process.cwd(), "puck-data.json");
    if (fs.existsSync(dataFilePath)) {
      const fileContent = fs.readFileSync(dataFilePath, "utf-8");
      const allData = JSON.parse(fileContent);
      const rootProps = allData["/"]?.root?.props;
      if (rootProps) {
        cachedGlobals = rootProps;
        cacheTime = Date.now();
        return rootProps;
      }
    }
  } catch {
    // ignore
  }

  return {};
}
