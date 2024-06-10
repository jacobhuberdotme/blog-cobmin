import { getHolder } from '@/app/taikonauts/Server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tokenId = parseInt(searchParams.get('tokenId') || '0', 10);
  try {
    const holder = await getHolder(tokenId);
    return NextResponse.json({ holder });
  } catch (error) {
    return NextResponse.error();
  }
}
