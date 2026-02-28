"use client";
import React, { useRef, useState } from "react";

interface ImageUploadFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function ImageUploadField({ value, onChange, label }: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed");
        return;
      }

      onChange(data.url);
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleClear() {
    onChange("");
    setError(null);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {/* URL text input */}
      <input
        type="text"
        value={value || ""}
        onChange={(e) => {
          setError(null);
          onChange(e.target.value);
        }}
        placeholder="Paste image URL or upload below"
        style={{
          width: "100%",
          padding: "8px 10px",
          fontSize: 14,
          border: "1px solid #cfcfcf",
          borderRadius: 4,
          background: "#fff",
          color: "#333",
          boxSizing: "border-box",
        }}
      />

      {/* Upload button row */}
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          style={{
            flex: 1,
            padding: "7px 12px",
            fontSize: 13,
            fontWeight: 500,
            border: "1px solid #cfcfcf",
            borderRadius: 4,
            background: uploading ? "#e5e5e5" : "#f5f5f5",
            color: uploading ? "#999" : "#333",
            cursor: uploading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          {uploading ? (
            <>
              <Spinner /> Uploading…
            </>
          ) : (
            <>
              <UploadIcon /> Upload from device
            </>
          )}
        </button>

        {value && (
          <button
            type="button"
            onClick={handleClear}
            title="Clear image"
            style={{
              padding: "7px 10px",
              fontSize: 13,
              border: "1px solid #cfcfcf",
              borderRadius: 4,
              background: "#f5f5f5",
              color: "#999",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />

      {/* Error */}
      {error && (
        <div style={{ color: "#dc2626", fontSize: 12 }}>{error}</div>
      )}

      {/* Preview */}
      {value && (
        <div
          style={{
            marginTop: 4,
            border: "1px solid #e5e5e5",
            borderRadius: 4,
            overflow: "hidden",
            background: "#fafafa",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            style={{
              display: "block",
              width: "100%",
              maxHeight: 140,
              objectFit: "cover",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}
    </div>
  );
}

function UploadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
