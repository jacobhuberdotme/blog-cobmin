import { NFT } from '@/types/nft';
import { promises as fs } from 'fs';
import { join } from 'path';
import { cache } from 'react';
import 'server-only';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error('API_KEY is not defined');
}

const headers = {
  'x-api-key': API_KEY as string,
};

const getNfts = cache(async (): Promise<NFT[]> => {
  const filePath = join(process.cwd(), 'public', 'data', 'taikonautsrarity.json');
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

export const preloadNfts = () => {
  void getNfts();
};

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

export async function ServerNFTs(page: number = 1, query?: string, sort?: string, filters?: Record<string, string[]>) {
  const nfts = await getNfts();
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

  const paginatedNfts = filteredNfts.slice((page - 1) * 100, page * 100).map(nft => ({
    ...nft,
    imageUrl: generateImageUrl(nft),
  }));
  const tokenInfo = await getTokenInfo();
  return { nfts: paginatedNfts, tokenInfo, totalResults: filteredNfts.length, traitCounts };
}

export async function getHolder(tokenId: number) {
  const response = await fetch(`https://api.routescan.io/v2/network/mainnet/evm/167000/erc721-transfers?tokenAddress=0x56b0d8d04de22f2539945258ddb288c123026775&tokenId=${tokenId}&limit=1`, {
    headers: headers,
  });
  const data = await response.json();
  if (data.items && data.items.length > 0) {
    return data.items[0].to;
  } else {
    throw new Error('No holder found for this token ID');
  }
}

export async function getXP(edition: number) {
  const response = await fetch(`https://api.looperlands.io/api/game/asset/xp/0x56b0D8d04de22f2539945258ddb288c123026775_${edition}`, {
    headers: headers,
  });
  const data = await response.json();
  return data.xp;
}

const calculateExpMap = () => {
  const experienceMap: any = {};
  experienceMap[1] = 0;
  for (let level = 2; level <= 100; level++) {
    let experienceRequired = 0;
    experienceRequired = Math.floor(100 * (9 * Math.pow(level, 3) - 51 * Math.pow(level, 2) + 126 * level - 108));
    experienceMap[level] = experienceRequired;
  }
  return experienceMap;
};

const expMap = calculateExpMap();

export const getLevel = (experience: number) => {
  let levels = Object.keys(expMap);
  let level: undefined | string | number = levels.find(function (level) {
    return expMap[level] >= experience;
  });
  level = Number(level) - 1;
  let percentage: number | string = 0;

  if (level > 0) {
    const currentLevelExperience = expMap[level];
    const nextLevelExperience = expMap[level + 1];
    let experienceToNextLevel;
    let experienceRequiredToLevel;
    experienceToNextLevel = experience - currentLevelExperience;
    experienceRequiredToLevel = nextLevelExperience - currentLevelExperience;
    percentage = (experienceToNextLevel / experienceRequiredToLevel) * 100;
    percentage = percentage.toFixed(2);
  }

  return {
    level: level,
    levelPercent: String(percentage),
  };
};
