"use client";

interface TextProps {
  content: string;
  fontSize?: string;
  fontWeight?: "normal" | "medium" | "semibold" | "bold";
  color?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  lineHeight?: string;
  marginTop?: string;
  marginBottom?: string;
  maxWidth?: string;
}

export function Text({
  content,
  fontSize = "1rem",
  fontWeight = "normal",
  color = "#4B5563",
  textAlign = "left",
  lineHeight = "1.6",
  marginTop = "0",
  marginBottom = "1rem",
  maxWidth = "100%",
}: TextProps) {
  const fontWeightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const textAlignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };

  return (
    <p
      className={`font-nobel-content ${fontWeightClasses[fontWeight]} ${textAlignClasses[textAlign]} dark:text-gray-300`}
      style={{
        fontSize,
        color,
        lineHeight,
        marginTop,
        marginBottom,
        maxWidth,
        whiteSpace: "pre-wrap",
      }}
    >
      {content}
    </p>
  );
}
