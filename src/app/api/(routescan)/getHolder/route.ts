import { NextRequest, NextResponse } from 'next/server';
import { getHolder } from '@/app/taikonauts/serverUtils';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tokenId = Number(searchParams.get('tokenId'));

  if (isNaN(tokenId)) {
    return NextResponse.json({ error: 'Token ID is required' }, { status: 400 });
  }

  try {
    const holder = await getHolder(tokenId);
    return NextResponse.json({ holder });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
