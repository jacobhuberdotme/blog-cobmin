import { Suspense } from 'react';
import { ServerNFTs, preloadNfts, preloadTokenInfo } from './Server';
import ClientNFTs from './Client';
import Loading from './loading';

preloadNfts();
preloadTokenInfo();

export default async function NFTsPage() {
  const { nfts, tokenInfo } = await ServerNFTs();
  return (
    <Suspense fallback={<Loading />}>
      <ClientNFTs initialNfts={nfts} initialTokenInfo={tokenInfo} />
    </Suspense>
  );
}
