import { proxyToExpress } from '@/app/lib/proxy';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  return proxyToExpress(req, `/api/decision?token=${token}`);
}
