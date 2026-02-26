"use client";

interface SpacerProps {
  height?: string;
}

export function Spacer({ height = "2rem" }: SpacerProps) {
  return <div style={{ height, width: "100%" }} />;
}
