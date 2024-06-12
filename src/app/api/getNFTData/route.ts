import { getNFTData } from '@/app/taikonauts/Server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const edition = searchParams.get('edition');
  if (!edition) {
    return NextResponse.json({ error: 'Edition is required' }, { status: 400 });
  }

  try {
    const data = await getNFTData(Number(edition));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch NFT data' }, { status: 500 });
  }
}
