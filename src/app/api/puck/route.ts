import { NextRequest, NextResponse } from "next/server";

/**
 * Puck page data API — stores/retrieves editor data via Strapi.
 *
 * Strapi collection: puck-page  (fields: path, data)
 * Falls back to local puck-data.json for local dev without Strapi.
 */

function getStrapiURL() {
  return process.env.STRAPI_BASE_URL ?? "http://localhost:1337";
}

function getStrapiToken() {
  return process.env.STRAPI_API_TOKEN ?? "";
}

function strapiHeaders(): Record<string, string> {
  const h: Record<string, string> = { "Content-Type": "application/json" };
  const token = getStrapiToken();
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
}

async function findPuckPage(pagePath: string) {
  const base = getStrapiURL();
  const url = `${base}/api/puck-pages?filters[path][$eq]=${encodeURIComponent(pagePath)}`;
  try {
    const res = await fetch(url, { headers: strapiHeaders(), cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    const entry = json.data?.[0];
    if (!entry) return null;
    return { id: entry.documentId ?? entry.id, data: entry.data };
  } catch (e) {
    console.error("[Puck API] findPuckPage error:", e);
    return null;
  }
}

async function createPuckPage(pagePath: string, data: any) {
  const base = getStrapiURL();
  const res = await fetch(`${base}/api/puck-pages`, {
    method: "POST",
    headers: strapiHeaders(),
    body: JSON.stringify({ data: { path: pagePath, data } }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Strapi create failed (${res.status}): ${text}`);
  }
  return res.json();
}

async function updatePuckPage(documentId: string | number, data: any) {
  const base = getStrapiURL();
  const res = await fetch(`${base}/api/puck-pages/${documentId}`, {
    method: "PUT",
    headers: strapiHeaders(),
    body: JSON.stringify({ data: { data } }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Strapi update failed (${res.status}): ${text}`);
  }
  return res.json();
}

function readLocalData(pagePath: string) {
  try {
    const fs = require("fs");
    const pathModule = require("path");
    const filePath = pathModule.join(process.cwd(), "puck-data.json");
    if (!fs.existsSync(filePath)) return null;
    const allData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return allData[pagePath] || null;
  } catch { return null; }
}

function writeLocalData(pagePath: string, data: any) {
  try {
    const fs = require("fs");
    const pathModule = require("path");
    const filePath = pathModule.join(process.cwd(), "puck-data.json");
    let allData: Record<string, any> = {};
    if (fs.existsSync(filePath)) allData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    allData[pagePath] = data;
    fs.writeFileSync(filePath, JSON.stringify(allData, null, 2));
    return true;
  } catch { return false; }
}

// GET /api/puck?path=/ — load page data
// GET /api/puck?debug=1 — returns Strapi config status for diagnosing 500s
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pagePath = searchParams.get("path") || "/";

  if (searchParams.get("debug") === "1") {
    const base = getStrapiURL();
    const token = getStrapiToken();
    let strapiReachable = false;
    let puckPageCollectionExists = false;
    let strapiStatus = 0;
    let strapiBody = "";
    try {
      const res = await fetch(`${base}/api/puck-pages?pagination[pageSize]=1`, {
        headers: strapiHeaders(), cache: "no-store",
      });
      strapiStatus = res.status;
      strapiBody = await res.text();
      strapiReachable = res.ok;
      puckPageCollectionExists = res.ok;
    } catch (e: any) { strapiBody = String(e?.message ?? e); }
    return NextResponse.json({
      strapiURL: base,
      hasToken: !!token,
      tokenPrefix: token ? token.slice(0, 8) + "..." : null,
      strapiReachable,
      puckPageCollectionExists,
      strapiStatus,
      strapiBody: strapiBody.slice(0, 500),
    });
  }

  try {
    const entry = await findPuckPage(pagePath);
    if (entry?.data) return NextResponse.json(entry.data);
    const local = readLocalData(pagePath);
    if (local) return NextResponse.json(local);
    return NextResponse.json({ content: [], root: {} });
  } catch (error) {
    console.error("[Puck API] GET error:", error);
    return NextResponse.json({ content: [], root: {} });
  }
}

// POST /api/puck?path=/ — save page data
export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pagePath = searchParams.get("path") || "/";
  let strapiError: string | null = null;

  try {
    const data = await request.json();

    try {
      const existing = await findPuckPage(pagePath);
      if (existing) {
        await updatePuckPage(existing.id, data);
      } else {
        await createPuckPage(pagePath, data);
      }
      return NextResponse.json({ success: true });
    } catch (err: any) {
      strapiError = String(err?.message ?? err);
      console.error("[Puck API] Strapi save failed:", strapiError);
    }

    if (writeLocalData(pagePath, data)) return NextResponse.json({ success: true });

    return NextResponse.json(
      {
        error: "Failed to save page data",
        detail: strapiError ?? "Strapi unreachable",
        hint: "Check: (1) STRAPI_API_TOKEN env var on Vercel, (2) puck-page content type deployed to Render, (3) Strapi Roles > Public > puck-page: find/create/update enabled",
        strapiURL: getStrapiURL(),
        hasToken: !!getStrapiToken(),
      },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("[Puck API] POST error:", error);
    return NextResponse.json(
      { error: "Failed to save data", detail: String(error?.message ?? error) },
      { status: 500 }
    );
  }
}