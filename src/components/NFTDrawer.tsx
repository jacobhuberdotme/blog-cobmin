import { useState, useEffect } from 'react';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { NFT } from '@/types/nft';
import { Skeleton } from '@/components/ui/skeleton';

interface NFTDrawerComponentProps {
  selectedNFT: NFT | null;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
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

const getLevel = (experience: number) => {
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

const NFTDrawerComponent: React.FC<NFTDrawerComponentProps> = ({ selectedNFT, isDrawerOpen, setIsDrawerOpen }) => {
  const [holder, setHolder] = useState<string | null>(null);
  const [loadingHolder, setLoadingHolder] = useState(true);
  const [levelInfo, setLevelInfo] = useState<{ level: number, levelPercent: string } | null>(null);
  const [loadingLevel, setLoadingLevel] = useState(true);

  useEffect(() => {
    if (!selectedNFT) return;

    const fetchHolder = async () => {
      try {
        console.log('Fetching holder for edition:', selectedNFT.edition);
        const response = await fetch(`/api/getHolder?tokenId=${selectedNFT.edition}`);
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
        console.log('Fetching XP for edition:', selectedNFT.edition);
        const response = await fetch(`/api/getXp?edition=${selectedNFT.edition}`);
        const data = await response.json();
        console.log('Fetched XP data:', data);
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
  }, [selectedNFT]);

  return (
    <>
      {selectedNFT && (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent>
            <div className="px-4 py-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{selectedNFT.name}</h3>
                <p className="text-md">Rarity: {selectedNFT.rarity}</p>
              </div>
              <p className="text-sm text-gray-600">{selectedNFT.description}</p>
              <div className="flex flex-col">
                <div>
                  <h4 className="text-lg font-semibold">Properties</h4>
                  {selectedNFT.attributeRarities.map((attr, index) => (
                    <p key={index} className="text-sm">
                      {attr.trait_type}: {attr.value} ({attr.rarity}%)
                    </p>
                  ))}
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Information</h4>
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
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default NFTDrawerComponent;
