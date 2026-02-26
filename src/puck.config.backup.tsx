import { Config } from "@puckeditor/core";
import { Hero } from "@/components/Hero";
import { HomeValueSection } from "@/components/HomeValueSection";
import { StatsSection } from "@/components/StatsSection";
import { AdvantageSection } from "@/components/AdvantageSection";
import { RecommendedProperties } from "@/components/RecommendedProperties";
import { InsightsSection } from "@/components/InsightsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { MarketsSection } from "@/components/MarketsSection";
import { WhyJoinSection } from "@/components/WhyJoinSection";
import { ContactSection } from "@/components/ContactSection";
import { NavbarClient } from "@/components/NavbarClient";
import { FooterClient } from "@/components/FooterClient";
import { Section } from "@/components/puck/Section";
import { Columns } from "@/components/puck/Columns";
import { Heading } from "@/components/puck/Heading";
import { Text } from "@/components/puck/Text";
import { ImageComponent } from "@/components/puck/ImageComponent";
import { Button } from "@/components/puck/Button";
import { Spacer } from "@/components/puck/Spacer";

// Define the props types for each component
type Props = {
  Navbar: {
    logoText?: string;
    logoUrl?: string;
    logoHref?: string;
    links?: Array<{
      text: string;
      href: string;
      isAuth?: boolean;
    }>;
  };
  Hero: {
    heading: string;
    subheading?: string;
  };
  HomeValueSection: {
    heading: string;
    subheading?: string;
  };
  StatsSection: {
    heading: string;
    subheading?: string;
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
  AdvantageSection: {
    heading: string;
    subheading: string;
    items: Array<{
      icon: string;
      heading: string;
      text: string;
    }>;
  };
  RecommendedProperties: {
    heading: string;
    subheading?: string;
  };
  InsightsSection: {
    heading: string;
    subheading?: string;
  };
  ExperienceSection: {
    heading: string;
    text: string;
    ctaText?: string;
    ctaLink?: string;
  };
  MarketsSection: {
    heading: string;
    subheading?: string;
    markets: Array<{
      name: string;
      href: string;
    }>;
  };
  WhyJoinSection: {
    heading: string;
    subheading: string;
    text: string;
    ctaText?: string;
    ctaLink?: string;
  };
  ContactSection: {
    heading: string;
    subheading?: string;
  };
  Footer: {
    logoText?: string;
    logoUrl?: string;
    logoHref?: string;
    description?: string;
    colOneLinks?: Array<{
      text: string;
      href: string;
    }>;
    colTwoLinks?: Array<{
      text: string;
      href: string;
    }>;
    socialHeading?: string;
    socialLinks?: Array<{
      text: string;
      href: string;
    }>;
  };
  Section: {
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundSize?: "cover" | "contain" | "auto";
    backgroundPosition?: string;
    paddingTop?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    paddingRight?: string;
    marginTop?: string;
    marginBottom?: string;
    maxWidth?: "full" | "screen-xl" | "screen-lg" | "screen-md";
    textAlign?: "left" | "center" | "right";
    minHeight?: string;
    borderRadius?: string;
    boxShadow?: string;
  };
  Columns: {
    columns?: 2 | 3 | 4;
    gap?: string;
    stackOnMobile?: boolean;
    verticalAlign?: "top" | "center" | "bottom" | "stretch";
  };
  Heading: {
    text: string;
    level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    fontSize?: string;
    fontWeight?: "normal" | "medium" | "semibold" | "bold" | "extrabold";
    color?: string;
    textAlign?: "left" | "center" | "right";
    marginTop?: string;
    marginBottom?: string;
    letterSpacing?: string;
    textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  };
  Text: {
    content: string;
    fontSize?: string;
    fontWeight?: "normal" | "medium" | "semibold" | "bold";
    color?: string;
    textAlign?: "left" | "center" | "right" | "justify";
    lineHeight?: string;
    marginTop?: string;
    marginBottom?: string;
    maxWidth?: string;
  };
  ImageComponent: {
    src: string;
    alt?: string;
    width?: string;
    height?: string;
    objectFit?: "cover" | "contain" | "fill" | "none";
    borderRadius?: string;
    boxShadow?: string;
    marginTop?: string;
    marginBottom?: string;
    align?: "left" | "center" | "right";
  };
  Button: {
    text: string;
    href?: string;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "small" | "medium" | "large";
    fullWidth?: boolean;
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: string;
    paddingX?: string;
    paddingY?: string;
    fontSize?: string;
    fontWeight?: "normal" | "medium" | "semibold" | "bold";
    boxShadow?: string;
    align?: "left" | "center" | "right";
    marginTop?: string;
    marginBottom?: string;
  };
  Spacer: {
    height?: string;
  };
  Container: {
    padding?: string;
  };
};

// Puck configuration
export const config: Config<Props> = {
  components: {
    Navbar: {
      fields: {
        logoText: {
          type: "text",
          label: "Logo Text",
        },
        logoUrl: {
          type: "text",
          label: "Logo Image URL",
        },
        logoHref: {
          type: "text",
          label: "Logo Link",
        },
        links: {
          type: "array",
          label: "Navigation Links",
          arrayFields: {
            text: {
              type: "text",
              label: "Link Text",
            },
            href: {
              type: "text",
              label: "URL",
            },
            isAuth: {
              type: "radio",
              label: "Is CTA Button?",
              options: [
                { label: "No", value: false },
                { label: "Yes", value: true },
              ],
            },
          },
          defaultItemProps: {
            text: "NEW LINK",
            href: "/new",
            isAuth: false,
          },
          getItemSummary: (item) => item.text || "Link",
        },
      },
      defaultProps: {
        logoText: "Nobel Realty Group",
        logoUrl: "/img/nobel-logo.png",
        logoHref: "/",
        links: [
          { text: "BUY", href: "/buy", isAuth: false },
          { text: "RENT", href: "/rent", isAuth: false },
          { text: "SELL", href: "/sell", isAuth: false },
          { text: "AGENTS", href: "/agents", isAuth: false },
          { text: "CONTACT US", href: "/contact", isAuth: false },
        ],
      },
      render: (props) => {
        return <NavbarClient {...props} />;
      },
    },
    Hero: {
      fields: {
        heading: {
          type: "text",
          label: "Heading",
        },
        subheading: {
          type: "textarea",
          label: "Subheading",
        },
      },
      defaultProps: {
        heading: "LOOKING FOR A PLACE YOU LOVE?",
        subheading: "We'll Get You There. Search Over 5 Million Homes for Sale Today",
      },
      render: ({ heading, subheading }) => {
        return <Hero data={{ heading, subheading }} />;
      },
    },
    HomeValueSection: {
      fields: {
        heading: {
          type: "text",
          label: "Heading",
        },
        subheading: {
          type: "textarea",
          label: "Subheading",
        },
      },
      defaultProps: {
        heading: "WHAT'S YOUR HOME WORTH?",
        subheading: "Get a FREE Instant Competitive Market Analysis",
      },
      render: ({ heading, subheading }) => {
        return <HomeValueSection data={{ heading, subheading }} />;
      },
    },
    StatsSection: {
      fields: {
        heading: {
          type: "text",
          label: "Heading",
        },
        subheading: {
          type: "textarea",
          label: "Subheading",
        },
        stats: {
          type: "array",
          label: "Statistics",
          arrayFields: {
            value: {
              type: "text",
              label: "Value",
            },
            label: {
              type: "text",
              label: "Label",
            },
          },
          defaultItemProps: {
            value: "0",
            label: "NEW STAT",
          },
          getItemSummary: (item) => item.label || "Stat",
        },
      },
      defaultProps: {
        heading: "YOUR AREA SO DAY MARKET IN A GLANCE",
        subheading: "Looking for a new home? Let us summarize properties in your area",
        stats: [
          { value: "394", label: "NEW TODAY" },
          { value: "23", label: "PRICE INCREASED" },
          { value: "12", label: "OPEN HOUSE" },
          { value: "36", label: "PRICE REDUCED" },
          { value: "62", label: "BACK ON MARKET" },
          { value: "89", label: "FORECLOSURES" },
        ],
      },
      render: ({ heading, subheading, stats }) => {
        const formattedStats = stats.map((stat, index) => ({
          id: index + 1,
          value: stat.value,
          label: stat.label,
        }));
        return <StatsSection data={{ heading, subheading, stats: formattedStats }} />;
      },
    },
    AdvantageSection: {
      fields: {
        heading: {
          type: "text",
          label: "Heading",
        },
        subheading: {
          type: "textarea",
          label: "Subheading",
        },
        items: {
          type: "array",
          label: "Advantage Items",
          arrayFields: {
            icon: {
              type: "text",
              label: "Icon (emoji or text)",
            },
            heading: {
              type: "text",
              label: "Item Heading",
            },
            text: {
              type: "textarea",
              label: "Description",
            },
          },
          defaultItemProps: {
            icon: "💡",
            heading: "New Advantage",
            text: "Description of the advantage...",
          },
          getItemSummary: (item) => item.heading || "Advantage",
        },
      },
      defaultProps: {
        heading: "THE NOBEL GROUP ADVANTAGE",
        subheading: "Welcome to the Future of Real Estate Buying and Selling. Where Technology Meets Realtor!",
        items: [
          {
            icon: "💼",
            heading: "Expert Advice and Perspectives",
            text: "Take advantage of our local expertise to connect you with the right home.",
          },
          {
            icon: "🏠",
            heading: "Local Home Ownership Made Easy",
            text: "With more than 40 years of experience, our team has a strong local presence.",
          },
        ],
      },
      render: ({ heading, subheading, items }) => {
        const formattedItems = items.map((item, index) => ({
          id: index + 1,
          icon: item.icon,
          heading: item.heading,
          text: item.text,
        }));
        return <AdvantageSection data={{ heading, subheading, items: formattedItems }} />;
      },
    },
    RecommendedProperties: {
      fields: {
        heading: {
          type: "text",
          label: "Heading",
        },
        subheading: {
          type: "textarea",
          label: "Subheading",
        },
      },
      defaultProps: {
        heading: "RECOMMENDED FOR YOU",
        subheading: "Listings we think you'll love",
      },
      render: ({ heading, subheading }) => {
        // This component fetches its own data from Strapi
        return <RecommendedProperties data={{ heading, subheading, properties: [], ctaLink: { href: "/properties", text: "VIEW ALL" } }} />;
      },
    },
    InsightsSection: {
      fields: {
        heading: {
          type: "text",
          label: "Heading",
        },
        subheading: {
          type: "textarea",
          label: "Subheading",
        },
      },
      defaultProps: {
        heading: "NOBEL KNOWS INSIGHTS",
        subheading: "Explore your real people around your neighborhood",
      },
      render: ({ heading, subheading }) => {
        // This component fetches its own data from Strapi
        return <InsightsSection data={{ heading, subheading, insights: [], ctaLink: { href: "/insights", text: "VIEW ALL" } }} />;
      },
    },
    ExperienceSection: {
      fields: {
        heading: {
          type: "text",
          label: "Heading",
        },
        text: {
          type: "textarea",
          label: "Description",
        },
        ctaText: {
          type: "text",
          label: "CTA Button Text",
        },
        ctaLink: {
          type: "text",
          label: "CTA Button Link",
        },
      },
      defaultProps: {
        heading: "ELEVATE YOUR EXPERIENCE",
        text: "Our Concierge And A Nobel Realty Group Real Estate Agent Today",
        ctaText: "CONNECT WITH A CONCIERGE",
        ctaLink: "/concierge",
      },
      render: ({ heading, text, ctaText, ctaLink }) => {
        return (
          <ExperienceSection
            data={{
              heading,
              text,
              ctaLink: { href: ctaLink || "/concierge", text: ctaText || "CONNECT" },
              image: { url: "/img/homepage-find-agent.webp", alternativeText: "Experience" },
            }}
          />
        );
      },
    },
    MarketsSection: {
      fields: {
        heading: {
          type: "text",
          label: "Heading",
        },
        subheading: {
          type: "textarea",
          label: "Subheading",
        },
        markets: {
          type: "array",
          label: "Markets",
          arrayFields: {
            name: {
              type: "text",
              label: "Market Name",
            },
            href: {
              type: "text",
              label: "Link",
            },
          },
          defaultItemProps: {
            name: "NEW MARKET, FL",
            href: "/markets/new-market",
          },
          getItemSummary: (item) => item.name || "Market",
        },
      },
      defaultProps: {
        heading: "EXPLORE POPULAR REAL ESTATE MARKETS",
        subheading: "Learn about real estate by exploring the top local markets",
        markets: [
          { name: "ATLANTIC BEACH, FL", href: "/markets/atlantic-beach" },
          { name: "FERNANDINA BEACH, FL", href: "/markets/fernandina-beach" },
          { name: "JACKSONVILLE BEACH, FL", href: "/markets/jacksonville-beach" },
        ],
      },
      render: ({ heading, subheading, markets }) => {
        const formattedMarkets = markets.map((market, index) => ({
          id: index + 1,
          name: market.name,
          href: market.href,
        }));
        return <MarketsSection data={{ heading, subheading, markets: formattedMarkets }} />;
      },
    },
    WhyJoinSection: {
      fields: {
        heading: {
          type: "text",
          label: "Heading",
        },
        subheading: {
          type: "textarea",
          label: "Subheading",
        },
        text: {
          type: "textarea",
          label: "Description",
        },
        ctaText: {
          type: "text",
          label: "CTA Button Text",
        },
        ctaLink: {
          type: "text",
          label: "CTA Button Link",
        },
      },
      defaultProps: {
        heading: "WHY JOIN NOBEL REALTY GROUP?",
        subheading: "Award-Winning Buying and Selling",
        text: "At NOBEL REALTY GROUP, we offer comprehensive support and coaching.",
        ctaText: "JOIN THE NOBEL REALTY GROUP",
        ctaLink: "/join",
      },
      render: ({ heading, subheading, text, ctaText, ctaLink }) => {
        return (
          <WhyJoinSection
            data={{
              heading,
              subheading,
              text,
              ctaLink: { href: ctaLink || "/join", text: ctaText || "JOIN US" },
              image: { url: "/img/homepage-join-our-team.webp", alternativeText: "Join Us" },
            }}
          />
        );
      },
    },
    ContactSection: {
      fields: {
        heading: {
          type: "text",
          label: "Heading",
        },
        subheading: {
          type: "textarea",
          label: "Subheading",
        },
      },
      defaultProps: {
        heading: "CONNECT WITH US",
        subheading: "Connect with a Nobel Realty Group Real Estate Agent Today",
      },
      render: ({ heading, subheading }) => {
        return <ContactSection data={{ heading, subheading }} />;
      },
    },
    Footer: {
      fields: {
        logoText: {
          type: "text",
          label: "Logo Text",
        },
        logoUrl: {
          type: "text",
          label: "Logo Image URL",
        },
        logoHref: {
          type: "text",
          label: "Logo Link",
        },
        description: {
          type: "textarea",
          label: "Description",
        },
        colOneLinks: {
          type: "array",
          label: "Column 1 Links",
          arrayFields: {
            text: {
              type: "text",
              label: "Link Text",
            },
            href: {
              type: "text",
              label: "URL",
            },
          },
          defaultItemProps: {
            text: "New Link",
            href: "/new",
          },
          getItemSummary: (item) => item.text || "Link",
        },
        colTwoLinks: {
          type: "array",
          label: "Column 2 Links",
          arrayFields: {
            text: {
              type: "text",
              label: "Link Text",
            },
            href: {
              type: "text",
              label: "URL",
            },
          },
          defaultItemProps: {
            text: "New Link",
            href: "/new",
          },
          getItemSummary: (item) => item.text || "Link",
        },
        socialHeading: {
          type: "text",
          label: "Social Section Heading",
        },
        socialLinks: {
          type: "array",
          label: "Social Links",
          arrayFields: {
            text: {
              type: "select",
              label: "Platform",
              options: [
                { label: "Facebook", value: "Facebook" },
                { label: "Instagram", value: "Instagram" },
                { label: "LinkedIn", value: "LinkedIn" },
                { label: "Twitter", value: "Twitter" },
                { label: "YouTube", value: "YouTube" },
              ],
            },
            href: {
              type: "text",
              label: "URL",
            },
          },
          defaultItemProps: {
            text: "Facebook",
            href: "https://www.facebook.com",
          },
          getItemSummary: (item) => item.text || "Social Link",
        },
      },
      defaultProps: {
        logoText: "NOBEL",
        logoUrl: "/img/logo.svg",
        logoHref: "/",
        description: "NOBEL Realty Group - Award-winning buying and selling real estate services in Florida.",
        colOneLinks: [
          { text: "Buy a Home", href: "/buy" },
          { text: "Sell a Home", href: "/sell" },
          { text: "Rent a Home", href: "/rent" },
          { text: "Our Agents", href: "/agents" },
          { text: "About Us", href: "/about" },
        ],
        colTwoLinks: [
          { text: "Contact", href: "/contact" },
          { text: "Careers", href: "/careers" },
          { text: "Insights", href: "/insights" },
        ],
        socialHeading: "Follow us!",
        socialLinks: [
          { text: "Facebook", href: "https://www.facebook.com" },
          { text: "Instagram", href: "https://www.instagram.com" },
          { text: "LinkedIn", href: "https://www.linkedin.com" },
          { text: "Twitter", href: "https://www.twitter.com" },
        ],
      },
      render: (props) => {
        return <FooterClient {...props} />;
      },
    },
    Section: {
      fields: {
        backgroundColor: {
          type: "text",
          label: "Background Color (e.g., #FF5733, rgb(255,87,51), transparent)",
        },
        backgroundImage: {
          type: "text",
          label: "Background Image URL",
        },
        backgroundSize: {
          type: "select",
          label: "Background Size",
          options: [
            { value: "cover", label: "Cover" },
            { value: "contain", label: "Contain" },
            { value: "auto", label: "Auto" },
          ],
        },
        backgroundPosition: {
          type: "text",
          label: "Background Position",
        },
        paddingTop: {
          type: "text",
          label: "Padding Top",
        },
        paddingBottom: {
          type: "text",
          label: "Padding Bottom",
        },
        paddingLeft: {
          type: "text",
          label: "Padding Left",
        },
        paddingRight: {
          type: "text",
          label: "Padding Right",
        },
        marginTop: {
          type: "text",
          label: "Margin Top",
        },
        marginBottom: {
          type: "text",
          label: "Margin Bottom",
        },
        maxWidth: {
          type: "select",
          label: "Max Width",
          options: [
            { value: "full", label: "Full Width" },
            { value: "screen-xl", label: "Extra Large" },
            { value: "screen-lg", label: "Large" },
            { value: "screen-md", label: "Medium" },
          ],
        },
        textAlign: {
          type: "radio",
          label: "Text Alignment",
          options: [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ],
        },
        minHeight: {
          type: "text",
          label: "Min Height",
        },
        borderRadius: {
          type: "text",
          label: "Border Radius",
        },
        boxShadow: {
          type: "text",
          label: "Box Shadow",
        },
      },
      defaultProps: {
        backgroundColor: "transparent",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "4rem",
        paddingBottom: "4rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        marginTop: "0",
        marginBottom: "0",
        maxWidth: "screen-xl",
        textAlign: "left",
        minHeight: "auto",
        borderRadius: "0",
        boxShadow: "none",
      },
      render: (props) => {
        return <Section {...props} />;
      },
    },
    Columns: {
      fields: {
        columns: {
          type: "radio",
          label: "Number of Columns",
          options: [
            { value: 2, label: "2 Columns" },
            { value: 3, label: "3 Columns" },
            { value: 4, label: "4 Columns" },
          ],
        },
        gap: {
          type: "text",
          label: "Gap Between Columns",
        },
        stackOnMobile: {
          type: "radio",
          label: "Stack on Mobile",
          options: [
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ],
        },
        verticalAlign: {
          type: "select",
          label: "Vertical Alignment",
          options: [
            { value: "top", label: "Top" },
            { value: "center", label: "Center" },
            { value: "bottom", label: "Bottom" },
            { value: "stretch", label: "Stretch" },
          ],
        },
      },
      defaultProps: {
        columns: 2,
        gap: "2rem",
        stackOnMobile: true,
        verticalAlign: "top",
      },
      render: (props) => {
        return <Columns {...props} />;
      },
    },
    Heading: {
      fields: {
        text: {
          type: "textarea",
          label: "Heading Text",
        },
        level: {
          type: "select",
          label: "Heading Level",
          options: [
            { value: "h1", label: "H1" },
            { value: "h2", label: "H2" },
            { value: "h3", label: "H3" },
            { value: "h4", label: "H4" },
            { value: "h5", label: "H5" },
            { value: "h6", label: "H6" },
          ],
        },
        fontSize: {
          type: "text",
          label: "Font Size (e.g., 2rem, 24px)",
        },
        fontWeight: {
          type: "select",
          label: "Font Weight",
          options: [
            { value: "normal", label: "Normal" },
            { value: "medium", label: "Medium" },
            { value: "semibold", label: "Semi Bold" },
            { value: "bold", label: "Bold" },
            { value: "extrabold", label: "Extra Bold" },
          ],
        },
        color: {
          type: "text",
          label: "Text Color (e.g., #000000, rgb(0,0,0), black)",
        },
        textAlign: {
          type: "radio",
          label: "Text Alignment",
          options: [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ],
        },
        marginTop: {
          type: "text",
          label: "Margin Top",
        },
        marginBottom: {
          type: "text",
          label: "Margin Bottom",
        },
        letterSpacing: {
          type: "text",
          label: "Letter Spacing",
        },
        textTransform: {
          type: "select",
          label: "Text Transform",
          options: [
            { value: "none", label: "None" },
            { value: "uppercase", label: "Uppercase" },
            { value: "lowercase", label: "Lowercase" },
            { value: "capitalize", label: "Capitalize" },
          ],
        },
      },
      defaultProps: {
        text: "Your Heading Here",
        level: "h2",
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#000",
        textAlign: "left",
        marginTop: "0",
        marginBottom: "1rem",
        letterSpacing: "normal",
        textTransform: "none",
      },
      render: (props) => {
        return <Heading {...props} />;
      },
    },
    Text: {
      fields: {
        content: {
          type: "textarea",
          label: "Text Content",
        },
        fontSize: {
          type: "text",
          label: "Font Size",
        },
        fontWeight: {
          type: "select",
          label: "Font Weight",
          options: [
            { value: "normal", label: "Normal" },
            { value: "medium", label: "Medium" },
            { value: "semibold", label: "Semi Bold" },
            { value: "bold", label: "Bold" },
          ],
        },
        color: {
          type: "text",
          label: "Text Color (e.g., #4B5563, rgb(75,85,99))",
        },
        textAlign: {
          type: "radio",
          label: "Text Alignment",
          options: [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
            { value: "justify", label: "Justify" },
          ],
        },
        lineHeight: {
          type: "text",
          label: "Line Height",
        },
        marginTop: {
          type: "text",
          label: "Margin Top",
        },
        marginBottom: {
          type: "text",
          label: "Margin Bottom",
        },
        maxWidth: {
          type: "text",
          label: "Max Width",
        },
      },
      defaultProps: {
        content: "Your text content here...",
        fontSize: "1rem",
        fontWeight: "normal",
        color: "#4B5563",
        textAlign: "left",
        lineHeight: "1.6",
        marginTop: "0",
        marginBottom: "1rem",
        maxWidth: "100%",
      },
      render: (props) => {
        return <Text {...props} />;
      },
    },
    ImageComponent: {
      fields: {
        src: {
          type: "text",
          label: "Image URL (paste image link or upload to /public/uploads/)",
        },
        alt: {
          type: "text",
          label: "Alt Text",
        },
        width: {
          type: "text",
          label: "Width",
        },
        height: {
          type: "text",
          label: "Height",
        },
        objectFit: {
          type: "select",
          label: "Object Fit",
          options: [
            { value: "cover", label: "Cover" },
            { value: "contain", label: "Contain" },
            { value: "fill", label: "Fill" },
            { value: "none", label: "None" },
          ],
        },
        borderRadius: {
          type: "text",
          label: "Border Radius",
        },
        boxShadow: {
          type: "text",
          label: "Box Shadow",
        },
        marginTop: {
          type: "text",
          label: "Margin Top",
        },
        marginBottom: {
          type: "text",
          label: "Margin Bottom",
        },
        align: {
          type: "radio",
          label: "Alignment",
          options: [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ],
        },
      },
      defaultProps: {
        src: "",
        alt: "Image",
        width: "100%",
        height: "auto",
        objectFit: "cover",
        borderRadius: "0",
        boxShadow: "none",
        marginTop: "0",
        marginBottom: "1rem",
        align: "center",
      },
      render: (props) => {
        return <ImageComponent {...props} />;
      },
    },
    Button: {
      fields: {
        text: {
          type: "text",
          label: "Button Text",
        },
        href: {
          type: "text",
          label: "Link URL",
        },
        variant: {
          type: "select",
          label: "Variant",
          options: [
            { value: "primary", label: "Primary" },
            { value: "secondary", label: "Secondary" },
            { value: "outline", label: "Outline" },
            { value: "ghost", label: "Ghost" },
          ],
        },
        size: {
          type: "radio",
          label: "Size",
          options: [
            { value: "small", label: "Small" },
            { value: "medium", label: "Medium" },
            { value: "large", label: "Large" },
          ],
        },
        fullWidth: {
          type: "radio",
          label: "Full Width",
          options: [
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ],
        },
        backgroundColor: {
          type: "text",
          label: "Background Color (overrides variant, e.g., #3B82F6)",
        },
        textColor: {
          type: "text",
          label: "Text Color (overrides variant, e.g., #FFFFFF)",
        },
        borderRadius: {
          type: "text",
          label: "Border Radius",
        },
        paddingX: {
          type: "text",
          label: "Padding X (horizontal)",
        },
        paddingY: {
          type: "text",
          label: "Padding Y (vertical)",
        },
        fontSize: {
          type: "text",
          label: "Font Size",
        },
        fontWeight: {
          type: "select",
          label: "Font Weight",
          options: [
            { value: "normal", label: "Normal" },
            { value: "medium", label: "Medium" },
            { value: "semibold", label: "Semi Bold" },
            { value: "bold", label: "Bold" },
          ],
        },
        boxShadow: {
          type: "text",
          label: "Box Shadow",
        },
        align: {
          type: "radio",
          label: "Alignment",
          options: [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ],
        },
        marginTop: {
          type: "text",
          label: "Margin Top",
        },
        marginBottom: {
          type: "text",
          label: "Margin Bottom",
        },
      },
      defaultProps: {
        text: "Click Me",
        href: "#",
        variant: "primary",
        size: "medium",
        fullWidth: false,
        borderRadius: "0.375rem",
        fontWeight: "bold",
        boxShadow: "none",
        align: "left",
        marginTop: "0",
        marginBottom: "1rem",
      },
      render: (props) => {
        return <Button {...props} />;
      },
    },
    Spacer: {
      fields: {
        height: {
          type: "text",
          label: "Height (e.g., 2rem, 50px)",
        },
      },
      defaultProps: {
        height: "2rem",
      },
      render: (props) => {
        return <Spacer {...props} />;
      },
    },
    Container: {
      fields: {
        padding: {
          type: "select",
          label: "Padding",
          options: [
            { value: "none", label: "None" },
            { value: "small", label: "Small" },
            { value: "medium", label: "Medium" },
            { value: "large", label: "Large" },
          ],
        },
      },
      defaultProps: {
        padding: "medium",
      },
      render: ({ padding }) => {
        const paddingClasses = {
          none: "py-0",
          small: "py-4",
          medium: "py-8",
          large: "py-16",
        };
        // Simple container without DropZone for now
        return (
          <div className={paddingClasses[padding as keyof typeof paddingClasses]}>
            <p className="text-center text-gray-500">Container component</p>
          </div>
        );
      },
    },
  },
};

export default config;
