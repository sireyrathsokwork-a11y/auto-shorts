import { auth } from '@/app/lib/auth';
import { NextResponse } from 'next/server';

export async function proxyToExpress(req: Request, endpoint: string) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: 'Session Expired' }, { status: 401 });
  }

  const body = req.method !== 'GET' ? await req.json() : null;
  const response = await fetch(`${process.env.EXPRESS_URL}/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': session.user?.id as string,
      'x-internal-secret': process.env.INTERNAL_SECRET as string,
    },
    method: req.method,
    ...(req.method === 'POST'
      ? {
          body: JSON.stringify(body),
        }
      : {}),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
