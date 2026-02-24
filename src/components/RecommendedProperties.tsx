import Image from "next/image";
import Link from "next/link";

interface Property {
  id: number;
  title: string;
  location: string;
  image: {
    url: string;
    alternativeText: string | null;
  };
  price?: string;
}

interface RecommendedPropertiesProps {
  data: {
    heading: string;
    subheading?: string;
    properties: Property[];
    ctaLink?: {
      href: string;
      text: string;
    };
  };
}

export function RecommendedProperties({ data }: Readonly<RecommendedPropertiesProps>) {
  if (!data) return null;
  const { heading, subheading, properties, ctaLink } = data;

  return (
    <div className="bg-white dark:bg-gray-900 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-nobel-title font-bold text-gray-900 dark:text-white mb-3 md:mb-4 uppercase">
            {heading}
          </h2>
          {subheading && (
            <p className="text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300 font-nobel-content">
              {subheading}
            </p>
          )}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {properties.map((property) => (
            <div 
              key={property.id} 
              className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gray-800 cursor-pointer"
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                <Image
                  src={property.image.url}
                  alt={property.image.alternativeText || property.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-nobel-content text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {property.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-nobel-content text-sm">
                  {property.location}
                </p>
                {property.price && (
                  <p className="text-nobel-blue dark:text-blue-400 font-nobel-content font-bold text-lg mt-2">
                    {property.price}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {ctaLink && (
          <div className="text-center">
            <Link
              href={ctaLink.href}
              className="inline-block px-6 md:px-8 py-3 bg-nobel-blue hover:bg-nobel-blue/90 text-white rounded font-nobel-content text-sm md:text-base font-bold transition-colors"
            >
              {ctaLink.text}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
