"use client"

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '../../components/ui/nft-card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../../components/ui/hover-card';
import { NFT } from '../../types/nft';

const NFTsPage = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);

  useEffect(() => {
    fetch('/data/taikonautsrarity.json')
      .then((response) => response.json())
      .then((data: NFT[]) => {
        setNfts(data);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Taikonauts NFTs by Rarity</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {nfts.map((nft) => (
          <HoverCard key={nft.edition}>
            <HoverCardTrigger asChild>
              <Card>
                <CardContent>
                  <img
                    src={`https://qk5zmcowye2gfiufzx5l232ltb7ikz64wjpwc2d3uiwzthhjfpsa.arweave.net/gruWCdbBNGKihc36vW9LmH6FZ9yyX2Foe6ItmZzpK-Q/${nft.edition}.gif`}
                    alt={`NFT ${nft.edition}`}
                    className="w-full rounded"
                  />
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
        ))}
      </div>
    </div>
  );
};

export default NFTsPage;
