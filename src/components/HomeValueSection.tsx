"use client";

interface HomeValueSectionProps {
  data: {
    heading: string;
    subheading?: string;
  };
}

export function HomeValueSection({ data }: Readonly<HomeValueSectionProps>) {
  if (!data) return null;
  const { heading, subheading } = data;

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 text-center max-w-[1280px]">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-nobel-title font-bold text-gray-900 dark:text-white mb-3 md:mb-4 tracking-wide uppercase">
          {heading}
        </h2>
        {subheading && (
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-8 font-nobel-content">
            {subheading}
          </p>
        )}
        
        {/* Search Form */}
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              placeholder="Enter your address here..."
              className="flex-1 px-4 py-3 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nobel-blue"
            />
            <button className="px-6 md:px-8 py-3 bg-nobel-blue hover:bg-nobel-blue/90 text-white rounded font-nobel-content text-sm md:text-base font-bold transition-colors whitespace-nowrap">
              Get Value
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
