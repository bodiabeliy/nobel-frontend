"use client";

import { Puck, type Data } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import "../../globals.css"; // Import global styles for the editor
import config from "@/puck.config";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider, useTheme } from "next-themes";

// Editable pages
const PAGES = [
  { path: "/", label: "Home" },
  { path: "/buy", label: "Buy" },
  { path: "/rent", label: "Rent" },
  { path: "/sell", label: "Sell" },
  { path: "/agents", label: "Agents" },
  { path: "/contact", label: "Contact" },
  { path: "/blog", label: "Blog" },
];

// Page selector toolbar
function PageSelector({
  currentPath,
  onChangePath,
}: {
  currentPath: string;
  onChangePath: (p: string) => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "#1a1a2e",
        padding: "6px 16px",
        borderRadius: "0 0 10px 10px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
      }}
    >
      <label
        style={{ color: "#aaa", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
      >
        Page:
      </label>
      <select
        value={currentPath}
        onChange={(e) => onChangePath(e.target.value)}
        style={{
          background: "#16213e",
          color: "#fff",
          border: "1px solid #0f3460",
          borderRadius: 6,
          padding: "4px 8px",
          fontSize: 13,
          cursor: "pointer",
          outline: "none",
        }}
      >
        {PAGES.map((p) => (
          <option key={p.path} value={p.path}>
            {p.label} ({p.path})
          </option>
        ))}
      </select>
    </div>
  );
}

// Wrapper component to access theme context
function PuckEditorWithTheme({ 
  data, 
  handlePublish,
  currentPath,
  onChangePath,
}: { 
  data: Data | null; 
  handlePublish: (data: Data) => Promise<void>;
  currentPath: string;
  onChangePath: (p: string) => void;
}) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply theme to the preview iframe when it loads
  useEffect(() => {
    if (!mounted) return;
    
    const currentTheme = theme === 'system' ? systemTheme : theme;
    
    // Find all Puck iframe elements and apply theme
    const applyThemeToIframes = () => {
      const iframes = document.querySelectorAll('.Puck iframe');
      iframes.forEach((iframe) => {
        try {
          const iframeDoc = (iframe as HTMLIFrameElement).contentDocument;
          if (iframeDoc && iframeDoc.documentElement) {
            if (currentTheme === 'dark') {
              iframeDoc.documentElement.classList.add('dark');
            } else {
              iframeDoc.documentElement.classList.remove('dark');
            }
          }
        } catch (e) {
          // Cross-origin iframe, can't access
          console.log('Cannot access iframe for theme', e);
        }
      });
    };

    // Apply immediately
    applyThemeToIframes();
    
    // Also apply when DOM changes (iframe loads)
    const observer = new MutationObserver(applyThemeToIframes);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, [theme, systemTheme, mounted]);
  
  return (
    <>
      <style jsx global>{`
        /* Ensure Puck editor UI remains visible in dark mode */
        .Puck {
          background: white !important;
          color: #000 !important;
        }
        
        .Puck-sidebar,
        .Puck-fields,
        .Puck-field,
        .Puck-leftSidebar,
        .Puck-rightSidebar {
          background: white !important;
          color: #000 !important;
        }
        
        /* Component list items */
        .Puck-componentList button,
        .Puck-componentList-item {
          color: #000 !important;
        }
        
        /* Field labels and inputs */
        .Puck-field label,
        .Puck-field input,
        .Puck-field textarea,
        .Puck-field select {
          color: #000 !important;
          background: white !important;
        }
        
        .Puck-field input::placeholder,
        .Puck-field textarea::placeholder {
          color: #666 !important;
        }
        
        /* Headers and titles */
        .Puck-header,
        .Puck-heading {
          color: #000 !important;
        }
        
        /* Drag handles and icons */
        .Puck-dragHandle,
        .Puck-icon {
          color: #666 !important;
        }
        
        /* Make sure dark mode only affects the preview iframe */
        .Puck iframe {
          /* Preview area will have theme applied via our useEffect */
        }
        
        /* Component names in outline/layers */
        .Puck-outline {
          background: white !important;
        }
        
        .Puck-outline button,
        .Puck-outline-item {
          color: #000 !important;
        }
        
        /* Array field items */
        .Puck-arrayField {
          background: #f9f9f9 !important;
        }
        
        .Puck-arrayField-item {
          background: white !important;
          color: #000 !important;
        }
      `}</style>
      <div className="h-screen">
        <PageSelector currentPath={currentPath} onChangePath={onChangePath} />
        <Puck
          config={config}
          data={data || { content: [], root: {} }}
          onPublish={handlePublish}
        />
      </div>
    </>
  );
}

// Initial data structure - clean start with some demo components
const getInitialData = (): Data => ({
  content: [
    {
      type: "Heading",
      props: {
        id: "heading-1",
        text: "Welcome to Nobel Realty Group",
        size: "xxl",
        align: "center",
        layout: { padding: "24px", spanCol: 1, spanRow: 1, grow: false },
      },
    },
    {
      type: "Text",
      props: {
        id: "text-1",
        text: "Build your page using the component panel on the left. Drag and drop Grid, Flex, Cards, and more.",
        size: "m",
        align: "center",
        color: "muted",
        layout: { padding: "8px", spanCol: 1, spanRow: 1, grow: false },
      },
    },
    {
      type: "Space",
      props: {
        id: "space-1",
        size: "32px",
        direction: "vertical",
      },
    },
    {
      type: "Grid",
      props: {
        id: "grid-1",
        numColumns: 3,
        gap: 24,
        items: [
          {
            type: "Card",
            props: {
              id: "card-1",
              title: "Layout Components",
              description: "Use Grid, Flex, and Space to create responsive layouts",
              icon: "📐",
              mode: "card",
              layout: { padding: "0px", spanCol: 1, spanRow: 1, grow: false },
            },
          },
          {
            type: "Card",
            props: {
              id: "card-2",
              title: "Typography",
              description: "Add Headings, Text blocks, and Rich Text with inline editing",
              icon: "✏️",
              mode: "card",
              layout: { padding: "0px", spanCol: 1, spanRow: 1, grow: false },
            },
          },
          {
            type: "Card",
            props: {
              id: "card-3",
              title: "Nobel Sections",
              description: "Use pre-built Nobel page sections like Hero, Stats, and more",
              icon: "🏠",
              mode: "card",
              layout: { padding: "0px", spanCol: 1, spanRow: 1, grow: false },
            },
          },
        ],
      },
    },
  ],
  root: {
    props: {
      title: "Nobel Realty Group",
    },
  },
});

export default function EditorPage() {
  const router = useRouter();
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState("/");

  useEffect(() => {
    // Load existing data
    const loadData = async () => {
      try {
        console.log('[Puck Editor] Fetching data from API...');
        const response = await fetch(`/api/puck?path=${encodeURIComponent(path)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log('[Puck Editor] Response status:', response.status);
        
        if (!response.ok) {
          console.warn('[Puck Editor] API response not OK, using initial data');
          setData(getInitialData());
          return;
        }
        
        const loadedData = await response.json();
        console.log('[Puck Editor] Data loaded successfully:', loadedData.content?.length || 0, 'items');
        
        // If no content exists, use initial data
        if (!loadedData.content || loadedData.content.length === 0) {
          console.log('[Puck Editor] No content found, using initial data');
          setData(getInitialData());
        } else {
          setData(loadedData);
        }
      } catch (error) {
        console.error("[Puck Editor] Error loading data:", error);
        // Initialize with default home page structure
        setData(getInitialData());
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [path]);

  const handlePublish = async (data: Data) => {
    try {
      const response = await fetch(`/api/puck?path=${encodeURIComponent(path)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Page published successfully!");
        // Optionally redirect to the published page
        // router.push(path);
      } else {
        alert("Failed to publish page");
      }
    } catch (error) {
      console.error("Error publishing:", error);
      alert("Error publishing page");
    }
  };

  if (loading) {
    return (
      <ThemeProvider attribute="class">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading editor...</div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class">
      <PuckEditorWithTheme
        data={data}
        handlePublish={handlePublish}
        currentPath={path}
        onChangePath={(p) => {
          setLoading(true);
          setPath(p);
        }}
      />
    </ThemeProvider>
  );
}
