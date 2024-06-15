import { NFT } from '@/types/nft';
import { promises as fs } from 'fs';
import { join } from 'path';
import { cache } from 'react';
import 'server-only';

const API_KEY_LOOPERLANDS = process.env.API_KEY_LOOPERLANDS;

if (!API_KEY_LOOPERLANDS) {
  throw new Error('API_KEY is not defined');
}

const headers = {
  'x-api-key': API_KEY_LOOPERLANDS as string,
};

const getNfts = cache(async (collectionName: string): Promise<NFT[]> => {
  const filePath = join(process.cwd(), 'public', 'data', `${collectionName}.json`);
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data: NFT[] = JSON.parse(fileContents);
  return data;
});

const getTokenInfo = cache(async () => {
  const response = await fetch('https://api.w3w.ai/taiko/v1/explorer/token/0x56b0d8d04de22f2539945258ddb288c123026775/profile', {
    headers: headers,
  });
  if (!response.ok) {
    throw new Error('Failed to fetch token info');
  }
  return response.json();
});

const generateImageUrl = (nft: NFT) => {
  return `https://qk5zmcowye2gfiufzx5l232ltb7ikz64wjpwc2d3uiwzthhjfpsa.arweave.net/gruWCdbBNGKihc36vW9LmH6FZ9yyX2Foe6ItmZzpK-Q/${nft.edition}.gif`;
};

const calculateTraitCounts = (nfts: NFT[]) => {
  const traitCounts: Record<string, { count: number, values: Record<string, { count: number, rarity: string }> }> = {};

  nfts.forEach(nft => {
    nft.attributeRarities.forEach(attr => {
      if (!traitCounts[attr.trait_type]) {
        traitCounts[attr.trait_type] = { count: 0, values: {} };
      }
      traitCounts[attr.trait_type].count++;
      if (!traitCounts[attr.trait_type].values[attr.value]) {
        traitCounts[attr.trait_type].values[attr.value] = { count: 0, rarity: attr.rarity };
      }
      traitCounts[attr.trait_type].values[attr.value].count++;
    });
  });

  return traitCounts;
};

// Preload NFTs data
export const preloadNfts = (collectionName: string) => {
  void getNfts(collectionName);
};

// Preload token info
export const preloadTokenInfo = () => {
  void getTokenInfo();
};

export async function getNFTData(edition: number) {
  const response = await fetch(`https://ww3du5ng2zgic6carv7dw3itjgagadeatq6fl3xjwplj4emuxc5a.arweave.net/tbY6dabWTIF4QI1-O20TSYBgDICcPFXu6bPWnhGUuLo/${edition}.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch NFT data');
  }
  return response.json();
}

export async function ServerNFTs(collectionName: string, page: number = 1, query?: string, sort?: string, filters?: Record<string, string[]>) {
  console.log('Fetching NFTs for:', { collectionName, page, query, sort, filters });  // Add logging
  const nfts = await getNfts(collectionName);
  let filteredNfts = nfts;

  if (query) {
    filteredNfts = filteredNfts.filter(nft => nft.edition.toString().includes(query));
  }

  if (filters) {
    filteredNfts = filteredNfts.filter(nft =>
      Object.keys(filters).every(traitType =>
        filters[traitType].includes(nft.attributeRarities.find(attr => attr.trait_type === traitType)?.value || "")
      )
    );
  }

  switch (sort) {
    case 'number-asc':
      filteredNfts = filteredNfts.sort((a, b) => a.edition - b.edition);
      break;
    case 'number-desc':
      filteredNfts = filteredNfts.sort((a, b) => b.edition - a.edition);
      break;
    case 'rarity-asc':
      filteredNfts = filteredNfts.sort((a, b) => a.rarity - b.rarity);
      break;
    case 'rarity-desc':
      filteredNfts = filteredNfts.sort((a, b) => b.rarity - a.rarity);
      break;
    default:
      filteredNfts = filteredNfts.sort((a, b) => a.edition - b.edition);
  }

  const traitCounts = calculateTraitCounts(nfts);

  const paginatedNfts = filteredNfts.slice((page - 1) * 50, page * 50).map(nft => ({
    ...nft,
    imageUrl: generateImageUrl(nft),
  }));
  const tokenInfo = await getTokenInfo();
  return { nfts: paginatedNfts, tokenInfo, totalResults: filteredNfts.length, traitCounts };
}
