import type { Config, Slot } from "@puckeditor/core";
import React, { forwardRef, CSSProperties, ReactNode } from "react";
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

// ─── Spacing options ──────────────────────────────────────────────
const spacingOptions = [
  { label: "0px", value: "0px" },
  { label: "8px", value: "8px" },
  { label: "16px", value: "16px" },
  { label: "24px", value: "24px" },
  { label: "32px", value: "32px" },
  { label: "40px", value: "40px" },
  { label: "48px", value: "48px" },
  { label: "56px", value: "56px" },
  { label: "64px", value: "64px" },
  { label: "80px", value: "80px" },
  { label: "96px", value: "96px" },
  { label: "120px", value: "120px" },
  { label: "160px", value: "160px" },
];

// ─── Section wrapper (max-width container) ─────────────────────────
const SectionWrapper = forwardRef<
  HTMLDivElement,
  { children: ReactNode; maxWidth?: string; style?: CSSProperties; className?: string }
>(({ children, maxWidth = "1280px", style = {}, className }, ref) => (
  <div ref={ref} className={className} style={{ width: "100%", ...style }}>
    <div style={{ maxWidth, margin: "0 auto", padding: "0 16px" }}>{children}</div>
  </div>
));
SectionWrapper.displayName = "SectionWrapper";

// ─── Layout wrapper for inline components ──────────────────────────
type LayoutFieldProps = {
  padding?: string;
  spanCol?: number;
  spanRow?: number;
  grow?: boolean;
};

const layoutField = {
  type: "object" as const,
  label: "Layout",
  objectFields: {
    spanCol: { label: "Grid Columns", type: "number" as const, min: 1, max: 12 },
    spanRow: { label: "Grid Rows", type: "number" as const, min: 1, max: 12 },
    grow: {
      label: "Flex Grow",
      type: "radio" as const,
      options: [
        { label: "true", value: true },
        { label: "false", value: false },
      ],
    },
    padding: {
      type: "select" as const,
      label: "Vertical Padding",
      options: spacingOptions,
    },
  },
};

const LayoutDiv = forwardRef<
  HTMLDivElement,
  { children: ReactNode; layout?: LayoutFieldProps; className?: string; style?: CSSProperties }
>(({ children, layout, className, style }, ref) => (
  <div
    ref={ref}
    className={className}
    style={{
      gridColumn: layout?.spanCol ? `span ${Math.max(Math.min(layout.spanCol, 12), 1)}` : undefined,
      gridRow: layout?.spanRow ? `span ${Math.max(Math.min(layout.spanRow, 12), 1)}` : undefined,
      paddingTop: layout?.padding,
      paddingBottom: layout?.padding,
      flex: layout?.grow ? "1 1 0" : undefined,
      ...style,
    }}
  >
    {children}
  </div>
));
LayoutDiv.displayName = "LayoutDiv";

/**
 * withLayout HOC - makes components inline and adds layout fields.
 * Mirrors the official Puck demo's withLayout pattern.
 */
function withLayout<T extends Record<string, any>>(
  componentConfig: any
): any {
  return {
    ...componentConfig,
    fields: {
      ...componentConfig.fields,
      layout: layoutField,
    },
    defaultProps: {
      ...componentConfig.defaultProps,
      layout: {
        spanCol: 1,
        spanRow: 1,
        padding: "0px",
        grow: false,
        ...componentConfig.defaultProps?.layout,
      },
    },
    resolveFields: (_: any, params: any) => {
      if (params.parent?.type === "Grid") {
        return {
          ...componentConfig.fields,
          layout: {
            ...layoutField,
            objectFields: {
              spanCol: layoutField.objectFields.spanCol,
              spanRow: layoutField.objectFields.spanRow,
              padding: layoutField.objectFields.padding,
            },
          },
        };
      }
      if (params.parent?.type === "Flex") {
        return {
          ...componentConfig.fields,
          layout: {
            ...layoutField,
            objectFields: {
              grow: layoutField.objectFields.grow,
              padding: layoutField.objectFields.padding,
            },
          },
        };
      }
      return {
        ...componentConfig.fields,
        layout: {
          ...layoutField,
          objectFields: {
            padding: layoutField.objectFields.padding,
          },
        },
      };
    },
    inline: true,
    render: (props: any) => (
      <LayoutDiv layout={props.layout as LayoutFieldProps} ref={props.puck.dragRef}>
        {componentConfig.render(props)}
      </LayoutDiv>
    ),
  };
}

// ═══════════════════════════════════════════════════════════════════
// LAYOUT COMPONENTS
// ═══════════════════════════════════════════════════════════════════

// ─── Grid ──────────────────────────────────────────────────────────
const GridConfig = {
  label: "Grid",
  fields: {
    numColumns: { type: "number" as const, label: "Number of columns", min: 1, max: 12 },
    gap: { label: "Gap", type: "number" as const, min: 0 },
    items: { type: "slot" as const },
  },
  defaultProps: {
    numColumns: 4,
    gap: 24,
    items: [],
  },
  render: ({ gap, numColumns, items: Items }: any) => (
    <SectionWrapper>
      <Items
        disallow={["Hero", "Navbar", "Footer"]}
        style={{
          display: "grid",
          gap: `${gap}px`,
          gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
          minHeight: "64px",
        }}
      />
    </SectionWrapper>
  ),
};

// ─── Flex ──────────────────────────────────────────────────────────
const FlexConfig = withLayout({
  label: "Flex",
  fields: {
    direction: {
      label: "Direction",
      type: "radio" as const,
      options: [
        { label: "Row", value: "row" },
        { label: "Column", value: "column" },
      ],
    },
    justifyContent: {
      label: "Justify Content",
      type: "radio" as const,
      options: [
        { label: "Start", value: "start" },
        { label: "Center", value: "center" },
        { label: "End", value: "end" },
      ],
    },
    gap: { label: "Gap", type: "number" as const, min: 0 },
    wrap: {
      label: "Wrap",
      type: "radio" as const,
      options: [
        { label: "true", value: "wrap" },
        { label: "false", value: "nowrap" },
      ],
    },
    items: { type: "slot" as const },
  },
  defaultProps: {
    justifyContent: "start",
    direction: "row",
    gap: 24,
    wrap: "wrap",
    layout: { grow: true },
    items: [],
  },
  render: ({ justifyContent, direction, gap, wrap, items: Items }: any) => (
    <SectionWrapper style={{ height: "100%" }}>
      <Items
        disallow={["Hero", "Navbar", "Footer"]}
        style={{
          display: "flex",
          justifyContent,
          flexDirection: direction,
          gap: `${gap}px`,
          flexWrap: wrap,
          minHeight: "64px",
        }}
      />
    </SectionWrapper>
  ),
});

// ─── Space ─────────────────────────────────────────────────────────
const SpaceConfig = {
  label: "Space",
  fields: {
    size: { type: "select" as const, options: spacingOptions },
    direction: {
      type: "radio" as const,
      options: [
        { value: "vertical", label: "Vertical" },
        { value: "horizontal", label: "Horizontal" },
        { value: "", label: "Both" },
      ],
    },
  },
  defaultProps: {
    direction: "",
    size: "24px",
  },
  inline: true,
  render: ({ direction, size, puck }: any) => {
    const isVertical = direction === "vertical" || direction === "";
    const isHorizontal = direction === "horizontal" || direction === "";
    return (
      <div
        ref={puck.dragRef}
        style={{
          width: isHorizontal ? size : "100%",
          height: isVertical ? size : "auto",
          minWidth: isHorizontal ? size : undefined,
          minHeight: isVertical ? size : undefined,
        }}
      />
    );
  },
};

// ═══════════════════════════════════════════════════════════════════
// TYPOGRAPHY COMPONENTS
// ═══════════════════════════════════════════════════════════════════

// ─── Heading ───────────────────────────────────────────────────────
const sizeMap: Record<string, string> = {
  xxxl: "64px",
  xxl: "48px",
  xl: "40px",
  l: "32px",
  m: "24px",
  s: "20px",
  xs: "16px",
};

const HeadingConfig = withLayout({
  label: "Heading",
  fields: {
    text: { type: "textarea" as const, contentEditable: true },
    size: {
      type: "select" as const,
      options: [
        { value: "xxxl", label: "XXXL" },
        { value: "xxl", label: "XXL" },
        { value: "xl", label: "XL" },
        { value: "l", label: "L" },
        { value: "m", label: "M" },
        { value: "s", label: "S" },
        { value: "xs", label: "XS" },
      ],
    },
    level: {
      type: "select" as const,
      label: "Level",
      options: [
        { label: "", value: "" },
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
        { label: "6", value: "6" },
      ],
    },
    align: {
      type: "radio" as const,
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
  },
  defaultProps: {
    align: "left",
    text: "Heading",
    size: "m",
    layout: { padding: "8px" },
  },
  render: ({ align, text, size, level }: any) => {
    const Tag = level ? (`h${level}` as keyof JSX.IntrinsicElements) : "h2";
    return (
      <SectionWrapper>
        <Tag
          style={{
            display: "block",
            textAlign: align,
            width: "100%",
            fontSize: sizeMap[size] || "24px",
            fontWeight: 700,
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {text}
        </Tag>
      </SectionWrapper>
    );
  },
});

// ─── Text ──────────────────────────────────────────────────────────
const TextConfig = withLayout({
  label: "Text",
  fields: {
    text: { type: "textarea" as const, contentEditable: true },
    size: {
      type: "select" as const,
      options: [
        { label: "S", value: "s" },
        { label: "M", value: "m" },
      ],
    },
    align: {
      type: "radio" as const,
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    color: {
      type: "radio" as const,
      options: [
        { label: "Default", value: "default" },
        { label: "Muted", value: "muted" },
      ],
    },
    maxWidth: { type: "text" as const },
  },
  defaultProps: {
    align: "left",
    text: "Text",
    size: "m",
    color: "default",
  },
  render: ({ align, color, text, size, maxWidth }: any) => (
    <SectionWrapper maxWidth={maxWidth || "1280px"}>
      <span
        style={{
          color: color === "default" ? "inherit" : "var(--puck-color-grey-05, #666)",
          display: "flex",
          textAlign: align,
          width: "100%",
          fontSize: size === "m" ? "20px" : "16px",
          fontWeight: 300,
          maxWidth: maxWidth || undefined,
          justifyContent:
            align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
        }}
      >
        {text}
      </span>
    </SectionWrapper>
  ),
});

// ─── RichText ──────────────────────────────────────────────────────
const RichTextConfig = withLayout({
  label: "RichText",
  fields: {
    richtext: { type: "richtext" as const },
  },
  defaultProps: {
    richtext: "<h2>Heading</h2><p>Body text goes here. You can use <strong>bold</strong>, <em>italic</em>, and more.</p>",
  },
  render: ({ richtext }: any) => (
    <SectionWrapper>
      <div style={{ lineHeight: 1.6 }}>{richtext}</div>
    </SectionWrapper>
  ),
});

// ═══════════════════════════════════════════════════════════════════
// ACTIONS COMPONENTS
// ═══════════════════════════════════════════════════════════════════

// ─── Button ────────────────────────────────────────────────────────
const ButtonConfig = withLayout({
  label: "Button",
  fields: {
    label: { type: "text" as const, placeholder: "Button text...", contentEditable: true },
    href: { type: "text" as const },
    variant: {
      type: "radio" as const,
      options: [
        { label: "primary", value: "primary" },
        { label: "secondary", value: "secondary" },
      ],
    },
    size: {
      type: "radio" as const,
      options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
      ],
    },
  },
  defaultProps: {
    label: "Button",
    href: "#",
    variant: "primary",
    size: "medium",
  },
  render: ({ href, variant, label, size, puck }: any) => {
    const isPrimary = variant === "primary";
    const sizeStyles: Record<string, CSSProperties> = {
      small: { padding: "8px 16px", fontSize: "14px" },
      medium: { padding: "12px 24px", fontSize: "16px" },
      large: { padding: "16px 32px", fontSize: "18px" },
    };
    return (
      <div>
        <a
          href={puck.isEditing ? "#" : href}
          style={{
            display: "inline-block",
            ...sizeStyles[size] || sizeStyles.medium,
            backgroundColor: isPrimary ? "#000" : "transparent",
            color: isPrimary ? "#fff" : "#000",
            border: isPrimary ? "2px solid #000" : "2px solid #000",
            borderRadius: "4px",
            textDecoration: "none",
            fontWeight: 600,
            cursor: "pointer",
            textAlign: "center",
            transition: "all 0.2s",
          }}
          tabIndex={puck.isEditing ? -1 : undefined}
        >
          {label}
        </a>
      </div>
    );
  },
});

// ═══════════════════════════════════════════════════════════════════
// OTHER COMPONENTS
// ═══════════════════════════════════════════════════════════════════

// ─── Card ──────────────────────────────────────────────────────────
const CardConfig = withLayout({
  label: "Card",
  fields: {
    title: { type: "text" as const, contentEditable: true },
    description: { type: "textarea" as const, contentEditable: true },
    icon: { type: "text" as const, label: "Icon (emoji)" },
    mode: {
      type: "radio" as const,
      options: [
        { label: "card", value: "card" },
        { label: "flat", value: "flat" },
      ],
    },
  },
  defaultProps: {
    title: "Title",
    description: "Description",
    icon: "✨",
    mode: "flat",
  },
  render: ({ title, icon, description, mode }: any) => {
    const isCard = mode === "card";
    return (
      <div
        style={{
          padding: "24px",
          borderRadius: isCard ? "8px" : "0",
          border: isCard ? "1px solid #e5e7eb" : "none",
          backgroundColor: isCard ? "#fff" : "transparent",
          boxShadow: isCard ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
          height: "100%",
        }}
      >
        {icon && <div style={{ fontSize: "32px", marginBottom: "12px" }}>{icon}</div>}
        <div style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>{title}</div>
        <div style={{ fontSize: "14px", color: "#666", lineHeight: 1.5 }}>{description}</div>
      </div>
    );
  },
});

// ─── Image ─────────────────────────────────────────────────────────
const ImageConfig = withLayout({
  label: "Image",
  fields: {
    url: { type: "text" as const, label: "Image URL" },
    alt: { type: "text" as const, label: "Alt text" },
    width: { type: "text" as const, label: "Width (e.g. 100%, 400px)" },
    height: { type: "text" as const, label: "Height (e.g. auto, 300px)" },
    objectFit: {
      type: "select" as const,
      label: "Object Fit",
      options: [
        { label: "Cover", value: "cover" },
        { label: "Contain", value: "contain" },
        { label: "Fill", value: "fill" },
        { label: "None", value: "none" },
      ],
    },
    borderRadius: { type: "text" as const, label: "Border Radius" },
  },
  defaultProps: {
    url: "https://placehold.co/600x400",
    alt: "Image",
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: "0px",
  },
  render: ({ url, alt, width, height, objectFit, borderRadius }: any) => (
    <SectionWrapper>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={alt || ""}
        style={{
          width: width || "100%",
          height: height || "auto",
          objectFit: objectFit || "cover",
          borderRadius: borderRadius || "0px",
          display: "block",
        }}
      />
    </SectionWrapper>
  ),
});

// ═══════════════════════════════════════════════════════════════════
// NOBEL PAGE SECTION COMPONENTS
// ═══════════════════════════════════════════════════════════════════

const NavbarConfig = {
  label: "Navbar",
  fields: {
    logoText: { type: "text" as const },
    logoUrl: { type: "text" as const },
    logoHref: { type: "text" as const },
    links: {
      type: "array" as const,
      arrayFields: {
        text: { type: "text" as const },
        href: { type: "text" as const },
        isAuth: { type: "radio" as const, options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
      },
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
  render: ({ logoText, logoUrl, logoHref, links }: any) => (
    <NavbarClient logoText={logoText} logoUrl={logoUrl} logoHref={logoHref} links={links} />
  ),
};

const HeroConfig = {
  label: "Hero",
  fields: {
    heading: { type: "text" as const, contentEditable: true },
    subheading: { type: "textarea" as const, contentEditable: true },
  },
  defaultProps: {
    heading: "LOOKING FOR A PLACE YOU LOVE?",
    subheading: "We'll Get You There. Search Over 5 Million Homes for Sale Today",
  },
  render: ({ heading, subheading }: any) => (
    <Hero data={{ heading, subheading }} />
  ),
};

const HomeValueSectionConfig = {
  label: "HomeValueSection",
  fields: {
    heading: { type: "text" as const, contentEditable: true },
    subheading: { type: "textarea" as const, contentEditable: true },
  },
  defaultProps: {
    heading: "WHAT'S YOUR HOME WORTH?",
    subheading: "Get a FREE Instant Competitive Market Analysis",
  },
  render: ({ heading, subheading }: any) => (
    <HomeValueSection data={{ heading, subheading }} />
  ),
};

const StatsSectionConfig = {
  label: "StatsSection",
  fields: {
    heading: { type: "text" as const, contentEditable: true },
    subheading: { type: "textarea" as const, contentEditable: true },
    stats: {
      type: "array" as const,
      arrayFields: {
        value: { type: "text" as const },
        label: { type: "text" as const },
      },
    },
  },
  defaultProps: {
    heading: "YOUR AREA'S DAY MARKET IN A GLANCE",
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
  render: ({ heading, subheading, stats }: any) => (
    <StatsSection data={{ heading, subheading, stats }} />
  ),
};

const AdvantageSectionConfig = {
  label: "AdvantageSection",
  fields: {
    heading: { type: "text" as const, contentEditable: true },
    subheading: { type: "textarea" as const, contentEditable: true },
    items: {
      type: "array" as const,
      arrayFields: {
        icon: { type: "text" as const },
        heading: { type: "text" as const },
        text: { type: "textarea" as const },
      },
    },
  },
  defaultProps: {
    heading: "THE NOBEL GROUP ADVANTAGE",
    subheading: "Welcome to the Future of Real Estate Buying and Selling",
    items: [
      { icon: "💼", heading: "Expert Advice", text: "Local expertise to connect you with the right home." },
      { icon: "🏠", heading: "Home Ownership Made Easy", text: "40+ years of experience." },
      { icon: "📊", heading: "Make the Best Deal", text: "Detailed analysis of market trends." },
      { icon: "🎯", heading: "Stand Out", text: "Highly personalized listing presentations." },
    ],
  },
  render: ({ heading, subheading, items }: any) => (
    <AdvantageSection data={{ heading, subheading, items }} />
  ),
};

const RecommendedPropertiesConfig = {
  label: "RecommendedProperties",
  fields: {
    heading: { type: "text" as const, contentEditable: true },
    subheading: { type: "textarea" as const, contentEditable: true },
  },
  defaultProps: {
    heading: "RECOMMENDED FOR YOU",
    subheading: "Listings we think you'll love",
  },
  render: ({ heading, subheading }: any) => (
    <RecommendedProperties data={{ heading, subheading, properties: [] }} />
  ),
};

const InsightsSectionConfig = {
  label: "InsightsSection",
  fields: {
    heading: { type: "text" as const, contentEditable: true },
    subheading: { type: "textarea" as const, contentEditable: true },
  },
  defaultProps: {
    heading: "NOBEL KNOWS INSIGHTS",
    subheading: "Explore your real people around your neighborhood",
  },
  render: ({ heading, subheading }: any) => (
    <InsightsSection data={{ heading, subheading, insights: [] }} />
  ),
};

const ExperienceSectionConfig = {
  label: "ExperienceSection",
  fields: {
    heading: { type: "text" as const, contentEditable: true },
    text: { type: "textarea" as const, contentEditable: true },
    ctaText: { type: "text" as const },
    ctaLink: { type: "text" as const },
  },
  defaultProps: {
    heading: "ELEVATE YOUR EXPERIENCE",
    text: "Our Concierge And A Nobel Realty Group Real Estate Agent Today",
    ctaText: "CONNECT WITH A CONCIERGE",
    ctaLink: "/concierge",
  },
  render: ({ heading, text, ctaText, ctaLink }: any) => (
    <ExperienceSection data={{ heading, text, ctaLink: { href: ctaLink, text: ctaText }, image: { url: "/img/brands/experience.jpg", alternativeText: "Experience" } }} />
  ),
};

const MarketsSectionConfig = {
  label: "MarketsSection",
  fields: {
    heading: { type: "text" as const, contentEditable: true },
    subheading: { type: "textarea" as const, contentEditable: true },
    markets: {
      type: "array" as const,
      arrayFields: {
        name: { type: "text" as const },
        href: { type: "text" as const },
      },
    },
  },
  defaultProps: {
    heading: "EXPLORE POPULAR REAL ESTATE MARKETS",
    subheading: "Learn about real estate by exploring the top local markets",
    markets: [
      { name: "ATLANTIC BEACH, FL", href: "/markets/atlantic-beach" },
      { name: "FERNANDINA BEACH, FL", href: "/markets/fernandina-beach" },
      { name: "JACKSONVILLE BEACH, FL", href: "/markets/jacksonville-beach" },
      { name: "NEPTUNE BEACH, FL", href: "/markets/neptune-beach" },
    ],
  },
  render: ({ heading, subheading, markets }: any) => (
    <MarketsSection data={{ heading, subheading, markets }} />
  ),
};

const WhyJoinSectionConfig = {
  label: "WhyJoinSection",
  fields: {
    heading: { type: "text" as const, contentEditable: true },
    subheading: { type: "textarea" as const, contentEditable: true },
    text: { type: "textarea" as const },
    ctaText: { type: "text" as const },
    ctaLink: { type: "text" as const },
  },
  defaultProps: {
    heading: "WHY JOIN NOBEL REALTY GROUP?",
    subheading: "Award-Winning Buying and Selling",
    text: "At NOBEL REALTY GROUP, we offer comprehensive support and coaching.",
    ctaText: "JOIN THE NOBEL REALTY GROUP",
    ctaLink: "/join",
  },
  render: ({ heading, subheading, text, ctaText, ctaLink }: any) => (
    <WhyJoinSection data={{ heading, subheading, text, ctaLink: { href: ctaLink, text: ctaText }, image: { url: "/img/brands/why-join.jpg", alternativeText: "Why Join" } }} />
  ),
};

const ContactSectionConfig = {
  label: "ContactSection",
  fields: {
    heading: { type: "text" as const, contentEditable: true },
    subheading: { type: "textarea" as const, contentEditable: true },
  },
  defaultProps: {
    heading: "CONNECT WITH US",
    subheading: "Connect with a Nobel Realty Group Real Estate Agent Today",
  },
  render: ({ heading, subheading }: any) => (
    <ContactSection data={{ heading, subheading }} />
  ),
};

const FooterConfig = {
  label: "Footer",
  fields: {
    logoText: { type: "text" as const },
    logoUrl: { type: "text" as const },
    logoHref: { type: "text" as const },
    description: { type: "textarea" as const },
    colOneLinks: {
      type: "array" as const,
      label: "Column 1 Links",
      arrayFields: {
        text: { type: "text" as const },
        href: { type: "text" as const },
      },
    },
    colTwoLinks: {
      type: "array" as const,
      label: "Column 2 Links",
      arrayFields: {
        text: { type: "text" as const },
        href: { type: "text" as const },
      },
    },
    socialHeading: { type: "text" as const },
    socialLinks: {
      type: "array" as const,
      label: "Social Links",
      arrayFields: {
        text: { type: "text" as const },
        href: { type: "text" as const },
      },
    },
  },
  defaultProps: {
    logoText: "NOBEL",
    logoUrl: "/img/logo.svg",
    logoHref: "/",
    description: "NOBEL Realty Group - Award-winning real estate services in Florida.",
    colOneLinks: [
      { text: "Buy a Home", href: "/buy" },
      { text: "Sell a Home", href: "/sell" },
      { text: "Rent a Home", href: "/rent" },
    ],
    colTwoLinks: [
      { text: "Contact", href: "/contact" },
      { text: "Careers", href: "/careers" },
    ],
    socialHeading: "Follow us!",
    socialLinks: [
      { text: "Facebook", href: "https://www.facebook.com" },
      { text: "Instagram", href: "https://www.instagram.com" },
      { text: "LinkedIn", href: "https://www.linkedin.com" },
    ],
  },
  render: (props: any) => (
    <FooterClient {...props} />
  ),
};

// ═══════════════════════════════════════════════════════════════════
// CONFIG EXPORT
// ═══════════════════════════════════════════════════════════════════

const config: Config = {
  categories: {
    layout: {
      title: "Layout",
      components: ["Grid", "Flex", "Space"],
    },
    typography: {
      title: "Typography",
      components: ["Heading", "Text", "RichText"],
    },
    actions: {
      title: "Actions",
      components: ["Button"],
    },
    media: {
      title: "Media",
      components: ["Image"],
    },
    other: {
      title: "Other",
      components: ["Card"],
    },
    nobelSections: {
      title: "Nobel Sections",
      components: [
        "Hero",
        "HomeValueSection",
        "StatsSection",
        "AdvantageSection",
        "RecommendedProperties",
        "InsightsSection",
        "ExperienceSection",
        "MarketsSection",
        "WhyJoinSection",
        "ContactSection",
      ],
    },
    navigation: {
      title: "Navigation",
      components: ["Navbar", "Footer"],
    },
  },
  components: {
    // Layout
    Grid: GridConfig as any,
    Flex: FlexConfig as any,
    Space: SpaceConfig as any,

    // Typography
    Heading: HeadingConfig as any,
    Text: TextConfig as any,
    RichText: RichTextConfig as any,

    // Actions
    Button: ButtonConfig as any,

    // Media
    Image: ImageConfig as any,

    // Other
    Card: CardConfig as any,

    // Nobel Sections
    Navbar: NavbarConfig as any,
    Hero: HeroConfig as any,
    HomeValueSection: HomeValueSectionConfig as any,
    StatsSection: StatsSectionConfig as any,
    AdvantageSection: AdvantageSectionConfig as any,
    RecommendedProperties: RecommendedPropertiesConfig as any,
    InsightsSection: InsightsSectionConfig as any,
    ExperienceSection: ExperienceSectionConfig as any,
    MarketsSection: MarketsSectionConfig as any,
    WhyJoinSection: WhyJoinSectionConfig as any,
    ContactSection: ContactSectionConfig as any,
    Footer: FooterConfig as any,
  },
};

export default config;
