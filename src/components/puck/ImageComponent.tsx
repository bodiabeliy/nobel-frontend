"use client";

import Image from "next/image";

interface ImageComponentProps {
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
}

export function ImageComponent({
  src,
  alt = "Image",
  width = "100%",
  height = "auto",
  objectFit = "cover",
  borderRadius = "0",
  boxShadow = "none",
  marginTop = "0",
  marginBottom = "1rem",
  align = "center",
}: ImageComponentProps) {
  const alignClasses = {
    left: "mr-auto",
    center: "mx-auto",
    right: "ml-auto",
  };

  if (!src) {
    return (
      <div
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${alignClasses[align]}`}
        style={{
          width,
          height: height === "auto" ? "200px" : height,
          borderRadius,
          marginTop,
          marginBottom,
        }}
      >
        <p className="text-gray-500">No image selected</p>
      </div>
    );
  }

  return (
    <div
      className={alignClasses[align]}
      style={{
        width,
        marginTop,
        marginBottom,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height,
          objectFit,
          borderRadius,
          boxShadow,
        }}
      />
    </div>
  );
}
