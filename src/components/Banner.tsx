import Image from 'next/image';

const Banner = () => (
  <div className="container mx-auto p-4 text-center">
    <Image 
      src="/taikonauts-image.gif" 
      alt="Taikonauts Banner" 
      width={1200}  // Adjust the width according to your needs
      height={300}  // Adjust the height according to your needs
      className="w-full mb-4 rounded-lg" 
    />
  </div>
);

export default Banner;
