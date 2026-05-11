import { auth } from '@/app/lib/auth';
import { NextResponse } from 'next/server';

export async function proxyToExpress(req: Request, endpoint: string) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: 'Session Expired' }, { status: 401 });
  }

  const body = await req.json();
  const response = await fetch(`${process.env.EXPRESS_URL}/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': session.user?.id as string,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: (await response).status });
}
