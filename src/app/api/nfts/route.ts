import { ServerNFTs } from '@/app/taikonauts/Server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || 'number-asc';

  try {
    const { nfts, tokenInfo, totalResults } = await ServerNFTs(page, query, sort);
    return NextResponse.json({ nfts, tokenInfo, totalResults });
  } catch (error) {
    return NextResponse.error();
  }
}
