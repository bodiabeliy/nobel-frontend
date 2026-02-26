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
