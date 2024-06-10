import { NFT } from '@/types/nft';
import { promises as fs } from 'fs';
import { join } from 'path';
import { cache } from 'react';
import 'server-only';

const getNfts = cache(async (): Promise<NFT[]> => {
  const filePath = join(process.cwd(), 'public', 'data', 'taikonautsrarity.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data: NFT[] = JSON.parse(fileContents);
  return data;
});

const getTokenInfo = cache(async () => {
  const response = await fetch('https://api.w3w.ai/taiko/v1/explorer/token/0x56b0d8d04de22f2539945258ddb288c123026775/profile');
  if (!response.ok) {
    throw new Error('Failed to fetch token info');
  }
  return response.json();
});

const generateImageUrl = (nft: NFT) => {
  return `https://qk5zmcowye2gfiufzx5l232ltb7ikz64wjpwc2d3uiwzthhjfpsa.arweave.net/gruWCdbBNGKihc36vW9LmH6FZ9yyX2Foe6ItmZzpK-Q/${nft.edition}.gif`;
};

export const preloadNfts = () => {
  void getNfts();
};

export const preloadTokenInfo = () => {
  void getTokenInfo();
};

export async function ServerNFTs(page: number = 1) {
  const nfts = await getNfts();
  const paginatedNfts = nfts.slice((page - 1) * 100, page * 100).map(nft => ({
    ...nft,
    imageUrl: generateImageUrl(nft)
  }));
  const tokenInfo = await getTokenInfo();
  return { nfts: paginatedNfts, tokenInfo };
}

export async function getHolder(tokenId: number) {
  const response = await fetch(`https://api.routescan.io/v2/network/mainnet/evm/167000/erc721-transfers?tokenAddress=0x56b0d8d04de22f2539945258ddb288c123026775&tokenId=${tokenId}&limit=1`);
  const data = await response.json();
  if (data.items && data.items.length > 0) {
    return data.items[0].to;
  } else {
    throw new Error('No holder found for this token ID');
  }
}
