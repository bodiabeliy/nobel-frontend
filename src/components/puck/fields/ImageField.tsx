"use client";

import { FieldLabel } from "@puckeditor/core";
import { useState, useRef } from "react";

interface ImageFieldProps {
  field: {
    label?: string;
  };
  name: string;
  value: string | undefined;
  onChange: (value: string) => void;
}

export function ImageField({ field, name, value, onChange }: ImageFieldProps) {
  const [uploadMode, setUploadMode] = useState<"url" | "upload">("url");
  const [preview, setPreview] = useState(value || "");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      // Create FormData for upload
      const formData = new FormData();
      formData.append("file", file);

      // Upload to your API endpoint
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // If upload API doesn't exist, convert to base64 as fallback
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setPreview(base64String);
          onChange(base64String);
        };
        reader.readAsDataURL(file);
        return;
      }

      const data = await response.json();
      const imageUrl = data.url || data.path;
      setPreview(imageUrl);
      onChange(imageUrl);
    } catch (error) {
      console.error("Upload error:", error);
      // Fallback to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onChange(base64String);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPreview(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-2">
      <FieldLabel label={field.label || "Image"} />
      
      {/* Toggle between URL and Upload */}
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setUploadMode("url")}
          className={`px-3 py-1 text-sm rounded ${
            uploadMode === "url"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          URL
        </button>
        <button
          type="button"
          onClick={() => setUploadMode("upload")}
          className={`px-3 py-1 text-sm rounded ${
            uploadMode === "upload"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Upload
        </button>
      </div>

      {/* Input based on mode */}
      {uploadMode === "url" ? (
        <input
          type="text"
          name={name}
          value={value || ""}
          onChange={handleUrlChange}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Choose Image"}
          </button>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="mt-2 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview"
            className="w-full h-32 object-cover rounded border border-gray-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext fill='%23999' x='50' y='50' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
            }}
          />
          <button
            type="button"
            onClick={() => {
              setPreview("");
              onChange("");
            }}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
          >
            ×
          </button>
        </div>
      )}

      {/* Help text */}
      <p className="text-xs text-gray-500">
        {uploadMode === "url"
          ? "Enter an image URL"
          : "Upload an image (max 5MB, JPG/PNG/GIF/WebP)"}
      </p>
    </div>
  );
}
