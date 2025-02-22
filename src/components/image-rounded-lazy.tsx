"use client";

import type { ImageProps } from "next/image";
import Image from "next/image";
import { useEffect, useState } from "react";

const ImageRoundedLazy = ({ className = "", alt, ...props }: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new window.Image();
    img.src = props.src as string;
    img.onload = () => setIsLoading(false);
  }, [props.src]);

  return (
    <>
      {isLoading && <Image className={className} src="/loading.gif" alt="Loading" width={500} height={500} />}
      <Image {...props} className={`rounded-lg ${className} ${isLoading ? "hidden" : "block"}`} alt={alt} onLoad={() => setIsLoading(false)} />
    </>
  );
};

export default ImageRoundedLazy;
