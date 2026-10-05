import { auth } from '@/app/lib/auth';
import { NextResponse } from 'next/server';

export async function proxyToExpress(req: Request, endpoint: string) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: 'Session Expired' }, { status: 401 });
  }

  const body = req.method !== 'GET' ? await req.json() : null;

  let response: Response;
  try {
    response = await fetch(`${process.env.EXPRESS_URL}${endpoint}`, {
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
  } catch {
    return NextResponse.json(
      { message: 'Backend server is unreachable' },
      { status: 502 },
    );
  }

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    return NextResponse.json(
      { message: `Backend returned a non-JSON response: ${text.slice(0, 200)}` },
      { status: 502 },
    );
  }

  return NextResponse.json(data, { status: response.status });
}
