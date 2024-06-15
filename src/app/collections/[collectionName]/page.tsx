import { Suspense } from 'react';
import { ServerNFTs } from './serverUtils';
import Loading from '../loading';
import ClientNFTs from './ClientNFTs';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { collectionName: string } }): Promise<Metadata> {
  return {
    title: `${params.collectionName} NFT Collection`,
    description: `Explore the ${params.collectionName} NFT collection`,
    openGraph: {
      type: 'website',
      title: `${params.collectionName} NFT Collection`,
      description: `Explore the ${params.collectionName} NFT collection`,
      url: `https://www.cobmin.com/collections/${params.collectionName}`,
      siteName: params.collectionName,
      images: [
        {
          url: `https://www.cobmin.com/${params.collectionName}-image.png`,
          width: 800,
          height: 600,
          alt: `${params.collectionName} Header Photo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: `https://www.cobmin.com/collections/${params.collectionName}`,
      creator: '@taikonautsnft',
      title: `${params.collectionName} NFT Collection`,
      description: `Explore the ${params.collectionName} NFT collection`,
      images: [
        {
          url: `https://www.cobmin.com/${params.collectionName}-image.png`,
          width: 800,
          height: 600,
          alt: `${params.collectionName} Header Photo`,
        },
      ],
    },
    robots: 'index, follow',
    keywords: ['NFT', params.collectionName, 'Blockchain', 'Crypto', 'NFT Collection'],
  };
}

async function getNFTData(collectionName: string) {
  try {
    const { nfts, tokenInfo, traitCounts } = await ServerNFTs(collectionName);
    return { nfts, tokenInfo, traitCounts };
  } catch (error) {
    console.error(`Failed to load NFTs for collection ${collectionName}:`, error);
    return { nfts: [], tokenInfo: null, traitCounts: {} };
  }
}

export default async function NFTsPage({ params }: { params: { collectionName: string } }) {
  const { collectionName } = params;
  const { nfts, tokenInfo, traitCounts } = await getNFTData(collectionName);

  return (
    <Suspense fallback={<Loading />}>
      <ClientNFTs 
        initialNfts={nfts} 
        initialTokenInfo={tokenInfo} 
        traitCounts={traitCounts} 
        collectionName={collectionName}  // Pass the collectionName here
      />
    </Suspense>
  );
}
