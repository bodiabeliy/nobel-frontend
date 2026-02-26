"use client";

import { FieldLabel } from "@puckeditor/core";
import { useState } from "react";

interface ColorFieldProps {
  field: {
    label?: string;
  };
  name: string;
  value: string | undefined;
  onChange: (value: string) => void;
}

export function ColorField({ field, name, value, onChange }: ColorFieldProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [inputMode, setInputMode] = useState<"picker" | "manual">("picker");

  // Common color presets
  const colorPresets = [
    "#000000", "#FFFFFF", "#F3F4F6", "#E5E7EB", "#D1D5DB",
    "#1F2937", "#374151", "#4B5563", "#6B7280", "#9CA3AF",
    "#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6",
    "#EC4899", "#F97316", "#84CC16", "#06B6D4", "#6366F1",
    "#FEE2E2", "#FEF3C7", "#D1FAE5", "#DBEAFE", "#EDE9FE",
  ];

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handlePresetClick = (color: string) => {
    onChange(color);
  };

  return (
    <div className="flex flex-col gap-2">
      <FieldLabel label={field.label || "Color"} />
      
      {/* Toggle between picker and manual */}
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setInputMode("picker")}
          className={`px-3 py-1 text-sm rounded ${
            inputMode === "picker"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Color Picker
        </button>
        <button
          type="button"
          onClick={() => setInputMode("manual")}
          className={`px-3 py-1 text-sm rounded ${
            inputMode === "manual"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Manual
        </button>
      </div>

      {inputMode === "picker" ? (
        <>
          {/* Color input with preview */}
          <div className="flex gap-2 items-center">
            <input
              type="color"
              name={name}
              value={value || "#000000"}
              onChange={handleColorChange}
              className="w-12 h-12 border border-gray-300 rounded cursor-pointer"
            />
            <div className="flex-1">
              <input
                type="text"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder="#000000"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              />
            </div>
          </div>

          {/* Color presets */}
          <div className="mt-2">
            <div className="text-xs font-medium text-gray-700 mb-2">Quick Colors</div>
            <div className="grid grid-cols-10 gap-1">
              {colorPresets.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handlePresetClick(color)}
                  className={`w-6 h-6 rounded border ${
                    value === color
                      ? "border-blue-500 border-2"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Common named colors */}
          <div className="mt-2">
            <button
              type="button"
              onClick={() => onChange("transparent")}
              className={`w-full px-3 py-2 border rounded text-sm ${
                value === "transparent"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              Transparent
            </button>
          </div>
        </>
      ) : (
        <div>
          <input
            type="text"
            name={name}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g., #FF5733, rgb(255,87,51), transparent"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">
            Enter color in any CSS format (hex, rgb, rgba, named color)
          </p>
        </div>
      )}

      {/* Preview */}
      {value && value !== "transparent" && (
        <div className="flex items-center gap-2 mt-2 p-2 bg-gray-50 rounded">
          <div
            className="w-8 h-8 rounded border border-gray-300"
            style={{ backgroundColor: value }}
          />
          <span className="text-sm font-mono text-gray-700">{value}</span>
        </div>
      )}
    </div>
  );
}
