import React from "react";
import Link from "next/link";
import { Container } from "@/components/Container";

interface CtaProps {
  data: {
    id: number;
    __component: string;
    heading: string;
    subHeading: string;
    cta: {
      id: number;
      href: string;
      text: string;
      external: boolean;
    };
  };
}

export function Cta({ data }: CtaProps) {
  if (!data) return null;
  const { heading, subHeading, cta } = data;
  return (
    <Container>
      <div className="flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-white bg-indigo-600 px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-xl">
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-medium lg:text-3xl">{heading}</h2>
          <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
            {subHeading}
          </p>
        </div>
        <div className="flex-shrink-0 w-full text-center lg:w-auto">
          <Link
            href={cta.href}
            target={cta.external ? "_blank" : "_self"}
            rel="noopener"
            className="inline-block py-3 mx-auto text-lg font-medium text-center text-indigo-600 bg-white rounded-md px-7 lg:px-10 lg:py-5 "
          >
            {cta.text}
          </Link>
        </div>
      </div>
    </Container>
  );
}
