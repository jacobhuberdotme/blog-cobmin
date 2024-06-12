"use client"

import { useState, useRef, useCallback, useEffect } from 'react';
import { NFT } from '../../types/nft';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Skeleton } from "@/components/ui/skeleton";
import NFTsComponent from '@/components/NFTsComponent';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import PropertiesFilter from '@/components/PropertiesFilter';
import TokenInfo from '@/components/TokenInfo';
import Banner from '@/components/Banner';
import NFTDrawerComponent from '@/components/NFTDrawer';

// Fetch NFT data from server
const fetchNFTDataFromServer = async (edition: number) => {
  console.log('Fetching NFT data for edition:', edition); // Debug log
  const response = await fetch(`/api/getNFTData?edition=${edition}`);
  if (!response.ok) {
    throw new Error('Failed to fetch NFT data');
  }
  return response.json();
};

const ClientNFTs = ({ initialNfts, initialTokenInfo, traitCounts }: { initialNfts: NFT[], initialTokenInfo: any, traitCounts: Record<string, { count: number; values: Record<string, { count: number, rarity: string }> }> }) => {
  const [nfts, setNfts] = useState<NFT[]>(initialNfts);
  const [loading, setLoading] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<any>(initialTokenInfo);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sort, setSort] = useState('number-asc');
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState<Record<string, string[]>>({});
  const [query, setQuery] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver>();
  const searchParams = useSearchParams();
  const { replace, push } = useRouter();
  const pathname = usePathname();

  // Open NFT drawer and fetch additional data
  const openDrawer = async (nft: NFT) => {
    console.log('Opening drawer for NFT:', nft); // Debug log
    setIsDrawerOpen(true);
    try {
      const data = await fetchNFTDataFromServer(nft.edition);
      console.log('Fetched NFT data:', data); // Debug log
      setSelectedNFT({ ...nft, name: data.name, description: data.description });
    } catch (error) {
      console.error('Failed to fetch NFT data:', error);
    }
  };

  // Observer to handle infinite scroll
  const lastElementRef = useCallback((node: HTMLElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchMoreNFTs();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, query, selectedProperties, sort]);

  // Fetch more NFTs for infinite scroll
  const fetchMoreNFTs = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (query) {
      params.set('query', query);
    }
    Object.keys(selectedProperties).forEach(traitType => {
      selectedProperties[traitType].forEach(value => {
        params.append(`filter_${traitType}`, value);
      });
    });
    params.set('sort', sort);
    try {
      const response = await fetch(`/api/serverNfts?page=${Math.ceil(nfts.length / 100) + 1}&${params.toString()}`);
      const data = await response.json();
      if (data.nfts.length === 0) {
        setHasMore(false);
      } else {
        setNfts(prevNfts => [...prevNfts, ...data.nfts]);
      }
    } catch (error) {
      console.error('Failed to fetch more NFTs:', error);
    }
    setLoading(false);
  };

  // Update URL and fetch new data based on search parameters
  const updateURLAndFetch = (params: URLSearchParams) => {
    replace(`${pathname}?${params.toString()}`, { scroll: false });
    fetch(`/api/serverNfts?${params.toString()}`)
      .then((response) => response.json())
      .then(({ nfts: updatedNfts }) => {
        setNfts(updatedNfts);
        setHasMore(updatedNfts.length === 100);
      })
      .catch((error) => {
        console.error('Error fetching updated NFT data:', error);
      });
  };

  // Handle search input with debounce
  const handleSearch = useDebouncedCallback((term: string) => {
    setQuery(term);
    const params = new URLSearchParams();
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    params.set('sort', sort);
    Object.keys(selectedProperties).forEach(traitType => {
      selectedProperties[traitType].forEach(property => {
        params.append(`filter_${traitType}`, property);
      });
    });
    updateURLAndFetch(params);
  }, 300);

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSort(value);
    const params = new URLSearchParams();
    params.set('sort', value);
    if (query) {
      params.set('query', query);
    }
    Object.keys(selectedProperties).forEach(traitType => {
      selectedProperties[traitType].forEach(property => {
        params.append(`filter_${traitType}`, property);
      });
    });
    updateURLAndFetch(params);
  };

  // Handle properties filter change
  const handlePropertiesFilterChange = (updatedProperties: Record<string, string[]>) => {
    setSelectedProperties(updatedProperties);
    const params = new URLSearchParams();
    Object.keys(updatedProperties).forEach(traitType => {
      updatedProperties[traitType].forEach(value => {
        params.append(`filter_${traitType}`, value);
      });
    });
    params.set('sort', sort);
    if (query) {
      params.set('query', query);
    }
    updateURLAndFetch(params);
  };

  // Scroll to top button
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
      <Banner />
      <div className="container mx-auto p-4 mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Taikonauts</h1>
        {tokenInfo && <TokenInfo tokenInfo={tokenInfo} />}
        {tokenInfo && (
          <>
            <PropertiesFilter nfts={nfts} selectedProperties={selectedProperties} onChange={handlePropertiesFilterChange} traitCounts={traitCounts} />
            <NFTsComponent 
              nfts={nfts} 
              openDrawer={openDrawer} 
              handleSearch={handleSearch} 
              handleSortChange={handleSortChange} 
              sort={sort}
              lastElementRef={lastElementRef}
            />
          </>
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
      <NFTDrawerComponent
        selectedNFT={selectedNFT}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      {showScrollToTop && (
        <ScrollToTopButton onClick={scrollToTop} />
      )}
    </>
  );
};

export default ClientNFTs;
