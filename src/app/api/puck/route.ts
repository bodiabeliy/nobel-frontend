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

// ─── helpers to talk to Strapi puck-page collection ──────────────

async function findPuckPage(pagePath: string) {
  const base = getStrapiURL();
  const url = `${base}/api/puck-pages?filters[path][$eq]=${encodeURIComponent(pagePath)}`;
  try {
    const res = await fetch(url, { headers: strapiHeaders(), cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    const entry = json.data?.[0];
    if (!entry) return null;
    // Strapi v5: fields are directly on the entry object
    return { id: entry.documentId ?? entry.id, data: entry.data };
  } catch (e) {
    console.error("[Puck API] Error finding puck page in Strapi:", e);
    return null;
  }
}

async function createPuckPage(pagePath: string, data: any) {
  const base = getStrapiURL();
  const url = `${base}/api/puck-pages`;
  const res = await fetch(url, {
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
  const url = `${base}/api/puck-pages/${documentId}`;
  const res = await fetch(url, {
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

// ─── Fallback: local filesystem (for local dev) ─────────────────

function readLocalData(pagePath: string) {
  try {
    const fs = require("fs");
    const pathModule = require("path");
    const filePath = pathModule.join(process.cwd(), "puck-data.json");
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, "utf-8");
    const allData = JSON.parse(content);
    return allData[pagePath] || null;
  } catch {
    return null;
  }
}

function writeLocalData(pagePath: string, data: any) {
  try {
    const fs = require("fs");
    const pathModule = require("path");
    const filePath = pathModule.join(process.cwd(), "puck-data.json");
    let allData: Record<string, any> = {};
    if (fs.existsSync(filePath)) {
      allData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    allData[pagePath] = data;
    fs.writeFileSync(filePath, JSON.stringify(allData, null, 2));
    return true;
  } catch {
    return false;
  }
}

// ─── Route handlers ─────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pagePath = searchParams.get("path") || "/";

  try {
    // Try Strapi first
    const entry = await findPuckPage(pagePath);
    if (entry?.data) {
      return NextResponse.json(entry.data);
    }

    // Fallback to local file (dev only)
    const local = readLocalData(pagePath);
    if (local) {
      return NextResponse.json(local);
    }

    // Nothing found
    return NextResponse.json({ content: [], root: {} });
  } catch (error) {
    console.error("[Puck API] GET error:", error);
    return NextResponse.json({ content: [], root: {} });
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pagePath = searchParams.get("path") || "/";

  try {
    const data = await request.json();

    // Try Strapi first
    try {
      const existing = await findPuckPage(pagePath);
      if (existing) {
        await updatePuckPage(existing.id, data);
      } else {
        await createPuckPage(pagePath, data);
      }
      return NextResponse.json({ success: true });
    } catch (strapiErr) {
      console.error("[Puck API] Strapi save failed, trying local:", strapiErr);
    }

    // Fallback: local filesystem (only works in dev)
    const wrote = writeLocalData(pagePath, data);
    if (wrote) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Failed to save — Strapi unavailable and filesystem is read-only" },
      { status: 500 }
    );
  } catch (error) {
    console.error("[Puck API] POST error:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
