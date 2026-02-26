"use client";

import { Render, type Data } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import config from "@/puck.config";

interface PuckRendererProps {
  data: Data;
}

export function PuckRenderer({ data }: PuckRendererProps) {
  return <Render config={config} data={data} />;
}
