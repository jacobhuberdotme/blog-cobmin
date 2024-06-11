import dynamic from 'next/dynamic';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { NFT } from '@/types/nft';

const NFTDrawer = dynamic(() => import('./NFTDrawer'), { ssr: false });

const NFTDrawerComponent = ({ selectedNFT, isDrawerOpen, setIsDrawerOpen }: { selectedNFT: NFT | null, isDrawerOpen: boolean, setIsDrawerOpen: (isOpen: boolean) => void }) => (
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
                    {attr.trait_type}: {attr.value} [{attr.rarity}%]
                  </p>
                ))}
              </div>
              <div>
                <h4 className="text-lg font-semibold">Information</h4>
                <NFTDrawer nft={selectedNFT} />
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    )}
  </>
);

export default NFTDrawerComponent;
