/**
 * Store Page - Product Listing
 *
 * Displays products from Medusa.js with category filtering.
 * Falls back to Strapi-synced products if Medusa is unavailable.
 */

import Link from "next/link";
import Image from "next/image";
import { SiteLayout } from "@/components/SiteLayout";

// ─── Data Fetching ───────────────────────────────────────────────

async function getProducts() {
  const medusaUrl =
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";

  try {
    // Try Medusa first
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (publishableKey) {
      headers["x-publishable-api-key"] = publishableKey;
    }

    // Get the first region for pricing context
    let regionId = "";
    try {
      const regRes = await fetch(`${medusaUrl}/store/regions`, {
        headers,
        next: { revalidate: 300 },
      });
      if (regRes.ok) {
        const regData = await regRes.json();
        regionId = regData.regions?.[0]?.id || "";
      }
    } catch { /* ignore */ }

    const params = new URLSearchParams({
      fields: "+variants.calculated_price,+images",
      limit: "50",
    });
    if (regionId) params.set("region_id", regionId);

    const res = await fetch(
      `${medusaUrl}/store/products?${params.toString()}`,
      { headers, next: { revalidate: 60 } }
    );
    if (res.ok) {
      const data = await res.json();
      return { source: "medusa" as const, products: data.products || [] };
    }
  } catch {
    // Medusa unavailable, fall through
  }

  // Fallback: Strapi synced products
  try {
    const strapiUrl = process.env.STRAPI_BASE_URL || "http://localhost:1337";
    const res = await fetch(
      `${strapiUrl}/api/medusa-products?pagination[pageSize]=50&sort=createdAt:desc`,
      { next: { revalidate: 60 } }
    );
    if (res.ok) {
      const data = await res.json();
      // Map Strapi format to a normalized shape
      const products = (data.data || []).map((item: any) => ({
        id: item.medusa_id || item.id,
        title: item.title,
        handle: item.handle,
        description: item.description,
        thumbnail: item.thumbnail,
        status: item.status,
        variants: item.variants || [],
        images: item.images || [],
        collection_title: item.collection_title,
        categories: item.categories || [],
      }));
      return { source: "strapi" as const, products };
    }
  } catch {
    // Strapi also unavailable
  }

  return { source: "none" as const, products: [] };
}

async function getCategories() {
  const medusaUrl =
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (publishableKey) {
      headers["x-publishable-api-key"] = publishableKey;
    }

    const res = await fetch(
      `${medusaUrl}/store/product-categories?fields=name,handle`,
      { headers, next: { revalidate: 300 } }
    );
    if (res.ok) {
      const data = await res.json();
      return data.product_categories || [];
    }
  } catch {
    // Ignore
  }
  return [];
}

// ─── Price Helper ────────────────────────────────────────────────
function formatPrice(variants: any[]): string {
  if (!variants?.length) return "Price TBD";

  // Find the cheapest variant with a price
  let cheapest: number | null = null;
  let currencyCode = "usd";

  for (const variant of variants) {
    // Medusa v2: calculated_price from pricing module
    const calcAmt = variant.calculated_price?.calculated_amount;
    const calcCode = variant.calculated_price?.currency_code;
    if (calcAmt != null && (cheapest === null || calcAmt < cheapest)) {
      cheapest = calcAmt;
      currencyCode = calcCode || "usd";
    }
    // Fallback: prices array (Strapi synced data)
    for (const price of variant.prices || []) {
      if (price.amount != null && (cheapest === null || price.amount < cheapest)) {
        cheapest = price.amount;
        currencyCode = price.currency_code || "usd";
      }
    }
  }

  if (cheapest === null) return "Price TBD";

  // Medusa stores prices in cents
  const amount = cheapest / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
  }).format(amount);
}

// ─── Page Component ──────────────────────────────────────────────
export default async function StorePage() {
  const [{ products, source }, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <SiteLayout>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Banner */}
        <div className="bg-nobel-blue text-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-[1280px] text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-nobel-title font-bold uppercase mb-4">
              Nobel Store
            </h1>
            <p className="text-lg md:text-xl opacity-90 font-nobel-content max-w-2xl mx-auto">
              Professional essentials for Nobel Realty Group agents. Business
              cards, branded apparel, marketing materials and more.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-[1280px] py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories */}
            {categories.length > 0 && (
              <aside className="lg:w-64 flex-shrink-0">
                <h2 className="text-lg font-bold font-nobel-title text-gray-900 dark:text-white mb-4 uppercase">
                  Categories
                </h2>
                <nav className="space-y-2">
                  <Link
                    href="/store"
                    className="block px-3 py-2 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-nobel-content transition-colors"
                  >
                    All Products
                  </Link>
                  {categories.map((cat: any) => (
                    <Link
                      key={cat.id || cat.handle}
                      href={`/store?category=${cat.handle}`}
                      className="block px-3 py-2 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-nobel-content transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </nav>
              </aside>
            )}

            {/* Product Grid */}
            <div className="flex-1">
              {/* Source indicator (dev) */}
              {process.env.NODE_ENV === "development" && (
                <p className="text-xs text-gray-400 mb-4">
                  Data source: {source}
                </p>
              )}

              {products.length === 0 ? (
                <div className="text-center py-20">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
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
                  <h2 className="text-xl font-nobel-title text-gray-500 dark:text-gray-400 mb-2">
                    No products yet
                  </h2>
                  <p className="text-gray-400 dark:text-gray-500 font-nobel-content">
                    Products will appear here once added in the Medusa admin
                    dashboard.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products
                    .filter(
                      (p: any) =>
                        p.status === "published" || source === "strapi"
                    )
                    .map((product: any) => (
                      <Link
                        key={product.id}
                        href={`/store/${product.handle}`}
                        className="group"
                      >
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          {/* Image */}
                          <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
                            {product.thumbnail ||
                            product.images?.[0]?.url ? (
                              <Image
                                src={
                                  product.thumbnail ||
                                  product.images[0].url
                                }
                                alt={product.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-gray-400">
                                <svg
                                  className="w-12 h-12"
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

                          {/* Info */}
                          <div className="p-4">
                            <h3 className="text-sm font-bold font-nobel-title text-gray-900 dark:text-white uppercase line-clamp-2 mb-1">
                              {product.title}
                            </h3>
                            {product.collection_title && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                {product.collection_title}
                              </p>
                            )}
                            <p className="text-base font-bold text-nobel-blue dark:text-blue-400">
                              {formatPrice(product.variants)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
