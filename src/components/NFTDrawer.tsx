import React, { useEffect, useState } from 'react';
import { NFT } from '@/types/nft';
import { Skeleton } from '@/components/ui/skeleton';

interface NFTDrawerProps {
  nft: NFT;
}

const NFTDrawer: React.FC<NFTDrawerProps> = ({ nft }) => {
  const [holder, setHolder] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!nft) return;
    const fetchHolder = async () => {
      try {
        console.log(`Fetching holder for tokenId: ${nft.edition}`);
        const response = await fetch(`/api/holders?tokenId=${nft.edition}`);
        const data = await response.json();
        console.log('Holder data:', data);
        if (data.holder) {
          setHolder(data.holder);
        } else {
          console.error('Holder data is not valid:', data);
        }
      } catch (error) {
        console.error('Error fetching holder:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHolder();
  }, [nft]);

  return (
    <div>
      {loading ? (
        <Skeleton className="h-6 w-full mb-2" />
      ) : (
        holder && (
          <p className="text-sm">
            {holder}
          </p>
        )
      )}
    </div>
  );
};

export default NFTDrawer;
