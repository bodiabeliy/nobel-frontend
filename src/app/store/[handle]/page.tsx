/**
 * Product Detail Page
 *
 * Fetches product by handle from Medusa, falls back to Strapi.
 */

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteLayout } from "@/components/SiteLayout";

// ─── Data Fetching ───────────────────────────────────────────────

async function getProduct(handle: string) {
  const medusaUrl =
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";

  // Try Medusa first
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (publishableKey) {
      headers["x-publishable-api-key"] = publishableKey;
    }

    const res = await fetch(
      `${medusaUrl}/store/products?handle=${handle}&fields=+variants.prices,+images,+categories,+collection,+tags`,
      { headers, next: { revalidate: 60 } }
    );
    if (res.ok) {
      const data = await res.json();
      if (data.products?.[0]) {
        return { source: "medusa", product: data.products[0] };
      }
    }
  } catch {
    // fall through
  }

  // Fallback: Strapi
  try {
    const strapiUrl = process.env.STRAPI_BASE_URL || "http://localhost:1337";
    const res = await fetch(
      `${strapiUrl}/api/medusa-products?filters[handle][$eq]=${handle}`,
      { next: { revalidate: 60 } }
    );
    if (res.ok) {
      const data = await res.json();
      if (data.data?.[0]) {
        const item = data.data[0];
        return {
          source: "strapi",
          product: {
            id: item.medusa_id || item.id,
            title: item.title,
            handle: item.handle,
            description: item.description,
            subtitle: item.subtitle,
            thumbnail: item.thumbnail,
            status: item.status,
            variants: item.variants || [],
            images: item.images || [],
            collection: item.collection_title
              ? { title: item.collection_title }
              : null,
            categories: item.categories || [],
            tags: item.tags || [],
          },
        };
      }
    }
  } catch {
    // fall through
  }

  return null;
}

// ─── Price helpers ───────────────────────────────────────────────
function getVariantPrice(variant: any): string {
  const prices =
    variant.prices ||
    (variant.calculated_price?.calculated_amount
      ? [
          {
            amount: variant.calculated_price.calculated_amount,
            currency_code: variant.calculated_price.currency_code,
          },
        ]
      : []);

  if (!prices.length) return "Price TBD";

  const price = prices[0];
  const amount = (price.amount || 0) / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: (price.currency_code || "usd").toUpperCase(),
  }).format(amount);
}

function getCheapestPrice(variants: any[]): string {
  if (!variants?.length) return "Price TBD";
  let cheapest: number | null = null;
  let currency = "usd";

  for (const v of variants) {
    const prices =
      v.prices ||
      (v.calculated_price?.calculated_amount
        ? [
            {
              amount: v.calculated_price.calculated_amount,
              currency_code: v.calculated_price.currency_code,
            },
          ]
        : []);
    for (const p of prices) {
      if (p.amount != null && (cheapest === null || p.amount < cheapest)) {
        cheapest = p.amount;
        currency = p.currency_code || "usd";
      }
    }
  }

  if (cheapest === null) return "Price TBD";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cheapest / 100);
}

// ─── Page ────────────────────────────────────────────────────────
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const result = await getProduct(handle);

  if (!result) notFound();

  const { product } = result;

  const allImages = [
    ...(product.thumbnail ? [{ url: product.thumbnail }] : []),
    ...(product.images || []),
  ].filter(
    (img, i, arr) =>
      img.url && arr.findIndex((x: any) => x.url === img.url) === i
  );

  return (
    <SiteLayout>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 max-w-[1280px] py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm font-nobel-content">
            <Link
              href="/store"
              className="text-gray-500 dark:text-gray-400 hover:text-nobel-blue"
            >
              Store
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 dark:text-white">
              {product.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Images */}
            <div>
              {allImages.length > 0 ? (
                <div className="space-y-4">
                  {/* Main image */}
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={allImages[0].url}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                  {/* Thumbnails */}
                  {allImages.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {allImages.slice(1, 5).map((img: any, i: number) => (
                        <div
                          key={i}
                          className="relative aspect-square rounded overflow-hidden bg-gray-100 dark:bg-gray-800"
                        >
                          <Image
                            src={img.url}
                            alt={`${product.title} ${i + 2}`}
                            fill
                            className="object-cover"
                            sizes="25vw"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <svg
                    className="w-20 h-20 text-gray-300 dark:text-gray-600"
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

            {/* Product Info */}
            <div>
              {product.collection?.title && (
                <p className="text-sm text-gray-500 dark:text-gray-400 font-nobel-content mb-1 uppercase">
                  {product.collection.title}
                </p>
              )}

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-nobel-title font-bold text-gray-900 dark:text-white uppercase mb-2">
                {product.title}
              </h1>

              {product.subtitle && (
                <p className="text-lg text-gray-600 dark:text-gray-300 font-nobel-content mb-4">
                  {product.subtitle}
                </p>
              )}

              <p className="text-2xl font-bold text-nobel-blue dark:text-blue-400 mb-6">
                {getCheapestPrice(product.variants)}
              </p>

              {/* Description */}
              {product.description && (
                <div className="prose dark:prose-invert max-w-none mb-8 font-nobel-content text-gray-600 dark:text-gray-300">
                  <p className="whitespace-pre-line">{product.description}</p>
                </div>
              )}

              {/* Variants */}
              {product.variants?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-bold font-nobel-title text-gray-900 dark:text-white uppercase mb-3">
                    Options
                  </h3>
                  <div className="space-y-3">
                    {product.variants.map((variant: any) => (
                      <div
                        key={variant.id || variant.medusa_id || variant.sku}
                        className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-nobel-blue dark:hover:border-blue-400 transition-colors cursor-pointer"
                      >
                        <div>
                          <p className="font-nobel-content text-gray-900 dark:text-white text-sm">
                            {variant.title}
                          </p>
                          {variant.sku && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SKU: {variant.sku}
                            </p>
                          )}
                        </div>
                        <p className="font-bold text-nobel-blue dark:text-blue-400">
                          {getVariantPrice(variant)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart button (placeholder) */}
              <button
                className="w-full py-3 px-6 bg-nobel-blue hover:bg-nobel-blue/90 text-white rounded font-nobel-content font-bold text-base transition-colors disabled:opacity-50"
                disabled
              >
                Add to Cart (Coming Soon)
              </button>

              {/* Categories / Tags */}
              {(product.categories?.length > 0 ||
                product.tags?.length > 0) && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  {product.categories?.length > 0 && (
                    <div className="mb-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-nobel-content">
                        Categories:{" "}
                      </span>
                      {product.categories
                        .map(
                          (c: any) => c.name || c.title
                        )
                        .join(", ")}
                    </div>
                  )}
                  {product.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag: any, i: number) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400"
                        >
                          {tag.value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
