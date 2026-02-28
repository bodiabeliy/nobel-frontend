/**
 * Reads global (root-level) Puck settings from puck-data.json.
 * Used by server components like Navbar/Footer to apply editor overrides.
 */
import fs from "fs";
import path from "path";

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

export function getPuckGlobals(): PuckGlobals {
  try {
    const dataFilePath = path.join(process.cwd(), "puck-data.json");
    if (fs.existsSync(dataFilePath)) {
      const fileContent = fs.readFileSync(dataFilePath, "utf-8");
      const allData = JSON.parse(fileContent);
      // Read from the homepage "/" root props — treat as global settings
      const rootProps = allData["/"]?.root?.props;
      if (rootProps) {
        return rootProps;
      }
    }
  } catch (error) {
    console.error("Error reading Puck globals:", error);
  }
  return {};
}
