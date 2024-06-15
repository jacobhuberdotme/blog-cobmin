import { getXP } from '@/app/collections/[collectionName]/serverUtils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const edition = Number(searchParams.get('edition'));

  if (isNaN(edition)) {
    return NextResponse.json({ error: 'Edition is required' }, { status: 400 });
  }

  try {
    const xp = await getXP(edition);
    return NextResponse.json({ xp });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
