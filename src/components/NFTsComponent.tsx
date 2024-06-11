// components/NFTsComponent.tsx

import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/nft-card';
import { NFT } from '@/types/nft';

const NFTsComponent = ({ nfts, openDrawer, handleSearch, handleSortChange, sort, lastElementRef }: 
  { nfts: NFT[], openDrawer: (nft: NFT) => void, handleSearch: (term: string) => void, handleSortChange: (value: string) => void, sort: string, lastElementRef: (node: HTMLElement | null) => void }) => (
  <div className="container mx-auto p-4">
    <div className="flex justify-between items-center mb-4">
      <Input
        type="number"
        placeholder="Search by Edition"
        onChange={(e) => handleSearch(e.target.value)}
        className="w-1/4 mr-4"
      />
      <Select onValueChange={handleSortChange} value={sort}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="number-asc">Number Ascending</SelectItem>
          <SelectItem value="number-desc">Number Descending</SelectItem>
          <SelectItem value="rarity-asc">Rarity Ascending</SelectItem>
          <SelectItem value="rarity-desc">Rarity Descending</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {nfts.map((nft) => (
        <div key={nft.edition} className="relative">
          <Card onClick={() => openDrawer(nft)}>
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
              <CardTitle>#{nft.edition}</CardTitle>
              <CardDescription>Rarity: {nft.rarity}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
    <div ref={lastElementRef} />
  </div>
);

export default NFTsComponent;