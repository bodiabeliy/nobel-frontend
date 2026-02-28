import React from "react";
import type { PageProps } from "@/types";
import fs from "fs";
import path from "path";
import type { Data } from "@puckeditor/core";

import { Container } from "@/components/Container";
import { SiteLayout } from "@/components/SiteLayout";
import { PuckRenderer } from "@/components/PuckRenderer";

// All slugs that can be edited in Puck
const EDITABLE_SLUGS = ["buy", "rent", "sell", "agents", "contact"];

async function loadPuckData(slug: string): Promise<Data | null> {
  try {
    const dataFilePath = path.join(process.cwd(), "puck-data.json");
    if (fs.existsSync(dataFilePath)) {
      const fileContent = fs.readFileSync(dataFilePath, "utf-8");
      const allData = JSON.parse(fileContent);
      const pageData = allData[`/${slug}`];
      if (pageData && pageData.content && pageData.content.length > 0) {
        return pageData;
      }
    }
  } catch (error) {
    console.error("Error loading Puck data for slug:", slug, error);
  }
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
