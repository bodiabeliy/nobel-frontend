interface StatItem {
  id: number;
  value: string;
  label: string;
}

interface StatsSectionProps {
  data: {
    heading: string;
    subheading?: string;
    stats: StatItem[];
  };
}

export function StatsSection({ data }: Readonly<StatsSectionProps>) {
  if (!data) return null;
  const { heading, subheading, stats } = data;

  return (
    <div className="bg-white dark:bg-gray-900 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-nobel-title font-bold text-gray-900 dark:text-white mb-3 md:mb-4 uppercase">
            {heading}
          </h2>
          {subheading && (
            <p className="text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300 font-nobel-content max-w-4xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8 bg-gray-100 dark:bg-gray-800 py-8 md:py-10 px-4 md:px-6 rounded-lg">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-nobel-title font-bold text-nobel-blue dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-nobel-content uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
