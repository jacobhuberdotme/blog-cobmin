import { ServerNFTs } from '@/app/taikonauts/Server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || 'number-asc';
  const filters: Record<string, string[]> = {};

  searchParams.forEach((value, key) => {
    if (key.startsWith('filter_')) {
      const traitType = key.replace('filter_', '');
      if (!filters[traitType]) {
        filters[traitType] = [];
      }
      filters[traitType].push(value);
    }
  });

  try {
    const { nfts, tokenInfo, totalResults } = await ServerNFTs(page, query, sort, filters);
    return NextResponse.json({ nfts, tokenInfo, totalResults });
  } catch (error) {
    return NextResponse.error();
  }
}
