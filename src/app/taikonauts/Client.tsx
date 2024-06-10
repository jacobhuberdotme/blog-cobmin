'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { NFT } from '../../types/nft';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/nft-card';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '../../components/ui/drawer';
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const NFTsComponent = ({ nfts }: { nfts: NFT[] }) => (
  <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold text-center mb-8">Taikonauts NFTs by Rarity</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {nfts.map((nft) => (
        <div key={nft.edition} className="relative">
          <Card>
            <CardContent>
              <div className="relative w-full pb-[100%]"> {/* Maintain aspect ratio */}
                <img
                  src={nft.imageUrl}
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
                    {attr.trait_type}: {attr.value} [{attr.rarity}%]
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

const ClientNFTs = ({ initialNfts, initialTokenInfo }: { initialNfts: NFT[], initialTokenInfo: any }) => {
  const [nfts, setNfts] = useState<NFT[]>(initialNfts);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver>();
  const [tokenInfo, setTokenInfo] = useState<any>(initialTokenInfo);

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
    if (page > 1) {
      setLoading(true);
      fetch(`/api/nfts?page=${page}`)
        .then((response) => response.json())
        .then(({ nfts: newNfts }) => {
          setNfts(prevNfts => [...prevNfts, ...newNfts]);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching NFT data:', error);
          setLoading(false);
        });
    }
  }, [page]);

  return (
    <>
      {!tokenInfo && (
        <div className="container mx-auto p-4 mb-8">
          <div className="animate-pulse">
            <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
            <div className="my-4">
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex h-5 items-center space-x-4 text-sm">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="my-4">
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      )}
      {tokenInfo && (
        <div className="container text-center mx-auto p-4 mb-8">
          <h1 className="text-3xl font-bold mb-4">{tokenInfo.token_name}</h1>
          <div className="space-y-1">
            <p className="break-words"><strong>Token Address:</strong> {tokenInfo.token_address}</p>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-center items-center space-x-4 text-sm">
            <div><strong>Symbol:</strong> {tokenInfo.token_symbol}</div>
            <Separator orientation="vertical" />
            <div><strong>Supply:</strong> {parseInt(tokenInfo.total_supply) + 1}</div>
            <Separator orientation="vertical" />
            <div><strong>Holders:</strong> {tokenInfo.total_holders}</div>
            <Separator orientation="vertical" />
            <div><strong>Transfers:</strong> {tokenInfo.total_transfers}</div>
          </div>
          <Separator className="my-4" />
          <NFTsComponent nfts={nfts} />
          {loading && <div className="text-center py-4">Loading...</div>}
          <div ref={lastElementRef} />
        </div>
      )}
    </>
  );
};

export default ClientNFTs;
