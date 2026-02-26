"use client";

import Link from "next/link";
import { useState } from "react";

export function EditorAccessButton() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        className="ml-auto text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-1"
        aria-label="Close"
      >
        ✕
      </button>
      
      {/* Main editor link */}
      <Link
        href="/puck/edit"
        className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
      >
        <svg
          className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        <span>Edit with Puck</span>
      </Link>

      {/* Info text */}
      <div className="text-xs text-center text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow">
        Visual Page Editor
      </div>
    </div>
  );
}
