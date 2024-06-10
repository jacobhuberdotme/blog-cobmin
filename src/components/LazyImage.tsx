// src/components/LazyImage.tsx
'use client';

import { FC } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage: FC<LazyImageProps> = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`w-full h-full object-cover rounded-lg ${className}`}
    />
  );
};

export default LazyImage;
