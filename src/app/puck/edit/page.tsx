"use client";

import { Puck, type Data } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import "../../globals.css"; // Import global styles for the editor
import config from "@/puck.config";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider, useTheme } from "next-themes";

// Wrapper component to access theme context
function PuckEditorWithTheme({ 
  data, 
  handlePublish 
}: { 
  data: Data | null; 
  handlePublish: (data: Data) => Promise<void> 
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
        <Puck
          config={config}
          data={data || { content: [], root: {} }}
          onPublish={handlePublish}
        />
      </div>
    </>
  );
}

// Initial data structure matching the home page
const getInitialData = (): Data => ({
  content: [
    {
      type: "Navbar",
      props: {
        id: "Navbar-1",
        logoText: "Nobel Realty Group",
        logoUrl: "/img/nobel-logo.png",
        logoHref: "/",
        links: [
          { text: "BUY", href: "/buy", isAuth: false },
          { text: "RENT", href: "/rent", isAuth: false },
          { text: "SELL", href: "/sell", isAuth: false },
          { text: "AGENTS", href: "/agents", isAuth: false },
          { text: "CONTACT US", href: "/contact", isAuth: false },
        ],
      },
    },
    {
      type: "Hero",
      props: {
        id: "Hero-1",
        heading: "LOOKING FOR A PLACE YOU LOVE?",
        subheading: "We'll Get You There. Search Over 5 Million Homes for Sale Today",
      },
    },
    {
      type: "HomeValueSection",
      props: {
        id: "HomeValueSection-1",
        heading: "WHAT'S YOUR HOME WORTH?",
        subheading: "Get a FREE Instant Competitive Market Analysis",
      },
    },
    {
      type: "StatsSection",
      props: {
        id: "StatsSection-1",
        heading: "YOUR AREA'S DAY MARKET IN A GLANCE",
        subheading: "Looking for a new home? Let us summarize properties in your area",
        stats: [
          { value: "394", label: "NEW TODAY" },
          { value: "23", label: "PRICE INCREASED" },
          { value: "12", label: "OPEN HOUSE" },
          { value: "36", label: "PRICE REDUCED" },
          { value: "62", label: "BACK ON MARKET" },
          { value: "89", label: "FORECLOSURES" },
        ],
      },
    },
    {
      type: "AdvantageSection",
      props: {
        id: "AdvantageSection-1",
        heading: "THE NOBEL GROUP ADVANTAGE",
        subheading: "Welcome to the Future of Real Estate Buying and Selling. Where Technology Meets Realtor!",
        items: [
          {
            icon: "💼",
            heading: "Expert Advice and Perspectives",
            text: "Take advantage of our local expertise to connect you with the right home.",
          },
          {
            icon: "🏠",
            heading: "Local Home Ownership Made Easy",
            text: "With more than 40 years of experience, our team has a strong local presence.",
          },
          {
            icon: "📊",
            heading: "Make the Best Deal",
            text: "Our process involves detailed analysis of market trends and conditions.",
          },
          {
            icon: "🎯",
            heading: "Stand Out in the Market",
            text: "We create highly personalized listing presentations.",
          },
        ],
      },
    },
    {
      type: "RecommendedProperties",
      props: {
        id: "RecommendedProperties-1",
        heading: "RECOMMENDED FOR YOU",
        subheading: "Listings we think you'll love",
      },
    },
    {
      type: "InsightsSection",
      props: {
        id: "InsightsSection-1",
        heading: "NOBEL KNOWS INSIGHTS",
        subheading: "Explore your real people around your neighborhood",
      },
    },
    {
      type: "ExperienceSection",
      props: {
        id: "ExperienceSection-1",
        heading: "ELEVATE YOUR EXPERIENCE",
        text: "Our Concierge And A Nobel Realty Group Real Estate Agent Today",
        ctaText: "CONNECT WITH A CONCIERGE",
        ctaLink: "/concierge",
      },
    },
    {
      type: "MarketsSection",
      props: {
        id: "MarketsSection-1",
        heading: "EXPLORE POPULAR REAL ESTATE MARKETS",
        subheading: "Learn about real estate by exploring the top local markets",
        markets: [
          { name: "ATLANTIC BEACH, FL", href: "/markets/atlantic-beach" },
          { name: "FERNANDINA BEACH, FL", href: "/markets/fernandina-beach" },
          { name: "JACKSONVILLE BEACH, FL", href: "/markets/jacksonville-beach" },
          { name: "NEPTUNE BEACH, FL", href: "/markets/neptune-beach" },
        ],
      },
    },
    {
      type: "WhyJoinSection",
      props: {
        id: "WhyJoinSection-1",
        heading: "WHY JOIN NOBEL REALTY GROUP?",
        subheading: "Award-Winning Buying and Selling",
        text: "At NOBEL REALTY GROUP, we offer comprehensive support and coaching.",
        ctaText: "JOIN THE NOBEL REALTY GROUP",
        ctaLink: "/join",
      },
    },
    {
      type: "ContactSection",
      props: {
        id: "ContactSection-1",
        heading: "CONNECT WITH US",
        subheading: "Connect with a Nobel Realty Group Real Estate Agent Today",
      },
    },
    {
      type: "Footer",
      props: {
        id: "Footer-1",
        logoText: "NOBEL",
        logoUrl: "/img/logo.svg",
        logoHref: "/",
        description: "NOBEL Realty Group - Award-winning buying and selling real estate services in Florida.",
        colOneLinks: [
          { text: "Buy a Home", href: "/buy" },
          { text: "Sell a Home", href: "/sell" },
          { text: "Rent a Home", href: "/rent" },
          { text: "Our Agents", href: "/agents" },
          { text: "About Us", href: "/about" },
        ],
        colTwoLinks: [
          { text: "Contact", href: "/contact" },
          { text: "Careers", href: "/careers" },
          { text: "Insights", href: "/insights" },
        ],
        socialHeading: "Follow us!",
        socialLinks: [
          { text: "Facebook", href: "https://www.facebook.com" },
          { text: "Instagram", href: "https://www.instagram.com" },
          { text: "LinkedIn", href: "https://www.linkedin.com" },
          { text: "Twitter", href: "https://www.twitter.com" },
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
      <PuckEditorWithTheme data={data} handlePublish={handlePublish} />
    </ThemeProvider>
  );
}
