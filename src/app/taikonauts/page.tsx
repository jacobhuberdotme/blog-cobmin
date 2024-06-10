// src/app/taikonauts/page.tsx
import { Suspense } from 'react';
import ServerNFTs, { preloadNfts } from './Server';
import ClientNFTs from './Client';
import Loading from './loading';

preloadNfts();

export default async function NFTsPage() {
  const initialNfts = await ServerNFTs();
  return (
    <Suspense fallback={<Loading />}>
      <ClientNFTs initialNfts={initialNfts} />
    </Suspense>
  );
}
