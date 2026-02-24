import Image from "next/image";
import Link from "next/link";

interface ExperienceSectionProps {
  data: {
    heading: string;
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

export function ExperienceSection({ data }: Readonly<ExperienceSectionProps>) {
  if (!data) return null;
  const { heading, text, ctaLink, image } = data;

  return (
    <div className="bg-white dark:bg-gray-900 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-nobel-title font-bold text-gray-900 dark:text-white mb-4 md:mb-6 uppercase">
              {heading}
            </h2>
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

          {/* Image */}
          <div className="relative order-1 lg:order-2 h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src={image.url}
              alt={image.alternativeText || heading}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
