/**
 * Cart Page (placeholder/foundation)
 *
 * This is the base cart page that will be extended as Medusa cart
 * and checkout features are implemented. Currently shows an empty
 * cart state with navigation back to the store.
 */

import Link from "next/link";
import { SiteLayout } from "@/components/SiteLayout";

export default function CartPage() {
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
            <span className="text-gray-900 dark:text-white">Cart</span>
          </nav>

          <h1 className="text-2xl md:text-3xl font-nobel-title font-bold text-gray-900 dark:text-white uppercase mb-8">
            Shopping Cart
          </h1>

          {/* Empty Cart State */}
          <div className="text-center py-20 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
            <h2 className="text-xl font-nobel-title text-gray-500 dark:text-gray-400 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-400 dark:text-gray-500 font-nobel-content mb-6">
              Cart and checkout functionality will be available once the Medusa
              integration is fully connected.
            </p>
            <Link
              href="/store"
              className="inline-block px-6 py-3 bg-nobel-blue hover:bg-nobel-blue/90 text-white rounded font-nobel-content font-bold transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
