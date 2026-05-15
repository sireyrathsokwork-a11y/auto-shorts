import { proxyToExpress } from '@/app/lib/proxy';

export async function POST(req: Request) {
  return proxyToExpress(req, '/api/projects/create');
}

export async function GET(req: Request) {
  return proxyToExpress(req, '/api/projects');
}
