"use client";

import { ReactNode } from "react";
import { DropZone } from "@puckeditor/core";

interface ColumnsProps {
  columns?: 2 | 3 | 4;
  gap?: string;
  stackOnMobile?: boolean;
  verticalAlign?: "top" | "center" | "bottom" | "stretch";
}

export function Columns({
  columns = 2,
  gap = "2rem",
  stackOnMobile = true,
  verticalAlign = "top",
}: ColumnsProps) {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const alignItems = {
    top: "items-start",
    center: "items-center",
    bottom: "items-end",
    stretch: "items-stretch",
  };

  return (
    <div
      className={`grid ${stackOnMobile ? gridCols[columns] : `grid-cols-${columns}`} ${alignItems[verticalAlign]}`}
      style={{ gap }}
    >
      {Array.from({ length: columns }).map((_, index) => (
        <div key={index} className="min-h-[100px]">
          <DropZone zone={`column-${index}`} />
        </div>
      ))}
    </div>
  );
}
