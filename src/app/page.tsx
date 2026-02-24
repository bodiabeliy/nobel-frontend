import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { HomeValueSection } from "@/components/HomeValueSection";
import { StatsSection } from "@/components/StatsSection";
import { AdvantageSection } from "@/components/AdvantageSection";
import { RecommendedProperties } from "@/components/RecommendedProperties";
import { InsightsSection } from "@/components/InsightsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { MarketsSection } from "@/components/MarketsSection";
import { WhyJoinSection } from "@/components/WhyJoinSection";
import { ContactSection } from "@/components/ContactSection";
import { fetchData } from "@/lib/fetch";
import { getStrapiURL } from "@/lib/utils";
import qs from "qs";

async function loader() {
  const baseUrl = getStrapiURL();
  
  const query = qs.stringify({
    populate: {
      Hero: {
        populate: {
          backgroundImage: true
        }
      },
      HomeValueSection: true,
      StatsSection: {
        populate: {
          stats: true
        }
      },
      AdvantageSection: {
        populate: {
          items: true
        }
      },
      RecommendedProperties: {
        populate: {
          properties: {
            populate: {
              image: true
            }
          },
          ctaLink: true
        }
      },
      InsightsSection: {
        populate: {
          insights: {
            populate: {
              image: true
            }
          },
          ctaLink: true
        }
      },
      ExperienceSection: {
        populate: {
          image: true,
          ctaLink: true
        }
      },
      MarketsSection: {
        populate: {
          markets: true
        }
      },
      WhyJoinSection: {
        populate: {
          image: true,
          ctaLink: true
        }
      },
      ContactSection: true
    }
  });

  const url = `${baseUrl}/api/home-main-section?${query}`;
  
  try {
    const data = await fetchData(url);
    return data;
  } catch (error) {
    console.error("Error loading home page data:", error);
    return null;
  }
}

export default async function Home() {
  const data = await loader();
  
  // Fallback data if Strapi is not available
  if (!data) {
    return (
      <>
        <Hero data={heroFallbackData} />
        <Container>
          <HomeValueSection data={homeValueFallbackData} />
          <StatsSection data={statsFallbackData} />
          <AdvantageSection data={advantageFallbackData} />
          <RecommendedProperties data={recommendedPropertiesFallbackData} />
          <InsightsSection data={insightsFallbackData} />
          <ExperienceSection data={experienceFallbackData} />
          <MarketsSection data={marketsFallbackData} />
          <WhyJoinSection data={whyJoinFallbackData} />
          <ContactSection data={contactFallbackData} />
        </Container>
      </>
    );
  }

  return (
    <>
      {data.Hero && <Hero data={data.Hero} />}
      <Container>
        {data.HomeValueSection && <HomeValueSection data={data.HomeValueSection} />}
        {data.StatsSection && <StatsSection data={data.StatsSection} />}
        {data.AdvantageSection && <AdvantageSection data={data.AdvantageSection} />}
        {data.RecommendedProperties && <RecommendedProperties data={data.RecommendedProperties} />}
        {data.InsightsSection && <InsightsSection data={data.InsightsSection} />}
        {data.ExperienceSection && <ExperienceSection data={data.ExperienceSection} />}
        {data.MarketsSection && <MarketsSection data={data.MarketsSection} />}
        {data.WhyJoinSection && <WhyJoinSection data={data.WhyJoinSection} />}
        {data.ContactSection && <ContactSection data={data.ContactSection} />}
      </Container>
    </>
  );
}

// Fallback data for when Strapi is not available
const heroFallbackData = {
  heading: "LOOKING FOR A PLACE YOU LOVE?",
  subheading: "We'll Get You There. Search Over 5 Million Homes for Sale Today"
};

const homeValueFallbackData = {
  heading: "WHAT'S YOUR HOME WORTH?",
  subheading: "Get a FREE Instant Competitive Market Analysis"
};

const statsFallbackData = {
  heading: "YOUR ARE AS SO DAY MARKET IN A GLANCE",
  subheading: "Looking for a new home? Let us summarized properties in Duval County that have been on looking for",
  stats: [
    { id: 1, value: "394", label: "NEW TODAY" },
    { id: 2, value: "23", label: "PRICE INCREASED" },
    { id: 3, value: "12", label: "OPEN HOUSE" },
    { id: 4, value: "36", label: "PRICE REDUCED" },
    { id: 5, value: "62", label: "BACK ON MARKET" },
    { id: 6, value: "89", label: "FORECLOSURES" }
  ]
};

const advantageFallbackData = {
  heading: "THE NOBEL GROUP ADVANTAGE",
  subheading: "Welcome to the Future of Real Estate Buying and Selling. Where Technology Meets Realtor!",
  items: [
    {
      id: 1,
      icon: "💼",
      heading: "Expert Advice and Perspectives",
      text: "Take advantage of our local expertise to connect you with the right home. We prioritize service, dedication, and understanding to ensure your property sale or purchase is as seamless as possible."
    },
    {
      id: 2,
      icon: "🏠",
      heading: "Local Home Ownership is Made",
      text: "With more than 40 years of experience, our team has a strong local presence in the market to provide you with unparalleled insights and data."
    },
    {
      id: 3,
      icon: "📊",
      heading: "Make the Best Deal",
      text: "Our process of pricing an offer involves checking out dozens of different listing reports and conducting a detailed analysis of market trends and condition."
    },
    {
      id: 4,
      icon: "🎯",
      heading: "Exceed Your Highest Quality by Standing",
      text: "We create highly personalized listing presentations to make your listings stand out in the market."
    }
  ]
};

const recommendedPropertiesFallbackData = {
  heading: "RECOMMENDED FOR YOU",
  subheading: "Listings we think you'll love",
  properties: [
    {
      id: 1,
      title: "Luxury Villa",
      location: "Miami Beach, FL",
      price: "$2,450,000",
      image: { url: "/img/property1.jpg", alternativeText: "Property 1" }
    },
    {
      id: 2,
      title: "Modern Condo",
      location: "Downtown Tampa, FL",
      price: "$850,000",
      image: { url: "/img/property2.jpg", alternativeText: "Property 2" }
    },
    {
      id: 3,
      title: "Family Home",
      location: "Orlando, FL",
      price: "$625,000",
      image: { url: "/img/property3.jpg", alternativeText: "Property 3" }
    },
    {
      id: 4,
      title: "Beach House",
      location: "Naples, FL",
      price: "$1,800,000",
      image: { url: "/img/property4.jpg", alternativeText: "Property 4" }
    }
  ],
  ctaLink: {
    href: "/properties",
    text: "VIEW ALL RECOMMENDED LISTINGS"
  }
};

const insightsFallbackData = {
  heading: "NOBEL KNOWS INSIGHTS",
  subheading: "Explore your real people around your neighborhood sharing, market insight, property, and design inspiration.",
  insights: [
    {
      id: 1,
      title: "Market Trends 2024",
      excerpt: "Discover the latest trends in the real estate market and what they mean for buyers and sellers.",
      category: "Market Analysis",
      image: { url: "/img/insight1.jpg", alternativeText: "Insight 1" }
    },
    {
      id: 2,
      title: "Home Staging Tips",
      excerpt: "Learn how to stage your home effectively to attract more buyers and get better offers.",
      category: "Home Tips",
      image: { url: "/img/insight2.jpg", alternativeText: "Insight 2" }
    },
    {
      id: 3,
      title: "Investment Guide",
      excerpt: "A comprehensive guide to real estate investment opportunities in Florida.",
      category: "Investment",
      image: { url: "/img/insight3.jpg", alternativeText: "Insight 3" }
    },
    {
      id: 4,
      title: "Luxury Living",
      excerpt: "Explore the finest luxury properties and what makes them stand out in the market.",
      category: "Luxury",
      image: { url: "/img/insight4.jpg", alternativeText: "Insight 4" }
    }
  ],
  ctaLink: {
    href: "/insights",
    text: "VIEW ALL RECOMMENDED LISTINGS"
  }
};

const experienceFallbackData = {
  heading: "ELEVATE YOUR EXPERIENCE",
  text: "Our Concierge And A Nobel Realty Group Real Estate Agent Today\n\nAt the time of listing, our clients are offered services of certified professionals to assist with planning and organizing your move, moving services, delivery, and assembly of furniture. We also can help connect you with a home warranty company to ensure peace of mind as we help make your right move!",
  ctaLink: {
    href: "/concierge",
    text: "CONNECT WITH A CONCIERGE"
  },
  image: { url: "/img/homepage-find-agent.webp", alternativeText: "Experience" }
};

const marketsFallbackData = {
  heading: "EXPLORE POPULAR REAL ESTATE MARKETS",
  subheading: "Learn about real estate by exploring the top local.",
  markets: [
    { id: 1, name: "ATLANTIC BEACH, FL", href: "/markets/atlantic-beach" },
    { id: 2, name: "FERNANDINA BEACH, FL", href: "/markets/fernandina-beach" },
    { id: 3, name: "MIDDLEBURG, FL", href: "/markets/middleburg" },
    { id: 4, name: "NEPTUNE BEACH, FL", href: "/markets/neptune-beach" },
    { id: 5, name: "CALLAHAN, FL", href: "/markets/callahan" },
    { id: 6, name: "GREEN COVE SPRINGS, FL", href: "/markets/green-cove-springs" },
    { id: 7, name: "JACKSONVILLE BEACH, FL", href: "/markets/jacksonville-beach" },
    { id: 8, name: "ORANGE PARK, FL", href: "/markets/orange-park" }
  ]
};

const whyJoinFallbackData = {
  heading: "WHY JOIN NOBEL REALTY GROUP?",
  subheading: "Award-Winning Buying and Selling",
  text: "At NOBEL REALTY GROUP, we offer coaching to our contractors from established and startup groups. Each month, the owner, Tony Sayed sits down with these groups to provide updates, answer questions and provide updates on market insights, community events, and continuing education about relevant issues.\n\nWe operate exclusively, serving you and only loyal estate team with trusted partners. Our comprehensive proprietary training and broker support will help you build your book of business and succeed in your career.",
  ctaLink: {
    href: "/join",
    text: "JOIN THE NOBEL REALTY GROUP"
  },
  image: { url: "/img/homepage-join-our-team.webp", alternativeText: "Join Us" }
};

const contactFallbackData = {
  heading: "CONNECT WITH US",
  subheading: "Connect your agent & Nobel Realty Group Real Estate Agent Today"
};
