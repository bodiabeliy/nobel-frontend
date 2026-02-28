"use client";

import React, { useEffect, useState, useCallback } from "react";

/* ─── helpers ──────────────────────────────────────────────────── */

function formatProductPrice(variants: any[]): string {
  if (!variants?.length) return "Price TBD";
  let cheapest: number | null = null;
  let currencyCode = "usd";
  for (const v of variants) {
    const amt = v.calculated_price?.calculated_amount;
    const code = v.calculated_price?.currency_code;
    if (amt != null && (cheapest === null || amt < cheapest)) {
      cheapest = amt;
      currencyCode = code || "usd";
    }
    for (const p of v.prices || []) {
      if (p.amount != null && (cheapest === null || p.amount < cheapest)) {
        cheapest = p.amount;
        currencyCode = p.currency_code || "usd";
      }
    }
  }
  if (cheapest === null) return "Price TBD";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
  }).format(cheapest / 100);
}

/* ─── types ────────────────────────────────────────────────────── */

export interface ProductGridClientProps {
  heading?: string;
  columns?: string;
  maxProducts?: number;
  showPrice?: string;
  source?: string;
  resolvedProducts?: any[];
}

/* ─── component ────────────────────────────────────────────────── */

export function ProductGridClient({
  heading = "Our Products",
  columns = "3",
  maxProducts = 6,
  showPrice = "yes",
  source = "medusa",
  resolvedProducts,
}: ProductGridClientProps) {
  const [products, setProducts] = useState<any[]>(resolvedProducts || []);
  const [loading, setLoading] = useState(!resolvedProducts?.length);

  const fetchProducts = useCallback(async () => {
    const count = maxProducts || 6;
    let fetched: any[] = [];

    if (source === "medusa") {
      try {
        const medusaUrl =
          process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
        const publishableKey =
          process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (publishableKey) {
          headers["x-publishable-api-key"] = publishableKey;
        }

        // Get region for pricing
        let regionId = "";
        try {
          const regRes = await fetch(`${medusaUrl}/store/regions`, { headers });
          if (regRes.ok) {
            const regData = await regRes.json();
            regionId = regData.regions?.[0]?.id || "";
          }
        } catch {
          /* ignore */
        }

        const params = new URLSearchParams({
          limit: String(count),
          fields: "+variants.calculated_price",
        });
        if (regionId) params.set("region_id", regionId);

        const res = await fetch(
          `${medusaUrl}/store/products?${params.toString()}`,
          { headers }
        );
        if (res.ok) {
          const data = await res.json();
          fetched = (data.products || []).map((p: any) => ({
            id: p.id,
            title: p.title,
            handle: p.handle,
            thumbnail: p.thumbnail || p.images?.[0]?.url || "",
            price: formatProductPrice(p.variants),
          }));
        }
      } catch (e) {
        console.warn("[ProductGrid] Medusa fetch failed:", e);
      }
    } else {
      // Strapi source
      try {
        const strapiUrl =
          process.env.NEXT_PUBLIC_STRAPI_BASE_URL || "http://localhost:1337";
        const res = await fetch(
          `${strapiUrl}/api/medusa-products?pagination[pageSize]=${count}&sort=createdAt:desc`
        );
        if (res.ok) {
          const data = await res.json();
          fetched = (data.data || []).map((item: any) => ({
            id: item.medusa_id || item.id,
            title: item.title,
            handle: item.handle,
            thumbnail: item.thumbnail || "",
            price: item.price_display
              || (item.variants?.[0]?.prices?.[0]
                ? `$${(item.variants[0].prices[0].amount / 100).toFixed(2)}`
                : "Price TBD"),
          }));
        }
      } catch (e) {
        console.warn("[ProductGrid] Strapi fetch failed:", e);
      }
    }

    setProducts(fetched);
    setLoading(false);
  }, [maxProducts, source]);

  useEffect(() => {
    // If resolvedProducts are already provided (e.g. from Puck editor's resolveData), use them
    if (resolvedProducts && resolvedProducts.length > 0) {
      setProducts(resolvedProducts);
      setLoading(false);
      return;
    }
    // Otherwise fetch client-side
    fetchProducts();
  }, [resolvedProducts, fetchProducts]);

  const count = Math.min(maxProducts || 6, 12);
  const gridCols =
    columns === "2"
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === "4"
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-[1280px]">
        {heading && (
          <h2 className="text-2xl md:text-3xl font-nobel-title font-bold text-gray-900 dark:text-white uppercase mb-8 text-center">
            {heading}
          </h2>
        )}
        <div className={`grid gap-6 ${gridCols}`}>
          {!loading && products.length > 0
            ? products.slice(0, count).map((product: any, i: number) => (
                <a
                  key={product.id || i}
                  href={product.handle ? `/store/${product.handle}` : "#"}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                    {product.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <svg
                          className="w-10 h-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold font-nobel-title text-gray-900 dark:text-white uppercase mb-1 truncate">
                      {product.title}
                    </h3>
                    {showPrice === "yes" && product.price && (
                      <p className="text-base font-bold text-nobel-blue dark:text-blue-400">
                        {product.price}
                      </p>
                    )}
                  </div>
                </a>
              ))
            : Array.from({ length: count }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm"
                >
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                    {loading ? (
                      <div className="w-full h-full animate-pulse bg-gray-200 dark:bg-gray-600" />
                    ) : (
                      <svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2 animate-pulse" />
                    {showPrice === "yes" && (
                      <div className="h-4 bg-blue-100 dark:bg-blue-900/30 rounded w-1/4 animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">
          Source: {source}
          {!loading && products.length > 0
            ? ` | ${products.length} products loaded`
            : loading
              ? " | Loading..."
              : " | No products found"}
        </p>
      </div>
    </div>
  );
}
