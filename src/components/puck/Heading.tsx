"use client";

interface HeadingProps {
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
}

export function Heading({
  text,
  level = "h2",
  fontSize = "2rem",
  fontWeight = "bold",
  color = "#000",
  textAlign = "left",
  marginTop = "0",
  marginBottom = "1rem",
  letterSpacing = "normal",
  textTransform = "none",
}: HeadingProps) {
  const Tag = level;

  const fontWeightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  };

  const textAlignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <Tag
      className={`font-nobel-title ${fontWeightClasses[fontWeight]} ${textAlignClasses[textAlign]} dark:text-white`}
      style={{
        fontSize,
        color,
        marginTop,
        marginBottom,
        letterSpacing,
        textTransform,
      }}
    >
      {text}
    </Tag>
  );
}
