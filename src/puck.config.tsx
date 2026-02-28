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
import { ProductGridClient } from "@/components/ProductGridClient";
import { AnimateWrapper, ANIMATION_OPTIONS, EASING_OPTIONS } from "@/components/AnimateWrapper";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ImageCarousel } from "@/components/ImageCarousel";

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
          className="text-gray-900 dark:text-white"
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
        className={color === "muted" ? "text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-gray-200"}
        style={{
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
      <div className="text-gray-800 dark:text-gray-200 prose dark:prose-invert max-w-none" style={{ lineHeight: 1.6 }}>{richtext}</div>
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
          className={isPrimary
            ? "bg-nobel-blue text-white border-nobel-blue hover:bg-nobel-blue/90"
            : "bg-transparent text-gray-900 dark:text-white border-gray-900 dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800"
          }
          style={{
            display: "inline-block",
            ...sizeStyles[size] || sizeStyles.medium,
            border: "2px solid",
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
        className={isCard
          ? "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
          : ""
        }
        style={{
          padding: "24px",
          borderRadius: isCard ? "8px" : "0",
          height: "100%",
        }}
      >
        {icon && <div style={{ fontSize: "32px", marginBottom: "12px" }}>{icon}</div>}
        <div className="text-gray-900 dark:text-white" style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>{title}</div>
        <div className="text-gray-500 dark:text-gray-400" style={{ fontSize: "14px", lineHeight: 1.5 }}>{description}</div>
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
    imageUrl: { type: "text" as const, label: "Image URL" },
    imageAlt: { type: "text" as const, label: "Image Alt Text" },
  },
  defaultProps: {
    heading: "ELEVATE YOUR EXPERIENCE",
    text: "Our Concierge And A Nobel Realty Group Real Estate Agent Today",
    ctaText: "CONNECT WITH A CONCIERGE",
    ctaLink: "/concierge",
    imageUrl: "/img/homepage-find-agent.webp",
    imageAlt: "Experience",
  },
  render: ({ heading, text, ctaText, ctaLink, imageUrl, imageAlt }: any) => (
    <ExperienceSection data={{ heading, text, ctaLink: { href: ctaLink, text: ctaText }, image: { url: imageUrl || "/img/homepage-find-agent.webp", alternativeText: imageAlt || "Experience" } }} />
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
    imageUrl: { type: "text" as const, label: "Image URL" },
    imageAlt: { type: "text" as const, label: "Image Alt Text" },
  },
  defaultProps: {
    heading: "WHY JOIN NOBEL REALTY GROUP?",
    subheading: "Award-Winning Buying and Selling",
    text: "At NOBEL REALTY GROUP, we offer comprehensive support and coaching.",
    ctaText: "JOIN THE NOBEL REALTY GROUP",
    ctaLink: "/join",
    imageUrl: "/img/homepage-join-our-team.webp",
    imageAlt: "Join Us",
  },
  render: ({ heading, subheading, text, ctaText, ctaLink, imageUrl, imageAlt }: any) => (
    <WhyJoinSection data={{ heading, subheading, text, ctaLink: { href: ctaLink, text: ctaText }, image: { url: imageUrl || "/img/homepage-join-our-team.webp", alternativeText: imageAlt || "Join Us" } }} />
  ),
};

const ContactSectionConfig = {
  label: "ContactSection",
  fields: {
    heading: { type: "text" as const, contentEditable: true },
    subheading: { type: "textarea" as const, contentEditable: true },
    firstNameLabel: { type: "text" as const, label: "First Name Label" },
    lastNameLabel: { type: "text" as const, label: "Last Name Label" },
    emailLabel: { type: "text" as const, label: "Email Label" },
    phoneLabel: { type: "text" as const, label: "Phone Label" },
    messageLabel: { type: "text" as const, label: "Message Label" },
    buttonText: { type: "text" as const, label: "Submit Button Text" },
    firstNamePlaceholder: { type: "text" as const, label: "First Name Placeholder" },
    lastNamePlaceholder: { type: "text" as const, label: "Last Name Placeholder" },
    emailPlaceholder: { type: "text" as const, label: "Email Placeholder" },
    phonePlaceholder: { type: "text" as const, label: "Phone Placeholder" },
    messagePlaceholder: { type: "text" as const, label: "Message Placeholder" },
  },
  defaultProps: {
    heading: "CONNECT WITH US",
    subheading: "Connect with a Nobel Realty Group Real Estate Agent Today",
    firstNameLabel: "First Name*",
    lastNameLabel: "Last Name*",
    emailLabel: "Email*",
    phoneLabel: "Phone Number",
    messageLabel: "Message*",
    buttonText: "Send Message",
    firstNamePlaceholder: "",
    lastNamePlaceholder: "",
    emailPlaceholder: "",
    phonePlaceholder: "",
    messagePlaceholder: "",
  },
  render: ({
    heading, subheading,
    firstNameLabel, lastNameLabel, emailLabel, phoneLabel, messageLabel,
    buttonText,
    firstNamePlaceholder, lastNamePlaceholder, emailPlaceholder, phonePlaceholder, messagePlaceholder,
  }: any) => (
    <ContactSection data={{
      heading, subheading,
      firstNameLabel, lastNameLabel, emailLabel, phoneLabel, messageLabel,
      buttonText,
      firstNamePlaceholder, lastNamePlaceholder, emailPlaceholder, phonePlaceholder, messagePlaceholder,
    }} />
  ),
};

// ═══════════════════════════════════════════════════════════════════
// STORE / MEDUSA COMPONENTS (Puck drag-and-drop elements)
// ═══════════════════════════════════════════════════════════════════

function formatProductPrice(variants: any[]): string {
  if (!variants?.length) return "Price TBD";
  let cheapest: number | null = null;
  let currencyCode = "usd";
  for (const variant of variants) {
    const amt = variant.calculated_price?.calculated_amount;
    const code = variant.calculated_price?.currency_code;
    if (amt != null && (cheapest === null || amt < cheapest)) {
      cheapest = amt;
      currencyCode = code || "usd";
    }
    // fallback to prices array
    for (const price of variant.prices || []) {
      if (price.amount != null && (cheapest === null || price.amount < cheapest)) {
        cheapest = price.amount;
        currencyCode = price.currency_code || "usd";
      }
    }
  }
  if (cheapest === null) return "Price TBD";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
  }).format(cheapest / 100);
}

const ProductGridConfig = {
  label: "Product Grid",
  fields: {
    heading: { type: "text" as const, label: "Heading" },
    columns: {
      type: "select" as const,
      label: "Columns",
      options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ],
    },
    maxProducts: {
      type: "number" as const,
      label: "Max Products",
      min: 1,
      max: 50,
    },
    showPrice: { type: "radio" as const, label: "Show Price", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
    source: {
      type: "select" as const,
      label: "Data Source",
      options: [
        { label: "Medusa (live)", value: "medusa" },
        { label: "Strapi (synced)", value: "strapi" },
      ],
    },
    resolvedProducts: { type: "custom" as const, label: " ", render: () => null },
  },
  defaultProps: {
    heading: "Our Products",
    columns: "3",
    maxProducts: 6,
    showPrice: "yes",
    source: "medusa",
    resolvedProducts: [] as any[],
  },
  resolveData: async ({ props }: any) => {
    const maxProducts = props.maxProducts || 6;
    const source = props.source || "medusa";
    let products: any[] = [];

    if (source === "medusa") {
      try {
        const medusaUrl =
          process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
        const publishableKey =
          process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (publishableKey) {
          headers["x-publishable-api-key"] = publishableKey;
        }

        // Get the first region for pricing context
        let regionId = "";
        try {
          const regRes = await fetch(`${medusaUrl}/store/regions`, { headers });
          if (regRes.ok) {
            const regData = await regRes.json();
            regionId = regData.regions?.[0]?.id || "";
          }
        } catch { /* ignore */ }

        const params = new URLSearchParams({
          limit: String(maxProducts),
          fields: "+variants.calculated_price",
        });
        if (regionId) params.set("region_id", regionId);

        const res = await fetch(
          `${medusaUrl}/store/products?${params.toString()}`,
          { headers }
        );
        if (res.ok) {
          const data = await res.json();
          products = (data.products || []).map((p: any) => ({
            id: p.id,
            title: p.title,
            handle: p.handle,
            thumbnail: p.thumbnail || p.images?.[0]?.url || "",
            price: formatProductPrice(p.variants),
          }));
        }
      } catch (e) {
        console.warn("[ProductGrid] Medusa fetch failed:", e);
      }
    } else {
      try {
        const strapiUrl =
          process.env.NEXT_PUBLIC_STRAPI_BASE_URL || "http://localhost:1337";
        const res = await fetch(
          `${strapiUrl}/api/medusa-products?pagination[pageSize]=${maxProducts}&sort=createdAt:desc`
        );
        if (res.ok) {
          const data = await res.json();
          products = (data.data || []).map((item: any) => ({
            id: item.medusa_id || item.id,
            title: item.title,
            handle: item.handle,
            thumbnail: item.thumbnail || "",
            price: item.variants?.[0]?.prices?.[0]
              ? `$${(item.variants[0].prices[0].amount / 100).toFixed(2)}`
              : "Price TBD",
          }));
        }
      } catch (e) {
        console.warn("[ProductGrid] Strapi fetch failed:", e);
      }
    }

    return {
      props: { ...props, resolvedProducts: products },
      readOnly: { resolvedProducts: true },
    };
  },
  render: ({ heading, columns, maxProducts, showPrice, source, resolvedProducts }: any) => (
    <ProductGridClient
      heading={heading}
      columns={columns}
      maxProducts={maxProducts}
      showPrice={showPrice}
      source={source}
      resolvedProducts={resolvedProducts}
    />
  ),
};

const ProductCardConfig = {
  label: "Product Card",
  fields: {
    title: { type: "text" as const, label: "Product Title", contentEditable: true },
    price: { type: "text" as const, label: "Price" },
    imageUrl: { type: "text" as const, label: "Image URL" },
    handle: { type: "text" as const, label: "Product Slug (handle)" },
    showButton: { type: "radio" as const, label: "Show Button", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
    buttonText: { type: "text" as const, label: "Button Text" },
  },
  defaultProps: {
    title: "Product Name",
    price: "$29.99",
    imageUrl: "",
    handle: "",
    showButton: "yes",
    buttonText: "View Product",
  },
  render: ({ title, price, imageUrl, handle, showButton, buttonText }: any) => (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm max-w-sm mx-auto">
      <div className="aspect-square bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-bold font-nobel-title text-gray-900 dark:text-white uppercase mb-1">
          {title}
        </h3>
        {price && (
          <p className="text-base font-bold text-nobel-blue dark:text-blue-400 mb-3">
            {price}
          </p>
        )}
        {showButton === "yes" && (
          <a
            href={handle ? `/store/${handle}` : "#"}
            className="block text-center px-4 py-2 bg-nobel-blue hover:bg-nobel-blue/90 text-white rounded font-nobel-content text-sm font-bold transition-colors"
          >
            {buttonText || "View Product"}
          </a>
        )}
      </div>
    </div>
  ),
};

const StoreBannerConfig = {
  label: "Store Banner",
  fields: {
    heading: { type: "text" as const, contentEditable: true },
    subheading: { type: "textarea" as const, contentEditable: true },
    bgColor: { type: "text" as const, label: "Background Color (Tailwind class)" },
    ctaText: { type: "text" as const, label: "CTA Button Text" },
    ctaLink: { type: "text" as const, label: "CTA Link" },
  },
  defaultProps: {
    heading: "Nobel Store",
    subheading: "Professional essentials for Nobel Realty Group agents",
    bgColor: "bg-nobel-blue",
    ctaText: "Shop Now",
    ctaLink: "/store",
  },
  render: ({ heading, subheading, bgColor, ctaText, ctaLink }: any) => (
    <div className={`${bgColor || "bg-nobel-blue"} text-white py-12 md:py-16`}>
      <div className="container mx-auto px-4 max-w-[1280px] text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-nobel-title font-bold uppercase mb-4">
          {heading}
        </h2>
        {subheading && (
          <p className="text-lg md:text-xl opacity-90 font-nobel-content max-w-2xl mx-auto mb-6">
            {subheading}
          </p>
        )}
        {ctaText && (
          <a
            href={ctaLink || "/store"}
            className="inline-block px-8 py-3 bg-white text-nobel-blue hover:bg-gray-100 rounded font-nobel-content font-bold transition-colors"
          >
            {ctaText}
          </a>
        )}
      </div>
    </div>
  ),
};

const CategoryGridConfig = {
  label: "Category Grid",
  fields: {
    heading: { type: "text" as const, contentEditable: true },
    categories: {
      type: "array" as const,
      label: "Categories",
      arrayFields: {
        name: { type: "text" as const },
        href: { type: "text" as const },
        imageUrl: { type: "text" as const },
      },
    },
    columns: {
      type: "select" as const,
      label: "Columns",
      options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ],
    },
  },
  defaultProps: {
    heading: "Shop by Category",
    categories: [
      { name: "Business Essentials", href: "/store?category=business-essentials", imageUrl: "" },
      { name: "Branded Apparel", href: "/store?category=branded-apparel", imageUrl: "" },
      { name: "Marketing Materials", href: "/store?category=marketing-materials", imageUrl: "" },
      { name: "Office Supplies", href: "/store?category=office-supplies", imageUrl: "" },
    ],
    columns: "4",
  },
  render: ({ heading, categories, columns }: any) => (
    <div className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 max-w-[1280px]">
        {heading && (
          <h2 className="text-2xl md:text-3xl font-nobel-title font-bold text-gray-900 dark:text-white uppercase mb-8 text-center">
            {heading}
          </h2>
        )}
        <div
          className={`grid gap-6 ${
            columns === "2"
              ? "grid-cols-1 sm:grid-cols-2"
              : columns === "3"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {(categories || []).map((cat: any, i: number) => (
            <a
              key={i}
              href={cat.href || "#"}
              className="group relative rounded-lg overflow-hidden aspect-[4/3] bg-gray-200 dark:bg-gray-700"
            >
              {cat.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-nobel-blue/80 to-nobel-blue/40 dark:from-blue-900/80 dark:to-blue-800/40" />
              )}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-end">
                <span className="w-full text-center py-4 text-white font-nobel-title font-bold text-lg uppercase">
                  {cat.name}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════
// ANIMATION / INTERACTION COMPONENTS
// ═══════════════════════════════════════════════════════════════════

const AnimateWrapperConfig = {
  label: "Animate Wrapper",
  fields: {
    animation: {
      type: "select" as const,
      label: "Animation",
      options: ANIMATION_OPTIONS,
    },
    duration: { type: "number" as const, label: "Duration (seconds)", min: 0.1, max: 5 },
    delay: { type: "number" as const, label: "Delay (seconds)", min: 0, max: 5 },
    easing: {
      type: "select" as const,
      label: "Easing",
      options: EASING_OPTIONS,
    },
    once: {
      type: "radio" as const,
      label: "Animate Once",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No (repeat)", value: "no" },
      ],
    },
    content: { type: "slot" as const },
  },
  defaultProps: {
    animation: "fadeUp",
    duration: 0.6,
    delay: 0,
    easing: "easeOut",
    once: "yes",
  },
  render: ({ animation, duration, delay, easing, once, content }: any) => (
    <AnimateWrapper
      animation={animation}
      duration={duration}
      delay={delay}
      easing={easing}
      once={once === "yes"}
    >
      {content}
    </AnimateWrapper>
  ),
};

const AnimatedCounterConfig = {
  label: "Animated Counter",
  fields: {
    end: { type: "number" as const, label: "End Value" },
    prefix: { type: "text" as const, label: "Prefix (e.g. $)" },
    suffix: { type: "text" as const, label: "Suffix (e.g. +, %, M)" },
    duration: { type: "number" as const, label: "Duration (seconds)", min: 0.5, max: 10 },
    decimals: { type: "number" as const, label: "Decimal Places", min: 0, max: 4 },
    label: { type: "text" as const, label: "Label Below" },
  },
  defaultProps: {
    end: 1000,
    prefix: "",
    suffix: "+",
    duration: 2.5,
    decimals: 0,
    label: "Projects Completed",
  },
  render: ({ end, prefix, suffix, duration, decimals, label }: any) => (
    <AnimatedCounter
      end={end}
      prefix={prefix}
      suffix={suffix}
      duration={duration}
      decimals={decimals}
      label={label}
    />
  ),
};

const CounterRowConfig = {
  label: "Counter Row",
  fields: {
    counters: {
      type: "array" as const,
      label: "Counters",
      arrayFields: {
        end: { type: "number" as const, label: "Value" },
        prefix: { type: "text" as const, label: "Prefix" },
        suffix: { type: "text" as const, label: "Suffix" },
        label: { type: "text" as const, label: "Label" },
      },
    },
    columns: {
      type: "select" as const,
      label: "Columns",
      options: [
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
      ],
    },
    duration: { type: "number" as const, label: "Duration (seconds)", min: 0.5, max: 10 },
    bgColor: {
      type: "select" as const,
      label: "Background",
      options: [
        { label: "White", value: "white" },
        { label: "Gray", value: "gray" },
        { label: "Dark", value: "dark" },
        { label: "Blue (brand)", value: "blue" },
      ],
    },
  },
  defaultProps: {
    counters: [
      { end: 500, prefix: "", suffix: "+", label: "Properties Sold" },
      { end: 98, prefix: "", suffix: "%", label: "Client Satisfaction" },
      { end: 40, prefix: "", suffix: "+", label: "Years Experience" },
      { end: 25, prefix: "$", suffix: "M", label: "Total Sales" },
    ],
    columns: "4",
    duration: 2.5,
    bgColor: "white",
  },
  render: ({ counters, columns, duration, bgColor }: any) => {
    const bgClasses: Record<string, string> = {
      white: "bg-white dark:bg-gray-900",
      gray: "bg-gray-50 dark:bg-gray-800",
      dark: "bg-gray-900 dark:bg-gray-950 text-white",
      blue: "bg-nobel-blue dark:bg-blue-900 text-white",
    };
    const gridCols =
      columns === "2"
        ? "grid-cols-2"
        : columns === "3"
          ? "grid-cols-2 md:grid-cols-3"
          : "grid-cols-2 md:grid-cols-4";
    return (
      <div className={`py-12 md:py-16 ${bgClasses[bgColor] || bgClasses.white}`}>
        <div className="container mx-auto px-4 max-w-[1280px]">
          <div className={`grid gap-8 ${gridCols}`}>
            {(counters || []).map((c: any, i: number) => (
              <AnimatedCounter
                key={i}
                end={c.end || 0}
                prefix={c.prefix || ""}
                suffix={c.suffix || ""}
                duration={duration || 2.5}
                label={c.label || ""}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
};

const ImageCarouselConfig = {
  label: "Image Carousel",
  fields: {
    slides: {
      type: "array" as const,
      label: "Slides",
      arrayFields: {
        imageUrl: { type: "text" as const, label: "Image URL" },
        alt: { type: "text" as const, label: "Alt Text" },
        heading: { type: "text" as const, label: "Heading" },
        text: { type: "text" as const, label: "Text" },
        ctaText: { type: "text" as const, label: "CTA Text" },
        ctaLink: { type: "text" as const, label: "CTA Link" },
      },
    },
    autoplay: { type: "radio" as const, label: "Autoplay", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
    autoplayDelay: { type: "number" as const, label: "Autoplay Delay (ms)", min: 1000, max: 20000 },
    effect: {
      type: "select" as const,
      label: "Effect",
      options: [
        { label: "Slide", value: "slide" },
        { label: "Fade", value: "fade" },
      ],
    },
    showNav: { type: "radio" as const, label: "Show Arrows", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
    showPagination: { type: "radio" as const, label: "Show Dots", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
    loop: { type: "radio" as const, label: "Loop", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
    height: { type: "text" as const, label: "Height (CSS)" },
    overlay: { type: "radio" as const, label: "Text Overlay", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
  },
  defaultProps: {
    slides: [
      { imageUrl: "/img/hero_bg.webp", alt: "Hero", heading: "Welcome", text: "Discover your dream home", ctaText: "Learn More", ctaLink: "/about" },
      { imageUrl: "/img/homepage-find-agent.webp", alt: "Agent", heading: "Expert Agents", text: "Find the perfect agent for you", ctaText: "Connect", ctaLink: "/agents" },
    ],
    autoplay: "yes",
    autoplayDelay: 4000,
    effect: "slide",
    showNav: "yes",
    showPagination: "yes",
    loop: "yes",
    height: "500px",
    overlay: "yes",
  },
  render: ({ slides, autoplay, autoplayDelay, effect, showNav, showPagination, loop, height, overlay }: any) => (
    <ImageCarousel
      slides={slides || []}
      autoplay={autoplay === "yes"}
      autoplayDelay={autoplayDelay || 4000}
      effect={effect || "slide"}
      showNav={showNav === "yes"}
      showPagination={showPagination === "yes"}
      loop={loop === "yes"}
      height={height || "500px"}
      overlay={overlay === "yes"}
    />
  ),
};

// ═══════════════════════════════════════════════════════════════════
// SITE-WIDE / GLOBAL COMPONENTS (Navbar, Footer)
// ═══════════════════════════════════════════════════════════════════

const NavbarConfig = {
  label: "Navbar",
  fields: {
    logoText: { type: "text" as const, label: "Logo Text" },
    logoImageUrl: { type: "text" as const, label: "Logo Image URL" },
    logoHref: { type: "text" as const, label: "Logo Link" },
    links: {
      type: "array" as const,
      label: "Nav Links",
      arrayFields: {
        text: { type: "text" as const, label: "Link Text" },
        href: { type: "text" as const, label: "Link URL" },
      },
    },
    ctaText: { type: "text" as const, label: "CTA Button Text" },
    ctaHref: { type: "text" as const, label: "CTA Button Link" },
    showCta: {
      type: "radio" as const,
      label: "Show CTA",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
  },
  defaultProps: {
    logoText: "Nobel Realty Group",
    logoImageUrl: "/img/nobel-logo.png",
    logoHref: "/",
    links: [
      { text: "BUY", href: "/buy" },
      { text: "RENT", href: "/rent" },
      { text: "SELL", href: "/sell" },
      { text: "AGENTS", href: "/agents" },
      { text: "CONTACT US", href: "/contact" },
    ],
    ctaText: "Get Started",
    ctaHref: "#",
    showCta: "no",
  },
  render: ({ logoText, logoImageUrl, logoHref, links, ctaText, ctaHref, showCta }: any) => (
    <div className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <nav className="container relative flex items-center justify-between px-4 py-2 mx-auto max-w-screen-xl" style={{ maxHeight: "50px" }}>
        <a href={logoHref || "/"} className="flex items-center space-x-2 text-lg font-medium text-gray-900 dark:text-gray-100">
          {logoImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoImageUrl} alt={logoText} className="h-8 w-auto" />
          )}
          <span className="font-nobel-title text-nobel-blue dark:text-white">{logoText}</span>
        </a>
        <div className="flex items-center space-x-1">
          {(links || []).map((link: any, i: number) => (
            <a
              key={i}
              href={link.href}
              className="inline-block px-3 py-2 text-sm font-nobel-content font-bold text-gray-800 no-underline uppercase dark:text-gray-200 hover:text-nobel-blue"
            >
              {link.text}
            </a>
          ))}
          {showCta === "yes" && ctaText && (
            <a
              href={ctaHref || "#"}
              className="ml-2 px-4 py-1.5 text-sm font-nobel-content font-bold text-white bg-nobel-blue rounded hover:bg-nobel-blue/90"
            >
              {ctaText}
            </a>
          )}
        </div>
      </nav>
    </div>
  ),
};

const FooterConfig = {
  label: "Footer",
  fields: {
    description: { type: "textarea" as const, label: "Footer Description", contentEditable: true },
    logoText: { type: "text" as const, label: "Logo Text" },
    logoImageUrl: { type: "text" as const, label: "Logo Image URL" },
    logoHref: { type: "text" as const, label: "Logo Link" },
    colOneHeading: { type: "text" as const, label: "Column 1 Heading" },
    colOneLinks: {
      type: "array" as const,
      label: "Column 1 Links",
      arrayFields: {
        text: { type: "text" as const },
        href: { type: "text" as const },
      },
    },
    colTwoHeading: { type: "text" as const, label: "Column 2 Heading" },
    colTwoLinks: {
      type: "array" as const,
      label: "Column 2 Links",
      arrayFields: {
        text: { type: "text" as const },
        href: { type: "text" as const },
      },
    },
    socialHeading: { type: "text" as const, label: "Social Section Heading" },
    socialLinks: {
      type: "array" as const,
      label: "Social Links",
      arrayFields: {
        text: { type: "text" as const, label: "Platform Name" },
        href: { type: "text" as const, label: "URL" },
      },
    },
    copyrightText: { type: "text" as const, label: "Copyright Text" },
  },
  defaultProps: {
    description: "NOBEL Realty Group - Award-winning buying and selling real estate services in Florida.",
    logoText: "NOBEL",
    logoImageUrl: "/img/logo.svg",
    logoHref: "/",
    colOneHeading: "",
    colOneLinks: [
      { text: "Buy a Home", href: "/buy" },
      { text: "Sell a Home", href: "/sell" },
      { text: "Rent a Home", href: "/rent" },
      { text: "Our Agents", href: "/agents" },
      { text: "About Us", href: "/about" },
    ],
    colTwoHeading: "",
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
    copyrightText: "",
  },
  render: ({
    description, logoText, logoImageUrl, logoHref,
    colOneLinks, colTwoLinks,
    socialHeading, socialLinks,
    copyrightText,
  }: any) => (
    <div className="relative bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="grid grid-cols-1 gap-10 pt-10 mt-5 border-t border-gray-200 dark:border-gray-700 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href={logoHref || "/"} className="flex items-center space-x-2 text-2xl font-nobel-title font-medium text-nobel-blue dark:text-white">
              {logoImageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoImageUrl} alt={logoText} className="w-8 h-8" />
              )}
              <span>{logoText}</span>
            </a>
            <div className="max-w-md mt-4 text-gray-600 dark:text-gray-400 font-nobel-content">
              {description}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {(colOneLinks || []).map((item: any, i: number) => (
                <a key={i} href={item.href} className="w-full px-4 py-2 text-gray-600 dark:text-gray-300 font-nobel-content rounded-md hover:text-nobel-blue">
                  {item.text}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {(colTwoLinks || []).map((item: any, i: number) => (
                <a key={i} href={item.href} className="w-full px-4 py-2 text-gray-600 dark:text-gray-300 font-nobel-content rounded-md hover:text-nobel-blue">
                  {item.text}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="font-nobel-content-bold text-gray-900 dark:text-white">{socialHeading}</div>
            <div className="flex mt-5 space-x-5 text-gray-400 dark:text-gray-500">
              {(socialLinks || []).map((item: any, i: number) => (
                <a key={i} href={item.href} target="_blank" rel="noreferrer" className="hover:text-nobel-blue" title={item.text}>
                  <span className="text-sm">{item.text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400 font-nobel-content">
          {copyrightText || `Copyright © ${new Date().getFullYear()} NOBEL Realty Group. All rights reserved.`}
        </div>
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════
// CONFIG EXPORT
// ═══════════════════════════════════════════════════════════════════

const config: Config = {
  root: {
    fields: {
      title: { type: "text" as const, label: "Page Title" },
      // Navbar overrides (global)
      navLogoText: { type: "text" as const, label: "Navbar: Logo Text" },
      navLogoImage: { type: "text" as const, label: "Navbar: Logo Image URL" },
      navLinks: {
        type: "array" as const,
        label: "Navbar: Navigation Links",
        arrayFields: {
          text: { type: "text" as const, label: "Link Text" },
          href: { type: "text" as const, label: "Link URL" },
        },
      },
      navCtaText: { type: "text" as const, label: "Navbar: CTA Button Text" },
      navCtaHref: { type: "text" as const, label: "Navbar: CTA Button Link" },
      // Footer overrides (global)
      footerDescription: { type: "textarea" as const, label: "Footer: Description" },
      footerLogoText: { type: "text" as const, label: "Footer: Logo Text" },
      footerLogoImage: { type: "text" as const, label: "Footer: Logo Image URL" },
      footerColOneLinks: {
        type: "array" as const,
        label: "Footer: Column 1 Links",
        arrayFields: {
          text: { type: "text" as const },
          href: { type: "text" as const },
        },
      },
      footerColTwoLinks: {
        type: "array" as const,
        label: "Footer: Column 2 Links",
        arrayFields: {
          text: { type: "text" as const },
          href: { type: "text" as const },
        },
      },
      footerSocialHeading: { type: "text" as const, label: "Footer: Social Heading" },
      footerSocialLinks: {
        type: "array" as const,
        label: "Footer: Social Links",
        arrayFields: {
          text: { type: "text" as const, label: "Platform" },
          href: { type: "text" as const, label: "URL" },
        },
      },
      footerCopyright: { type: "text" as const, label: "Footer: Copyright Text" },
    },
    defaultProps: {
      title: "Nobel Realty Group",
    },
    render: ({ children }: any) => <>{children}</>,
  },
  categories: {
    sitewide: {
      title: "Site-wide",
      components: ["Navbar", "Footer"],
    },
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
    store: {
      title: "Store / E-Commerce",
      components: [
        "StoreBanner",
        "ProductGrid",
        "ProductCard",
        "CategoryGrid",
      ],
    },
    animations: {
      title: "Animations & Effects",
      components: [
        "AnimateWrapper",
        "AnimatedCounter",
        "CounterRow",
        "ImageCarousel",
      ],
    },
  },
  components: {
    // Site-wide
    Navbar: NavbarConfig as any,
    Footer: FooterConfig as any,

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

    // Store / E-Commerce
    StoreBanner: StoreBannerConfig as any,
    ProductGrid: ProductGridConfig as any,
    ProductCard: ProductCardConfig as any,
    CategoryGrid: CategoryGridConfig as any,

    // Animations & Effects
    AnimateWrapper: AnimateWrapperConfig as any,
    AnimatedCounter: AnimatedCounterConfig as any,
    CounterRow: CounterRowConfig as any,
    ImageCarousel: ImageCarouselConfig as any,
  },
};

export default config;
