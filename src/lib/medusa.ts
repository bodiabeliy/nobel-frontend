/**
 * Medusa JS SDK Client Configuration
 *
 * Used by the Next.js storefront to interact with Medusa's Store API
 * for products, cart, checkout, and customer operations.
 *
 * Medusa v2 JS SDK docs: https://docs.medusajs.com/resources/js-sdk
 */

import Medusa from "@medusajs/js-sdk"

// ─── SDK instance for storefront (Store API) ─────────────────────
export const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
  auth: {
    type: "session",
  },
})

// ─── Direct fetch helper for server components (no SDK needed) ───
export async function medusaFetch<T = any>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const baseUrl =
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  // Add publishable API key for store routes
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
  if (publishableKey) {
    headers["x-publishable-api-key"] = publishableKey
  }

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Medusa API error (${res.status}): ${error}`)
  }

  return res.json()
}

// ─── Typed helpers for common store operations ───────────────────

/**
 * Fetch products from Medusa Store API
 */
export async function getMedusaProducts(params?: {
  limit?: number
  offset?: number
  category_id?: string[]
  collection_id?: string[]
  handle?: string
}) {
  const searchParams = new URLSearchParams()

  if (params?.limit) searchParams.set("limit", params.limit.toString())
  if (params?.offset) searchParams.set("offset", params.offset.toString())
  if (params?.handle) searchParams.set("handle", params.handle)
  if (params?.category_id) {
    params.category_id.forEach((id) =>
      searchParams.append("category_id[]", id)
    )
  }
  if (params?.collection_id) {
    params.collection_id.forEach((id) =>
      searchParams.append("collection_id[]", id)
    )
  }

  // Add common fields
  searchParams.set("fields", "+variants.prices,+images")

  const qs = searchParams.toString()
  return medusaFetch<{
    products: any[]
    count: number
    offset: number
    limit: number
  }>(`/store/products${qs ? `?${qs}` : ""}`)
}

/**
 * Fetch a single product by handle
 */
export async function getMedusaProductByHandle(handle: string) {
  const result = await medusaFetch<{ products: any[] }>(
    `/store/products?handle=${handle}&fields=+variants.prices,+images,+categories,+collection,+tags`
  )
  return result.products?.[0] || null
}

/**
 * Fetch product categories from Medusa
 */
export async function getMedusaCategories() {
  return medusaFetch<{ product_categories: any[] }>(
    "/store/product-categories?fields=name,handle,description"
  )
}

/**
 * Fetch product collections from Medusa
 */
export async function getMedusaCollections() {
  return medusaFetch<{ collections: any[] }>(
    "/store/collections?fields=title,handle"
  )
}
