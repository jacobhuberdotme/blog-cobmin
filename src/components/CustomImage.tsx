import Image from 'next/image';

interface CustomImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}

const CustomImage = ({ src, alt, width = '100%', height = 'auto' }: CustomImageProps) => {
  return (
      <Image
        src={src}
        alt={alt}
        width={typeof width === 'string' ? parseInt(width, 10) : width}
        height={typeof height === 'string' ? parseInt(height, 10) : height}
        style={{ width: '100%', height: 'auto' }} // Apply style for responsive image
        className="rounded-lg"
      />
  );
};

export default CustomImage;
