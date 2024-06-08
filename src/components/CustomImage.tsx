import Image from 'next/image';

interface CustomImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}

const CustomImage = ({ src, alt, width = '100%', height = 'auto' }: CustomImageProps) => {
  return (
    <div className="w-full flex justify-center my-4">
      <Image
        src={src}
        alt={alt}
        layout="responsive"
        width={typeof width === 'string' ? parseInt(width, 10) : width}
        height={typeof height === 'string' ? parseInt(height, 10) : height}
        className="rounded-lg"
      />
    </div>
  );
};

export default CustomImage;
