interface AdvantageItem {
  id: number;
  icon: string;
  heading: string;
  text: string;
}

interface AdvantageSectionProps {
  data: {
    heading: string;
    subheading: string;
    items: AdvantageItem[];
  };
}

export function AdvantageSection({ data }: Readonly<AdvantageSectionProps>) {
  if (!data) return null;
  const { heading, subheading, items } = data;

  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-nobel-title font-bold text-gray-900 dark:text-white mb-3 md:mb-4 uppercase">
            {heading}
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300 font-nobel-content max-w-4xl mx-auto">
            {subheading}
          </p>
        </div>

        {/* Grid of Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item) => (
            <div key={item.id} className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              {/* Icon placeholder */}
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <div className="text-4xl">{item.icon}</div>
              </div>
              <h3 className="text-lg md:text-xl font-nobel-content font-bold text-gray-900 dark:text-white mb-3">
                {item.heading}
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-nobel-content leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
