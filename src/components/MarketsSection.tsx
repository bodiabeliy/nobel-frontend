import Link from "next/link";

interface MarketLink {
  id: number;
  name: string;
  href: string;
  count?: string;
}

interface MarketsSectionProps {
  data: {
    heading: string;
    subheading?: string;
    markets: MarketLink[];
  };
}

export function MarketsSection({ data }: Readonly<MarketsSectionProps>) {
  if (!data) return null;
  const { heading, subheading, markets } = data;

  return (
    <div className="bg-nobel-blue dark:bg-gray-900 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-nobel-title font-bold text-white mb-3 md:mb-4 uppercase">
            {heading}
          </h2>
          {subheading && (
            <p className="text-sm md:text-base lg:text-lg text-white/90 font-nobel-content">
              {subheading}
            </p>
          )}
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {markets.map((market) => (
            <Link
              key={market.id}
              href={market.href}
              className="text-white hover:text-gray-200 font-nobel-content text-sm md:text-base transition-colors text-center py-2 px-2 hover:bg-white/10 rounded"
            >
              {market.name}
              {market.count && (
                <span className="text-white/70 ml-1 text-xs">({market.count})</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
