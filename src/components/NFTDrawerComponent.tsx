import dynamic from 'next/dynamic';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { NFT } from '@/types/nft';

const NFTDrawer = dynamic(() => import('./NFTDrawer'), { ssr: false });

const NFTDrawerComponent = ({ selectedNFT, isDrawerOpen, setIsDrawerOpen }: { selectedNFT: NFT | null, isDrawerOpen: boolean, setIsDrawerOpen: (isOpen: boolean) => void }) => (
  <>
    {selectedNFT && (
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <div className="px-4">
            <h3 className="text-lg mt-4">#{selectedNFT.edition} Rarity: {selectedNFT.rarity}</h3>
            <h3 className="text-lg font-bold mt-4">Properties</h3>
            {selectedNFT.attributeRarities.map((attr, index) => (
              <p key={index} className="text-sm">
                {attr.trait_type}: {attr.value} [{attr.rarity}%]
              </p>
            ))}
            <h3 className="text-lg font-bold mt-4">Information</h3>
            <NFTDrawer nft={selectedNFT} />
          </div>
        </DrawerContent>
      </Drawer>
    )}
  </>
);

export default NFTDrawerComponent;
