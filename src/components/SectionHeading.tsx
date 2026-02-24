import React from "react";
import { Container } from "@/components/Container";

interface SectionHeadingProps {
  data: {
    id: number;
    preHeading: string;
    heading: string;
    text: string;
  };
}

export function SectionHeading({ data }: Readonly<SectionHeadingProps>) {
  if (!data) return null;
  const { preHeading, heading, text } = data;

  return (
    <Container className="flex w-full flex-col mt-4 items-center justify-center text-center ">
      {preHeading && (
        <div className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
          {preHeading}
        </div>
      )}

      {heading && (
        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
          {heading}
        </h2>
      )}

      {text && (
        <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
          {text}
        </p>
      )}
    </Container>
  );
}
