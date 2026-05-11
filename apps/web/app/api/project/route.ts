import { proxyToExpress } from '@/app/lib/proxy';

export async function POST(req: Request) {
  return proxyToExpress(req, '/api/projects');
}
