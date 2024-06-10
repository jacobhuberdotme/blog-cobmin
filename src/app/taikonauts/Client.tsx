// src/app/taikonauts/ClientNFTs.tsx
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { NFT } from '../../types/nft';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/nft-card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../../components/ui/hover-card';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '../../components/ui/drawer';
import Loading from './loading';

const LazyImage = dynamic(() => import('../../components/LazyImage'), {
  loading: () => <div className="relative w-full h-full bg-gray-200 animate-pulse rounded-lg" />, // Ensure rounded-lg
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
                  <div className="relative w-full pb-[100%]"> {/* Maintain aspect ratio */}
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
  const [nfts, setNfts] = useState<NFT[]>(initialNfts.slice(0, 100));
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback((node: HTMLElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    fetch('/data/taikonautsrarity.json', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data: NFT[]) => {
        setNfts(prevNfts => [...prevNfts, ...data.slice(page * 100, (page + 1) * 100)]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching NFT data:', error);
        setLoading(false);
      });
  }, [page]);

  if (loading && page === 1) {
    return <Loading />;
  }

  return (
    <>
      <NFTsComponent nfts={nfts} />
      {loading && <div className="text-center py-4">Loading more NFTs...</div>}
      <div ref={lastElementRef} />
    </>
  );
};

export default ClientNFTs;
