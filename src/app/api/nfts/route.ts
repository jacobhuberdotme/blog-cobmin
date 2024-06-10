import { ServerNFTs } from '@/app/taikonauts/Server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  try {
    const { nfts, tokenInfo } = await ServerNFTs(page);
    return NextResponse.json({ nfts, tokenInfo });
  } catch (error) {
    return NextResponse.error();
  }
}
