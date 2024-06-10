// src/app/taikonauts/ServerNFTs.tsx
import { promises as fs } from 'fs';
import { join } from 'path';
import { cache } from 'react';
import 'server-only';
import { NFT } from '../../types/nft';

const getNfts = cache(async (): Promise<NFT[]> => {
  const filePath = join(process.cwd(), 'public', 'data', 'taikonautsrarity.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data: NFT[] = JSON.parse(fileContents);
  return data.slice(0, 1000); // Load only the first 100 NFTs
});

export const preloadNfts = () => {
  void getNfts();
};

export default async function ServerNFTs() {
  const nfts = await getNfts();
  return nfts;
}
