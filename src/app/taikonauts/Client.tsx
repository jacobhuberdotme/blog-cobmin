// src/app/taikonauts/ClientNFTs.tsx
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { NFT } from '../../types/nft';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/nft-card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../../components/ui/hover-card';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '../../components/ui/drawer';
import Loading from './loading';

const LazyImage = dynamic(() => import('../../components/LazyImage'), {
  loading: () => <div className="relative w-full h-64 bg-gray-200 animate-pulse" />,
  ssr: false,
});

const NFTsComponent = ({ nfts }: { nfts: NFT[] }) => (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Taikonauts NFTs by Rarity</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {nfts.map((nft) => (
          <div key={nft.edition} className="relative">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Card>
                  <CardContent>
                    <div className="relative w-full" style={{ paddingBottom: '100%' }}> {/* Aspect ratio 1:1 */}
                      <LazyImage
                        src={`https://qk5zmcowye2gfiufzx5l232ltb7ikz64wjpwc2d3uiwzthhjfpsa.arweave.net/gruWCdbBNGKihc36vW9LmH6FZ9yyX2Foe6ItmZzpK-Q/${nft.edition}.gif`}
                        alt={`NFT ${nft.edition}`}
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </CardContent>
                  <CardHeader>
                    <CardTitle>Edition: {nft.edition}</CardTitle>
                    <CardDescription>Rarity: {nft.rarity}</CardDescription>
                  </CardHeader>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent>
                {nft.attributeRarities.map((attr, index) => (
                  <p key={index} className="text-sm">
                    {attr.trait_type}: {attr.value} ({attr.rarity})
                  </p>
                ))}
              </HoverCardContent>
            </HoverCard>
            <Drawer>
              <DrawerTrigger asChild>
                <div className="absolute inset-0 w-full h-full"></div>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Edition: {nft.edition}</DrawerTitle>
                  <DrawerDescription>Rarity: {nft.rarity}</DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                  {nft.attributeRarities.map((attr, index) => (
                    <p key={index} className="text-sm">
                      {attr.trait_type}: {attr.value} ({attr.rarity})
                    </p>
                  ))}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        ))}
      </div>
    </div>
  );  

const ClientNFTs = ({ initialNfts }: { initialNfts: NFT[] }) => {
  const [nfts, setNfts] = useState<NFT[]>(initialNfts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialNfts.length === 0) {
      setLoading(true);
      fetch('/data/taikonautsrarity.json', { cache: 'no-store' })
        .then((response) => response.json())
        .then((data: NFT[]) => {
          setNfts(data.slice(0, 100)); // Load only the first 100 NFTs
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching NFT data:', error);
          setLoading(false);
        });
    }
  }, [initialNfts]);

  if (loading) {
    return <Loading />;
  }

  return <NFTsComponent nfts={nfts} />;
};

export default ClientNFTs;
