import Image from "next/image";
import Link from "next/link";

interface WhyJoinSectionProps {
  data: {
    heading: string;
    subheading: string;
    text: string;
    ctaLink?: {
      href: string;
      text: string;
    };
    image: {
      url: string;
      alternativeText: string | null;
    };
  };
}

export function WhyJoinSection({ data }: Readonly<WhyJoinSectionProps>) {
  if (!data) return null;
  const { heading, subheading, text, ctaLink, image } = data;

  return (
    <div className="bg-white dark:bg-gray-900 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src={image.url}
              alt={image.alternativeText || heading}
              fill
              className="object-cover"
            />
          </div>

          {/* Text Content */}
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-nobel-title font-bold text-gray-900 dark:text-white mb-3 md:mb-4 uppercase">
              {heading}
            </h2>
            <p className="text-lg md:text-xl text-nobel-blue dark:text-blue-400 font-nobel-script mb-4 md:mb-6">
              {subheading}
            </p>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300 font-nobel-content mb-6 md:mb-8 leading-relaxed whitespace-pre-line">
              {text}
            </p>
            {ctaLink && (
              <Link
                href={ctaLink.href}
                className="inline-block px-6 md:px-8 py-3 bg-nobel-blue hover:bg-nobel-blue/90 text-white rounded font-nobel-content text-sm md:text-base font-bold transition-colors"
              >
                {ctaLink.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
