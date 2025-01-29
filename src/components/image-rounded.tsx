import type { ImageProps } from "next/image";
import Image from "next/image";

const ImageRounded = ({ className = "", alt, ...props }: ImageProps) => {
  return <Image {...props} className={`rounded-lg ${className}`} alt={alt} />;
};

export default ImageRounded;
