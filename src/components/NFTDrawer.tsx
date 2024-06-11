// components/NFTDrawer.tsx
import React, { useEffect, useState } from 'react';
import { NFT } from '@/types/nft';
import { Skeleton } from '@/components/ui/skeleton';

interface NFTDrawerProps {
  nft: NFT;
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
  let level: undefined|string|number = levels.find(function(level) {
    return expMap[level] >= experience;
  });
  level = Number(level) - 1;
  let percentage: number|string = 0;

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
    levelPercent: String(percentage)
  };
};

const NFTDrawer: React.FC<NFTDrawerProps> = ({ nft }) => {
  const [holder, setHolder] = useState<string | null>(null);
  const [loadingHolder, setLoadingHolder] = useState(true);
  const [levelInfo, setLevelInfo] = useState<{ level: number, levelPercent: string } | null>(null);
  const [loadingLevel, setLoadingLevel] = useState(true);

  useEffect(() => {
    if (!nft) return;

    const fetchHolder = async () => {
      try {
        const response = await fetch(`/api/holders?tokenId=${nft.edition}`);
        const data = await response.json();
        if (data.holder) {
          setHolder(data.holder);
        } else {
          console.error('Holder data is not valid:', data);
        }
      } catch (error) {
        console.error('Error fetching holder:', error);
      } finally {
        setLoadingHolder(false);
      }
    };

    const fetchLevel = async () => {
      try {
        const response = await fetch(`/api/xp?edition=${nft.edition}`);
        const data = await response.json();
        const levelData = getLevel(data.xp);
        setLevelInfo(levelData);
      } catch (error) {
        console.error('Error fetching level:', error);
      } finally {
        setLoadingLevel(false);
      }
    };

    fetchHolder();
    fetchLevel();
  }, [nft]);

  return (
    <div>
      {loadingHolder ? (
        <Skeleton className="h-6 w-full mb-2" />
      ) : (
        holder && (
          <p className="text-sm">
            Holder: {holder}
          </p>
        )
      )}
      {loadingLevel ? (
        <Skeleton className="h-6 w-full mb-2" />
      ) : (
        levelInfo && (
          <p className="text-sm">
            LooperLands Level: {levelInfo.level} ({levelInfo.levelPercent}%)
          </p>
        )
      )}
    </div>
  );
};

export default NFTDrawer;
