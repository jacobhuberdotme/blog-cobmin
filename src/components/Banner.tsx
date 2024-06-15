import Image from 'next/image';

const Banner = () => (
  <div className="container mx-auto p-4 pb-0 text-center">
    <div className="relative w-full" style={{ paddingTop: '33.33%' }}>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg">
        <Image
          src="/taikonauts-image.gif"
          alt="Taikonauts Banner"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  </div>
);

export default Banner;
