"use client";

import type { ImageProps } from "next/image";
import Image from "next/image";
import { useEffect, useState } from "react";

const ImageRoundedLazy = ({ className = "", alt, width, height, ...props }: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new window.Image();
    img.src = props.src as string;
    img.onload = () => setIsLoading(false);
  }, [props.src]);

  return (
    <div style={{ width, height }} className={`relative overflow-hidden rounded-lg ${className}`}>
      <Image
        src="/loading.gif"
        alt="Loading"
        width={width}
        height={height}
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
      />

      <Image
        {...props}
        width={width}
        height={height}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
};

export default ImageRoundedLazy;
