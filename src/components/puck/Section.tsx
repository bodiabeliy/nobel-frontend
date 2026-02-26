"use client";

import { ReactNode } from "react";
import { DropZone } from "@puckeditor/core";

interface SectionProps {
  children?: ReactNode;
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
}

export function Section({
  children,
  backgroundColor = "transparent",
  backgroundImage,
  backgroundSize = "cover",
  backgroundPosition = "center",
  paddingTop = "4rem",
  paddingBottom = "4rem",
  paddingLeft = "1rem",
  paddingRight = "1rem",
  marginTop = "0",
  marginBottom = "0",
  maxWidth = "screen-xl",
  textAlign = "left",
  minHeight = "auto",
  borderRadius = "0",
  boxShadow = "none",
}: SectionProps) {
  const maxWidthClasses = {
    full: "max-w-full",
    "screen-xl": "max-w-screen-xl",
    "screen-lg": "max-w-screen-lg",
    "screen-md": "max-w-screen-md",
  };

  const textAlignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div
      style={{
        backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize,
        backgroundPosition,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        marginTop,
        marginBottom,
        minHeight,
        borderRadius,
        boxShadow,
      }}
      className="w-full"
    >
      <div className={`mx-auto ${maxWidthClasses[maxWidth]} ${textAlignClasses[textAlign]}`}>
        <DropZone zone="section-content" />
      </div>
    </div>
  );
}
