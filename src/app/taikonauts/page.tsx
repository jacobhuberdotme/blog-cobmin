import { Suspense } from 'react';
import { ServerNFTs, preloadNfts, preloadTokenInfo } from './Server';
import ClientNFTs from './Client';
import Loading from './loading';
import type { Metadata } from 'next';

preloadNfts();
preloadTokenInfo();

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Taikonauts NFT Collection',
    description: 'Marching to the beat of the 🥁 & exploring the unknown | First NFT collection on Taiko',
    openGraph: {
      type: 'website',
      title: 'Taikonauts NFT Collection',
      description: 'Marching to the beat of the 🥁 & exploring the unknown | First NFT collection on Taiko',
      url: 'https://www.cobmin.com/taikonauts',
      siteName: 'Taikonauts',
      images: [
        {
          url: 'https://www.cobmin.com/taikonauts-image.png', // Ensure this path is correct
          width: 800,
          height: 600,
          alt: 'Taikonauts Header Photo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: 'https://www.cobmin.com/taikonauts',
      creator: '@taikonautsnft',
      title: 'Taikonauts NFT Collection',
      description: 'Marching to the beat of the 🥁 & exploring the unknown | First NFT collection on Taiko',
      images: [
        {
          url: 'https://www.cobmin.com/taikonauts-image.png', // Ensure this path is correct
          width: 800,
          height: 600,
          alt: 'Taikonauts Header Photo',
        },
      ],
    },
    robots: 'index, follow',
    keywords: ['NFT', 'Taikonauts', 'Taiko', 'Blockchain', 'Crypto', 'NFT Collection'],
  };
}

export default async function NFTsPage() {
  const { nfts, tokenInfo } = await ServerNFTs();
  return (
    <Suspense fallback={<Loading />}>
      <ClientNFTs initialNfts={nfts} initialTokenInfo={tokenInfo} />
    </Suspense>
  );
}
