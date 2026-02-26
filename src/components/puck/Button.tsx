"use client";

import Link from "next/link";

interface ButtonProps {
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
}

export function Button({
  text,
  href = "#",
  variant = "primary",
  size = "medium",
  fullWidth = false,
  backgroundColor,
  textColor,
  borderRadius = "0.375rem",
  paddingX,
  paddingY,
  fontSize,
  fontWeight = "bold",
  boxShadow = "none",
  align = "left",
  marginTop = "0",
  marginBottom = "1rem",
}: ButtonProps) {
  const variantStyles = {
    primary: "bg-nobel-blue text-white hover:bg-nobel-blue/90",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border-2 border-nobel-blue text-nobel-blue hover:bg-nobel-blue hover:text-white",
    ghost: "text-nobel-blue hover:bg-nobel-blue/10",
  };

  const sizeStyles = {
    small: { px: "1rem", py: "0.5rem", fontSize: "0.875rem" },
    medium: { px: "1.5rem", py: "0.75rem", fontSize: "1rem" },
    large: { px: "2rem", py: "1rem", fontSize: "1.125rem" },
  };

  const alignClasses = {
    left: "mr-auto",
    center: "mx-auto",
    right: "ml-auto",
  };

  const fontWeightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const selectedSize = sizeStyles[size];

  return (
    <div
      className={`${fullWidth ? "w-full" : "inline-block"} ${alignClasses[align]}`}
      style={{ marginTop, marginBottom }}
    >
      <Link
        href={href}
        className={`inline-block font-nobel-content ${fontWeightClasses[fontWeight]} text-center transition-all ${
          !backgroundColor && !textColor ? variantStyles[variant] : ""
        } ${fullWidth ? "w-full" : ""}`}
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
          borderRadius,
          paddingLeft: paddingX || selectedSize.px,
          paddingRight: paddingX || selectedSize.px,
          paddingTop: paddingY || selectedSize.py,
          paddingBottom: paddingY || selectedSize.py,
          fontSize: fontSize || selectedSize.fontSize,
          boxShadow,
        }}
      >
        {text}
      </Link>
    </div>
  );
}
