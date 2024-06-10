import { ServerNFTs } from '@/app/taikonauts/Server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';

  const { nfts } = await ServerNFTs(Number(page));
  return NextResponse.json({ nfts });
}
