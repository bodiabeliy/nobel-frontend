import React from "react";
import type { PageProps } from "@/types";
import type { Data } from "@puckeditor/core";

import { Container } from "@/components/Container";
import { SiteLayout } from "@/components/SiteLayout";
import { PuckRenderer } from "@/components/PuckRenderer";

// All slugs that can be edited in Puck
const EDITABLE_SLUGS = ["buy", "rent", "sell", "agents", "contact"];

function getStrapiURL() {
  return process.env.STRAPI_BASE_URL ?? "http://localhost:1337";
}

function getStrapiToken() {
  return process.env.STRAPI_API_TOKEN ?? "";
}

async function loadPuckData(slug: string): Promise<Data | null> {
  const pagePath = `/${slug}`;

  // 1. Try Strapi puck-pages collection
  try {
    const base = getStrapiURL();
    const token = getStrapiToken();
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(
      `${base}/api/puck-pages?filters[path][$eq]=${encodeURIComponent(pagePath)}`,
      { headers, next: { revalidate: 60 } }
    );
    if (res.ok) {
      const json = await res.json();
      const entry = json.data?.[0];
      if (entry?.data?.content?.length > 0) {
        return entry.data as Data;
      }
    }
  } catch (e) {
    console.error("Strapi puck-page fetch failed for slug:", slug, e);
  }

  // 2. Fallback to local file (works in dev)
  try {
    const fs = require("fs");
    const path = require("path");
    const dataFilePath = path.join(process.cwd(), "puck-data.json");
    if (fs.existsSync(dataFilePath)) {
      const allData = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
      const pageData = allData[pagePath];
      if (pageData?.content?.length > 0) {
        return pageData;
      }
    }
  } catch (_) { /* no local file — fine on Vercel */ }

  return null;
}

export async function generateStaticParams() {
  return EDITABLE_SLUGS.map((slug) => ({ slug }));
}

export default async function DynamicPageRoute(props: Readonly<PageProps>) {
  const resolvedParams = await Promise.resolve(props.params);
  const slug = resolvedParams.slug;
  const puckData = await loadPuckData(slug);

  return (
    <SiteLayout>
      {puckData ? (
        <PuckRenderer data={puckData} />
      ) : (
        <Container>
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-20">
            <h1 className="text-3xl md:text-4xl font-nobel-title font-bold text-gray-900 dark:text-white uppercase mb-4">
              {slug.charAt(0).toUpperCase() + slug.slice(1)}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-nobel-content max-w-md">
              This page hasn&apos;t been designed yet. Open the{" "}
              <a
                href={`/puck/edit`}
                className="text-nobel-blue underline"
              >
                Puck Editor
              </a>{" "}
              and select the &quot;{slug.charAt(0).toUpperCase() + slug.slice(1)}&quot; page to start designing.
            </p>
          </div>
        </Container>
      )}
    </SiteLayout>
  );
}
