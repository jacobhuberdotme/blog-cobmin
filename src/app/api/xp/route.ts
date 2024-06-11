import { NextResponse } from 'next/server';
import { getXP } from '@/app/taikonauts/Server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const edition = Number(searchParams.get('edition'));

  if (!edition && edition !== 0) {
    return NextResponse.json({ error: 'Edition is required' }, { status: 400 });
  }

  try {
    const xp = await getXP(edition);
    return NextResponse.json({ xp });
} catch (error) {
    return NextResponse.error();
  }
}