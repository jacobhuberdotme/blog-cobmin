import { NextRequest, NextResponse } from 'next/server';
import { ServerNFTs } from '@/app/taikonauts/serverUtils';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page')) || 1;
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
    const { nfts, tokenInfo, totalResults, traitCounts } = await ServerNFTs(page, query, sort, filters);
    return NextResponse.json({ nfts, tokenInfo, totalResults, traitCounts });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
