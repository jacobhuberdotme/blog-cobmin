import { NFT } from "@/types/nft";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/nft-card";

const NFTsComponent = ({ nfts, openDrawer }: { nfts: NFT[], openDrawer: (nft: NFT) => void }) => (
  <div className="container mx-auto p-4">
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
  </div>
);

export default NFTsComponent;
