'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { NFT } from '../../types/nft';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/nft-card';
import { Drawer, DrawerContent } from '../../components/ui/drawer';
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import dynamic from 'next/dynamic';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ArrowUpIcon } from "@radix-ui/react-icons";  // Import an icon for the scroll-to-top button

const NFTDrawer = dynamic(() => import('../../components/NFTDrawer'), { ssr: false });

const NFTsComponent = ({ nfts, openDrawer, handleSearch, handleSortChange, sort, lastElementRef }: 
  { nfts: NFT[], openDrawer: (nft: NFT) => void, handleSearch: (term: string) => void, handleSortChange: (value: string) => void, sort: string, lastElementRef: (node: HTMLElement | null) => void }) => (
  <div className="container mx-auto p-4">
    <div className="flex justify-between items-center mb-4">
      <Input
        type="number"
        placeholder="Search by Edition"
        onChange={(e) => handleSearch(e.target.value)}
        className="w-1/4 mr-4"  // Made the input smaller
      />
      <Select onValueChange={handleSortChange} value={sort}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="number-asc">Number Ascending</SelectItem>
          <SelectItem value="number-desc">Number Descending</SelectItem>
          <SelectItem value="rarity-asc">Rarity Ascending</SelectItem>
          <SelectItem value="rarity-desc">Rarity Descending</SelectItem>
        </SelectContent>
      </Select>
    </div>
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
    <div ref={lastElementRef} /> {/* Ensure this is inside NFTsComponent */}
  </div>
);

const ClientNFTs = ({ initialNfts, initialTokenInfo }: { initialNfts: NFT[], initialTokenInfo: any }) => {
  const [nfts, setNfts] = useState<NFT[]>(initialNfts);
  const [loading, setLoading] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<any>(initialTokenInfo);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sort, setSort] = useState('number-asc');
  const [showScrollToTop, setShowScrollToTop] = useState(false); // State for showing scroll-to-top button

  const observer = useRef<IntersectionObserver>();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const openDrawer = (nft: NFT) => {
    setSelectedNFT(nft);
    setIsDrawerOpen(true);
  };

  const lastElementRef = useCallback((node: HTMLElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchMoreNFTs();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchMoreNFTs = async () => {
    setLoading(true);
    const response = await fetch(`/api/nfts?page=${Math.ceil(nfts.length / 100) + 1}&sort=${sort}&query=${searchParams.get('query') || ''}`);
    const data = await response.json();
    if (data.nfts.length === 0) {
      setHasMore(false);
    } else {
      setNfts(prevNfts => [...prevNfts, ...data.nfts]);
    }
    setLoading(false);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    params.set('sort', sort); // Ensure sort parameter is included
    replace(`${pathname}?${params.toString()}`);
    fetch(`/api/nfts?query=${term}&sort=${sort}`)
      .then((response) => response.json())
      .then(({ nfts: filteredNfts }) => {
        setNfts(filteredNfts);
        setHasMore(false); // No need to load more if a search is active
      })
      .catch((error) => {
        console.error('Error fetching filtered NFT data:', error);
      });
  }, 300);

  const handleSortChange = (value: string) => {
    setSort(value);
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    replace(`${pathname}?${params.toString()}`);
    fetch(`/api/nfts?sort=${value}&query=${searchParams.get('query') || ''}`)
      .then((response) => response.json())
      .then(({ nfts: sortedNfts }) => {
        setNfts(sortedNfts);
        setHasMore(true); // Reset hasMore to allow infinite scroll with new sort
      })
      .catch((error) => {
        console.error('Error fetching sorted NFT data:', error);
      });
  };

  // Scroll-to-top button functionality
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="container mx-auto p-4 mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Taikonauts</h1>
        {tokenInfo && (
          <>
            <div className="space-y-1 mb-4">
              <p className="break-words"><strong>Token Address:</strong> {tokenInfo.token_address}</p>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-center items-center space-x-4 text-sm mb-4">
              <div><strong>Symbol:</strong> {tokenInfo.token_symbol}</div>
              <Separator orientation="vertical" />
              <div><strong>Supply:</strong> {parseInt(tokenInfo.total_supply) + 1}</div>
              <Separator orientation="vertical" />
              <div><strong>Holders:</strong> {tokenInfo.total_holders}</div>
              <Separator orientation="vertical" />
              <div><strong>Transfers:</strong> {tokenInfo.total_transfers}</div>
            </div>
            <Separator className="my-4" />
          </>
        )}
        {tokenInfo && (
          <NFTsComponent 
            nfts={nfts} 
            openDrawer={openDrawer} 
            handleSearch={handleSearch} 
            handleSortChange={handleSortChange} 
            sort={sort}
            lastElementRef={lastElementRef}
          />
        )}
      </div>
      {!tokenInfo && (
        <div className="container mx-auto p-4 mb-8">
          <div className="animate-pulse">
            <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
            <div className="my-4">
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex h-5 items-center space-x-4 text-sm">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="my-4">
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      )}
      {loading && <div className="text-center py-4">Loading...</div>}
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
              <h3 className="text-lg font-bold mt-4">Holder</h3>
              <NFTDrawer nft={selectedNFT} />
            </div>
          </DrawerContent>
        </Drawer>
      )}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-gray-600 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
        >
          <ArrowUpIcon className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default ClientNFTs;
